import React, { useContext, useEffect, useState } from "react";
import profilePic from "../assets/Images/profile.png";
import { UserData } from "./UserContext";
import axios from "axios";

function Profile() {
  const { username } = useContext(UserData);
  const [post, setPost] = useState(null);

  console.log("THE POST DATA IS ", post);

  useEffect(() => {
    const profilePost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/products`
        );

        console.log("THE PRODUCT SHOW ---------", response.data);
        setPost(response.data.products);
      } catch (err) {
        console.log(err.message);
      }
    };
    profilePost();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl mt-20 bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-10">
          <div className="w-32 h-32 rounded-full overflow-hidden  border-gray-200">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 mt-5 md:mt-0">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <h1 className="text-2xl font-semibold">{username}</h1>
              <div className="flex gap-3 mt-2 md:mt-0">
                <button className="px-4 py-1 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200">
                  Following
                </button>
                <button className="px-4 py-1 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200">
                  Message
                </button>
                <button className="px-4 py-1 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200">
                  More
                </button>
              </div>
            </div>

            <div className="flex gap-8 mt-4 text-sm">
              <span>
                <span className="font-bold">261</span> posts
              </span>
              <span>
                <span className="font-bold">428</span> followers
              </span>
              <span>
                <span className="font-bold">1,127</span> following
              </span>
            </div>

            <div className="mt-4 text-sm leading-relaxed">
              <p className="font-medium">@Shahid#008</p>
              <p>Photography | Videography</p>
              <p>Nature is the art of Allah 🌄</p>
            </div>
          </div>
        </div>
      </div>

      <div className="no-scrollbar w-full max-w-3xl object-fill flex gap-6 mt-6 overflow-x-auto">
        {post?.map((item) => (
          <div key={item._id} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full object-cover bg-gray-200 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
              <img
                src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                alt={item.name}
                className="w-full object-cover "
              />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl grid grid-cols-3 gap-2 mt-6">
        {post?.map((item) => {
          return (
            <div className="w-full">
              <div className="w-full bg-gray-100 h-full object-cover">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                  alt={item.name}
                  className="w-full object-cover "
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
