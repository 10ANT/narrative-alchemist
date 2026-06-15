import { Metadata } from "next";
import FIleManager from "./components/FIleManager";

export const metadata: Metadata = { title: "File Manager" };

const FileManagerPage = () => {
  return (
    <>
      <FIleManager />
    </>
  );
};

export default FileManagerPage;
