import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { UserData } from "./UserContext";
// import { AuthContext } from "./UserContext";

function LayOut() {
  // const [username, setUsername] = useState();
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
