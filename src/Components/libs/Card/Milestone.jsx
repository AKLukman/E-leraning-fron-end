import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getCourseById } from "../../api/store";
import { cloud_front_url } from "../../api/data";
import VideoPlayer from "../Player/VideoPlayer";
import { useNavbar } from "../../Navbar/zustand";
import Module from "../Module/Module";
import { useContext } from "react";
import AuthContext from "../../Firebase/AuthContext";
import Loading from "../Loading/Loading";

import { Comment } from "react-loader-spinner";
import { axiosInstance } from "../../api/axiosInstance";
import toast from "react-hot-toast";

const Milestone = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [feedBack, setFeedBack] = useState(null);
  const [feedBackData, setFeedBackData] = useState(null);
  console.log(
    "🚀 ~ file: Milestone.jsx:21 ~ Milestone ~ feedBackData:",
    feedBackData
  );
  const location = useLocation();
  const milestoneData = location?.state?.milestone;
  const { isLoading, course, fetchData } = getCourseById();
  const { courseId, milestoneId } = useParams();
  const { isSidebarOpen } = useNavbar();
  useEffect(() => {
    if (!milestoneData && !course) {
      fetchData(courseId);
    }
    const fetchFeedBackData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `feedback/milestone/${milestoneId}?userId=${user?.uid}`
        );
        setFeedBackData(res.data);
        setFeedBack(res.data?.feedBack);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.uid) {
      fetchFeedBackData();
    }
  }, [course, milestoneData, user]);
  const filteredMilestones = course?.milestones?.filter(
    (milestone) => milestone._id === milestoneId
  );
  const milestone = milestoneData ?? filteredMilestones?.[0];

  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = (videoUrl) => {
    setSelectedClass(videoUrl);
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `${cloud_front_url}/${selectedClass}`,
        type: "video/mp4",
      },
    ],
  };
  if (isLoading) {
    return <Loading />;
  }
  const sendFeedBack = async () => {
    try {
      setLoading(true);
      const body = {
        user: user?.uid,
        course: courseId,
        milestone: milestoneId,
        feedBack: feedBack,
      };
      const request = await axiosInstance.post("/feedback", body);
      if (request.status === 201) {
        toast.success("Your FeedBack Added Successfully", {
          duration: 1500,
          position: "top-center",
        });
      }
      setFeedBackData(request);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center ">
        <span className="font-semibold lg:text-2xl text-lg my-4 ">
          MileStone :-
        </span>
        <p className="capitalize font-semibold lg:text-xl text-md mt-0.5">
          {milestone?.title}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-5 px-4">
        <div
          className={`w-full   ${
            isSidebarOpen && "-z-50"
          } flex flex-col  gap-5`}
        >
          <VideoPlayer options={videoJsOptions} selectedClass={selectedClass} />
          <>
            <p className="font-semibold text-xl ">Your FeedBack :-</p>
            {loading ? (
              <Comment
                visible={true}
                height="80"
                width="80"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#F4442E"
              />
            ) : (
              <textarea
                value={feedBack}
                onChange={(e) => setFeedBack(e.target.value)}
                className="min-h-16 rounded-lg  border border-violet-800 hover:neon-violet p-4"
              />
            )}
            <button
              disabled={feedBackData}
              onClick={sendFeedBack}
              className=" btn btn-primary w-[100px]"
            >
              Submit
            </button>
          </>
        </div>

        <div className="w-full lg:w-2/5">
          <div className="flex flex-col gap-3 cursor-pointer">
            {milestone?.modules?.map((item, index) => (
              <Module
                key={index}
                module={item}
                courseId={courseId}
                selectedClass={selectedClass}
                onClick={handleClassClick}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Milestone;
