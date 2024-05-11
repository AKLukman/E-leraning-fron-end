import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Courses from "./Components/Pages/Courses";
import Blogs from "./Components/Pages/Blogs";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import About from "./Components/Pages/About";
import SignIn from "./Components/Authentication/SignIn";
import SignUp from "./Components/Authentication/SignUp";

import ResetPass from "./Components/Authentication/ResetPass";
import MyCourse from "./Components/Pages/MyCourse";
import CourseDetails from "./Components/libs/Card/CourseDetails";
import Milestone from "./Components/libs/Card/Milestone";
import LeaderBoard from "./Components/Account/LeaderBoard";
import Profile from "./Components/Account/Profile";
import Quiz from "./Components/libs/Module/Quiz/Quiz";
import BlogDetails from "./Components/Pages/BlogDetails";
import RequireAuth from "./Components/Firebase/RequireAuth";
import { AuthProvider } from "./Components/Firebase/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<ResetPass />} />
          <Route
            path="/my-course"
            element={
              <RequireAuth>
                <MyCourse />
              </RequireAuth>
            }
          />
          <Route
            path="/course/:courseId/milestone/:milestoneId"
            element={
              <RequireAuth>
                <Milestone />
              </RequireAuth>
            }
          />
          <Route
            path="/blogs-details/course/:courseId/blog/:blogId"
            element={<BlogDetails />}
          />
          <Route
            path="/quiz"
            element={
              <RequireAuth>
                <Quiz />
              </RequireAuth>
            }
          />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route
            path="/my-profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
