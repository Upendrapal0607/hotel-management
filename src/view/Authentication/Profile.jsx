import React, { useEffect, useState } from "react";
import { useContextValue } from "../../Context/Contect";
import _ from "lodash";
import { AiOutlineUser } from "react-icons/ai";

import { UpdateProfile } from "../../api-service/UserService";
import { AlertToastMessage } from "../../Element/Alert";
import {  getUserBookedRoom } from "../../api-service/BookingService";
import { BookedUserHotel } from "./BookedUserHotel";
export const Profile = () => {
  const { userDetails } = useContextValue();
  const {showToast} = AlertToastMessage()
  const [isEditing, setIsEditing] = useState(false);

  const[userHotel ,setUserHotel] = useState([]);
  const [address, setAddress] = useState({
    city: userDetails?.address?.city || "",
    state: userDetails?.address?.state || "",
    country: userDetails?.address?.country || "",
    zipcode: userDetails?.address?.zipcode || "",
    landmark: userDetails?.address?.landmark || "",
    locality: userDetails?.address?.locality || "",
  });

  
  const isAddress = _.size(userDetails?.address);
  const [formData, setFormData] = useState({
    name: userDetails.name || "",
    email: userDetails.email || "",
    gender: userDetails.gender || "male",
    profile_photo: userDetails.profile_photo || "",
  });
const bookedHotel = async () => {
  try {
    
    const response = await getUserBookedRoom(userDetails?.userId||userDetails?._id);
 if (response.status) {
  setUserHotel(response?.bookingList)
 }
    
  } catch (error) {
    console.log(error);
    
  }

};

  useEffect(()=>{

    bookedHotel()
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const EditedData = {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        profile_photo: formData.profile_photo,
        address_list: address,
      };
    
      const response = await UpdateProfile(EditedData, userDetails?.userId);
      console.log({
        response: response,
      });
      if (response.status) {
        localStorage.setItem(
          "UserInfo",
          JSON.stringify({
            name: response.user.name,
            email: response.user.email,
            userId: response.user._id,
            gender: response.user.gender,
            profile_photo: response?.profile_photo,
            address: response?.user?.address_list,
            userType: response?.userType,
          })
        );
        showToast(
          "Profile update successful",
          "Your profile has been updated",
          "success"
        );
        setIsEditing(false);
      }
    } catch (error) {
      console.log({
        error: error.message,
      });
    }
  };
  const handleAddAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userDetails);
  };

  return (
    <div className="max-w-4xl  min-h-96 md:min-h-144 mx-auto  my-6 md:my-10 p-6 rounded-lg shadow-lg">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4 mb-6 min-h-56">
            <div></div>
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-lg p-2"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2"
                placeholder="Email"
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>

            <div className="p-4 border rounded-lg mb-4">
              <input
                type="text"
                name="locality"
                value={address.locality}
                onChange={handleAddAddress}
                placeholder="Locality"
                className="border rounded-lg p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddAddress}
                placeholder="City"
                className="border rounded-lg p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddAddress}
                placeholder="State"
                className="border rounded-lg p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleAddAddress}
                placeholder="Country"
                className="border rounded-lg p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="zipcode"
                value={address.zipcode}
                onChange={handleAddAddress}
                placeholder="Zipcode"
                className="border rounded-lg p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="landmark"
                value={address.landmark}
                onChange={handleAddAddress}
                placeholder="Landmark (optional)"
                className="border rounded-lg p-2 mb-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-black rounded-lg py-2 px-4 mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="min-h-[30vh]">
          <div className="flex items-center space-x-4">
            {!userDetails.profile_photo ? (
              <div className="rounded-full object-cover border-2 p-2 bg-gray-50">
                <AiOutlineUser className="w-20 h-20" />
              </div>
            ) : (
              <img
                src={
                  userDetails.profile_photo || "https://via.placeholder.com/150"
                }
                alt={userDetails.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {userDetails.name}
              </h1>
              <p className="text-gray-600">{userDetails.email}</p>
              <p className="text-gray-600 capitalize">{userDetails.gender}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {isAddress !== 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
              <div className="mt-4">
                <div className="p-4 border rounded-lg mb-4">
                  <p className="text-gray-800 font-semibold">
                    {userDetails?.address?.locality},{" "}
                    {userDetails?.address?.city}
                  </p>
                  <p className="text-gray-600">
                    {userDetails?.address?.state},{" "}
                    {userDetails?.address?.country}
                  </p>
                  <p className="text-gray-600">
                    Zipcode: {userDetails?.address?.zipcode}
                  </p>
                  {userDetails?.address?.landmark && (
                    <p className="text-gray-600">
                      Landmark: {userDetails?.address?.landmark}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        <BookedUserHotel userHotel = {userHotel} bookedHotel = {bookedHotel}/>
      </div>
    </div>
  );
};
