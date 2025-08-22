import { message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DummyPic from "../assets/Images/export.png";

function Product() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [colors, setColors] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const watchImage = watch("image");
  const watchColor = watch("color");

  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const file = watchImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [watchImage]);

  const handleAddColor = () => {
    if (watchColor && !colors.includes(watchColor)) {
      setColors((prev) => [...prev, watchColor]);
    }
  };

  const handleRemoveColor = (color) => {
    setColors((prev) => prev.filter((c) => c !== color));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      formData.append("category", data.category);
      formData.append("oldPrice", data.oldPrice);
      formData.append("newPrice", data.newPrice);
      formData.append("colors", JSON.stringify(colors));
      if (data.image && data.image[0]) formData.append("image", data.image[0]);
      formData.append("sale", data.sale || false);
      formData.append("ratings", data.ratings || 0);
      formData.append("description", data.description);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Product Created:", response.data);
      messageApi.success("Product created successfully ✅");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
      reset();
      setColors([]);
      setImagePreview(null);
    } catch (err) {
      console.error("API Error:", err);
      messageApi.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {contextHolder}
      <h1 className="text-3xl font-bold text-center mt-10 text-pink-600">
        Create Product
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Product name is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
            placeholder="Enter product name"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option value="">Select category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Children">Children</option>
            <option value="Accessories">Accessories</option>
            <option value="Assests">Assests</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Old Price</label>
            <input
              type="number"
              {...register("oldPrice", { required: "Old price is required" })}
              placeholder="Enter old price"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            {errors.oldPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.oldPrice.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">New Price</label>
            <input
              type="number"
              {...register("newPrice", { required: "New price is required" })}
              placeholder="Enter new price"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            {errors.newPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPrice.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Colors</label>
          <div className="flex gap-2">
            <input
              type="color"
              {...register("color")}
              className="w-12 h-10 border rounded"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="bg-pink-500 text-white px-3 rounded hover:bg-pink-600"
            >
              Add Color
            </button>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full border relative"
                style={{ backgroundColor: color }}
              >
                <button
                  type="button"
                  onClick={() => handleRemoveColor(color)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className=" font-semibold mb-1">Product Image</label>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" />
          ) : (
            <img
              className="cursor-pointer text-center text-gray-400  rounded-md w-80 h-80 "
              src={DummyPic}
            ></img>
          )}
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <textarea
          type="text"
          {...register("description", {
            required: "description is required",
            minLength: {
              value: 2,
              message: "Must be at least 30 characters",
            },
          })}
          placeholder="Write a description about product "
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("sale")} />
          <label>On Sale</label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded font-bold hover:opacity-90"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default Product;
