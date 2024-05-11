import React from "react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="h-screen">
      <h1 className="text-4xl text-center border-b-4 mb-2">About Us</h1>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.pexels.com/photos/4144223/pexels-photo-4144223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-[800px] rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">What We Offer!</h1>
            <p className="py-6">
              <span className="font-bold">Diverse Course Catalog: </span>Our
              platform offers a wide range of courses spanning various subjects
              and skill levels. From academic subjects to practical skills,
              there's something for everyone.
            </p>
            <p className="py-6">
              <span className="font-bold">Flexible Learning: </span>We
              understand that life is busy. That's why we offer flexible
              learning options, allowing you to learn at your own pace and on
              your schedule..
            </p>
            <button className="btn btn-primary"><Link to='/courses'>Explore Courses</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
