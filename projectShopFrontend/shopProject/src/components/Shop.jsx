import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import axios from "axios";
import { useParams } from "react-router-dom";

function Shop() {
  const { id } = useParams();

  const [product, setProduct] = useState("");

  console.log("id is --------------- ", id);

  useEffect(() => {
    let product = axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });

    console.log("the product is ------------", product);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">
        Our Shop
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
          <div className="relative">
            {product.sale && (
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                Sale!
              </span>
            )}
          </div>
          <div className="w-full  bg-gray-400 object-cover">
            <img
              src={product.image}
              className="w-full h-44 bg-slate-200 object-cover"
            ></img>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>

            <div className="flex items-center gap-2 mt-2">
              {product.oldPrice && (
                <span className="text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
              <span className="text-pink-600 font-bold">
                ${product.newPrice || product.price}
              </span>
            </div>

            {/* {product.colors.length > 0 && (
              <div className="flex gap-2 mt-3">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="w-5 h-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            )} */}

            <div className="flex text-yellow-400 mt-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
