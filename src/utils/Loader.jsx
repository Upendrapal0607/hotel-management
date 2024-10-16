// src/components/LoadingSpinner.js
import React from "react";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600 border-t-transparent"></div>
  </div>
);

export default LoadingSpinner;
