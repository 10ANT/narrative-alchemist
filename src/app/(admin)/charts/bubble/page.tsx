import { Metadata } from "next";
import AllBubbleChart from "./components/AllBubbleChart";

export const metadata: Metadata = { title: "Apex Bubble Charts" };

const BubbleChart = () => {
  return (
    <>
      <AllBubbleChart />
    </>
  );
};

export default BubbleChart;
