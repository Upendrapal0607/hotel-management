import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertToastMessage } from "../../Element/Alert";

export const SearchHotel = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  let initialRoomType = searchParams.get("roomType");
  const [roomType, setRoomType] = useState(initialRoomType || "");
  let initialHotelCategory = searchParams.get("hotelCategory");
  const [hotelCategory, setHotelCategory] = useState(
    initialHotelCategory || ""
  );
  let initialPriceRange = searchParams.get("priceRange");
  const [priceRange, setPriceRange] = useState(initialPriceRange || "");
  let initialFromDate = searchParams.get("fromDate");
  const [fromDate, setFromDate] = useState(initialFromDate || "");
  let initialToDate = searchParams.get("toDate");
  const [toDate, setToDate] = useState(initialToDate || "");
  let initialLimit = searchParams.get("limit");
const [limit, setLimit] = useState(+initialLimit || 20)
  let initialHotelLocation = searchParams.get("hotelLocation");
  const [hotelLocation, setHotelLocation] = useState(
    initialHotelLocation || ""
  );
  const today = new Date().toISOString().split("T")[0];
  const { showToast } = AlertToastMessage();

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

  // Handle changes in the "To Date" input
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

  const handleSearch = () => {
    let Params = {};
    roomType && (Params.roomType = roomType);
    hotelCategory && (Params.hotelCategory = hotelCategory);
    priceRange && (Params.priceRange = priceRange);
    limit && (Params.limit = limit);
    fromDate && (Params.fromDate = fromDate);
    toDate && (Params.toDate = toDate);
    hotelLocation && (Params.hotelLocation = hotelLocation);
    setSeachParams(Params);
  };

  // Reset all filter and search if require

  // const handleReset = () => {
  //   setSeachParams({});
  //   setRoomType("");
  //   setHotelCategory("");
  //   setPriceRange("");
  //   setFromDate("");
  //   setToDate("");
  //   setHotelLocation("");
  // };
  return (
    <div className="w-full lg:w-[94%] mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Room Type:
          </label>
          <select
            onChange={(e) => setRoomType(e.target.value)}
            value={roomType}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full"
          >
            <option value="">All</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Family">Family</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Hotel Category:
          </label>
          <select
            value={hotelCategory}
            onChange={(e) => setHotelCategory(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full"
          >
            <option value="">All</option>
            <option value="1-star">1 Star</option>
            <option value="3-star">3 Star</option>
            <option value="5-star">5 Star</option>
          </select>
        </div>

        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price range:
          </label>
          <select
            onChange={(e) => setPriceRange(e.target.value)}
            value={priceRange}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full"
          >
            <option value="">All</option>
            <option value="2000">Bellow 2000</option>
            <option value="2000-4000">2000-4000</option>
            <option value="4000-6000">4000-6000</option>
            <option value="6000-8000">6000-8000</option>
            <option value="8000-10000">8000-10000</option>
            <option value="10000">Above 10000</option>
          </select>
        </div>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Limit range:
          </label>
          <select
            onChange={(e) => setLimit(e.target.value)}
            value={limit}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full"
          >
            <option value="20">Default</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
          </select>
        </div>

        <div>

        </div>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row items-start lg:items-center gap-4 ">
        <input
          onChange={(e) => setHotelLocation(e.target.value)}
          value={hotelLocation}
          type="text"
          placeholder="Search by location"
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full  sm:w-[355px]"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-[100px]"
        >
          Search
        </button>
      </div>
    </div>
  );
};
