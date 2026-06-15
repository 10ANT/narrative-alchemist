import { Metadata } from "next";
import AllCollapse from "./components/AllCollapse";

export const metadata: Metadata = { title: "Collapse" };

const CollapsePage = () => {
  return (
    <>
      <AllCollapse />
    </>
  );
};

export default CollapsePage;
