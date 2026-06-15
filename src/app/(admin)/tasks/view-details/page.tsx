import { Metadata } from "next";
import { Card, Col, Row } from "react-bootstrap";
import Attachments from "./components/Attachments";
import Components from "./components/Components";
import Dashboard from "./components/Dashboard";

export const metadata: Metadata = { title: "View Details" };

const ViewDetailsPage = () => {
  return (
    <>
      <Row>
        <Col xl={8}>
          <Dashboard />
          <Attachments />
        </Col>
        <Components />
      </Row>
      <div className="d-none" id="uploadPreviewTemplate">
        <Card className=" mb-2 shadow-none border">
          <div className="p-2">
            <Row className=" align-items-center">
              <Col xs={"auto"}>
                <img
                  data-dz-thumbnail
                  src="#"
                  className="avatar-sm rounded bg-light"
                  alt=""
                />
              </Col>
              <Col className="ps-0">
                <a href="" className="text-muted fw-bold" data-dz-name />
                <p className="mb-0" data-dz-size />
              </Col>
              <Col xs={"auto"}>
                <a
                  href=""
                  className="btn btn-link btn-lg text-muted"
                  data-dz-remove
                >
                  <i className="fe-x" />
                </a>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ViewDetailsPage;
