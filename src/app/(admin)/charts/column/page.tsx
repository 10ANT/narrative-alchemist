import { Metadata } from "next";
import AllColumnChart from "./Components/AllColumnChart";

export const metadata: Metadata = { title: "Apex Column Charts" };

const ColumnChart = () => {
  return (
    <>
      <AllColumnChart />
    </>
  );
};

export default ColumnChart;
