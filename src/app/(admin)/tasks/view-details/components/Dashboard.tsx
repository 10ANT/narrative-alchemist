import avatar2 from "@/assets/images/users/avatar-2.jpg";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "react-bootstrap";

const Dashboard = () => {
  return (
    <Card>
      <CardHeader className="border-bottom border-dashed">
        <div className="d-flex justify-content-between">
          <div>
            <h4 className="mb-1">Adminto Admin Dashboard Re-design</h4>
            <p className="fw-semibold mb-0">
              <span className="badge bg-danger">Urgent</span>{" "}
            </p>
          </div>
          <Dropdown align="end">
            <DropdownToggle
              as="a"
              className="drop-arrow-none card-drop"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IconifyIcon icon="ri:more-2-fill" className="fs-18" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>
                <IconifyIcon icon="tabler:paperclip" className="me-1" />
                Attachment
              </DropdownItem>
              <DropdownItem>
                <IconifyIcon icon="tabler:pencil" className="me-1" />
                Edit
              </DropdownItem>
              <DropdownItem>
                <IconifyIcon icon="tabler:copy" className="me-1" />
                Mark as Duplicate
              </DropdownItem>
              <div className="dropdown-divider" />
              <DropdownItem className="text-danger">
                <IconifyIcon icon="tabler:trash" className="me-1" />
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={4} sm={6}>
            <div className="d-flex align-items-start">
              <div className="me-2 align-self-center">
                <IconifyIcon icon="ri:hashtag" className="h2 m-0 text-muted" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="mb-1 text-muted fs-12">Task ID</p>
                <h5 className="m-0 text-truncate">#MN2048</h5>
              </div>
            </div>
          </Col>
          <Col lg={4} sm={6}>
            <div className="d-flex align-items-start">
              <div className="me-2 align-self-center">
                <Image
                  src={avatar2}
                  alt="avatar2"
                  className="avatar-sm rounded-circle"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="mb-1 text-muted fs-12">Assign to</p>
                <h5 className="m-0 text-truncate">Darnell McCormick</h5>
              </div>
            </div>
          </Col>
          <Col lg={4} sm={6}>
            <div className="d-flex align-items-start">
              <div className="me-2 align-self-center">
                <IconifyIcon
                  width={16}
                  height={16}
                  icon="ri:calendar-event-line"
                  className="h2 m-0 text-muted"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="mb-1 text-muted fs-12">Due Date</p>
                <h5 className="m-0 text-truncate">Today 10 AM</h5>
              </div>
            </div>
          </Col>
        </Row>
        <div className="mt-4">
          <div>
            <h5>Overview:</h5>
            <p className="text-muted">
              We've completely redesigned and enhanced our admin dashboard to
              provide a more intuitive, efficient, and user-friendly experience.
              With a modern interface, improved navigation, and responsive
              design, the new dashboard offers a seamless experience across all
              devices, ensuring smoother workflows and enhanced functionality
              for all users
            </p>
            <div className="mt-3">
              <h5>Tags :</h5>
              <div>
                <a href="#" className="badge badge-soft-primary p-1">
                  Photoshop
                </a>
                &nbsp;
                <a href="#" className="badge badge-soft-primary p-1">
                  Html
                </a>
                &nbsp;
                <a href="#" className="badge badge-soft-primary p-1">
                  Css
                </a>
                &nbsp;
                <a href="#" className="badge badge-soft-primary p-1">
                  Bootstrap
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h5>Checklists/Sub-tasks</h5>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="checklistcheck01"
              />
              <label
                className="form-check-label strikethrough"
                htmlFor="checklistcheck01"
              >
                Find out the old contract documents
              </label>
            </div>
            <div className="form-check mt-1">
              <input
                className="form-check-input"
                type="checkbox"
                id="checklistcheck02"
              />
              <label
                className="form-check-label strikethrough"
                htmlFor="checklistcheck02"
              >
                Organize meeting sales associates to understand need in detail
              </label>
            </div>
            <div className="form-check mt-1">
              <input
                className="form-check-input"
                type="checkbox"
                id="checklistcheck03"
              />
              <label
                className="form-check-label strikethrough"
                htmlFor="checklistcheck03"
              >
                Make sure to cover every small details
              </label>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
