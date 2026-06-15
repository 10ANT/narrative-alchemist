import { Metadata } from "next";
import AllGoogleMap from "./components/AllGoogleMap";

export const metadata: Metadata = { title: "Google Maps" };

const GoogleMaps = () => {
  return (
    <>
      <AllGoogleMap />
    </>
  );
};

export default GoogleMaps;
