import React from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { updateBookedRoom } from '../../api-service/BookingService';
import { AlertToastMessage } from '../../Element/Alert';

const UserHotelCard = ({ data,bookedHotel }) => {
  const { showToast } = AlertToastMessage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    booking_status, 
    created, 
    from_date, 
    to_date, 
    hotelDetails, 
    selectedRoom, 
    userDetails 
  } = data;

  const { 
    hotel_name, 
    hotel_image, 
    hotel_category, 
    hotel_type, 
    hotel_address, 
    owner_info 
  } = hotelDetails;
  const HandleCancelBooking = async () => {
  
    try {
      const response = await updateBookedRoom(data?._id,{
          booking_status: "Cancelled"
      });
     
      if(response.status){
        showToast("Booking cancel alert", "Booking has been cancelled", "success");
        bookedHotel();
      }
      
  } catch (error) {
      console.log({
          message: "Failed to cancel booking",
          error,
    
      });
      
  }
    onClose();
  };
  return (
    <div className="w-full mx-auto md:flex-row justify-between flex-col flex bg-white shadow-md rounded-lg overflow-hidden mb-5">
      <img 
        src={hotel_image} 
        alt={hotel_name} 
        className="md:w-[60%] w-full md:h-96 h-96 object-cover" 
      />
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{hotel_name}</h2>
        <p className="text-sm text-gray-600 mb-2">
          {hotel_type} | {hotel_category}
        </p>

        <div className="text-sm text-gray-600 mb-4">
          <p><span className="font-semibold">Address:</span> {`${hotel_address.city}, ${hotel_address.state}, ${hotel_address.country}, ${hotel_address?.locality}, ${hotel_address?.zipcode}`}</p>
          <p><span className="font-semibold">Owner:</span> {owner_info.full_name} ({owner_info.contact_number})</p>
        </div>

        <div className="mb-4">
          <div className='flex justify-between gap-2'>
          <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
            booking_status === 'Cancelled' 
              ? 'bg-red-200 text-red-700' 
              : 'bg-green-200 text-green-700'
          }`}>
            {booking_status}
          </span>
         {booking_status !== 'Cancelled'&& <button onClick={onOpen} className='inline-block px-3 py-1 text-sm font-semibold rounded-full text-white bg-red-500'>
            Cancel Booking
          </button>}
          </div>
       

          <p className="text-xs text-gray-500 mt-1">Booking created on: {new Date(created).toLocaleDateString()}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Booking Dates:</p>
          <p className="text-sm text-gray-600">
            {new Date(from_date).toLocaleDateString()} - {new Date(to_date).toLocaleDateString()}
          </p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Selected Rooms:</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {selectedRoom.map((room, index) => (
                <>
              <li key={index}>
                {room.roomType}: {room.numberOfRoom} room(s)
              </li>
              <li>
                Price : ${room?.price}
              </li>
                </>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="font-semibold">User Info:</p>
          <p className="text-sm text-gray-600">
            Name: {userDetails.name} | Email: {userDetails.email}
          </p>
        </div>
      </div>
      <>
    <Modal size={"md"} onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className='text-red-500'>
        Are you sure you want cancel booking
        </ModalHeader>
        <ModalFooter className=' flex gap-4'>
          <Button onClick={HandleCancelBooking}>Yes</Button>
          <Button onClick={onClose}>NO</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>

  
    </div>
  );
};

export default UserHotelCard;
