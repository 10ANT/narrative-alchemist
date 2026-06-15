import { Metadata } from "next";
import AllLeaflet from "./components/AllLeaflet";

export const metadata: Metadata = { title: "Leaflet Maps" };

const LeafletMaps = () => {
  return (
    <>
      <AllLeaflet />
    </>
  );
};

export default LeafletMaps;
