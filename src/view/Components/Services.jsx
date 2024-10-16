import React from "react";
import {
  FaHotel,
  FaConciergeBell,
  FaSwimmer,
  FaUtensils,
  FaSpa,
  FaWifi,
} from "react-icons/fa";

export const Services = () => {
  const services = [
    {
      icon: <FaHotel size={40} className="text-blue-600" />,
      title: "Hotel Booking",
      description: "Seamless hotel reservations with easy management.",
    },
    {
      icon: <FaConciergeBell size={40} className="text-blue-600" />,
      title: "24/7 Concierge",
      description: "Enjoy round-the-clock service to meet your every need.",
    },
    {
      icon: <FaSwimmer size={40} className="text-blue-600" />,
      title: "Swimming Pool",
      description: "Access to premium pools and recreational facilities.",
    },
    {
      icon: <FaUtensils size={40} className="text-blue-600" />,
      title: "In-house Dining",
      description:
        "Savor delicious meals with our in-house restaurant services.",
    },
    {
      icon: <FaSpa size={40} className="text-blue-600" />,
      title: "Spa & Wellness",
      description: "Relax and rejuvenate with our spa and wellness packages.",
    },
    {
      icon: <FaWifi size={40} className="text-blue-600" />,
      title: "Free Wi-Fi",
      description: "Stay connected with complimentary high-speed Wi-Fi.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-4">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover the exclusive services that make your stay with us memorable
          and enjoyable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
