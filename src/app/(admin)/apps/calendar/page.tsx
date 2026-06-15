import type { Metadata } from "next";
import { Row } from "react-bootstrap";
import CalendarPage from "./components/CalendarPage";
import TopBar from "@/components/layout/TopBar";

export const metadata: Metadata = { title: "Calender" };

const Schedule = () => {
  return (
    <>
      <Row>
        <CalendarPage />
      </Row>
    </>
  );
};

export default Schedule;
