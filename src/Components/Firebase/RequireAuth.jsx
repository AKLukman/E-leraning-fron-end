import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../libs/Loading/Loading";
import AuthContext from "./AuthContext";

const RequireAuth = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  console.log("🚀 ~ file: RequireAuth.jsx:8 ~ RequireAuth ~ loading:", loading);
  const email = localStorage.getItem("email");

  if (!loading && !email && !user?.email) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default RequireAuth;
