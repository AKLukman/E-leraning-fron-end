import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  base_image,
  object1,
  object2,
  object3,
  object4,
  object5,
  progress,
  success,
  teacher,
} from "../../../assets";
import Slider from "react-slick";
import { storeInstructors } from "../../api/store";
import { cloud_front_url } from "../../api/data";
const Hero = () => {
  const { isLoading, instructors, getInstructors } = storeInstructors();
  const [animationVariants, setAnimationVariants] = useState([]);
  const getRandomCoordinate = () => Math.floor(Math.random() * 90) - 40;
  useEffect(() => {
    if (instructors?.length === 0) {
      getInstructors();
    }
    const interval = setInterval(() => {
      setAnimationVariants([
        {
          start: { x: getRandomCoordinate(), y: getRandomCoordinate() },
          end: { x: getRandomCoordinate(), y: getRandomCoordinate() },
        },
        {
          start: { x: getRandomCoordinate(), y: getRandomCoordinate() },
          end: { x: getRandomCoordinate(), y: getRandomCoordinate() },
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const animationTransition = {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    repeatDelay: 1,
  };
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 px-6">
        <div className="flex flex-col justify-center ">
          <p className="text-xl font-poppins text-justify">
            TRAINING TO SUCCEED
          </p>
          <p className="text-3xl font-poppins text-justify">
            Believe and you can achieve{" "}
          </p>
          <p className="text-lg font-poppins text-justify">
            Learn any skill from comfort of your home Anywhere and Anytime{" "}
          </p>
          <Link
            to="/courses"
            className="w-32 btn btn-accent group hover:text-white"
          >
            Courses
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 group-hover:text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </Link>
        </div>
        <div className="relative  lg:h-[684.33px] group -z-50">
          <img
            className="group-hover:contrast-125 animation object-cover "
            src={base_image}
          />

          <div className="absolute top-1/3 left-0">
            <motion.img
              className="w-10 h-10 "
              src={object1}
              alt="Small Image 1"
              initial="start"
              animate="end"
              variants={animationVariants[0]}
              transition={animationTransition}
            />{" "}
          </div>
          <div className="absolute top-[18%] left-28">
            <motion.img
              className="w-10 h-10"
              src={object2}
              alt=""
              initial="start"
              animate="end"
              variants={animationVariants[1]}
              transition={animationTransition}
            />
          </div>
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <motion.img
              className="w-10 h-10"
              src={object3}
              alt=""
              initial="start"
              animate="end"
              variants={animationVariants[0]}
              transition={animationTransition}
            />
          </div>
          <div className="absolute top-[18%] right-28">
            <motion.img
              className="w-10 h-10"
              src={object4}
              alt=""
              initial="start"
              animate="end"
              variants={animationVariants[1]}
              transition={animationTransition}
            />
          </div>
          <div className="absolute top-1/3 right-0 ">
            <motion.img
              className="w-10 h-10"
              src={object5}
              alt=""
              initial="start"
              animate="end"
              variants={animationVariants[0]}
              transition={animationTransition}
            />
          </div>
        </div>
      </div>
      <br />
      {/*   part 2 */}
      <div className="flex lg:flex-row flex-col justify-center  items-center overflow-hidden gap-5 px-10">
        <div className="lg:w-[40%] w-full ">
          <Slider {...settings}>
            {instructors?.map((item, index) => (
              <div key={index}>
                <img
                  className="w-full h-60 lg:h-96 rounded-lg"
                  src={`${cloud_front_url}/${item?.image}`}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="lg:w-[60%] w-full">
          <p className="text-5xl font-bold font-inter">
            Get the Best Class by the Best Teachers
          </p>
          <p className="text-base font-normal font-inter text-emerald-700">
            Get your best class and gain the great thing from the best and well
            qualified experienced teachers all over the world and get shinny. We
            are a unique training provider willing to give you all the skills
            and experience you need to fulfil your future career
          </p>
        </div>
      </div>

      {/*  part 3 */}
      <br />
      <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-10  my-8">
        {/*  card 1 */}
        <div className="hero-card">
          <img className="w-[50px] lg:w-[80px]" src={teacher} />
          <p className="font-medium text-2xl font-poppins">
            Experienced Teacher
          </p>
          <p className="font-normal text-base font-open_sans">
            We teach in small groups with experienced, supportive staff who are
            trained to understand some of the problems our students face.{" "}
          </p>
        </div>
        <div className=" hero-card">
          <img className="w-[50px] lg:w-[80px]" src={progress} />
          <p className="font-medium text-2xl font-poppins">
            Progressive Learning
          </p>
          <p className="font-normal text-base font-open_sans">
            Our mission is to use our knowledge, skills, and networks to equip
            people with multiple disadvantages with the skills to gain and
            sustain employment
          </p>
        </div>
        <div className=" hero-card">
          <img className="w-[50px] lg:w-[80px]" src={success} />
          <p className="font-medium text-2xl font-poppins">
            Graduate and job ready
          </p>
          <p className="font-normal text-base font-open_sans">
            We are a unique training provider willing to give you all the skills
            and experience you need to fulfil your future career
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
