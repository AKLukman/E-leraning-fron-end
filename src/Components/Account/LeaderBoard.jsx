import React, { useContext, useEffect, useState } from "react";
import { cloud_front_url } from "../api/data";
import { storeEnrolledCourses, storeLeaderBoard } from "../api/store";
import Loading from "../libs/Loading/Loading";
import AuthContext from "../Firebase/AuthContext";
import { axiosInstance } from "../api/axiosInstance";

const LeaderBoard = () => {
  const {
    isLoading: enrolledCourseLoading,
    getEnrolledCourses,
    enrolledCourses,
  } = storeEnrolledCourses();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const { isLoading, getLeaderBoard, leaderBoard } = storeLeaderBoard();
  const { user } = useContext(AuthContext);
  const [isFetchDone, setIsFetchDone] = useState(false);
  const [feedBacks, setFeedbacks] = useState(null);
  console.log(

    feedBacks
  );

  const auth = JSON.parse(
    localStorage.getItem(
      "firebase:authUser:AIzaSyBT-xNWHwxElgmjm4HPKvKaLlPFhBr3iak:[DEFAULT]"
    )
  );
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        await getEnrolledCourses(user?.uid || auth?.uid);
        console.log(enrolledCourses);
        setIsFetchDone(true);
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    };
    fetchEnrolledCourses();
  }, []);
  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        if (!selectedCourse) {
          await getLeaderBoard(enrolledCourses?.courses[0]?._id);
          const res = await axiosInstance.get(
            `teacher/feedback/course/${enrolledCourses?.courses[0]?._id
            }?userId=${user?.uid || auth?.uid}`
          );
          setFeedbacks(res.data);
        } else {
          await getLeaderBoard(selectedCourse);
          const res = await axiosInstance.get(
            `teacher/feedback/course/${selectedCourse}?userId=${user?.uid || auth?.uid
            }`
          );
          setFeedbacks(res.data);
        }
      } catch (error) {
        console.error(error);
        // Handle the error as needed
      }
    };
    if (enrolledCourses?.courses?.length > 0) {
      fetchLeaderBoard();
    }
  }, [isFetchDone, selectedCourse]);

  if (isLoading || enrolledCourseLoading) {
    return <Loading />;
  }

  return (
    <section className="p-4 lg:p-12">
      <p className="text-xl text-center font-semibold link my-4">LeaderBoard</p>

      <div className="flex justify-end mx-3">
        <select
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
          }}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" disabled>
            Select a course
          </option>
          {enrolledCourses?.courses?.map((course, index) => (
            <option value={course?._id} key={index}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard?.map((person, index) => (
              <tr
                key={index}
                className={`${person?.user?._id === user?.uid && "bg-sky-400"}`}
              >
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
        
                        <img
                          src={person.user?.image ? `${cloud_front_url}/${person.user.image}` : "https://cdn-icons-png.flaticon.com/512/266/266033.png"}
                          alt={person?.user?.name}
                        />


                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{person?.user?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="font-mulish ">{person?.totalPoints}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center my-6 text-xl font-semibold">FeedBacks</p>
      <section className="flex flex-wrap gap-5">
        {feedBacks && feedBacks.length > 0 ? (
          feedBacks.map((feedback, i) => (
            <div
              key={i}
              className="border border-gray-500 rounded-xl h-56 w-72 max-h-96 max-w-96 px-8 py-4 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-14 mask mask-squircle">
                    <img
                      src={`${cloud_front_url}/${feedback?.from?.image ||
                        "images/1691843036253-avatar.png"
                        }`}
                    />
                  </div>
                </div>
                <p>
                  {" "}
                  &#32;
                  {feedback?.from?.name}
                </p>
              </div>
              <p className="text-lg font-mulish ">
                <span className="text-violet-700">FeedBack</span> &#x3A;
                {feedback?.feedBack}
              </p>
            </div>
          ))
        ) : (
          <p>No feedback available</p>
        )}
      </section>
    </section>
  );
};

export default LeaderBoard;
