import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "antd/dist/reset.css"; 

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/create", {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });

      messageApi.success("User created successfully ✅");

      // alert("user created successfully");
      console.log("The signUP user data is --- ", response.data);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      reset();
    } catch (err) {
      messageApi("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 sm:p-6">
      {contextHolder}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        <div className="w-full  p-8 sm:p-10 bg-gradient-to-br from-yellow-50 to-white">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Create an account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullname", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "username must be at least 3 characters",
                  },
                })}
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must not exceed 12 characters",
                  },
                })}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg font-semibold transition-all duration-200"
            >
              Submit
            </button>
          </form>

          <div className="mt-6 flex justify-between text-sm text-gray-600">
            <a href="/login" className="text-yellow-600 hover:underline">
              Have any account? Sign In
            </a>
            <a href="#" className="text-yellow-600 hover:underline">
              Terms & Conditions
            </a>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.9H7v-3h3V9.8c0-3.05 1.82-4.73 4.61-4.73 1.33 0 2.73.24 2.73.24v3h-1.54c-1.51 0-1.98.94-1.98 1.9v2.3h3.38l-.48 3H13v6.9c4.56-.93 8-4.96 8-9.8 0-5.52-4.48-10-10-10z" />
              </svg>
              Apple
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.34-1.36-.34-2.09s.12-1.43.34-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              </svg>
              Google
            </button>
          </div>
        </div>

        <div className="w-full  bg-gray-200 relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80"
            alt="Team working"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 right-4">
            <button className="text-white bg-gray-800/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-all duration-200">
              <span className="text-xl">&times;</span>
            </button>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-semibold">
              Sign in to your adventure!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
