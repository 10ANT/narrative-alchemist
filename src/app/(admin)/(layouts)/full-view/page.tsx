import { Metadata } from "next";
import FullView from "./components/FullView";

export const metadata: Metadata = { title: "Full View" };

const FullViewPage = () => {
  return <FullView />;
};

export default FullViewPage;
