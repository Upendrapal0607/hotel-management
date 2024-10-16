import React from "react";
import { useContextValue } from "../../Context/Contect";
export const AdminRouterProvider = ({ children }) => {
  const { isLogin,loginType } = useContextValue();
  if (!isLogin) {
    window.location.pathname= "/admin/login"
  }
  if (loginType=="User") {
    window.location.pathname= "/"
  };

  return children;
};
