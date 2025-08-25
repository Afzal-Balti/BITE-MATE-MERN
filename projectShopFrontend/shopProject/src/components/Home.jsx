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
import HeartIcons from "../assets/Images/heartIcon.png";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState(null);
  const [like, setLike] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [toogle, setToogle] = useState({});
  const navigate = useNavigate();
  const { username } = useContext(UserData);
  const { id } = useParams();
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

  const handleLike = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/${productId}/like`,
        {
          username,
        }
      );

      console.log("THE LIKE SHOW ---------", response.data);
      setLike(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleDislike = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/${productId}/dislike`
      );
      setToogle((prev) => ({ ...prev, [id]: false }));

      console.log("THE LIKE SHOW ---------", response.data);
      setLike(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // console.log("ITEM IS ----- ", item);

  console.log("the like data is shows -- ", like);

  console.log("the like product is shows -- ", products);

  return (
    <div className="w-full   m-0 p-0 ">
      <div className="w-full h-1/2">
        <img src={BackgroundImg} className="object-contain w-full h-full"></img>
      </div>
      <div className="w-full  bg-slate-300 overflow-hidden  mt-5">
        <div className="flex animate-marquee whitespace-nowrap  text-2xl font-bold">
          <h1 className="py-2 px-10 text-yellow-400">
            WELCOME TO BITE-MATE-FOOD-STORE
          </h1>
          <h1 className="py-7 px-10 text-black">SALE & PURCHASE</h1>
          <h1 className="py-4 px-10 text-yellow-400">LET'S GO </h1>
          <h1 className="py-6 px-10 text-black">TESTY AND YUMMMY </h1>
          <h1 className="py-3 px-10 text-yellow-400">KEEP SIMILE</h1>
          <h1 className="py-6 px-10 text-black">ALL INGREDIENTS AVAIBALE</h1>
          <h1 className="py-4 px-10 text-yellow-400">OUR TRUST IS CUSTOMER</h1>
          <h1 className="py-6 px-10 text-black">WELCOME TO OUR BRAND</h1>
          <h1 className="py-4 px-10 text-yellow-500">
            MUST TRY THE BITEMATE WEBSITE
          </h1>
        </div>
      </div>

      <div className="w-full h-full justify-items-center grid grid-cols-1 md:grid-cols-1 gap-6 p-6 mt-5">
        {products && products.length > 0 ? (
          products.map((item, index) => {
            const productId = item._id;
            console.log("PRODUCT ID IS ----- ", productId);
            const isLiked = toogle[item._id] || false;
            console.log("IS LIKE --------- ", isLiked);

            return (
              <div
                key={index}
                className="bg-gray-100 md:w-1/2 w-full h-full rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
              >
                <div className="w-full h-full">
                  <div className="w-full h-[37.5rem] object-contain overflow-hidden">
                    <div className="w-full h-20 bg-white p-4 flex flex-row gap-3">
                      <img src={ProfilePic} className="w-10 h-10" />
                      <p
                        className="mt-3 text-black"
                        onClick={() => navigate(`/profile/${username}`)}
                      >
                        {username}
                      </p>
                    </div>
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                      alt={item.name}
                      className="w-full h-[30.5rem] items-center object-contain p-2"
                    />
                  </div>

                  <div className="w-full h-40 bg-white text-black p-2 px-3 flex flex-row justify-between">
                    <div className="w-full h-full">
                      <h2 className="text-sm font-semibold">{item.name}</h2>
                      <h3 className="text-sm font-medium">{item.category}</h3>

                      <div className="flex flex-row gap-5 mb-4">
                        {isLiked ? (
                          <img
                            src={HeartIcons}
                            className="w-7 h-7 cursor-pointer"
                            onClick={() => {
                              setToogle({ ...toogle, [item._id]: false });
                              handleDislike(item._id);
                            }}
                          />
                        ) : (
                          <Heart
                            className="w-7 h-7 text-black cursor-pointer"
                            onClick={() => {
                              setToogle({ ...toogle, [item._id]: true });
                              handleLike(item._id);
                            }}
                          />
                        )}

                        <MessageCircle />
                        <Share2 />
                      </div>

                      <div className="w-ful h-5">
                        <p className="text-black">Like {isLiked ? 1 : 0}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-black-600 font-bold">
                        {`$:${item.newPrice}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="text-3xl text-red-400">NO DATA FOUND</h2>
        )}

        <div className="text-center">
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
