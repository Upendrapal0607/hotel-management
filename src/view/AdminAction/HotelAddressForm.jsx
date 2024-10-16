import React from "react";
import { RequireStar } from "../../Element/RequireStar";

const AddressForm = ({ address, setAddress }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Hotel Address
      </h2>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {/* Locality */}
        <div>
          <label className="block text-gray-700">
            Locality <RequireStar />
          </label>
          <input
            type="text"
            name="locality"
            value={address.locality}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter locality"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700">
            City <RequireStar />
          </label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-gray-700">
            State <RequireStar />
          </label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter state"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-gray-700">
            Country <RequireStar />
          </label>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter country"
            required
          />
        </div>

        {/* Zipcode */}
        <div>
          <label className="block text-gray-700">
            Zipcode <RequireStar />
          </label>
          <input
            type="text"
            name="zipcode"
            value={address.zipcode}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter zipcode"
            required
          />
        </div>

        {/* Landmark */}
        <div>
          <label className="block text-gray-700">Landmark (Optional)</label>
          <input
            type="text"
            name="landmark"
            value={address.landmark}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter landmark"
          />
        </div>

        {/* Address Type */}
        <div>
          <label className="block text-gray-700">Address Type (Optional)</label>
          <select
            name="type"
            value={address.type}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="commercial">Commercial</option>
            <option value="resort">Resort</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
