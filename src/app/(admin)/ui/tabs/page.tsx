import { Metadata } from "next";
import AllTabs from "./components/AllTabs";

export const metadata: Metadata = { title: "Tabs" };

const Tabs = () => {
  return (
    <>
      <AllTabs />
    </>
  );
};

export default Tabs;
