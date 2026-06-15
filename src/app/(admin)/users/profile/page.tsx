import React from "react";
import ProfileCard from "./components/ProfileCard";
import Members from "./components/Members";
import Reminders from "./components/Reminders";
import Comments from "./components/Comments";
import { Col, Row } from "react-bootstrap";
import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";

export const metadata: Metadata = { title: "Profile" };

const ProfilePage = () => {
  return (
    <>
      <Row>
        <Col md={8}>
          <ProfileCard />
          <Comments />
        </Col>
        <Col md={4}>
          <Members />
          <Reminders />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
