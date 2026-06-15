import { Metadata } from "next";
import AllRadarChart from "./components/AllRadarChart";

export const metadata: Metadata = { title: "Apex Radar Charts" };

const RadarChart = () => {
  return (
    <>
      <AllRadarChart />
    </>
  );
};

export default RadarChart;
