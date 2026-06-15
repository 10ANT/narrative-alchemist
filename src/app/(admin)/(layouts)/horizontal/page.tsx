import { Metadata } from "next";
import Horizontal from "./components/Horizontal";

export const metadata: Metadata = { title: "Horizontal" };

const HorizontalPage = () => {
  return <Horizontal />;
};

export default HorizontalPage;
