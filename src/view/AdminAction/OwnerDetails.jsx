// OwnerForm.js

import React from "react";
import { RequireStar } from "../../Element/RequireStar";

export const OwnerForm = ({ ownerInfo, setOwnerInfo }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerInfo({ ...ownerInfo, [name]: value });
  };

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
      {/* Full Name */}
      <div>
        <label className="block text-gray-700">
          Full Name <RequireStar />
        </label>
        <input
          type="text"
          name="full_name"
          value={ownerInfo.full_name}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter full name"
          required
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-gray-700">
          Gender <RequireStar />
        </label>
        <select
          name="gender"
          value={ownerInfo.gender}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700">
          Email Address <RequireStar />
        </label>
        <input
          type="email"
          name="email"
          value={ownerInfo.email}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email address"
          required
        />
      </div>

      {/* Contact Number */}
      <div>
        <label className="block text-gray-700">
          Contact Number <RequireStar />
        </label>
        <input
          type="tel"
          name="contact_number"
          value={ownerInfo.contact_number}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter contact number"
          required
        />
      </div>
    </div>
  );
};
