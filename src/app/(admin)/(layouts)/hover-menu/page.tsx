import { Metadata } from "next";
import HoverMenu from "./components/HoverMenu";

export const metadata: Metadata = { title: "Hover Menu" };

const HoverMenuPage = () => {
  return <HoverMenu />;
};

export default HoverMenuPage;
