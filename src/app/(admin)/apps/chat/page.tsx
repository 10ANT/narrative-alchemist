// import PageTitle from '@/components/PageTitle'
import TopBar from "@/components/layout/TopBar";
import ChatData from "./components/ChatData";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Chart" };

const ChatPage = () => {
  return (
    <>
      <ChatData />
    </>
  );
};

export default ChatPage;
