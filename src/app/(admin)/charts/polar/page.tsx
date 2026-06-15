import { Metadata } from "next";
import AllPolarChart from "./components/AllPolarChart";

export const metadata: Metadata = { title: "Apex Polar Area Charts" };

const PolarChart = () => {
  return (
    <>
      <AllPolarChart />
    </>
  );
};

export default PolarChart;
