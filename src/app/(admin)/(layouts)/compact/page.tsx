import { Metadata } from "next";
import Compact from "./components/Compact";

export const metadata: Metadata = { title: "Compact" };

const CompactPage = () => {
  return <Compact />;
};

export default CompactPage;
