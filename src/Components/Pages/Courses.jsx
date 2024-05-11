import React, { useContext, useEffect } from "react";
import { storeCourses, storeEnrolledCourses } from "../api/store";
import Card from "../libs/Card/Card";
import { useNavbar } from "../Navbar/zustand";
import Loading from "../libs/Loading/Loading";
import { Link } from "react-router-dom";
import AuthContext from "../Firebase/AuthContext";

const Courses = () => {
  const { isLoading: CourseLoading, courses, getCourses } = storeCourses();

  const {
    isLoading: enrolledCourseLoading,
    getEnrolledCourses,
    enrolledCourses,
  } = storeEnrolledCourses();
  const { user } = useContext(AuthContext);

  const { isSidebarOpen } = useNavbar();
  useEffect(() => {
    getCourses();

    if (user) {
      getEnrolledCourses(user?.uid);
    }
  }, []);
  if (CourseLoading || enrolledCourseLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="h-screen">
        <div className={`lg:p-6 ${isSidebarOpen && "blur-sm -z-40"}`}>
          <p className="text-xl font-semibold  text-center ">Our All Courses</p>
          {/*  all course show */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {courses?.map((item, index) => {
              const isEnrolled = enrolledCourses?.courses?.some(
                (course) => course?._id === item?._id
              );

              return (
                <Card
                  item={item}
                  index={index}
                  key={index}
                  button={
                    <div className="card-actions justify-between items-center">
                      <p className="font-semibold text-xl hover:italic animation">
                        ${item?.price}
                      </p>
                      <Link
                        to={isEnrolled ? "/my-course" : `/courses/${item?._id}`}
                        state={{
                          data: item,
                          from: isEnrolled ? "my-course" : "course",
                        }}
                        className={`btn ${
                          isEnrolled
                            ? "btn-neutral"
                            : "btn-accent hover:btn-secondary"
                        }`}
                      >
                        {isEnrolled ? "Enrolled" : "Enroll Now"}
                      </Link>
                    </div>
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
