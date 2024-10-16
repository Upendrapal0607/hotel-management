import React, { useEffect, useState } from "react";
import { deleteHotel } from "../../api-service/HotelServices";
import { AlertToastMessage } from "../../Element/Alert";
import { useContextValue } from "../../Context/Contect";
import { AddHotel } from "./AddHotel";
import { FaRegEdit,FaRegEye } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { ViewHotelModel } from "./ViewHotelModal";
import { Pagination } from "../Components/Section/Pagination";
import { useSearchParams } from "react-router-dom";

export const HotelTable = ({ hotelList,total }) => {
  const [searcParamPages,setSearchParamsPages] = useSearchParams();
  const initialPage = searcParamPages.get("page")
 const [page,setPage] = useState(+initialPage||1)
  const { showToast } = AlertToastMessage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hotel, setHotel] = useState({});
  const [viewHotel, setViewHotel] = useState("");
  const { GetHoletList } = useContextValue();
  const handleDeleteHotel = async (id) => {
    const response = await deleteHotel(id);
    try {
      if (response?.status == true) {
        showToast("Hotel delete alert", "Hotel has been deleted", "success");
        GetHoletList();
      } else {
        showToast("Hotel delete alert", response?.error?.message, "error");
      }
    } catch (error) {
      console.log({
        message: "Failed to delete hotel",
        error,
      });
      showToast("Hotel delete alert", "Hotel deleetion failed", "error");
    }
  };

  const handleOpenModale = (hotel,action) => {
    setHotel(hotel);
    setViewHotel(action)
    onOpen();
  };

  const HandleChangePage = (currentPage) => {
    setPage((prev) => prev + currentPage);
  };

  useEffect(() => {
    let Params = {};
    page && (Params.page = page);
    setSearchParamsPages(Params);
  },[page]);
  return (
    <div className="w-full md:w-[96%] m-auto overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Type</th>
            <th className="py-3 px-6 text-left">Details</th>
            <th className="py-3 px-6 text-left">Edit</th>
            <th className="py-3 px-6 text-left">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {hotelList?.map((hotel, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 transition-colors"
            >
              <td className="py-3 px-6 whitespace-nowrap">
                <img
                  className="w-10 h-10"
                  src={hotel?.hotel_image}
                  alt={hotel?.hotel_name}
                />
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                {hotel?.hotel_name}
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                {hotel?.hotel_category}
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                {hotel?.hotel_type}
              </td>
              <td className="py-3 px-6 whitespace-nowrap cursor-pointer hover:text-blue-500">
               <FaRegEye onClick={()=>handleOpenModale(hotel,"view")} className="ml-4 text-2xl"/>
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                <button
                  onClick={() => handleOpenModale(hotel,"addedit")}
                  className=" hover:underline text-primary px-2 py-1 rounded-md cursor-pointer"
                >
                 <FaRegEdit className="text-xl"/>
                </button>
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                <button
                  className=" hover:underline text-red-400 hover:text-red-500 px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => handleDeleteHotel(hotel?._id)}
                >
                <MdDelete className="text-2xl"/>
                </button>
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
     {viewHotel=="addedit"&&<AddHotel isOpen={isOpen} onClose={onClose} hotel={hotel} />}
     {viewHotel=="view"&&<ViewHotelModel hotel = {hotel} isOpen={ isOpen} onClose={ onClose}/>}
    </div>
  );
};
