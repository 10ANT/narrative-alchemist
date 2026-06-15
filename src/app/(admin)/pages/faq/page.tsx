import { Metadata } from "next";
import Faqs from "./components/Faqs";

export const metadata: Metadata = { title: "FAQ" };

const FaqPage = () => {
  return (
    <>
      <Faqs />
    </>
  );
};

export default FaqPage;
