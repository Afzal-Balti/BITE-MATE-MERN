import React, { useContext } from "react";
import Navbar from "../Header/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Header/Footer";
import { UserData } from "./UserContext";

function LayOut() {
  const { username } = useContext(UserData);

  return (
    <div>
      <Navbar username={username} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LayOut;
