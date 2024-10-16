import axios from "axios";
import { base_url } from "../api/api";
import data from '../utils/db.json';
const TokenHeader = () => {
const Ckecktoken = localStorage.getItem("UserToken");
const token =
  (Ckecktoken !== "undefined" &&
    JSON.parse(localStorage.getItem("UserToken"))) ||
  "";
return {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
};

// for (let i = 0; i < data.length; i++) {
//   setTimeout( async () => {
//     const hotel = await axios.post(`${base_url}hotel/add`, data[i],TokenHeader());
//     console.log(hotel);

//   }, i*1000);
// }

export const getHotel = async (payload) => {
  try {
    const hotel_list = await axios.get(`${base_url}hotel`, payload);

    
    return hotel_list?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const getSingleHotel = async (id) => {
  try {
    const singleHotel = await axios.get(`${base_url}hotel/${id}`);
    return singleHotel?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const addHotel = async (payload) => {
  try {
    const hotel = await axios.post(`${base_url}hotel/add`, payload, TokenHeader());

    return hotel?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateHotel = async (payload, id) => {
  try {
    const updated_hotel = await axios.patch(
      `${base_url}hotel/update/${id}`,
      payload,
      TokenHeader()
    );
    return updated_hotel;
  } catch (error) {
    return error?.respons?.data;
  }
};

export const deleteHotel = async (id) => {
  try {
    const deleted_hotel = await axios.delete(
      `${base_url}hotel/delete/${id}`,
      TokenHeader()
    );
    return deleted_hotel?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
