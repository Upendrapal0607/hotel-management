import { useState } from "react";

export const usePage = (currentPage, currentLimit) => {
  const [page, setPage] = useState(currentPage);
  const [limit, setLimet] = useState(currentLimit);
  const HandelPageChange = (page) => {
    page ? setPage(page) : setPage((prev) => prev + 1);
  };

  const handleLimitChange = (limit) => {
    limit ? setLimet(limit) : setLimet((prev) => prev + 10);
  };
  return {
    page,
    limit,
    handleLimitChange,
    HandelPageChange,
  };
};
