import { Metadata } from "next";
import AllAreaChart from "./components/AllAreaChart";

export const metadata: Metadata = { title: "Apex Area Chart" };

const Area = () => {
  return (
    <>
      <AllAreaChart />
    </>
  );
};

export default Area;
