import { Metadata } from "next";
import AllBoxplotChart from "./components/AllBoxplotChart";

export const metadata: Metadata = { title: "Apex Boxplot Charts" };

const BoxplotChart = () => {
  return (
    <>
      <AllBoxplotChart />
    </>
  );
};

export default BoxplotChart;
