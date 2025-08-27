import { Navigate, Outlet } from "react-router-dom";
import React from "react";

function ProtectedRoute() {
  // const api = import.meta.env.VITE_BASE_URL;

  const isAuth = document.cookie.includes("token");

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
