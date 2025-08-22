import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import PaginationPage from "./pagination";
// import { loadStripe } from "@stripe/stripe-js";

function AddCart() {
  const { id } = useParams();
  console.log("ROUTES URL ID IS ----------", id);
  const [carts, setCarts] = useState(null);
  console.log("THE CARTS DATA DEAILED ------ ", carts);

  useEffect(() => {
    const addCartsProduct = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/${id}`
      );
      setCarts(response.data.product);

      console.log(response);
    };

    addCartsProduct();
  }, [id]);

  const selectProductId = carts;
  console.log("THE PRODUCT ID IS ====== ", selectProductId);

  const handleClick = async (selectProductId) => {
    console.log("Hello ", selectProductId);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payment`,
        {
          name: selectProductId.name,
          email: selectProductId.email,
          newPrice: selectProductId.newPrice,
          category: selectProductId.category,
          image: selectProductId.image,
        }
      );
      window.location.href = response.data.url;
      console.log("THE ADD TO CART PRODUCT DATA ++++++", response.data);
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div className="w-full flex md:flex-row flex-col md:gap-20 gap-5 md:p-8 p-4 bg-slate-50 ">
      <div className="md:w-1/2 w-full h-full py-20 text-center ">
        <div className="w-full h-full">
          {selectProductId ? (
            <div
              key={selectProductId._id}
              className="bg-gray-50 w-full h-full rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
            >
              <h2 className="text-2xl py-5 text-orange-700 font-bold">
                PRODUCT ITEM
              </h2>
              <div className="w-full h-full ">
                {selectProductId.sale && (
                  <span className=" top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    Sale!
                  </span>
                )}
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${
                    selectProductId.image
                  }`}
                  alt={selectProductId.name}
                  className="w-full h-72 object-contain p-2 mt-10"
                />

                <div className="w-full h-full p-3">
                  <h3 className="text-sm font-medium">
                    {selectProductId.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectProductId.category}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    {selectProductId.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        Rs.{selectProductId.oldPrice}
                      </span>
                    )}
                    <span className="text-pink-600 font-bold">
                      Rs.{selectProductId.newPrice || selectProductId.price}
                    </span>
                  </div>

                  {selectProductId?.colors?.length > 0 ? (
                    <div className="flex gap-2 mt-3">
                      {selectProductId.colors.map((color, index) => (
                        <span
                          key={index}
                          className="w-5 h-5 rounded-full border"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 mt-2">No color</p>
                  )}

                  <div className="md:w-full w-full md:h-full h-20 overflow-hidden text-sm text-gray-600">
                    {selectProductId.description}
                  </div>

                  <div className="flex text-yellow-400 mt-3 text-xs">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>SomeThing Went Wrong</p>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3 w-full h-full md:py-20 py-0 text-center ">
        <div className="w-full rounded-2xl md:p-6  p-0 text-center">
          {selectProductId ? (
            <div
              key={selectProductId._id}
              className="w-full h-full p-10 rounded-lg shadow hover:shadow-sm transition duration-300 overflow-hidden cursor-pointer"
            >
              <h2 className="text-2xl text-orange-700 font-bold">
                BUY THE PRODUCT
              </h2>
              <div className="w-full h-full p-5 ">
                <div className="w-full h-full p-3 justify-items-center gap-4 ">
                  <h3 className="text-3xl font-bold ">
                    {selectProductId.name}
                  </h3>
                  <p className="md:w-2/3 w-full text-center text-gray-400 py-6">
                    {selectProductId.description}
                  </p>
                  <p className="text-2xl text-gray-500 py-6">
                    {selectProductId.category}
                  </p>

                  <div className=" w-full gap-2 mt-2 py-3 ">
                    <span className="text-pink-600  font-bold text-4xl">
                      Rs.{selectProductId.newPrice || selectProductId.price}
                    </span>
                  </div>

                  {selectProductId?.colors?.length > 0 ? (
                    <div className="flex gap-2 mt-3 py-5">
                      {selectProductId.colors.map((color, index) => (
                        <span
                          key={index}
                          className="w-5 h-5 rounded-full border"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 mt-2">No color</p>
                  )}

                  <div className="flex text-yellow-400 mt-3 text-2xl">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  <div className="w-full py-10">
                    <button
                      className="w-full hover:bg-red-400 rounded-md text-white font-bold h-10 bg-red-500"
                      onClick={() => handleClick(selectProductId)}
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>SomeThing Went Wrong</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCart;
