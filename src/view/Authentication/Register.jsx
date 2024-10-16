import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertToastMessage } from "../../Element/Alert";
import { userRegister } from "../../api-service/UserService";
import { useContextValue } from "../../Context/Contect";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = AlertToastMessage();
  const { isLogin, loginType } = useContextValue();
  const [registerAs, setRegisterAs] = useState(false);
  const [comparePassword, setComparePassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (registerAs) {
      showToast(
        "Wrong credentials",
        "You are not allowed to register",
        "warning"
      );
      return
    }
    if (comparePassword !== data.password) {
      showToast(
        "Password unmatched",
        "Password mismatch detected. Please enter the same password.",
        "warning"
      );
      return;
    }
    try {
      const response = await userRegister(data, registerAs);

      if (!response) {
        showToast(
          "Registration failed",
          "Failed to register, please try again.",
          "error"
        );
        return;
      }
      if (response?.status) {
        showToast(
          "Registration successful",
          "You have been registered successfully.",
          "success"
        );
        navigate("/login");
      }
      else{
        showToast(
          "Registration failed",
          response?.error?.message,
          "error"
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLogin) {
    if (loginType === "User") navigate("/profile");
    else navigate("/admin/dashboard");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-[url('https://res.cloudinary.com/dnnyncotr/image/upload/v1728169236/x7saqkshtc9bjzcgz3sw.jpg')] bg-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-lg w-full space-y-4"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Join <span className="text-blue-600">Stays</span>Mate Today!
        </h1>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>

        <div className="space-y-2">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

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
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="gender" className="block text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 8 characters long",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={comparePassword}
            onChange={(e) => setComparePassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>

        <div className="gap-4 flex justify-between items-center">
          {/* <div className="gap-2 flex justify-start items-center">
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => setRegisterAs(e.target.checked)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            />
            <label htmlFor="checkbox" className="block text-gray-700">
              Sign Up as Admin
            </label>
          </div> */}
          <div className="text-blue-500 cursor-pointer hover:underline">
            <Link to={"/login"}>Already have an account?</Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
