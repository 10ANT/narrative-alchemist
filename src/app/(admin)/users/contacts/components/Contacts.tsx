import IconifyIcon from "@/components/wrappers/IconifyIcon";
import Image from "next/image";
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "react-bootstrap";
import { contactsData } from "../data";

const Contacts = () => {
  return (
    <Row>
      {contactsData.map((item, idx) => (
        <Col xl={3} sm={6} key={idx}>
          <Card className="text-center">
            <CardBody>
              <Dropdown align={"end"} className="float-end">
                <DropdownToggle
                  as="a"
                  className="text-body content-none pb-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <IconifyIcon icon="tabler:dots-vertical" className="fs-22" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Image
                src={item.avatar}
                className="rounded-circle img-thumbnail avatar-xl mt-1"
                alt="profile-image"
              />
              <h4 className="mt-3 mb-1">
                <a href="/users/profile" className="text-dark">
                  {item.name}
                </a>
              </h4>
              <p className="text-muted">
                @{item.role} <span> | </span>
                <a href="#" className="text-danger">
                  {item.website}
                </a>
              </p>
              <ul className="list-inline mt-4 mb-2">
                <li className="list-inline-item">
                  <a
                    href=""
                    className="border border-primary text-primary rounded-circle p-1 fs-16 d-flex justify-content-center align-items-center"
                  >
                    <IconifyIcon icon="tabler:brand-facebook" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href=""
                    className="border border-danger text-danger rounded-circle p-1 fs-16 d-flex justify-content-center align-items-center"
                  >
                    <IconifyIcon icon="tabler:brand-google" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href=""
                    className="border border-info text-info rounded-circle p-1 fs-16 d-flex justify-content-center align-items-center"
                  >
                    <IconifyIcon icon="tabler:brand-twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href=""
                    className="border border-secondary text-secondary rounded-circle p-1 fs-16 d-flex justify-content-center align-items-center"
                  >
                    <IconifyIcon icon="tabler:brand-github" />
                  </a>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Contacts;
