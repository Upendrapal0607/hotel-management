import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertToastMessage } from "../../Element/Alert";
import { AiOutlineClose } from "react-icons/ai";
import { RoomNumberModal } from "./RoomNumberModal";
import { useDisclosure } from "@chakra-ui/react";
import { getSingleHotel } from "../../api-service/HotelServices";
import { BookedRoom } from "../../api-service/BookingService";
import { useContextValue } from "../../Context/Contect";
export const SingleHotel = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const today = new Date().toISOString().split("T")[0];
  const [room, setRoom] = useState("");
  const { showToast } = AlertToastMessage();
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [selectNumberOfRoom, setSelectNumberOfRoom] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [hotelData, setHotelData] = useState({});
  const { userDetails,isLogin } = useContextValue();
  const navigate = useNavigate();
const location = useLocation();
  useEffect(() => {
    (async () => {
      try {
        const singleHotel = await getSingleHotel(id);
        if (singleHotel?.status) {
          setHotelData(singleHotel?.sigleHotel);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handleFromDateChange = (e) => {
    const selectedFromDate = e.target.value;
    if (toDate && new Date(selectedFromDate) > new Date(toDate)) {
      showToast(
        "Date Selection Warning",
        "From Date should be earlier than To Date!",
        "warning",
        "top"
      );
      return;
    }
    setFromDate(selectedFromDate);
  };

  const handleToDateChange = (e) => {
    const selectedToDate = e.target.value;
    if (fromDate && new Date(selectedToDate) < new Date(fromDate)) {
      showToast(
        "Date Selection Warning",
        "To Date should be later than From Date!",
        "warning",
        "top"
      );
      return;
    }
    setToDate(selectedToDate);
  };
  
  useEffect(() => {
    if (fromDate && toDate) {
      const dateFrom = new Date(fromDate);
      const dateTo = new Date(toDate);
      const diffTime = Math.abs(dateTo - dateFrom);

      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setNumberOfDays(days);
    }
  }, [fromDate, toDate]);

  const handleBookHotel = async () => {
if(!isLogin){
  showToast(
    "Login alert",
    `please login first`,
    "warning"
  );
  navigate("/login",{state: {from : location}});
  return;
}
    if (selectedRoom && selectedRoom.length <= 0) {
      showToast(
        "Select room alert",
        `please select room which you need`,
        "warning"
      );
      return;
    }
    const hotelObject = {
      user_Id: userDetails?._id || userDetails?.userId, 
      hotel_Id: hotelData?._id,
      booking_status: "Booked",
      from_date: fromDate,
      to_date: toDate,
      selectedRoom,
    };

    const response = await BookedRoom(hotelObject);
    if (response.status) {
      showToast(
        "Booking successful",
        `Your booking done for ${numberOfDays} completed check your profile for more details`,
        "success"
      );
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    }
  };
  const {
    hotel_name,
    hotel_image,
    hotel_type,
    description,
    hotel_category,
    hotel_address,
    type_of_room,
  } = hotelData;

  const handleselectRoom = (name, availableRoom,roomprice) => {
    if (!toDate || !fromDate) {
      showToast(
        "Select date alert",
        `please select date which date you need room`,
        "warning"
      );
      return;
    }
  
    const alreadySelectedRoom = selectedRoom.filter((room) => {

      return room.roomType === name;
    })[0];
   

    if (alreadySelectedRoom) {
      showToast(
        "Select room alert",
        `You have alraidy selected ${name}`,
        "warning"
      );
      return;
    }
    setRoomCount(availableRoom);
    setRoom(name);
    setPrice(roomprice);
    onOpen();
  };

  const handleDeleteRoom = (name) => {
    const newRoom = selectedRoom.filter((room) => room?.roomType !== name);
    setSelectedRoom(newRoom);
  };

  return (
    <div className="hotel-card  flex md:flex-row min-h-[650px] flex-col justify-between w-[94%] m-auto rounded-lg shadow-lg overflow-hidden">
      <div className="w-[100%] md:h-52 md:w-[40%]">
        <img
          src={hotel_image || "default-hotel.jpg"}
          alt={hotel_name}
          className="w-full object-cover h-96"
        />
      </div>
      <div className="p-4 w-[100%] md:w-[56%]">
        <h2 className="text-xl font-semibold">{hotel_name}</h2>
        <p className="text-sm text-gray-500">
          {hotel_type} - {hotel_category}
        </p>
        <p className="mt-2 text-gray-700">{description}</p>
        <p className="mt-2 text-gray-700">
          Address: {hotel_address?.locality}, {hotel_address?.city},{" "}
          {hotel_address?.state}, {hotel_address?.country} -{" "}
          {hotel_address?.zipcode}
        </p>

        <div className="mt-4">
          <div className="flex gap-2 justify-center items-center  md:space-x-4">
            <div className="w-full  flex flex-col">
              <label
                htmlFor="fromDate"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                From Date
              </label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={today}
                onChange={handleFromDateChange}
                value={fromDate}
              />
            </div>

            <div className="w-full  flex flex-col">
              <label
                htmlFor="toDate"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                To Date
              </label>
              <input
                value={toDate}
                onChange={handleToDateChange}
                min={fromDate || today}
                type="date"
                id="toDate"
                name="toDate"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <h3 className="text-lg font-medium">Rooms Available</h3>
          <ul className="mt-2 space-y-2 flex flex-wrap text-white gap-6 justify-start items-center">
            {type_of_room?.map((room, index) => (
              <li
                key={index}
                onClick={() => {
                  setRoom(room?.roomType);
                  handleselectRoom(room?.roomType, room?.available_room,room?.price*numberOfDays);
                }}
                className="flex justify-start items-start flex-col bg-blue-400 px-2 py-3 rounded-lg cursor-pointer"
              >
                <span>{room.roomType}</span>
                <span>
                  {room.available_room} available at $
                  {numberOfDays * room.price}
                </span>
              </li>
            ))}
          </ul>
          <div>
            <RoomNumberModal
              isOpen={isOpen}
              onClose={onClose}
              setSelectNumberOfRoom={setSelectNumberOfRoom}
              actualRoom={roomCount}
              setSelectedRoom={setSelectedRoom}
              name={room}
              price={price}
            />
          </div>
          <div className="mt-6 flex justify-between">
            <div className="flex flex-wrap gap-2">
              {selectedRoom?.map((room, index) => (
                <div>
                  <button
                    type="button"
                    onClick={() => handleDeleteRoom(room?.roomType)}
                    key={index}
                    className="bg-[#3B81F6] py-2 pl-2 pr-2 text-white rounded-lg items-center shadow-sm flex justify-between"
                  >
                    {`${room?.roomType}(${room?.numberOfRoom})`}{" "}
                    <AiOutlineClose size={10} className="ml-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleBookHotel}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-[150px]"
            >
              Book now
            </button>
          </div>
          {selectedRoom.length > 0 && (
            <div className="mt-2">
              <p className=" text-md text-red-400">
                * Booking is subject to availability and cancellation policies.
              </p>
              <p className="text-gray-700 text-lg">
                You booked {selectedRoom.length} room
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
