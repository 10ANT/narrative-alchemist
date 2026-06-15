import { Metadata } from "next";
import AllScatterChart from "./components/AllScatterChart";

export const metadata: Metadata = { title: "Apex Scatter Charts" };

const ScatterChart = () => {
  return (
    <>
      <AllScatterChart />
    </>
  );
};

export default ScatterChart;
