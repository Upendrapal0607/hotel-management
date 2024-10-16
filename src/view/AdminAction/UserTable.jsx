import React, { useEffect, useState } from "react";
import { AlertToastMessage } from "../../Element/Alert";
import { blockUser } from "../../api-service/UserService";
import { Pagination } from "../Components/Section/Pagination";
import { useLocation, useSearchParams } from "react-router-dom";

export const UserTable = ({ users, getUsers,total}) => {
  const { showToast } = AlertToastMessage();
  const [searcParamPages,setSearchParamsPages] = useSearchParams();
  const initial = searcParamPages.get("userPage")
  const [page, setPage] = useState(+initial||1);

  const handleBlockUser = async (e, user, email) => {
    const payload = {
      status: user.status === "active" ? "block" : "active",
    };
    const response = await blockUser(payload, user._id);

    try {
      if (response?.status) {
        getUsers();
        if (e.target.checked) {
          showToast(
            "User block alert",
            `User email ${email}  has been unblocked`,
            "success"
          );
        } else {
          showToast(
            "User block alert",
            `User email ${email} has been blocked`,
            "success"
          );
        }
      } else {
        showToast("User block alert", "User has not been blocked", "error");
      }
    } catch (error) {
      console.log(error);
      showToast("User block alert", "User has not been blocked", "error");
    }
  };


  const HandleChangePage = (currentPage) => {
    setPage((prev) => prev + currentPage);
  };
  useEffect(() => {
    let Params = {};
    page && (Params.userPage = page);
    setSearchParamsPages(Params);
  },[page]);
  return (
    <div className="w-full md:w-[96%] m-auto overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left">S. N.</th>
            {/* <th className="py-3 px-6 text-left">Image</th> */}
            <th className="py-3 px-6 text-left">name</th>
            <th className="py-3 px-6 text-left">email</th>
            <th className="py-3 px-6 text-left">Gender</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Block</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users?.map((user, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 transition-colors"
            >
              <td className="py-3 px-6 whitespace-nowrap">{index + 1}</td>
              {/* <td className="py-3 px-6 whitespace-nowrap">
                  {user.image?
                <span>
                  <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user?.image}
                  alt={user?.name}
                  />
                </span>
                :
                <span className="p-3 text-xs font-semibold w-10 h-10 rounded-full object-cover bg-gray-200">
              {user?.name?.split(" ")[0][0].toUpperCase() +" "+ user?.name?.split(" ")[1][0].toUpperCase()}
                </span>}
              </td> */}
              <td className="py-3 px-6 whitespace-nowrap">{user?.name}</td>
              <td className="py-3 px-6 whitespace-nowrap">{user?.email}</td>
              <td className="py-3 px-6 whitespace-nowrap">{user?.gender}</td>
              <td
                className={`py-3 px-6 whitespace-nowrap ${
                  user?.status == "active" ? "text-green-600" : "text-red-500"
                }`}
              >
                {user?.status}
              </td>

              <td className="py-3 px-6 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={user?.status !== "active"}
                  onChange={(e) => handleBlockUser(e, user, user.email)}
                />
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
    </div>
  );
};
