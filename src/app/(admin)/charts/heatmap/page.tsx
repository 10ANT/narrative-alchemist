import { Metadata } from "next";
import AllHeatmapChart from "./components/AllHeatmapChart";
import TopBar from "@/components/layout/TopBar";

export const metadata: Metadata = { title: "Apex Heatmap Charts" };

const HeatmapChart = () => {
  return (
    <>
      <AllHeatmapChart />
    </>
  );
};

export default HeatmapChart;
