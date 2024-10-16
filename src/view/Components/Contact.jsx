import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AlertToastMessage } from "../../Element/Alert";

export const Contact = () => {
  const { showToast } = AlertToastMessage();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Your name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits"),
    message: Yup.string().required("Please enter your message"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    showToast(
      "Message send successful",
      "Thank you for contacting us. We will get back to you soon!",
      "success"
    );
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md my-6 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-900 mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We’d love to hear from you! Send us a message and we’ll get back to
          you.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Your Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              {...register("phone")}
              placeholder="Your Phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              {...register("message")}
              rows="4"
              placeholder="Your Message"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.message && (
              <span className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
