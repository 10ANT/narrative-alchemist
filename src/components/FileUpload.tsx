import { Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import DropzoneFormInput from "./form/DropzoneFormInput";

const FileUpload = ({ title }: { title: string }) => {
  return (
    <>
      <CardBody>
        <DropzoneFormInput
          // iconProps={{ icon: '', height: 48, width: 48, className: 'mb-4 text-primary' }}
          text="Drop files here or click to upload."
          // helpText={<span className="text-muted fs-13 ">(1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed )</span>}
          showPreview
        />
      </CardBody>
    </>
  );
};

export default FileUpload;
