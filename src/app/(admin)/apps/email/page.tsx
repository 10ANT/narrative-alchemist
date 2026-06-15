import { Metadata } from "next";
import EmailArea from "./components/EmailArea";

export const metadata: Metadata = { title: "Inbox" };

const EmailPage = () => {
  return (
    <>
      <div className="d-flex gap-2">
        <EmailArea />
      </div>
    </>
  );
};

export default EmailPage;
