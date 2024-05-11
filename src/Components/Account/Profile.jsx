import React, { useContext, useEffect } from "react";
import AuthContext from "../Firebase/AuthContext";
import Loading from "../libs/Loading/Loading";
import { cloud_front_url } from "../api/data";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../libs/Modal/Modal";
import ProfileEdit from "../libs/Form/ProfileEdit";
import { useModal } from "../libs/Modal/zustand";
import { storeEnrolledCourses, storeLeaderBoard } from "../api/store";
import RadialProgress from "../libs/Progress Bar/RadialProgress";
import { Circles } from "react-loader-spinner";


const Profile = () => {
  const { loading, userInfo, user } = useContext(AuthContext);
  const auth = JSON.parse(
    localStorage.getItem(
      "firebase:authUser:AIzaSyBT-xNWHwxElgmjm4HPKvKaLlPFhBr3iak:[DEFAULT]"
    )
  );
  const { isModalOpen, openModal, closeModal } = useModal();
  const { isLoading, getAnalytics, analystics } = storeLeaderBoard();

  useEffect(() => {
    const fetchData = async () => {
      await getAnalytics(user?.uid || auth?.uid);
    };

    if (user?.uid?.length > 1 || auth?.uid?.length > 1) {
      fetchData();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {/*    main */}
      <section
        className={`relative flex flex-wrap justify-between items-baseline  m-4 bg-base-200 p-5 rounded-xl mt-16 ${isModalOpen && "blur-sm animation"
          }`}
      >
        {/* icon */}
        <div className=" absolute z-50 top-3 right-5 flex justify-end ">
          <button onClick={openModal} className="btn btn-sm btn-neutral">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-accent "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
        {/*   1 st part */}

        <div style={{ maxWidth: '600px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <div style={{ display: 'flex', marginBottom: '15px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#333', marginRight: '10px' }}>Name:</span>
            <p style={{ fontSize: '16px', color: '#555', margin: 0 }}>{userInfo?.name}</p>
          </div>
          <div style={{ display: 'flex', marginBottom: '15px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#333', marginRight: '10px' }}>Email:</span>
            <p style={{ fontSize: '16px', color: '#555', margin: 0 }}>{userInfo?.email}</p>
          </div>
          <div style={{ display: 'flex', marginBottom: '15px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#333', marginRight: '10px' }}>Phone Number:</span>
            <p style={{ fontSize: '16px', color: '#555', margin: 0 }}>{userInfo?.phone}</p>
          </div>
        </div>


        {/* 2nd part */}
        <div>
          {userInfo?.address?.presentAddress && (
            <div>
              <span className="font-mulish text-lg font-bold link">
                Present Address :-
              </span>
              <p className="capitalize text-sm lg:text-base font-poppins font-semibold ">
                {userInfo?.address?.presentAddress?.street}&#44;
                {userInfo?.address?.presentAddress?.city}&#44;
                {userInfo?.address?.presentAddress?.country}
              </p>
            </div>
          )}

          {userInfo?.address?.permanentAddress && (
            <div>
              <span className="font-mulish text-lg font-bold link">
                Permanent Address :-
              </span>
              <p className="capitalize font-poppins font-semibold">
                {userInfo?.address?.permanentAddress?.street}&#44;
                {userInfo?.address?.permanentAddress?.city}&#44;
                {userInfo?.address?.permanentAddress?.country}&#44;
              </p>
            </div>
          )}
        </div>

        <motion.div
          initial={{ y: "50px" }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 100,
            duration: 0.5,
            delay: 0.25,
          }}
          className=" absolute -top-12 md:-top-10 left-0 right-0 flex justify-center items-center"
        >
          <figure className="avatar">
            <div className="hover:cursor-pointer w-20 h-20 rounded-full ring ring-rose-300 hover:ring-teal-500 animation ring-offset-base-100 ring-offset-2 flex justify-center items-center">
              {/* <img
                src={`${cloud_front_url}/${
                  userInfo?.image || "images/1691843036253-avatar.png"
                } `}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              /> */}
              <img
                src={userInfo?.image ? `${cloud_front_url}/${userInfo.image}` : "https://cdn-icons-png.flaticon.com/512/266/266033.png"}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </figure>
        </motion.div>
      </section>

      {/* //analytics */}
      <section className="mt-5">
        <p className="text-xl font-semibold text-center">Analytics</p>
        {/* <div className="flex justify-end mx-3">
          <select
            onChange={(e) => handleLeaderboard(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            {enrolledCourses?.courses?.map((course, index) => (
              <option value={course?._id} key={index}>
                {course.title}
              </option>
            ))}
          </select>
        </div> */}

        <section className="bg-gray-300 rounded-xl mx-4 my-3">
          <p className="font-mulish text-center link w-full text-lg font-semibold p-4">
            OVERALL SUMMARY
          </p>
          {isLoading ? (
            <div className="p-4 flex justify-center">
              <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4  justify-around p-4">
              <div className=" flex flex-col items-center">
                <p className="text-xl font-semibold font-inter">
                  Completed Module
                </p>
                <RadialProgress
                  percentage={
                    (analystics?.analytics?.totalModules /
                      analystics?.totalEnrollMentSummary?.totalModules) *
                    100 || 0
                  }
                />
                <p className="font-semibold">
                  {" "}
                  {analystics?.analytics?.totalModules || 0}/{" "}
                  {analystics?.totalEnrollMentSummary?.totalModules || 0}
                </p>
              </div>
              <div className=" flex flex-col items-center">
                <p className="text-xl font-semibold font-inter">
                  Completed Class
                </p>
                <RadialProgress
                  percentage={
                    (analystics?.analytics?.totalClasses /
                      analystics?.totalEnrollMentSummary?.totalClasses) *
                    100 || 0
                  }
                />
                <p className="font-semibold">
                  {analystics?.analytics?.totalClasses || 0}/{" "}
                  {analystics?.totalEnrollMentSummary?.totalClasses || 0}
                </p>
              </div>
              <div className=" flex flex-col items-center ">
                <p className="text-xl font-semibold font-inter">
                  Completed Quiz
                </p>
                <RadialProgress
                  percentage={
                    (analystics?.analytics?.totalQuiz /
                      analystics?.totalEnrollMentSummary?.totalQuizzes) *
                    100 || 0
                  }
                />
                <p className="font-semibold">
                  {analystics?.analytics?.totalQuiz || 0}/
                  {analystics?.totalEnrollMentSummary?.totalQuizzes || 0}{" "}
                </p>
              </div>
              <div className=" flex flex-col items-center">
                <p className="text-xl font-semibold font-inter">
                  Correct Quiz Rate
                </p>

                <RadialProgress
                  percentage={
                    (analystics?.analytics?.totalPoints /
                      analystics?.totalEnrollMentSummary?.totalQuizzes) *
                    100 || 0
                  }
                />
                <p className="font-semibold">
                  {" "}
                  {analystics?.analytics?.totalPoints || 0}/
                  {analystics?.totalEnrollMentSummary?.totalQuizzes || 0}{" "}
                </p>
              </div>
            </div>
          )}
        </section>
      </section>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            onClose={() => {
              closeModal();
            }}
          >
            <ProfileEdit />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
