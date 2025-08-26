import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import axios from "axios";

function ProtectedRoute() {
  const api = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const authProtect = async () => {
      const response = await axios
        .get(`${api}/api/protected`, {
          withCredentials: true,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response?.data));

      console.log(response.data);
    };
    authProtect();
  });

  const isAuth = document.cookie.includes("token");

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
