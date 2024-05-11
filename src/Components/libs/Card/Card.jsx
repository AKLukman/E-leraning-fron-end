import React from "react";
import { cloud_front_url } from "../../api/data";
import milestones from "../../../assets/milestones.png";
import modules from "../../../assets/modules.png";
import classImage from "../../../assets/class.png";
import quiz from "../../../assets/quiz.png";
const Card = ({ item, index, button }) => {
  return (
    <>
      <div
        className={`card w-96 bg-base-100 shadow-xl hover:shadow-slate-900 hover:cursor-pointer animation mt-5`}
      >
        <figure className="h-48">
          <img
            className=""
            src={`${cloud_front_url}/${item?.thumbnail}`}
            alt={item?.titile}
          />
        </figure>
        <div className="card-body">
          <div className="flex gap-3">
            {item?.instructors?.map((instructor, index) => (
              <div
                className="avatar tooltip"
                data-tip={instructor?.name}
                key={index}
              >
                <div className="w-10 rounded-full hover:ring hover:ring-accent hover:ring-offset-base-100 hover:ring-offset-2 hover:cursor-pointer animation">
                  <img src={`${cloud_front_url}/${instructor?.image}`} />
                </div>
              </div>
            ))}
          </div>
          <h2 className="card-title">{item.title}</h2>
          <p className="badge badge-secondary">{item?.category}</p>
          <div className=" flex justify-between">
            {/* Display Total Milestones */}
            <div className="tooltip hover:cursor-pointer" data-tip="MileStones">
              <div className="flex items-center  rounded bg-gray-200 p-1 gap-2">
                <img className="w-10 " src={milestones} />
                <p className="font-semibold">{item?.milestones?.length}</p>
              </div>
            </div>

            {/* Display Total Modules */}
            <div className="tooltip hover:cursor-pointer" data-tip="Modules">
              <div className="flex items-center  rounded bg-gray-200 p-1 gap-2">
                <img className="w-10 " src={modules} />
                <p className="font-semibold">
                  {item?.milestones?.reduce(
                    (acc, milestone) => acc + milestone?.modules?.length,
                    0
                  )}
                </p>
              </div>
            </div>

            {/* Display Total Classes */}
            <div className="tooltip hover:cursor-pointer" data-tip="Classes">
              <div className="flex items-center  rounded bg-gray-200 p-1 gap-2">
                <img className="w-10 " src={classImage} />
                <p className="font-semibold">
                  {item?.milestones?.reduce(
                    (acc, milestone) =>
                      acc +
                      milestone?.modules?.reduce(
                        (accModule, module) =>
                          accModule + module?.classes?.length,
                        0
                      ),
                    0
                  )}
                </p>
              </div>
            </div>
            {/* total quiz */}
            <div className="tooltip hover:cursor-pointer" data-tip="Quizes">
              <div className="flex items-center  rounded bg-gray-200 p-1 gap-2">
                <img className="w-10 " src={quiz} />
                <p className="font-semibold">
                  {item?.milestones?.reduce(
                    (acc, milestone) =>
                      acc +
                      milestone?.modules?.reduce(
                        (accModule, module) => accModule + module?.quiz?.length,
                        0
                      ),
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
          {button}
        </div>
      </div>
    </>
  );
};

export default Card;
