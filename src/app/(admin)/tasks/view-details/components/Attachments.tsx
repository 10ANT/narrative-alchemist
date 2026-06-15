import FileUpload from "@/components/FileUpload";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import {
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";

const Attachments = () => {
  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center border-bottom border-dashed">
        <h5 className="header-title">Attachments</h5>
        <Dropdown align={"end"} className="float-end">
          <DropdownToggle
            as={"a"}
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
            <DropdownItem className=" text-danger">
              <IconifyIcon icon="tabler:trash" className="me-1" />
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody>
        <FileUpload title="Add Customer Photo" />
      </CardBody>
    </Card>
  );
};

export default Attachments;
