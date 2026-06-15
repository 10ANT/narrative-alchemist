import { Metadata } from "next";
import Slope from "./components/Slope";

export const metadata: Metadata = { title: "Apex Slope Charts" };

const slopePage = () => {
  return (
    <>
      <Slope />
    </>
  );
};

export default slopePage;
