import React, { useState } from "react";
import { useImageController } from "../api/zustand";
import { cloud_front_url } from "../../api/data";
import { MutatingDots } from "react-loader-spinner";

const InfoForm = ({
  registerInfo,
  handleSubmitInfo,

  errorsInfo,
  onSubmitInfo,
}) => {
  const [image, setImage] = useState(null);
  const {
    isLoading: imageLoading,
    progress,
    imageUrl,
    uploadImage,
    removeImage,
  } = useImageController();
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(e); // Call the uploadImage function to handle image upload
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmitInfo(onSubmitInfo)}
        className="flex flex-col justify-center items-center gap-4"
      >
        <div>
          <p>
            <span className="text-lg font-semibold">Name</span>
          </p>
          <input
            {...registerInfo("name", {
              maxLength: { value: 80, message: "Title Max Length 80" },
            })}
            type="text"
            className="input-box "
          />
        </div>
        {errorsInfo?.name?.message && (
          <p className="text-red-500">{errorsInfo?.name?.message}</p>
        )}

        <div>
          <p>
            <span className="text-lg font-semibold">Phone</span>
          </p>
          <input
            {...registerInfo("phone")}
            type="number"
            inputMode="numeric"
            className="input-box "
          />
        </div>
        {errorsInfo?.phone?.message && (
          <p className="text-red-500">{errorsInfo?.phone?.message}</p>
        )}
        <div className="flex items-center justify-center w-60">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {imageLoading ? (
              <div>
                {progress ? (
                  <div
                    className="radial-progress"
                    style={{ "--value": progress }}
                  >
                    {progress}%
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-60">
                    <MutatingDots
                      height="100"
                      width="100"
                      color="#4fa94d"
                      secondaryColor="#1abdd6"
                      radius="12.5"
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                )}
              </div>
            ) : imageUrl || image ? (
              <div className="w-60 relative ">
                <img
                  src={`${cloud_front_url}/${imageUrl || image}`}
                  className="w-56 h-56 p-4"
                  loading="lazy"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0"
                  onClick={() => {
                    removeImage(imageUrl || image), setImage("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG
                  </p>
                </div>
                <input
                  onChange={(e) => handleImageChange(e)}
                  id="dropzone-file"
                  type="file"
                  name="image"
                  className="hidden"
                />
              </div>
            )}
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default InfoForm;
