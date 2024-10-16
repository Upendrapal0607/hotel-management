import React, { useEffect, useState } from "react";
import { deleteHotel } from "../../api-service/HotelServices";
import { AlertToastMessage } from "../../Element/Alert";
import { useContextValue } from "../../Context/Contect";
import { useDisclosure } from "@chakra-ui/react";
import { FaRegEdit,FaRegEye } from "react-icons/fa";
import { BookingDetailsModel } from "./BookingDetailsModel";
import { EditBooking } from "./EditBooking";
import { updateBookedRoom } from "../../api-service/BookingService";
import { Pagination } from "../Components/Section/Pagination";
import { useSearchParams } from "react-router-dom";

export const BookingTable = ({ BookingList,total,getBooking}) => {
  const [searcParamPages,setSearchParamsPages ] = useSearchParams();
  let initialPage = searcParamPages.get("bookingPage")
  const [page,setPage] = useState(+initialPage||1)
  const { showToast } = AlertToastMessage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openType,setOpenType] = useState("");
  const [booking, setBooking] = useState({});

  const handleOpenViewModale = (booking) => {
    setOpenType("view")
    setBooking(booking);
    onOpen();
  };
  const handleOpenEditModale = (booking) => {
    setOpenType("edit")
    setBooking(booking);
    onOpen();
  };
  const handleCancel = async(id) => {
try {
    const response = await updateBookedRoom(id,{
        booking_status: "Cancelled"
    });
   
    if(response.status){
      showToast("Booking cancel alert", "Booking has been cancelled", "success");
     const result = await getBooking();
     console.log({
      result
     });
     
    }
    
} catch (error) {
    console.log({
        message: "Failed to cancel booking",
        error,
  
    });
    
}
  };
  const handelBooked = async id => {
    try {
      const response = await updateBookedRoom(id,{
          booking_status: "Booked"
      });
     
      if(response.status){
        showToast("Booking cancel alert", "Booking has been cancelled", "success");
        getBooking();
      }
      
  } catch (error) {
      console.log({
          message: "Failed to cancel booking",
          error,
    
      });
      
  }
  }

  const HandleChangePage = (currentPage) => {
    setPage((prev) => prev + currentPage);
  };

  useEffect(() => {
    let Params = {};
    page && (Params.bookingPage = page);
    setSearchParamsPages(Params);
  },[page]);


  return BookingList.length<=0?(<div className="">
     <div className="w-full flex justify-center items-center text-2xl font-semibold">
                  <p>No Booking found.</p>
                </div>
  </div>): (
     <div className="w-full md:w-[96%] m-auto overflow-x-auto">
     <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
       <thead className="bg-blue-500 text-white">
         <tr>
           <th className="py-3 px-6 text-left">User name</th>
           <th className="py-3 px-6 text-left">Hotel name</th>
           <th className="py-3 px-6 text-left">Room type</th>
           <th className="py-3 px-6 text-left">Booking Status</th>
           <th className="py-3 px-6 text-left">Details</th>
           {/* <th className="py-3 px-6 text-left">Edit</th> */}
           <th className="py-3 px-6 text-left">Toggle</th>

         </tr>
       </thead>
       <tbody className="text-gray-700">
         {BookingList?.map((booking, index) => (
           <tr
             key={index}
             className="border-b hover:bg-gray-100 transition-colors"
           >
             <td className="py-3 px-6 whitespace-nowrap">
            {booking?.userDetails?.name|| "unknown"}
             </td>
             <td className="py-3 px-6 whitespace-nowrap">
               {booking?.hotelDetails?.hotel_name || "Taj Hotel"}
             </td>
             <td className="py-3 px-6 whitespace-nowrap">
        
              {
                booking?.selectedRoom?.map(room=>{
                    return <span className="ml-4" key={room?.roomType}>{room.roomType} ({room. numberOfRoom})</span>  // replace with your actual room type field name
 
                })
              }
             </td>
             <td className={`py-3 px-6 whitespace-nowrap ${booking?.booking_status==="Cancelled"?"text-red-500":booking?.booking_status==="CheckOut"?"text-green-500":"text-primary"}`}>
               {booking?.booking_status || "Booked"}
             </td>
             <td className="py-3 px-6 whitespace-nowrap flex items-center cursor-pointer hover:text-blue-500">
             <FaRegEye onClick={()=>handleOpenViewModale(booking)} className="ml-4 font-bold text-2xl"/>
             </td>
          
             <td className="py-3 px-6 whitespace-nowrap">
            
               {booking?.booking_status=="Booked"?<button
                  className=" hover:underline text-red-400 hover:text-red-500 px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => handleCancel(booking?._id)}
                >
                    cancel
                </button>:booking?.booking_status=="CheckOut"?
                <button
                  className="  text-primary hover:text-primary px-2 py-1 rounded-md cursor-pointer"
                >
                   Done
                </button>:<button onClick={()=>handelBooked(booking?._id)}
                  className="  text-primary hover:text-primary px-2 py-1 rounded-md cursor-pointer"
                >
                    Check In
                </button>}
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     <div className="flex justify-center my-8 gap-4 items-center m-auto mx-4 w-[100%] md:w-[94%]">
              <Pagination
                HandleChangePage={HandleChangePage}
                page={page}
                total={total}
              />
            </div>
     {openType=="edit"&&<EditBooking isOpen={isOpen} onClose={onClose} booking={booking} />}
     {openType=="view"&&<BookingDetailsModel isOpen={isOpen} onClose={onClose} booking={booking} />}
   </div>
  );
};
