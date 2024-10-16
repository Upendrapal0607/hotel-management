import axios from "axios";
import { base_url } from "../api/api";
export const getBookedRoom = async (paramObject) => {
  try {
    const response = await axios.get(`${base_url}booking/` , paramObject);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
export const getUserBookedRoom = async (userId) => {
  try {
    const response = await axios.post(`${base_url}booking/`,{userId});
    return response?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const BookedRoom = async (payload) => {
  try {
    const response = await axios.post(`${base_url}booking/add`, payload);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const updateBookedRoom = async (id, payload) => {
  try {
    const response = await axios.patch(
      `${base_url}booking/cancel/${id}`, payload);
      console.log({
        response,
      });
      
    return response?.data;
  } catch (error) {
    console.error('Error updating booked room:', error?.response?.data || error.message);
    return error?.response?.data;
  }
};
