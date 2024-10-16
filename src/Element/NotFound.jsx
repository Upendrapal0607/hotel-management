import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl text-gray-600 mt-4">Oops! Page not found.</h2>
      <p className="text-gray-500 mt-2 text-center">
        The page you are looking for might have been removed, or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
