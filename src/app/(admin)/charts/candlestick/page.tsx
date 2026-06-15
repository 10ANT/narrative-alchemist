import { Metadata } from "next";
import AllCandlestick from "./components/AllCandlestick";

export const metadata: Metadata = { title: "Apex Candlestick Charts" };

const Candlestick = () => {
  return (
    <>
      <AllCandlestick />
    </>
  );
};

export default Candlestick;
