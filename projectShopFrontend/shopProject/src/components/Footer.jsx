import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo / About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">MyShop</h2>
            <p className="text-sm">
              Your one-stop shop for amazing products. Bringing quality and
              style right to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-yellow-300">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-yellow-300">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-yellow-300">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-yellow-300">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
