import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export const ViewHotelModel = ({ isOpen, onClose, hotel }) => {
  console.log({
    hotel,
  });
  
  const {
    hotel_name,
    hotel_category,
    hotel_type,
    description,
    is_verified,
    hotel_image,
    hotel_address,
    owner_info,
    type_of_room,
  } = hotel;

  return (
    <Modal size={'5xl'} onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent className="bg-gray-50">
        <ModalHeader className="text-2xl font-bold text-gray-700">
          {hotel_name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="space-y-6">
          {/* Hotel Image */}
          <div className="flex justify-center mb-4">
            <img
              src={hotel_image}
              alt={hotel_name}
              className="rounded-md shadow-lg object-cover w-full md:h-auto h-72 md:w-1/2"
            />
          </div>

          {/* Hotel Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Description</h3>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>

          {/* Hotel Information */}
          <div className="grid grid-cols-2 gap-4 bg-white shadow-md p-6 rounded-md">
            <div>
              <p className="font-semibold">Category:</p>
              <p>{hotel_category}</p>
            </div>
            <div>
              <p className="font-semibold">Type:</p>
              <p>{hotel_type}</p>
            </div>
            <div>
              <p className="font-semibold">Verified:</p>
              <p className={is_verified ? 'text-green-500' : 'text-red-500'}>
                {is_verified ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="font-semibold">Location:</p>
              <p>
                {hotel_address.locality}, {hotel_address.city},{' '}
                {hotel_address.state}, {hotel_address.country} -{' '}
                {hotel_address.zipcode}
              </p>
              {hotel_address.landmark && (
                <p className="text-gray-500">Landmark: {hotel_address.landmark}</p>
              )}
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-xl font-semibold text-gray-800">Owner Info</h3>
            <p>Name: {owner_info.full_name}</p>
            <p>Gender: {owner_info.gender}</p>
            <p>Email: {owner_info.email}</p>
            <p>Contact: {owner_info.contact_number}</p>
          </div>

          {/* Room Information */}
          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-xl font-semibold text-gray-800">Room Types</h3>
            {type_of_room.map((room, index) => (
              <div
                key={index}
                className="flex justify-between p-2 bg-gray-100 rounded-md mb-2"
              >
                <p>
                  <span className="font-semibold">Room Type:</span>{' '}
                  {room.roomType}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ₹{room.price}
                </p>
                <p>
                  <span className="font-semibold">Available:</span>{' '}
                  {room.available_room}
                </p>
              </div>
            ))}
          </div>
        </ModalBody>

        <ModalFooter>
         
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
