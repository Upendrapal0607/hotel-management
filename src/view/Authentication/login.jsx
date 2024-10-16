"use client";

import { Stack, Heading, Text } from "@chakra-ui/react";
import { useContextValue } from "../../Context/Contect";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const { loginUser, isLogin, loginType } = useContextValue();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const HandleLogin = async (data) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
        loginAs:false,
      });

      if (response?.status) {
        if (response.userType === "Admin") Navigate("/admin/dashboard");
        else Navigate(location?.state?.from?.pathname);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLogin) {
    if (loginType === "User") navigate(location?.state?.from?.pathname);
    else navigate("/admin/dashboard");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-[url('https://res.cloudinary.com/dnnyncotr/image/upload/v1728169236/x7saqkshtc9bjzcgz3sw.jpg')] bg-center bg-white p-4">
      <form
        onSubmit={handleSubmit(HandleLogin)}
        className="p-6 bg-gray-200 rounded-lg shadow-lg max-w-lg w-full space-y-4"
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in</Heading>
        {/* <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2> */}
        </Stack>
        <h2 className="text-2xl font-bold text-center text-gray-800">Experience a hotel stay as unique as you</h2>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <Text color="red.500" fontSize="sm">
              {errors.email.message}
            </Text>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <Text color="red.500" fontSize="sm">
              {errors.password.message}
            </Text>
          )}
        </div>

        <div className="gap-4 flex justify-between items-center">
          
          <div className="text-blue-500 cursor-pointer hover:underline">
            <p>Forgot password?</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 my-20 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>
        <div className="text-blue-500 cursor-pointer hover:underline text-right">
          <Link to={"/signup"}>Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
}
