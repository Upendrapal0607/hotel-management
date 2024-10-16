import axios from "axios";
import { base_url } from "../api/api";
// const token
const Ckecktoken = localStorage.getItem("UserToken");

const token =
  (Ckecktoken !== "undefined" &&
    JSON.parse(localStorage.getItem("UserToken"))) ||
  "";
export const getAllUsers = async (paramObject) => {
  try {
    const userList = await axios.get(`${base_url}auth/users`,paramObject);
    return userList?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const userRegister = async (payload, registerAs) => {
  try {
    let userData = {};
    if (!registerAs)
      userData = await axios.post(`${base_url}auth/register`, payload);
    else userData = await axios.post(`${base_url}auth/admin/register`, payload);
  
    return userData?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const userUpdateProfile = async (payload) => {};

export const userLogin = async (payload) => {
  try {
    let userData = {};
    if (!payload?.loginAs)
      userData = await axios.post(`${base_url}auth/login`, payload);
    else userData = await axios.post(`${base_url}auth/admin/login`, payload);
    return userData?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const checkValidationToken = async () => {
  try {
    const response = await axios.post(
      `${base_url}auth/valid`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const UpdateProfile = async (payload, id) => {
  try {
    console.log({
      id
    });
    
    const userData = await axios.patch(`${base_url}auth/update/${id}`, payload);
    return userData?.data;
  } catch (error) {
    console.log(error?.response?.data);
    return error?.response?.data;
  }
};
export const blockUser = async (payload, id) => {
  try {
    const response = await axios.patch(`${base_url}auth/update/${id}`, payload);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
