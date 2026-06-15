import { Metadata } from "next";
import AllRadialBarChart from "./components/AllRadialBarChart";

export const metadata: Metadata = { title: "Apex RadialBar Charts" };

const RadialBar = () => {
  return (
    <>
      <AllRadialBarChart />
    </>
  );
};

export default RadialBar;
