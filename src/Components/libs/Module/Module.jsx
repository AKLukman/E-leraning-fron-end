import React from "react";
import { Link } from "react-router-dom";

const Module = ({ module, selectedClass, onClick, courseId }) => {
  const isModuleSelected = module.classes.includes(selectedClass);

  return (
    <>
      <div className="collapse collapse-arrow border border-base-300 bg-base-200">
        <input type="checkbox" />
        <div className="capitalize collapse-title text-xl font-medium">
          {module?.title}
        </div>
        <div className="collapse-content flex flex-wrap justify-center gap-3">
          {module?.classes?.map((classI, index) => (
            <button
              key={index}
              onClick={() => onClick(classI?.videoUrl)}
              className={`btn ${
                selectedClass === classI?.videoUrl
                  ? "btn-accent"
                  : "btn-neutral"
              }`}
            >
              {classI?.title}
            </button>
          ))}
        </div>
        <div className="flex  justify-center items-center my-2">
          <Link
            to="/quiz"
            state={{ quiz: module, courseId: courseId }}
            className="w-32  btn  btn-secondary"
          >
            Quiz
          </Link>
        </div>
      </div>
    </>
  );
};

export default Module;
