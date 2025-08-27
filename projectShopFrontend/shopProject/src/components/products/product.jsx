import { message } from "antd";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DummyPic from "../../assets/Images/export.png";
import InputsComp from "../common/InputsComp";
import ButtonComp from "../common/ButtonComp";
import { client } from "../../api-client";

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
  const [imagePreview, setImagePreview] = useState(null);

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const file = watchImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [watchImage]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      formData.append("category", data.category);
      formData.append("oldPrice", data.oldPrice);
      formData.append("newPrice", data.newPrice);
      if (data.image && data.image[0]) formData.append("image", data.image[0]);
      formData.append("sale", data.sale || false);
      formData.append("ratings", data.ratings || 0);
      formData.append("description", data.description);
      formData.append("createBy", data.createBy);

      const response = await client.post(`/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("ProductData", response);
      messageApi.success("Product created successfully ✅");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
      reset();
      setImagePreview(null);
    } catch (err) {
      console.error("API Error:", err);
      messageApi.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {contextHolder}
      <h1 className="text-3xl font-bold text-center mt-10 text-pink-600">
        Create Product
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full shadow-lg rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <InputsComp
            type="text"
            {...register("name", {
              required: "Product name is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
            placeholder="Enter product name"
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
            <option value="Fruit and vegetables">Fruit and vegetables</option>
            <option value="Excessive Sugar">Excessive Sugar</option>
            <option value="Vegetarian Dishes">Vegetarian Dishes</option>
            <option value="Protein">Protein</option>
            <option value="Fat">Fat</option>
            <option value="Salads">Salads</option>
            <option value="Soups">Soups</option>
            <option value="Soups">Other</option>
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
            <InputsComp
              type="number"
              {...register("oldPrice", { required: "Old price is required" })}
              placeholder="Enter old price"
            />
            {errors.oldPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.oldPrice.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">New Price</label>
            <InputsComp
              type="number"
              {...register("newPrice", { required: "New price is required" })}
              placeholder="Enter new price"
            />
            {errors.newPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPrice.message}
              </p>
            )}
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
          <InputsComp
            type="file"
            {...register("image", { required: "Image is required" })}
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
          <InputsComp type="checkbox" {...register("sale")} />
          <label className="mb-4">On Sale</label>
        </div>

        <ButtonComp>Create Product</ButtonComp>
      </form>
    </div>
  );
}

export default Product;
