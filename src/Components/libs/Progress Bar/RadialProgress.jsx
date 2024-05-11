import React from "react";
import { motion } from "framer-motion";
const RadialProgress = ({ percentage }) => {
  const circumference = 1 * Math.PI * 90;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  const getColor = () => {
    if (percentage >= 75) return "#1DCDBC";
    if (percentage >= 50) return "#FBBD37";
    if (percentage >= 25) return "#1B0DF8";
    return "#F87272";
  };
  const progressBarColor = getColor();
  return (
    <div className="w-32 h-32 relative transform -rotate-90">
      <svg className="absolute top-0 left-0" width="100%" height="100%">
        <circle
          cx="50%"
          cy="50%"
          r="45"
          fill="transparent"
          stroke="lightgray"
          strokeWidth="10"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="45"
          fill="transparent"
          strokeWidth="10"
          stroke={progressBarColor}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{ duration: 0.7, ease: "linear", delay: 0.2 }}
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transform rotate-90">
        <div className="text-lg font-mulish font-bold">
          {percentage.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default RadialProgress;
