import React, { useState } from "react";
import { HotelForm } from "./HotelForm";
import { useContextValue } from "../../Context/Contect";
import { Editable, useDisclosure } from "@chakra-ui/react";
import { HotelTable } from "./HotelTable";
import { AddHotel } from "./AddHotel";
import Loader from "../../Element/Loader";
import { UserManage } from "./UserManage";
import { BookingManage } from "./BookingManage";
import LoadingSpinner from "../../utils/Loader";
import { useLocation, useSearchParams } from "react-router-dom";


export const Hotel = () => {
  const { GetHoletList, hotelList } = useContextValue();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionFormate, setActiveFormat] = useState("manage_hotel");
  const [searcParamPages,setSearchParamsPages] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(1);
const location = useLocation()
  React.useEffect(() => {
    (async () => {
      const paramObject = {
        params: {
          page: +searcParamPages.get("page"),
        },
      };
  
      setIsLoading(true);
      const data = await GetHoletList(paramObject);
      setTotal(data?.totalPages || 1);
      setIsLoading(false);
    })();
  }, [location.search]);

  return (
    <div className="flex gap-1 flex-col min-h-screen">
      <div className="w-full flex">
        <div className="w-full flex">
          <div className="w-full m-auto px-4 py-2 grid grid-cols-2 md:grid-cols-4 md:justify-center justify-start gap-6 items-center mb-6 bg-headerColor rounded-lg shadow-md">
            <button
              onClick={() => setActiveFormat("manage_user")}
              className="bg-primary px-6 py-2 text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300 cursor-pointer shadow-sm"
            >
              Users
            </button>
            <button
              onClick={() => setActiveFormat("manage_booking")}
              className="bg-primary px-6 py-2 text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300 cursor-pointer shadow-sm"
            >
              Bookings
            </button>
            <button
              onClick={() => onOpen()}
              className="bg-primary px-6 py-2 text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300 cursor-pointer shadow-sm"
            >
              Add Hotel
            </button>
            <button
              onClick={() => setActiveFormat("manage_hotel")}
              className="bg-primary px-6 py-2 text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300 cursor-pointer shadow-sm"
            >
              Hotel
            </button>
          </div>
        </div>
        <>
          <AddHotel isOpen={isOpen} onClose={onClose} />
        </>
      </div>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          {actionFormate == "manage_hotel" ? (
            <div className="w-full min-h-[200px] flex items-center bg-red">
              {hotelList?.length <= 0 ? (
                <div className="w-full flex justify-center items-center text-2xl font-semibold">
                  <p>No hotel found. Add one now.</p>
                </div>
              ) : (
                <HotelTable hotelList={hotelList} total = {total}/>
              )}
            </div>
          ) : actionFormate == "manage_booking" ? (
          
        
                <div>
                  <BookingManage/>
            </div>
            
             )
  
           : (
            <div>
                <div className="">
                  <UserManage />
                </div>
           
            </div>
          )}
        </>
      )}
    </div>
  );
};
