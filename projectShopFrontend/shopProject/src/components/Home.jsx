import React, { useContext, useEffect, useState } from "react";
import BackgroundImg from "../assets/Images/FoodImage2.jpg";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { Share2 } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Heart } from "lucide-react";
import ProfilePic from "../assets/Images/profile.png";
import { UserData } from "./UserContext";
import PaginationPage from "./pagination";

function Home() {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const { username } = useContext(UserData);

  console.log("name is :::::", username);

  console.log("PAGE IS -----------", page);
  useEffect(() => {
    const listedProduct = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/products?page=${page}&limit=${limit}`
        );

        console.log("THE PRODUCT SHOW ---------", response.data);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.log(err.message);
      }
    };
    listedProduct();
  }, [page]);

  console.log("the product data is shows -- ", products);

  return (
    <div className="w-full  m-0 p-0 ">
      <div className="w-full h-1/2">
        <img src={BackgroundImg} className="object-contain w-full h-full"></img>
      </div>
      <div className="w-full relative overflow-hidden bg-gray-500 mt-5">
        <div className="flex animate-marquee whitespace-nowrap  text-2xl font-bold">
          <h1 className="py-10 px-10 text-yellow-400">OUR SHOP PRODUCTS</h1>
          <h1 className="py-10 px-10 text-white">SALE & PURCHASE</h1>
          <h1 className="py-10 px-10 text-yellow-400">LET'S GO </h1>
          <h1 className="py-10 px-10 text-white">ENJOY YOUR LIFE</h1>
          <h1 className="py-10 px-10 text-yellow-400">KEEP SIMILE</h1>
          <h1 className="py-10 px-10 text-white"></h1>
          <h1 className="py-10 px-10 text-yellow-400">OUR TRUST IS CUSTOMER</h1>
          <h1 className="py-10 px-10 text-white">WELCOME TO OUR BRAND</h1>
        </div>
      </div>

      <div className="w-full h-full  justify-items-center  grid grid-cols-1 md:grid-cols-1  gap-6  p-6  mt-5">
        {products?.map((item, index) => (
          <div
            key={index}
            className=" bg-gray-100  w-1/2 h-full   rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
          >
            <div className="w-full h-full ">
              <div className="w-full h-[37.5rem] object-contain overflow-hidden  ">
                <div className="w-full h-20 bg-white p-4 flex flex-row gap-3">
                  <img src={ProfilePic} className="w-10 h-10 "></img>
                  <p className="mt-3 text-black">{username}</p>
                </div>
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                  alt={item.name}
                  className="w-full h-[30.5rem] items-center object-contain p-2"
                />
              </div>
              <div className="w-full h-24 bg-white text-black p-2 px-3 flex flex-row justify-between ">
                <div className="w-full">
                  <h2 className="text-sm font-semibold">{item.name}</h2>
                  <h3 className="text-sm font-medium">{item.category}</h3>
                  <div className="flex flex-row gap-5 mb-12 ">
                    <Heart className="text-red-400 " />
                    <MessageCircle />
                    <Share2 />
                  </div>
                </div>

                <div className="">
                  <span className="text-black-600 font-bold">
                    {`$:${item.newPrice}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div>
          <PaginationPage
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
