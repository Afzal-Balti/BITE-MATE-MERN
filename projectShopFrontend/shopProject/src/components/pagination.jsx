import React from "react";
import { Pagination } from "antd";

const PaginationPage = ({ page, totalPages, setPage }) => {
  return (
    <>
      <Pagination
        className="w-full  text-xl gap-10 mb-6 py-5 "
        current={page}
        total={totalPages * 10}
        pageSize={10}
        onChange={(newPage) => setPage(newPage)}
        showSizeChanger={false}
      />
    </>
  );
};

export default PaginationPage;
