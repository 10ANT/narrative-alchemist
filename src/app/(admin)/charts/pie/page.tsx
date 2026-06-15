import { Metadata } from "next";
import AllPieChart from "./components/AllPieChart";

export const metadata: Metadata = { title: "Apex Pie Charts" };

const PieChart = () => {
  return (
    <>
      <AllPieChart />
    </>
  );
};

export default PieChart;
