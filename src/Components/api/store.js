import { create } from "zustand";
import { axiosInstance } from "./axiosInstance";
import { toast } from "react-hot-toast";
const auth = JSON.parse(
  localStorage.getItem(
    "firebase:authUser:AIzaSyBT-xNWHwxElgmjm4HPKvKaLlPFhBr3iak:[DEFAULT]"
  )
);

export const storeCourses = create((set) => ({
  isLoading: false,
  courses: [],
  getCourses: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/courses");
      const propertiesToRemove = ["videoUrl", "options", "correctOptions"];
      if (!auth) {
        const removePropertiesRecursively = (object, propertiesToRemove) => {
          if (typeof object !== "object" || object === null) {
            return object;
          }

          if (Array.isArray(object)) {
            return object.map((item) =>
              removePropertiesRecursively(item, propertiesToRemove)
            );
          }

          const newObj = { ...object };
          for (const property in newObj) {
            if (propertiesToRemove.includes(property)) {
              delete newObj[property];
            } else {
              newObj[property] = removePropertiesRecursively(
                newObj[property],
                propertiesToRemove
              );
            }
          }

          return newObj;
        };

        const filteredCoursesArray = res.data.map((course) => {
          const filteredCourse = removePropertiesRecursively(
            course,
            propertiesToRemove
          );
          return filteredCourse;
        });
        set({ courses: filteredCoursesArray });
      } else {
        set({ courses: res.data });
      }
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

export const getCourseById = create((set) => ({
  isLoading: false,
  course: null,
  fetchData: async (courseId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/courses/${courseId}`);

      set({ course: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

export const storeInstructors = create((set) => ({
  isLoading: false,
  instructors: [],
  getInstructors: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/instructors");
      set({ instructors: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

export const storeEnrolledCourses = create((set) => ({
  isLoading: false,
  enrolledCourses: {},
  getEnrolledCourses: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/enrolled-course/${id}`);
      set({ enrolledCourses: res?.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addEnrollmentInCourse: async (body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/enroll", body);
      set({ enrolledCourses: res?.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

export const storeLeaderBoard = create((set) => ({
  isLoading: false,
  leaderBoard: [],
  analystics: {},
  getLeaderBoard: async (courseId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/leaderboard/${courseId}`);
      set({ leaderBoard: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  getAnalytics: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/anlytics/${id}`);
      set({ analystics: res.data });
      set({ isLoading: false });
    } catch (error) {
      console.log("🚀 ~ file: store.js:147 ~ getAnalytics: ~ error:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  addPointsAndAnalytics: async (bodyP, bodyA) => {
    set({ isLoading: true });
    try {
      const resA = await axiosInstance.post("/addOrUpdateAnalytics", bodyA);
      if (resA.status >= 200 && resA.status < 300) {
        const resP = await axiosInstance.post("/student-point", bodyP);
        if (resP.status >= 200 && resP.status < 300) {
          toast.success("Your Quiz Submited ", {
            position: "top-center",
            duration: 1500,
          });
        }
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
