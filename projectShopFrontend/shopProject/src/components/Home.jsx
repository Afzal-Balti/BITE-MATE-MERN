import React, { useEffect, useState } from "react";
import BackgroundImg from "../assets/Images/manshopping.jpg";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const listedProduct = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    listedProduct();
  }, []);

  console.log("the product data is shows -- ", products);

  return (
    <div className="w-full h-full m-0 p-0 ">
      <div className="w-full">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6  p-6  mt-5">
        {products?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
          >
            <div className="">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain p-2"
              />
            </div>

            <div className="p-3">
              <h2 className="text-sm font-semibold">{item.title}</h2>
              <h3 className="text-sm font-medium">{item.category}</h3>
              <p className="w-full h-36 overflow-hidden  text-xs text-gray-500">
                {item.description}
              </p>

              <div className="flex gap-2 mt-3">
                {item.rating ? (
                  <p className="text-orange-500">
                    {`rate : ${item.rating.rate}`}{" "}
                    <p>{`count : ${item.rating.count}`}</p>
                  </p>
                ) : (
                  <p>No Rate</p>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-black-600 font-bold">
                  {`$:${item.price}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
