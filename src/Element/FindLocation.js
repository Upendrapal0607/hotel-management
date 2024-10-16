import React from "react";
import { useLocation } from "react-router-dom";
export const FindLocation = () => {
  const location = useLocation();
  const PathLocation = () => location;
  return { PathLocation };
};
