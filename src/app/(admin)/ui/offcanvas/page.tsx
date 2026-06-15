import TopBar from "@/components/layout/TopBar";
import { Metadata } from "next";
import AllOffcanvas from "./components/AllOffcanvas";

export const metadata: Metadata = { title: "OffCanvas" };

const Offcanvas = () => {
  return (
    <>
      <AllOffcanvas />
    </>
  );
};

export default Offcanvas;
