"use client";
import "@/assets/scss/app.scss";
import AppProvidersWrapper from "@/components/wrappers/AppProvidersWrapper";
import Footer from "@/components/layout/Footer";
import HorizontalNavBar from "@/components/layout/HorizontalNav/page";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { useLayoutContext } from "@/context/useLayoutContext";
import { getHorizontalMenuItems } from "@/helpers/Manu";
import { ChildrenType } from "@/types/component-props";
import { Card } from "react-bootstrap";

const AdminInner = ({ children }: ChildrenType) => {
  const { orientation } = useLayoutContext();
  const menuItems = getHorizontalMenuItems();

  return (
    <>
      {orientation === "vertical" ? (
        <div className="wrapper">
          <TopBar />
          <LeftSideBar />
          <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="searchModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content bg-transparent">
                <form>
                  <Card className="mb-1">
                    <div className="px-3 py-2 d-flex flex-row align-items-center" id="top-search">
                      <IconifyIcon icon="ri:search-line" className="fs-22" />
                      <input type="search" className="form-control border-0" id="search-modal-input" placeholder="Search for actions, people," />
                      <button type="submit" className="btn p-0" data-bs-dismiss="modal" aria-label="Close">[esc]</button>
                    </div>
                  </Card>
                </form>
              </div>
            </div>
          </div>
          <div className="page-content">
            <div className="page-container">{children}</div>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <TopBar />
          <HorizontalNavBar menuItems={menuItems} />
          <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="searchModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content bg-transparent">
                <form>
                  <Card className="mb-1">
                    <div className="px-3 py-2 d-flex flex-row align-items-center" id="top-search">
                      <IconifyIcon icon="ri:search-line" className="fs-22" />
                      <input type="search" className="form-control border-0" id="search-modal-input" placeholder="Search for actions, people," />
                      <button type="submit" className="btn p-0" data-bs-dismiss="modal" aria-label="Close">[esc]</button>
                    </div>
                  </Card>
                </form>
              </div>
            </div>
          </div>
          <div className="page-content">
            <div className="page-container">{children}</div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

const AdminWrapper = ({ children }: ChildrenType) => {
  return (
    <AppProvidersWrapper>
      <AdminInner>{children}</AdminInner>
    </AppProvidersWrapper>
  );
};

export default AdminWrapper;
