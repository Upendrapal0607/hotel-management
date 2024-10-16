import React, { useState } from 'react'
import { BookingTable } from './BookingTable'
import LoadingSpinner from '../../utils/Loader';
import { getBookedRoom } from '../../api-service/BookingService';
import { useLocation, useSearchParams } from 'react-router-dom';

export const BookingManage = () => {
    const [BookingList,setBookingList] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [total,setTotal] = useState(5)
    const [searcParamPages,setSearchParamsPages] = useSearchParams();
  const location = useLocation()
    const getBooking = async () => {
const paramObject = {
    params: {
      page: +searcParamPages.get("bookingPage"),
    },
  };
        setIsLoading(true)
        const bookingData = await getBookedRoom(paramObject);
        try {
            if (bookingData?.status) {
                setTotal(bookingData?.totalPages||1);
                setBookingList(bookingData?.bookingList ||[])
                setIsLoading(false);
            }
        } catch (error) {
            setBookingList([]);
            console.log(error.message);
            setIsLoading(false);
        }
    }
        
    
    React.useEffect(() => {  
        getBooking()
    },[location.search]);

  return (
    isLoading ? (
        <LoadingSpinner />
      ) :<div>
        <BookingTable BookingList = {BookingList} total = {total} getBooking = {getBooking}/>
    </div>
  )
}
