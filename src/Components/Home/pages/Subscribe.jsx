import React from "react";
import { newsletter } from "../../../assets";
newsletter;
const Subscribe = () => {
  return (
    <div
      style={{ backgroundImage: `url(${newsletter})` }}
      className="flex justify-center  items-center  lg:mx-16 mx-4 p-3 rounded-lg"
    >
      <div className="flex flex-col gap-2">
        <p className="lg:text-xl text-md lg:font-medium font-normal font-poppins italic">
          Newsletter
        </p>
        <p className="lg:font-semibold font-medium lg:text-3xl text-xl font-mulish">
          Subscribe Our Newsletter
        </p>
        <div className="relative w-64 h-10 ">
          <input
            className="w-64 h-10 p-3 rounded-lg outline-none focus:neon-violet animation"
            placeholder="Enter your email"
          />
          <button className="absolute top-0 bottom-0 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
