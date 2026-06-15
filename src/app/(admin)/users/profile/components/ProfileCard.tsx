import avatar1 from "@/assets/images/users/avatar-1.jpg";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import Image from "next/image";
import { Card, CardBody } from "react-bootstrap";

const ProfileCard = () => {
  return (
    <Card>
      <CardBody className="bg-picture">
        <div className="d-flex align-items-top">
          <Image
            src={avatar1}
            className="flex-shrink-0 rounded-circle avatar-xl img-thumbnail float-start me-3"
            alt="profile-image"
          />
          <div className="flex-grow-1 overflow-hidden">
            <h4 className="m-0 lh-base">Nowak Helme</h4>
            <p className="text-muted">
              <i>Web Designer</i>
            </p>
            <p>
              Hi, I'm a passionate and creative web designer with a keen eye for
              aesthetics and functionality. I specialize in crafting visually
              stunning and user-friendly websites that leave a lasting
              impression. With expertise in design tools, coding, and responsive
              layouts, I bring ideas to life, ensuring seamless experiences
              across devices.
            </p>
            <ul className="social-list list-inline mt-3 mb-0">
              <li className="list-inline-item">
                <a
                  href=""
                  className="social-list-item border border-primary text-primary rounded-circle p-1 fs-20 d-flex justify-content-center align-items-center"
                >
                  <IconifyIcon icon="tabler:brand-facebook" />
                </a>
              </li>
              &nbsp;
              <li className="list-inline-item">
                <a
                  href=""
                  className="social-list-item border border-danger text-danger rounded-circle p-1 fs-20 d-flex justify-content-center align-items-center"
                >
                  <IconifyIcon icon="tabler:brand-google" />
                </a>
              </li>
              &nbsp;
              <li className="list-inline-item">
                <a
                  href=""
                  className="social-list-item border border-info text-info rounded-circle p-1 fs-20 d-flex justify-content-center align-items-center"
                >
                  <IconifyIcon icon="tabler:brand-twitter" />
                </a>
              </li>
              &nbsp;
              <li className="list-inline-item">
                <a
                  href=""
                  className="social-list-item border border-secondary text-secondary rounded-circle p-1 fs-20 d-flex justify-content-center align-items-center"
                >
                  <IconifyIcon icon="tabler:brand-github" />
                </a>
              </li>
            </ul>
          </div>
          <div className="clearfix" />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
