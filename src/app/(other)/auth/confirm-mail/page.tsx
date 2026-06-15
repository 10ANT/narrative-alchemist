import logoDark from "@/assets/images/logo-dark.png";
import logo from "@/assets/images/logo.png";
import mailConfirmImg from "@/assets/images/png/mail-confirm.png";
import { Metadata } from "next";
import Image from "next/image";
import { Card, Col, Row } from "react-bootstrap";

export const metadata: Metadata = { title: "Confirm Mail" };

const ConfirmMailPage = () => {
  return (
    <div className="auth-bg d-flex min-vh-100">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xxl={3} lg={5} md={6}>
          <a href="/" className="auth-brand d-flex justify-content-center mb-2">
            <Image
              src={logoDark}
              alt="dark logo"
              height={26}
              className="logo-dark"
            />
            <Image
              src={logo}
              alt="logo light"
              height={26}
              className="logo-light"
            />
          </a>
          <p className="fw-semibold mb-4 text-center text-muted fs-15">
            Admin Panel Design by Coderthemes
          </p>
          <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
            <h4 className="fw-semibold mb-4 fs-20">Verify Your Account</h4>
            <Image
              src={mailConfirmImg}
              alt="img"
              width={86}
              className="mx-auto d-block"
            />
            <p className="text-muted fs-14 mt-2">
              {" "}
              A email has been send to <b>youremail@domain.com</b>. Please check
              for an email from company and click on the included link to reset
              your password.{" "}
            </p>
            <a href="/" className="btn d-block btn-primary mt-3">
              Back to Home
            </a>
          </Card>
          <p className="mt-3 text-center mb-0">
            © Adminto - By{" "}
            <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">
              Coderthemes
            </span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default ConfirmMailPage;
