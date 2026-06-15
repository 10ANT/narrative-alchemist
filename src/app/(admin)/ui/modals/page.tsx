import { Metadata } from "next";
import AllModal from "./components/AllModal";

export const metadata: Metadata = { title: "Modals" };

const Modals = () => {
  return (
    <>
      <AllModal />
    </>
  );
};

export default Modals;
