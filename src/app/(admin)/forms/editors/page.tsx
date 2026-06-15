import { Metadata } from "next";
import AllEditors from "./components/AllEditors";

export const metadata: Metadata = { title: "Editors" };

const EditorsPage = () => {
  return (
    <>
      <AllEditors />
    </>
  );
};

export default EditorsPage;
