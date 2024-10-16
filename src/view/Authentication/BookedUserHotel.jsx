import React from 'react'
import UserHotelCard from './UserHotelCard'

export const BookedUserHotel = ({userHotel,bookedHotel}) => {
  return (
    <div className="">
        <h1 className='text-2xl font-semibold my-12'>Your bookings</h1>
     {userHotel?.map(hotel =><UserHotelCard key={hotel?._id} data={hotel} bookedHotel = {bookedHotel} />)} 
    </div>
  )
}
