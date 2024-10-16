import React from "react";

export const About = () => {
  return (
    <div className="flex items-center bg-gray-50 justify-center px-6 sm:px-10 lg:px-20">
      <div className="w-full max-w-4xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-6">
          About StaysMate
        </h1>
        <p className="text-gray-600  mb-8  text-start">
          Welcome to <strong>StaysMate</strong>, your ultimate hotel booking and
          management companion! Whether you're traveling for business or
          leisure, we’re committed to making your stay smooth, memorable, and
          hassle-free.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://res.cloudinary.com/dnnyncotr/image/upload/v1728461554/qa2phimahdbezo1yjiga.jpg"
              alt="Our Mission"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-500">
              To provide seamless booking experiences and outstanding customer
              service, ensuring every stay is special and worry-free.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="https://res.cloudinary.com/dnnyncotr/image/upload/v1728394520/h5zgf7l76m61regpsg7r.jpg"
              alt="Our Vision"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-500">
              To become the world’s most trusted hotel booking platform,
              empowering travelers and hoteliers alike.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="https://res.cloudinary.com/dnnyncotr/image/upload/v1728385510/pbk9dnfhr7nifk8fe5zx.jpg"
              alt="Our Values"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Our Values
            </h2>
            <p className="text-gray-500">
              We believe in transparency, customer-first service, and
              sustainable tourism for a better tomorrow.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="https://res.cloudinary.com/dnnyncotr/image/upload/v1728170082/i1x5cqwqpueb25ns6pup.jpg"
              alt="Join Us"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Join Us
            </h2>
            <p className="text-gray-500">
              Partner with us and become part of the StaysMate family. Let’s
              create exceptional stays together!
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};
