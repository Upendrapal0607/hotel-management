import React, { useState } from "react";
import FileUpload from "../../utils/UploadFile";
import { RequireStar } from "../../Element/RequireStar";
import { AiOutlineClose } from "react-icons/ai";
import { AlertToastMessage } from "../../Element/Alert";

export const HotelDetails = ({ hotelInfo, setHotelInfo }) => {
  const { showToast } = AlertToastMessage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo({ ...hotelInfo, [name]: value });
  };

  const [roomDetails, setRoomDetails] = useState({
    roomType: "",
    booked_room: 0,
    available_room: 20,
    price: 0,
  });

  const [rooms, setRooms] = useState(hotelInfo.type_of_room || []);

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails({
      ...roomDetails,
      [name]: name =="available_room"||name=="price"?+value:value,
    });
  };

  // Add room to the list
  const handleAddRoom = () => {
    if (!roomDetails.roomType) {
      showToast("Room alert", "Please enter a room type!", "warning", "top");
      return;
    } else if (+roomDetails.available_room < +roomDetails.booked_room) {
      showToast(
        "Room alert",
        "Available room should be greater than booked room!",
        "error",
        "top"
      );
      return;
    }

    setRooms([...rooms, roomDetails]);
    setHotelInfo({
      ...hotelInfo,
      type_of_room: [...rooms, roomDetails],
    });

    // Clear the form for the next input
    setRoomDetails({
      roomType: "",
      booked_room: 0,
      available_room: 20,
    });
  };
  const handleDeleteRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    let deletedRoom = rooms[index];

    setRooms(updatedRooms);
    showToast(
      "Delete room alert",
      `Removed one ${deletedRoom?.roomType} room from the queue`,
      "success",
      "top"
    );
  };
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Hotel Details
      </h2>

      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {/* Hotel Name */}
        <div>
          <label className="block text-gray-700">
            Hotel Name <RequireStar />
          </label>
          <input
            type="text"
            name="hotel_name"

            value={hotelInfo.hotel_name}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hotel name"
            required
          />
        </div>

        {/* Hotel Type */}
        <div>
          <label className="block text-gray-700">
            Hotel Type <RequireStar />
          </label>
          <select
            name="hotel_type"
            value={hotelInfo.hotel_type}
            onChange={handleInputChange}
      
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select type</option>
            <option value="Luxury">Luxury</option>
            <option value="Budget">Budget</option>
            <option value="Boutique">Boutique</option>
            <option value="Resort">Resort</option>
            <option value="Hostel">Hostel</option>
          </select>
        </div>

        {/* Hotel Category */}
        <div>
          <label className="block text-gray-700">
            Hotel Category <RequireStar />
          </label>
          <select
            name="hotel_category"
            value={hotelInfo.hotel_category}
            onChange={handleInputChange}
            
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select category</option>
            <option value="5-star">5-star</option>
            <option value="3-star">3-star</option>
            <option value="1-star">1-star</option>
          </select>
        </div>

        {/* Hotel Image */}
        <div className="h-[100px]">
          <FileUpload />
        </div>
      </div>

      {/* Hotel description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Hotel Description
        </label>
        <textarea
          name="description"
          value={hotelInfo.description}
          onChange={handleInputChange}
          className="mt-1 p-3 border border-gray-300 rounded-lg w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 shadow-sm transition duration-200 ease-in-out"
          placeholder="Type some description about the hotel"
        />
      </div>

      {/*Add Room */}

      <div className="p-4 rounded-lg">
        <label className="block text-gray-700">Add Room</label>

        {/* Form to add a new room */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 gap-4">
          {/* Room Type */}
          <div className="flex-grow">
            <label className="block text-gray-700">
              Room Type <RequireStar />
            </label>
            <input
              type="text"
              name="roomType"
              value={roomDetails.roomType}
              onChange={handleRoomInputChange}
              className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room type (e.g., Single, Double, Suite)"
            />
          </div>

          {/* Available Rooms */}
          <div className="flex-grow">
            <label className="block text-gray-700">
              Available Rooms <RequireStar />
            </label>
            <input
              type="number"
              name="available_room"
              value={roomDetails.available_room}
              onChange={handleRoomInputChange}
              className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              placeholder="Enter number of available rooms"
            />
          </div>

          {/* Booked Rooms */}
          <div className="flex-grow">
            <label className="block text-gray-700">
              Booked Rooms <RequireStar />
            </label>
            <input
              type="number"
              name="booked_room"
              value={roomDetails.booked_room}
              onChange={handleRoomInputChange}
              className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max={roomDetails.available_room}
              placeholder="Enter number of booked rooms"
            />
          </div>
          {/* Price */}
          <div className="flex-grow">
            <label className="block text-gray-700">
              Price <RequireStar />
            </label>
            <input
              type="number"
              name="price"
              onChange={handleRoomInputChange}
              className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max={roomDetails.price}
              placeholder="Enter number of booked rooms"
            />
          </div>

          {/* Add Room Button */}
          <div className="flex-grow">
            <label className="block text-gray-700"></label>

            <button
              type="button"
              onClick={handleAddRoom}
              className="bg-blue-500 mt-7 sm:mt-2 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add Room
            </button>
          </div>
        </div>

        {/* Add Room Button */}

        {/* List of Added Rooms */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Rooms Added:
          </h3>
          <div className=" flex gap-4 flex-wrap">
            {rooms.map((room, index) => (
              <div>
                <button
                  type="button"
                  onClick={() => handleDeleteRoom(index)}
                  key={index}
                  className="bg-[#3B81F6] py-2 pl-2 pr-2 text-white rounded-lg items-center shadow-sm flex justify-between"
                >
                  {room.roomType} <AiOutlineClose size={10} className="ml-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
