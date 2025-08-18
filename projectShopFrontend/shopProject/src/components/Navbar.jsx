import React, { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-pink-500  via-purple-500 to-blue-500 shadow-lg">
      <div className="mx-5  px-4 sm:px-6 ">
        <div className="flex justify-between items-center h-16 ">
          <div className="text-white font-bold text-2xl tracking-wide">
            MyShop
          </div>

          <div className="hidden md:flex space-x-6 text-white font-medium ">
            <a href="/home" className="hover:text-yellow-300 transition">
              Home
            </a>
            <a href="/home" className="hover:text-yellow-300 transition">
              Shop
            </a>
            <a href="/product" className="hover:text-yellow-300 transition">
              Products
            </a>
            <a
              href="/login"
              className="hover:text-yellow-300 transition flex items-center gap-2"
            >
              <FaUser /> User
            </a>
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
          <a href="#" className="block px-4 py-2 hover:bg-pink-400">
            Home
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-pink-400">
            Shop
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-pink-400">
            Products
          </a>
          <a
            href="#"
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
