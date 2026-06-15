import logoDark from "@/assets/images/logo-dark.png";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { Card, Col, Row } from "react-bootstrap";

const RegisterPage = () => {
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
            <h4 className="fw-semibold mb-3 fs-18">Sign Up to your account</h4>
            <form action="/" className="text-start mb-3">
              <div className="mb-3">
                <label className="form-label" htmlFor="example-name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="example-name"
                  name="example-name"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="example-email">
                  Email
                </label>
                <input
                  type="email"
                  id="example-email"
                  name="example-email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="example-password">
                  Password
                </label>
                <input
                  type="password"
                  id="example-password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkbox-signin"
                  />
                  <label className="form-check-label" htmlFor="checkbox-signin">
                    I agree to all{" "}
                    <a
                      href="#!"
                      className="link-dark text-decoration-underline"
                    >
                      Terms &amp; Condition
                    </a>{" "}
                  </label>
                </div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary fw-semibold" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-nuted fs-14 mb-0">
              Already have an account?{" "}
              <a href="/auth/login" className="fw-semibold text-danger ms-1">
                Login !
              </a>
            </p>
          </Card>
          <p className="mt-4 text-center mb-0">
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

export default RegisterPage;
