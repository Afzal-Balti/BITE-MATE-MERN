import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserData } from "../utils/UserContext";

const Logout = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { setUsername } = useContext(UserData);
  const api = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const logoutApi = async () => {
      try {
        const data = await axios.post(
          `${api}/logout`,
          {},
          { withCredentials: true }
        );

        setTimeout(() => {
          navigate("/");
        });

        console.log(data);
        setUsername("");

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
