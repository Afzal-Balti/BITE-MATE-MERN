import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaginationPage from "./pagination";

function Shop() {
  const [product, setProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  console.log("PRODUCT OF SHOP IS ------ ", product);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products?page=${page}&limit=${limit}`
      );
      setProduct(response.data.products);
      setTotalPages(response.data.totalPages);
    };

    fetchData();
  }, [page]);

  const handleClick = (id) => {
    console.log("THE PRODUCT ID IS ---", id);

    navigate(`/allcarts/${id}`);
  };

  return (
    <div className="w-full px-4 py-10 justify-items-center  ">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-600 mt-10">
        Our Shop
      </h1>

      <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {product && product.length > 0 ? (
          product?.map((item) => (
            <div
              key={item._id}
              onClick={() => handleClick(item._id)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
            >
              <div className="w-full ">
                {item.sale && (
                  <span className=" top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    Sale!
                  </span>
                )}
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
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
                <div className="w-full overflow-hidden text-sm text-gray-600">
                  {item.description}
                </div>

                <div className="flex text-yellow-400 mt-3 text-xs">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full  text-center">
            <p className=" text-center text-3xl text-red-400">NO DATA FOUND</p>
          </div>
        )}
      </div>
      <div className="mt-10 ">
        <PaginationPage page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

export default Shop;
