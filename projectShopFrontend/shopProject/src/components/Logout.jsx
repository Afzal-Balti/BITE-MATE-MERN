import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  useEffect(() => {
    const logoutApi = async () => {
      try {
        const data = await axios.post(
          "http://localhost:3000/logout",
          {},
          { withCredentials: true }
        );

        setTimeout(() => {
          navigate("/");
        });

        console.log(data);

        messageApi.success("Logged Out Successfull");
      } catch {
        messageApi.warning("Not LoggedOut! Try Again");
      }
    };

    logoutApi();
  });

  return <div className="w-100 h-full bg-slate-400 ">{contextHolder}</div>;
};

export default Logout;
