import React, { useContext, useEffect, useState } from "react";
import BackgroundImg01 from "../../assets/Images/FoodImage2.jpg";
import BackgroundImg02 from "../../assets/Images/FoodImage1.jpg";
import BackgroundImg03 from "../../assets/Images/FoodImage3.jpg";
import { Share2 } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Heart } from "lucide-react";
import ProfilePic from "../../assets/Images/profile.png";
import { UserData } from "../utils/UserContext";
import PaginationPage from "./pagination";
import HeartIcons from "../../assets/Images/heartIcon.png";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import axios from "axios";
import CommentModal from "./CommentModal";
import ShareModal from "./ShareModal";

function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const navigate = useNavigate();
  const { username } = useContext(UserData);

  const api = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const listedProduct = async () => {
      try {
        const response = await axios.get(
          `${api}/products?page=${page}&limit=${limit}`
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.log(err.message);
      }
    };
    listedProduct();
  }, [api, page]);

  const handleLike = async (productId) => {
    try {
      const response = await axios.post(`${api}/products/${productId}/like`, {
        username,
      });

      setProducts((prev) =>
        prev.map((item) =>
          item._id === productId
            ? { ...item, likes: response.data.likeBy }
            : item
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDislike = async (productId) => {
    try {
      const response = await axios.post(
        `${api}/products/${productId}/dislike`,
        {
          username,
        }
      );

      setProducts((prev) =>
        prev.map((item) =>
          item._id === productId
            ? { ...item, likes: response.data.likeBy }
            : item
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className=" w-full ">
      <div className=" relative w-full   ">
        <Carousel autoplay className="w-full ">
          <div>
            <img src={BackgroundImg01} className=" w-full  "></img>
          </div>
          <div>
            <img src={BackgroundImg02} className=" w-full relative"></img>
          </div>
          <div>
            <img src={BackgroundImg03} className="w-full  "></img>
          </div>
          <div>
            <img src={BackgroundImg02} className="w-full   "></img>
          </div>
        </Carousel>
      </div>
      <div className="w-full  bg-slate-300 overflow-hidden mt-5  z-10 ">
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
      <div className="w-full h-full  justify-items-center grid grid-cols-1 md:grid-cols-1 gap-6 p-6 mt-5">
        {products && products.length > 0 ? (
          products.map((item, index) => {
            const isLiked = item.likes.includes(username);
            const isFullName = item.createdBy.fullname;
            console.log(isFullName);

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
                        onClick={() =>
                          navigate(`/profile/${item.createdBy.fullname}`)
                        }
                      >
                        {item.createdBy.fullname}
                      </p>
                    </div>
                    <img
                      src={`${api}${item.image}`}
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
                            onClick={() => handleDislike(item._id)}
                          />
                        ) : (
                          <Heart
                            className="w-7 h-7 text-black cursor-pointer"
                            onClick={() => handleLike(item._id)}
                          />
                        )}

                        <CommentModal />

                        {/* <MessageCircle  onClick={()=> } /> */}

                        <ShareModal />
                      </div>

                      <div className="w-ful h-5">
                        <p className="text-black">
                          Like {`${item.likes.length}`}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="text-black-600 font-bold">
                        {`RS:${item.newPrice}`}
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
