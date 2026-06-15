import { Metadata } from "next";
import FullScreenView from "./components/FullScreenView";

export const metadata: Metadata = { title: "Full Screen View" };

const FullScreenViewPage = () => {
  return <FullScreenView />;
};

export default FullScreenViewPage;
