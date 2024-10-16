import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
};

export default Loader;
