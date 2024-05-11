import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Firebase/AuthContext";
import { useNavbar } from "../Navbar/zustand";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const { isSidebarOpen } = useNavbar();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { name, email, password, confirm_password, phone } = data;
    if (confirm_password !== password) {
      return toast.error("Password is not same", {
        position: "top-center",
        duration: 2000,
      });
    } else {
      await createUser({
        name,
        email,
        phone,
        role: "student",
        password,
      })
        .then(() => {
          navigate("/signin");
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
      reset();
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="  div-center  -z-40">
      <div
        className={`${
          isSidebarOpen && "blur-sm -z-50"
        } w-72 md:w-96  h-auto min-h-[380px]  flex flex-col justify-center items-center rounded-xl gap-5 bg-base-100 neon-gray hover:neon-rose  hover:rounded-lg  hover:cursor-pointer animation  py-5`}
      >
        <p className="text-4xl  font-bold mb-6 link">Sign Up</p>
        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          type="name"
          className="input-box animation-shadow"
        />
        {errors.name && <span className="text-red-600">Name is required</span>}
        <input
          {...register("phone", {
            required: { value: true, message: "Number is Required" },
          })}
          placeholder="Phone Number"
          type="name"
          className="input-box animation-shadow"
        />
        {errors.number && (
          <span className="text-red-600">{errors?.number?.message}</span>
        )}
        <input
          {...register("email", {
            required: { value: true, message: "Email Required" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          placeholder="Email"
          type="email"
          className="input-box animation-shadow"
        />
        {errors.email && (
          <span className="text-red-600">{errors?.email?.message}</span>
        )}
        {/*  showPassword */}
        <div className="relative">
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Password is Required",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/,
                message:
                  "Password must contain at least one capital letter, atleast one small letter and one digit",
              },
            })}
            placeholder="Password"
            type={!showPassword ? "password" : "text"}
            className="input-box"
          />
          <button
            type="button"
            className="absolute top-1/2 right-0 -translate-y-1/2  flex items-center pr-3 z-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 dark:text-slate-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 dark:text-slate-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-600 font-semibold">
            {errors.password.message}
          </span>
        )}
        {/*   confirm password */}
        <div className="relative">
          <input
            {...register("confirm_password")}
            placeholder="Confirm Password"
            type={!showConfirmPassword ? "password" : "text"}
            className="input-box"
          />
          <button
            type="button"
            className="absolute top-1/2 right-0 -translate-y-1/2  flex items-center pr-3 z-10"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 dark:text-slate-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 dark:text-slate-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
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
            Sign Up
          </span>
          <span className="relative invisible">Sign Up</span>
        </button>
        <Link to="/signin" className="link hover:text-blue-500">
          Already Have An Account
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
