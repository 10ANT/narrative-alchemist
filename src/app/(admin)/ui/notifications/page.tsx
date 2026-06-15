import { Metadata } from "next";
import AllNotifications from "./components/AllNotifications";

export const metadata: Metadata = { title: "Notifications" };

const Notifications = () => {
  return (
    <>
      <AllNotifications />
    </>
  );
};

export default Notifications;
