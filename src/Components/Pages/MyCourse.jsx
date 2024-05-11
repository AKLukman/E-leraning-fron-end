import React, { useContext, useEffect } from "react";
import { storeEnrolledCourses } from "../api/store";
import Loading from "../libs/Loading/Loading";
import { useNavbar } from "../Navbar/zustand";
import Card from "../libs/Card/Card";
import { Link } from "react-router-dom";
import AuthContext from "../Firebase/AuthContext";

const MyCourse = () => {
  const { isSidebarOpen } = useNavbar();
  const {
    isLoading: enrolledCourseLoading,
    getEnrolledCourses,
    enrolledCourses,
  } = storeEnrolledCourses();
  const { user } = useContext(AuthContext);
  const auth = JSON.parse(
    localStorage.getItem(
      "firebase:authUser:AIzaSyBT-xNWHwxElgmjm4HPKvKaLlPFhBr3iak:[DEFAULT]"
    )
  );
  useEffect(() => {
    if (user || auth) {
      getEnrolledCourses(user?.uid || auth?.uid);
    }
  }, []);
  if (enrolledCourseLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="h-screen">
        <div className={`lg:p-6 ${isSidebarOpen && "blur-sm -z-40"}`}>
          <p className="text-xl font-semibold  text-center ">My Courses</p>
          {/*  all course show */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {enrolledCourses?.courses?.map((item, index) => (
              <Card
                item={item}
                key={index}
                button={
                  <div className="card-actions justify-end items-center">
                    <Link
                      to={`/courses/${item?._id}`}
                      state={{ data: item, from: "my-course" }}
                      className="btn btn-accent hover:btn-info"
                    >
                      View
                    </Link>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourse;
