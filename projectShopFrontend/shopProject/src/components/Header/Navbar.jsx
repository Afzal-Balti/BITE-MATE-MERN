import React, { useContext, useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { UserData } from "../utils/UserContext";
import DropDown from "./DropDown";
import Logo from "../../assets/Images/BiteMate.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useContext(UserData);
 
  return (
    <nav className=" w-full  fixed  bg-white  shadow-lg">
      <div className="mx-5  px-4 sm:px-6  ">
        <div className="flex justify-between items-center h-16 ">
          <div className="text-white font-bold text-2xl tracking-wide cursor-pointer">
            <a href="/home" className=" transition">
              <img src={Logo} className="w-20 h-20 text-white"></img>
            </a>
          </div>

          <div className="hidden md:flex space-x-6 text-black font-bold  ">
            <a href="/home" className="hover:text-yellow-300 transition">
              Home
            </a>
            <a href="/shop" className="hover:text-yellow-300 transition">
              Shop
            </a>
            <a href="/product" className="hover:text-yellow-300 transition">
              Products
            </a>
            <a href="/contact" className="hover:text-yellow-300 transition">
              Contact Us
            </a>

            <DropDown username={username} />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
          <a href="/home" className="block px-4 py-2 hover:bg-pink-400">
            Home
          </a>
          <a href="/shop" className="block px-4 py-2 hover:bg-pink-400">
            Shop
          </a>
          <a href="/product" className="block px-4 py-2 hover:bg-pink-400">
            Products
          </a>
          <a
            href="/logout"
            className=" px-4 py-2 hover:bg-pink-400 flex items-center gap-2"
          >
            <FaUser /> User
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
