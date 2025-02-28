import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children }) {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return children;
  }

  return <Navigate to="/login" replace />;
}
