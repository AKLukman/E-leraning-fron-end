import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useNavbar } from "./zustand";
import { NavLink } from "react-router-dom";
import AuthContext from "../Firebase/AuthContext";
import { logo } from "../../assets";

const Navbar = () => {
  const { isSidebarOpen, handleSidebarToggle } = useNavbar();
  const { loading, user, setUser, logOut } = useContext(AuthContext);
  const activeStyle = { color: "F7418F" };
  return (
    <nav>
      {/* Large Screen Navbar */}
      <div className="hidden md:flex justify-between items-center py-4 px-7">
        <div>
          <img className="h-20 w-20 object-cover" src={logo} alt="image" />
        </div>
        <div className="flex gap-4">
          <NavLink
            to={"/"}
            className="nav-button "
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
          <NavLink to="/about" className="nav-button">
            About Us
          </NavLink>
          <NavLink to="/courses" className="nav-button">
            Courses
          </NavLink>
          <NavLink to="/blogs" className="nav-button">
            Blogs
          </NavLink>
          {user && !loading && (
            <NavLink to="/my-course" className="nav-button">
              My Course
            </NavLink>
          )}
        </div>
        {!user && !loading ? (
          <div className="flex gap-3">
            <NavLink to="/signup" className="btn btn-ghost">
              SignUp
            </NavLink>

            <NavLink
              to="/signin"
              className="btn btn-primary shadow-lg shadow-gray-700 hover:shadow-rose-700"
            >
              SignIn
            </NavLink>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost rounded-btn">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <NavLink to="/my-profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to={"/leaderboard"}>LeaderBoard</NavLink>
              </li>
              <li>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Tablet Mode Sidebar */}
      {/* <div className="md:hidden">
        <button
          className="flex items-center px-4 py-2 text-gray-500"
          onClick={handleSidebarToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isSidebarOpen ? "0" : "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 h-screen w-56 bg-white shadow-md p-4"
        >
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink to="/" className="nav-button">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-button">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses" className="nav-button">
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className="nav-button">
                Blogs
              </NavLink>
            </li>
            {user && !loading && (
              <li>
                <NavLink to="/my-course" className="nav-button">
                  My Course
                </NavLink>
              </li>
            )}
            {!user && !loading && (
              <li>
                <NavLink to="/signup" className="btn btn-ghost">
                  SignUp
                </NavLink>
              </li>
            )}
            {!user && !loading && (
              <li>
                <NavLink
                  to="/signin"
                  className="btn btn-primary shadow-lg shadow-gray-700 hover:shadow-rose-700"
                >
                  SignIn
                </NavLink>
              </li>
            )}
          </ul>
        </motion.div>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 z-50  h-screen w-screen "
            onClick={handleSidebarToggle}
          ></motion.div>
        )}
      </div> */}

      <div className="md:hidden">
        <button
          className="flex items-center px-4 py-2 text-gray-500"
          onClick={handleSidebarToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-screen w-56 bg-white shadow-md p-4"
              style={{
                opacity: 0.95,
                backgroundColor: "#ffffff",
                zIndex: 9999,
              }}
            >
              <button
                className="absolute top-4 right-4 text-gray-500"
                onClick={handleSidebarToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <ul className="flex flex-col gap-4">
                {/* Navigation links for mobile */}
                <li>
                  <NavLink to="/" className="nav-button">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="nav-button">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/courses" className="nav-button">
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blogs" className="nav-button">
                    Blogs
                  </NavLink>
                </li>
                {user && !loading && (
                  <li>
                    <NavLink to="/my-course" className="nav-button">
                      My Course
                    </NavLink>
                  </li>
                )}
                {!user && !loading && (
                  <li>
                    <NavLink to="/signup" className="btn btn-ghost">
                      SignUp
                    </NavLink>
                  </li>
                )}
                {!user && !loading && (
                  <li>
                    <NavLink
                      to="/signin"
                      className="btn btn-primary shadow-lg shadow-gray-700 hover:shadow-rose-700"
                    >
                      SignIn
                    </NavLink>
                  </li>
                )}
                {user && (
                  <>
                    <li>
                      <NavLink className="nav-button" to="/my-profile">
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-button" to={"/leaderboard"}>
                        LeaderBoard
                      </NavLink>
                    </li>
                  </>
                )}
                {user && (
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout
                  </button>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
