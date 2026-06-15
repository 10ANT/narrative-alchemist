import FunnelChart from "./components/FunnelChart";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Apex Funnel Charts" };

const FunnelPage = () => {
  return (
    <>
      <FunnelChart />
    </>
  );
};

export default FunnelPage;
