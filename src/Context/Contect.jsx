import React, { createContext, useContext, useState } from "react";
import { userLogin } from "../api-service/UserService";
import { getHotel } from "../api-service/HotelServices";
import { AlertToastMessage } from "../Element/Alert";

export const CreateContext = createContext();

// Context Provider component
export const ContextProvider = ({ children }) => {
  const [userDetails, setUserdetails] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [loginType, setLoginType] = useState("User");
  const [imageUrl, setImageUrl] = useState(null);
  const [hotelList, setHotelList] = useState([]);
  const { showToast } = AlertToastMessage();

  const loginUser = async (payload) => {
    const Ckecktoken = localStorage.getItem("UserToken");
    const token =
      (Ckecktoken !== "undefined" &&
        JSON.parse(localStorage.getItem("UserToken"))) ||
      "";
    if (token) {
      const user = JSON.parse(localStorage.getItem(`UserInfo`));

      setUserdetails(user);
      setIsLogin(true);
      setLoginType(user.userType);

      return;
    }
    if (!payload) return;

    const data = await userLogin(payload);
    try {
      if (data.status) {
        if (data?.isBlock) {
          showToast(
            "User block error",
            "You are blocked by admin contact for unblock",
            "warning"
          );
          return;
        }
        localStorage.setItem("UserToken", JSON.stringify(data?.token));
        localStorage.setItem(
          "UserInfo",
          JSON.stringify({
            name: data.user.name,
            email: data.user.email,
            userId: data.user._id,
            gender: data?.user?.gender,
            profile_photo: data?.user.profile_photo,
            address: data?.user?.address,
            userType: data?.userType,
          })
        );
        setUserdetails(data?.user);
        setIsLogin(true);
        setLoginType(payload.loginAs ? "Admin" : "User");
        showToast("Success", data?.message, "success");
        return data;
      } else {
        showToast("Credential error", data?.error?.message, "error");
        setIsLogin(false);
        return data;
      }
    } catch (error) {
      showToast("Validation Error", "Something went wront try again", "error");
      setIsLogin(false);
    }
  };
  const logOutUser = async () => {
    setIsLogin(false);
    localStorage.clear(`UserToken`);
    setUserdetails({});
  };

  const GetHoletList = async (payload) => {
    const data = await getHotel(payload);
    try {
      if (data.status) {
        setHotelList(data.hotelList);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CreateContext.Provider
      value={{
        loginUser,
        userDetails,
        setImageUrl,
        imageUrl,
        loginType,
        isLogin,
        logOutUser,
        hotelList,
        GetHoletList,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

// Hook to consume context
export const useContextValue = () => {
  const context = useContext(CreateContext);
  if (context === undefined) {
    throw new Error("useContextValue must be used within a ContextProvider");
  }
  return context;
};
