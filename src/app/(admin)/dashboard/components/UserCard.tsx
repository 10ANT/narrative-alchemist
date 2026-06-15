import IconifyIcon from "@/components/wrappers/IconifyIcon";
import Image from "next/image";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import { userCardData } from "../data";

const UserCard = () => {
  return (
    <Row className="row-cols-xxl-5 row-cols-md-2 row-cols-1">
      {userCardData.map((item, idx) => (
        <Col key={idx}>
          <Card>
            <CardBody className="d-flex align-items-center gap-2">
              <Image
                src={item.image}
                alt="team-member-image"
                className="me-1 avatar-xl img-thumbnail rounded-circle"
              />
              <div>
                <h5>{item.name}</h5>
                <p className="text-muted">{item.position}</p>
                <p className="m-0 fs-14">
                  {item.feedback_count}+ Feedbacks{" "}
                  <a href="#!" className="link-reset fw-medium">
                    <IconifyIcon icon="tabler:arrow-right" />
                  </a>
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default UserCard;
