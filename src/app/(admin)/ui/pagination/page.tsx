import { Metadata } from "next";
import AllPagination from "./components/AllPagination";

export const metadata: Metadata = { title: "Pagination}" };

const Pagination = () => {
  return (
    <>
      <AllPagination />
    </>
  );
};

export default Pagination;
