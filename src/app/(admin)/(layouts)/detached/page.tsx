import { Metadata } from "next";
import Detached from "./components/Detached";

export const metadata: Metadata = { title: "Detached" };

const page = () => {
  return (
    <>
      <Detached />
    </>
  );
};

export default page;
