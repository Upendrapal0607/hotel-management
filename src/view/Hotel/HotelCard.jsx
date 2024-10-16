import React from "react";
import { useNavigate } from "react-router-dom";
import { getMinAndMax } from "../../utils/Price";

export const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const { min, max } = getMinAndMax(hotel?.type_of_room || []);
  return (
    <div
      onClick={() => navigate(`/hotel/${hotel?._id}`)}
      className=" bg-white cursor-pointer rounded-lg w-full shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <div className="relative">
        <img
          src={hotel?.hotel_image}
          alt={hotel?.hotel_name}
          className="w-full h-48 object-cover"
        />
        {hotel?.is_verified && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Verified
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {hotel?.hotel_name}
        </h3>
        <p className="text-gray-600 text-sm">
          {hotel?.hotel_address?.city} {hotel?.hotel_address?.locality} -{" "}
          {hotel?.hotel_address?.zipcode}
        </p>
        <p className="text-gray-600 text-sm">
          Category: {hotel?.hotel_category} | Type: {hotel?.hotel_type}
        </p>
        <div className="flex items-center mt-3">
          <span className="text-gray-700 font-semibold">Rooms: </span>
          <span className="ml-2 text-gray-600">
            (
            {hotel?.type_of_room?.reduce(
              (a, b) => a + b?.available_room || 0,
              0
            )}
            ) available
          </span>
          <span className="ml-2 text-gray-600">
            from {min} to {max}
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="bg-blackColor text-white px-4 py-2 rounded-lg hover:bg-blackColor">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
