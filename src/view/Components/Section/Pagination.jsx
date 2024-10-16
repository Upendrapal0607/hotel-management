import React from "react";
import { useSearchParams } from "react-router-dom";

export const Pagination = ({ page, total, HandleChangePage,isHome }) => {
  return (
    <div className=" flex gap-4">
      <button
        disabled={page == 1}
        onClick={() => HandleChangePage(-1)}
        className={`px-8 py-2 cursor-pointer rounded-lg ${isHome?"bg-black":"bg-blue-600"} text-white text-1xl font-semibold`}
      >
        Prev
      </button>
      <button className={`px-8 py-2 cursor-pointer rounded-lg ${isHome?"bg-black":"bg-blue-600"} text-white text-1xl font-semibold`}>
        {page}
      </button>
      <button
        disabled={page == total}
        onClick={() => HandleChangePage(1)}
        className={`px-8 py-2 cursor-pointer rounded-lg ${isHome?"bg-black":"bg-blue-600"} text-white text-1xl font-semibold`}
      >
        Next
      </button>
    </div>
  );
};
