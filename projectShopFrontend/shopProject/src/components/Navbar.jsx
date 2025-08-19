import React, { useContext, useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { UserData } from "./UserContext";
import DropDown from "./DropDown";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { username } = useContext(UserData);
  console.log("THE NAME IS =-----------", name);

  return (
    <nav className=" w-full bg-gradient-to-r from-pink-500 fixed via-purple-500 to-blue-500 shadow-lg">
      <div className="mx-5  px-4 sm:px-6  ">
        <div className="flex justify-between items-center h-16 ">
          <div className="text-white font-bold text-2xl tracking-wide cursor-pointer">
            <a href="/home" className=" transition">
              My Shop
            </a>
          </div>

          <div className="hidden md:flex space-x-6 text-white font-medium ">
            <a href="/home" className="hover:text-yellow-300 transition">
              Home
            </a>
            <a href="/shop" className="hover:text-yellow-300 transition">
              Shop
            </a>
            <a href="/product" className="hover:text-yellow-300 transition">
              Products
            </a>
            {/* <a
              href="#"
              className="  text-white-500 hover:text-black  transition flex items-center gap-2"
            >
              <FaUser className="hover:text-yellow-300" />
              {` Hi ${username} 👋 ` || "Guest"}
            </a> */}

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
