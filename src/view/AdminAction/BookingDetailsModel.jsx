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

export const BookingDetailsModel = ({ isOpen, onClose, booking }) => {
  const {
    booking_status,
    from_date,
    to_date,
    hotelDetails,
    selectedRoom,
    userDetails,
  } = booking;

  return (
    <Modal size={'5xl'} onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent className="bg-gray-50">
        <ModalHeader className="text-2xl font-bold text-gray-700">
          Booking Details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="space-y-6">
          {/* Booking Info */}
          <div className="flex flex-col gap-2">
            <p className="text-lg">
              <span className="font-semibold">Booking Status:</span>{' '}
              <span
                className={`${
                  booking_status === 'Cancelled'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {booking_status}
              </span>
            </p>
            <p>
              <span className="font-semibold">From:</span>{' '}
              {new Date(from_date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">To:</span>{' '}
              {new Date(to_date).toLocaleDateString()}
            </p>
          </div>

          {/* Hotel Details */}
          <div className="bg-white shadow p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-2">
              Hotel: {hotelDetails.hotel_name}
            </h2>
            <img
              src={hotelDetails.hotel_image}
              alt="Hotel"
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <p className="mb-2">
              <span className="font-semibold">Category:</span>{' '}
              {hotelDetails.hotel_category}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Type:</span>{' '}
              {hotelDetails.hotel_type}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Description:</span>{' '}
              {hotelDetails.description}
            </p>
            <p>
              <span className="font-semibold">Owner:</span>{' '}
              {hotelDetails.owner_info.full_name} (
              {hotelDetails.owner_info.email})
            </p>
          </div>

          {/* User Details */}
          <div className="bg-white shadow p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Guest Details</h2>
            <p>
              <span className="font-semibold">Name:</span> {userDetails.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userDetails.email}
            </p>
          </div>

          {/* Selected Rooms */}
          <div className="bg-white shadow p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Selected Rooms</h2>
            {selectedRoom.map((room, index) => (
              <div
                key={index}
                className="flex justify-between mb-2 p-2 bg-gray-100 rounded-md"
              >
                <p>
                  <span className="font-semibold">Room Type:</span>{' '}
                  {room.roomType}
                </p>
                <p>
                  <span className="font-semibold">Number of Rooms:</span>{' '}
                  {room.numberOfRoom}
                </p>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            className="mr-2"
            onClick={() => {
              window.print();
              onClose();
            }}
          >
            Print
          </Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
