import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useContextValue } from "../Context/Contect";
import { SearchHotel } from "./Hotel/SearchHotel";
import { HotelCard } from "./Hotel/HotelCard";
import Loader from "../Element/Loader";
import { Pagination } from "./Components/Section/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const { hotelList, GetHoletList, loginType } = useContextValue();
  if (loginType == "Admin") { 
    navigate("/admin/dashboard");
  }
  const [searchParams, setSeachParams] = useSearchParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [pageSearchParam, setpageSearchPram] = useSearchParams();
  const initoalPage = pageSearchParam.get("page");
  const [page, setPage] = useState(+initoalPage || 1);
  const [total, setTotal] = useState(1);

  const fetchData = async () => {
    const paramObject = {
      params: {
        roomType: searchParams.get("roomType"),
        hotelCategory: searchParams.get("hotelCategory"),
        priceRange: searchParams.get("priceRange"),
        fromDate: searchParams.get("fromDate"),
        toDate: searchParams.get("toDate"),
        hotelLocation: searchParams.get("hotelLocation"),
        page: +pageSearchParam.get("page"),
        limit: +pageSearchParam.get("limit"),
      },
    };

    try {
      setLoading(true);
      const response = await GetHoletList(paramObject);
      setTotal(response?.totalPages || 1);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    const Params = {};
    page && (Params.page = page);
    setSeachParams(Params);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [location?.search]);

  const HandleChangePage = (currentPage) => {
    setPage((prev) => prev + currentPage);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fined hotel section */}
      <div className="flex flex-col justify-center items-center  bg-gray-100 my-6 w-[100%] md:w-[94%]  m-auto">
        <SearchHotel />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <main className="py-4 px-2">
          {hotelList.length == 0 ? (
            <div>
              <div className="w-full flex justify-center items-center text-2xl font-semibold">
                <p>No hotel found search other</p>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-6 w-[100%] md:w-[94%]  m-auto">
              {hotelList?.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}
          {hotelList.length !== 0 && (
            <div className="flex justify-center my-8 gap-4 items-center m-auto mx-4 w-[100%] md:w-[94%]">
              <Pagination
                HandleChangePage={HandleChangePage}
                page={page}
                total={total}
                isHome={ true}
              />
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Home;
