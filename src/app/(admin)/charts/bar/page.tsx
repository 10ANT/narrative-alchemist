import { Metadata } from "next";
import AllBarChart from "./components/AllBarChart";

export const metadata: Metadata = { title: "Apex Bar Charts" };

const BarChart = () => {
  return (
    <>
      <AllBarChart />
    </>
  );
};

export default BarChart;
