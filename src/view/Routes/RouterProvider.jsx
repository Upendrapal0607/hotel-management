import React from "react";
import { useContextValue } from "../../Context/Contect";
export const RouterProvider = ({ children }) => {
  const { isLogin,loginType } = useContextValue();
  if (!isLogin) {
    window.location.pathname= "/login"
  }
  return children;
};
