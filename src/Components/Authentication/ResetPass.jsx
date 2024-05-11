import React, { useContext } from "react";
import AuthContext from "../Firebase/AuthContext";
import { useForm } from "react-hook-form";

const ResetPass = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { resetPassword } = useContext(AuthContext);
  const onSubmit = async (data) => {
    await resetPassword(data?.email);
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="  div-center  ">
        <div className=" w-72 md:w-96  h-auto min-h-[360px]  flex flex-col justify-center items-center rounded-xl gap-5 bg-base-100 neon-gray  hover:rounded-lg  hover:cursor-pointer animation ">
          <p className="text-4xl  font-bold mb-6">Reset Password</p>
          <input
            {...register("email", {
              required: { value: true, message: "Email is Required" },
            })}
            placeholder="Email"
            type="email"
            className="input-box animation-shadow"
          />
          {errors.email && (
            <span className="text-red-600">{errors?.email?.message}</span>
          )}
          <button
            type="submit"
            className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-xl shadow-md group"
          >
            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Sign In
            </span>
            <span className="relative invisible">Send</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPass;
