import logoDark from "@/assets/images/logo-dark.png";
import logo from "@/assets/images/logo.png";
import avatar1 from "@/assets/images/users/avatar-1.jpg";
import { Metadata } from "next";
import Image from "next/image";
import { Card, Col, Row } from "react-bootstrap";

export const metadata: Metadata = { title: "Lock Screen" };

const LockScreenPage = () => {
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
            <h4 className="fw-semibold mb-4 fs-20">Welcome Back</h4>
            <div className="text-center">
              <Image
                src={avatar1}
                alt="avatar1"
                className="avatar-xl rounded-circle img-thumbnail"
              />
              <div className="mt-2 mb-3">
                <h4 className="fw-semibold">Hi ! Nowak Helme.</h4>
                <p className="mb-0 fst-italic text-muted">
                  Enter your password to access the admin.
                </p>
              </div>
            </div>
            <form action="/" className="text-start mb-3">
              <div className="mb-3">
                <label className="form-label" htmlFor="lock-password">
                  Enter Password
                </label>
                <input
                  type="password"
                  id="lock-password"
                  name="lock-password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="mb-2 d-grid">
                <button className="btn btn-primary fw-semibold" type="submit">
                  Access to Screen
                </button>
              </div>
            </form>
            <p className="text-muted fs-14 mb-0">
              Not you? return{" "}
              <a href="/auth/login" className="fw-semibold text-danger ms-1">
                Login !
              </a>
            </p>
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

export default LockScreenPage;
