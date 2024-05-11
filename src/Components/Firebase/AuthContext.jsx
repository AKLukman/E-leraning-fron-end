import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "./firebase.config";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../api/axiosInstance";
import { cloud_front_url } from "../api/data";
import { storeEnrolledCourses } from "../api/store";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const auth = getAuth(app);
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  setPersistence(auth, browserLocalPersistence);
  ///-----------------------User INFO-----------
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/user/${user?.email}`);
        setUserInfo(res.data);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) {
      fetchUserData();
    }
  }, [user]);
  ///-------update user------------
  const updateUserInfo = async (id, body) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/user/${id}`, body);
      setUserInfo(res.data);
      if (res.status >= 200 && res.status < 300) {
        toast.success("Your Profile Update Successfully", {
          position: "top-center",
          duration: 1500,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  ///------------------------SIGN UP ----------------
  const createUser = async (body) => {
    const { email, password, name, image } = body;
    const firebaseBody = {
      email,
      password,
      displayName: name,
      ...(image && { photoURL: `${cloud_front_url}/${image}` }),
    };
    setLoading(true);
    try {
      const { password, ...restData } = body;

      const userResponse = await axiosInstance.post("/user", restData); // User post request

      if (userResponse?.status === 201) {
        const { _id } = userResponse?.data;
        const firebaseResponse = await axiosInstance.post(
          "/register-user",
          { ...firebaseBody, uid: _id } // Include the _id obtained from user post response
        );

        if (firebaseResponse.status >= 200 && firebaseResponse.status < 300) {
          setUserInfo(firebaseResponse.data);

          toast.success("Account Created Successfully", {
            position: "top-center",
            duration: 1500,
            icon: "😁",
          });
        }
      }

      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error, {
        duration: 1500,
        position: "top-center",
      });
      setLoading(false);
      throw error;
    }
  };
  /// -----------------------SIGN IN ----------------

  const signIn = async (body) => {
    const { email, password } = body;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential?.user;
      if (user?.emailVerified === false) {
        return (
          sendEmailVerification(auth.currentUser),
          signOut(auth).then(() => {
            toast.success(
              "Your email is not verified ,check your mail and verify",
              {
                position: "top-center",
              }
            );
          })
        );
      }

      if (user) {
        try {
          const res = await axiosInstance.get(`/user/${user?.email}`);
          setUserInfo(res.data);
          if (res.data || res.status === 200) {
            localStorage.setItem("email", user?.email);
            toast.success("Login Successful", {
              position: "top-center",
              duration: 1500,
            });
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      setUser(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.message === "Firebase: Error (auth/wrong-password).") {
        toast.error("Your Password is wrong", {
          position: "top-center",
          duration: 1500,
        });
      }
      if (error?.message === "Firebase: Error (auth/user-not-found).") {
        toast.error("User Not Found", {
          position: "top-center",
          duration: 1500,
        });
      }
      throw error;
    }
  };
  /// -----------------------UPDATE PASSWORD---------
  const updatePassword = async (id, body) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(
        `/firebase-user-password/${id}`,
        body
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Password Update Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  ///-----------------------RESET PASSWORD----------
  const resetPassword = async (email) => {
    setLoading(true);

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset link sent in your email ", {
          position: "top-center",
          duration: 1500,
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Something is error", {
          position: "top-center",
          duration: 1500,
        });
        setLoading(false);
      });
  };
  /// -----------------------LOGOUT---------
  const logOut = () => {
    signOut(auth)
      .then(() => {
        storeEnrolledCourses.setState({ enrolledCourses: {} });
        localStorage.removeItem("email");
        navigate("/signin");
        setUser(null);
        toast.success("Sign-Out Successful", {
          position: "top-center",
          duration: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ///-----------------USER AUTH DETECT----------------
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });

    // Check if the user is already authenticated (e.g., page reload)
    if (auth.currentUser) {
      setUser(auth.currentUser);
      setLoading(false);
    }

    return () => {
      unsubscribe();
    };
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        setUser,
        userInfo,
        updateUserInfo,
        createUser,
        signIn,
        logOut,
        updatePassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
