import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import axios from "axios";
import { useParams } from "react-router-dom";

function Shopping() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const api = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${api}/products`);
      setProduct(response.data);
    };
    fetchData();
  }, [api, id]);

  return (
    <div className="w-full px-4 py-10 ">
      <h1 className="text-3xl font-bold text-center mt-10 text-pink-600">
        Our Shop
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
        {product?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
          >
            <div className=" ">
              {item.sale && (
                <span className=" top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                  Sale!
                </span>
              )}
              <img
                src={`${api}${item.image}`}
                alt={item.name}
                className="w-full h-48 object-contain p-2"
              />
            </div>

            <div className="p-3">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.category}</p>

              <div className="flex items-center gap-2 mt-2">
                {item.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    Rs.{item.oldPrice}
                  </span>
                )}
                <span className="text-pink-600 font-bold">
                  Rs.{item.newPrice || item.price}
                </span>
              </div>

              {item?.colors?.length > 0 ? (
                <div className="flex gap-2 mt-3">
                  {item.colors.map((color, index) => (
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

              <div className="flex text-yellow-400 mt-3 text-xs">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
