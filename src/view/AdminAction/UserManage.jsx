import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api-service/UserService";
import LoadingSpinner from "../../utils/Loader";
import { UserTable } from "./UserTable";
import { useLocation, useSearchParams } from "react-router-dom";

export const UserManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [total, setTotal] = useState(1);
  // const [searcParamPages,setSearchParamsPages] = useSearchParams();
  const [searcParamPages,setSearchParamsPages] = useSearchParams();
const location = useLocation();
  const getUsers = async () => {
    const paramObject = {
      params: {
        page: +searcParamPages.get("userPage"),
      },
    };

    setIsLoading(true);
    try {
      const users = await getAllUsers(paramObject);
      if (users.status) {
        setTotal(users?.totalPages);
        setUsersList(users.users);
        setIsLoading(false);
      } else {
        setUsersList([])
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [location.search]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <UserTable users={usersList} getUsers={getUsers} total = {total}/>
    </div>
  );
};
