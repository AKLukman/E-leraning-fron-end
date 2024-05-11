import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getCourseById, storeEnrolledCourses } from "../../api/store";
import Loading from "../Loading/Loading";
import { cloud_front_url } from "../../api/data";
import AuthContext from "../../Firebase/AuthContext";
import { toast } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal/Modal";
import { useModal } from "../Modal/zustand";

const CourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;
  const from = location?.state?.from;
  const { user } = useContext(AuthContext);
  console.log("🚀 ~ file: CourseDetails.jsx:18 ~ CourseDetails ~ user:", user);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { isLoading: enrollmetLoading, addEnrollmentInCourse } =
    storeEnrolledCourses();
  /*  const data = location.state?.courses; */

  const { courseId } = useParams();

  const { isLoading, course, fetchData } = getCourseById();

  useEffect(() => {
    if (!course && !data) {
      fetchData(courseId);
    }
  }, [course, data]);

  const courseData = data ?? course;
  // Count the total classes
  const totalClasses = courseData?.milestones?.reduce(
    (count, milestone) =>
      count +
      milestone?.modules?.reduce((c, module) => c + module?.classes.length, 0),
    0
  );

  // Count the total modules
  const totalModules = courseData?.milestones?.reduce(
    (count, milestone) => count + milestone?.modules?.length,
    0
  );

  // Count the total milestones
  const totalMilestones = courseData?.milestones?.length;

  // loading
  if (isLoading) {
    return <Loading />;
  }
  const handleEnrollMentModal = () => {
    if (!user) {
      toast.error("Please login in your account", {
        position: "top-center",
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/signin");
      }, 2050);
    } else {
      openModal();
    }
  };
  const handleEnrollmet = () => {
    const body = {
      user: user?.uid,
      courses: [courseId],
    };
    addEnrollmentInCourse(body)
      .then(() => {
        closeModal();
        toast.success("Enrollment Successful.", {
          position: "top-center",
          duration: 1500,
        });
        navigate("/my-course");
      })
      .catch((error) => {
        closeModal();
        toast.error("Enrollment failed", {
          position: "top-center",
          duration: 1500,
        });
        // You can handle errors here
      });
  };
  return (
    <>
      <div className={`${isModalOpen && "blur-sm"}  animation`}>
        {/*   // main part */}
        {(from === "course" || !from) && (
          <div className="flex flex-col md:flex-row gap-4 p-4  ">
            <div className="md:w-3/5">
              <img
                src={`${cloud_front_url}/${courseData?.thumbnail}`}
                className="w-full rounded-lg  md:max-h-[340px]"
                alt="Course Thumbnail"
              />
            </div>

            <div className="md:w-2/5 flex flex-col justify-between items-center border-2 border-gray-400 p-1.5 md:p-2 rounded-xl animation">
              <p className="text-2xl font-bold capitalize ">
                {" "}
                {courseData?.title}
              </p>
              <section className="border border-gray-200 hover:border-gray-500 rounded-lg w-full">
                <p className="text-lg font-mulish text-center">Instructors</p>

                <div className="flex flex-wrap justify-start  items-center gap-4 my-2">
                  {courseData?.instructors?.map((item, indexC) => (
                    <div
                      key={indexC}
                      className="w-28 flex flex-col items-center  group animation "
                    >
                      <div
                        className="avatar tooltip hover:cursor-pointer"
                        data-tip={item?.name}
                      >
                        <div className="w-12 h-12 rounded-full animation  group-hover:ring ring-teal-400 ring-offset-base-100 ring-offset-2 overflow-hidden">
                          <img
                            src={`${cloud_front_url}/${item?.image}`}
                            alt={`Instructor ${item?.name}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shadow animation">
                {/* Stats section */}
                <div className="stat">
                  <div className="stat-title text-error font-semibold">
                    Milestones
                  </div>
                  <div className="stat-value">{totalMilestones}</div>
                </div>

                <div className="stat">
                  <div className="stat-title text-secondary font-semibold">
                    Modules
                  </div>
                  <div className="stat-value">{totalModules}</div>
                </div>

                <div className="stat">
                  <div className="stat-title text-primary font-semibold">
                    Classes
                  </div>
                  <div className="stat-value">{totalClasses}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(from === "course" || !from) && (
          <div className="flex justify-center items-center ">
            <button
              onClick={handleEnrollMentModal}
              className="btn shadow-xl btn-secondary"
            >
              Enroll Now
            </button>
          </div>
        )}

        {/*  Milestone Part */}
        <p className="font-mulish text-xl text-center mt-4">
          {" "}
          {totalMilestones > 0 ? "Milestones" : "Milestone Not Found"}
        </p>
        <div className="flex flex-wrap justify-center md:justify-center md:p-6 p-4 gap-4">
          {courseData?.milestones?.map((milestone, indexM) => (
            <>
              {from === "my-course" ? (
                <Link
                  to={`/course/${courseId}/milestone/${milestone?._id}`}
                  state={{ milestone: milestone }}
                  key={indexM}
                  className=" w-60 h-24 flex justify-center items-center border p-2 neon-zinc rounded-xl gap-2 hover:cursor-pointer"
                >
                  <p className="capitalize">{milestone?.title}</p>
                </Link>
              ) : (
                <button
                  key={indexM}
                  className=" w-60 h-24 flex justify-center items-center border p-2 neon-zinc rounded-xl gap-2 hover:cursor-pointer hover:neon-rose animation"
                >
                  <p className="capitalize">{milestone?.title}</p>
                </button>
              )}
            </>
          ))}
        </div>
        <div className="bg-slate-400 rounded-lg flex flex-col justify-center gap-3 items-center m-5 p-8">
          <p className="text-xl font-mulish font-medium link">Description</p>
          <p className="font-poppins text-justify">{courseData?.description}</p>
        </div>
        {(from === "course" || !from) && (
          <div className="flex flex-col gap-3 justify-center items-center">
            <p className="font-mulish text-xl ">Frequently Asked Question</p>
            {courseData?.faq?.map((item, index) => (
              <div
                key={index}
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-200 w-96"
              >
                <div className="collapse-title text-xl font-medium">
                  {item?.question}
                </div>
                <div tabIndex={0} className="collapse-content">
                  <p>{item?.answer}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            height={"h-auto"}
            isModalOpen={isModalOpen}
            onClose={() => {
              closeModal();
            }}
          >
            <section className="flex flex-col items-center justify-center">
              <p className="text-lg font-semibold font-mulish">
                Are You sure to enroll this course?{" "}
              </p>
              <div className="flex justify-center gap-5">
                <button onClick={handleEnrollmet} className="btn btn-success">
                  Yes
                </button>
                <button onClick={closeModal} className="btn btn-error">
                  No
                </button>
              </div>
            </section>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CourseDetails;
