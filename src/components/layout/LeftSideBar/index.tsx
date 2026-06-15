"use client";
import LogoBox from "@/components/LogoBox";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import SimplebarReactClient from "@/components/wrappers/SimplebarReactClient";
import React, { Suspense } from "react";
import AppMenu from "./components/AppMenu";
import FallbackLoading from "@/components/FallbackLoading";
import { getMenuItems } from "@/helpers/Manu";
import Image from "next/image";
import avatar1 from "@/assets/images/users/avatar-1.jpg";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { useLayoutContext } from "@/context/useLayoutContext";
import HoverMenuToggle from "./components/HoverMenuToggle";

const LeftSideBar = () => {
  const menuItems = getMenuItems();

  const { mainMenu, changeMainMenuSize } = useLayoutContext();

  const changeMenu = () => {
    if (mainMenu.size == "default") {
      changeMainMenuSize("condensed");
    } else if (mainMenu.size == "full") {
      changeMainMenuSize("default");
    }
  };

  return (
    <div className="sidenav-menu">
      <LogoBox />
      <HoverMenuToggle />
      {/* <button  className="button-sm-hover">
        <IconifyIcon icon='ri:circle-line' className="align-middle" />
      </button>
      <button onClick={() => changeMainMenuSize('sm-hover')} className="button-sm-hover">
        <IconifyIcon icon='ri:circle-line' className="align-middle" />
      </button> */}
      <button onClick={changeMenu} className="sidenav-toggle-button">
        <IconifyIcon icon="ri:menu-5-line" className="fs-20" />
      </button>
      {/* <button className="button-close-fullsidebar">
        <IconifyIcon icon='ti:x' className="align-middle" />
      </button> */}

      <SimplebarReactClient data-simplebar>
        <div className="sidenav-user">
          <Dropdown className="dropdown-center text-center">
            <DropdownToggle
              as={"a"}
              className="topbar-link text-reset drop-arrow-none px-2"
              data-bs-toggle="dropdown"
              type="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <Image
                src={avatar1}
                width={46}
                className="rounded-circle"
                alt="user-image"
              />
              <span className="d-flex gap-1 sidenav-user-name my-2">
                <span>
                  <span className="mb-0 fw-semibold lh-base fs-15">
                    Nowak Helme
                  </span>
                  <p className="my-0 fs-13 text-muted">Admin Head</p>
                </span>
                <IconifyIcon
                  icon="ri:arrow-down-s-line"
                  className="d-block sidenav-user-arrow align-middle"
                />
              </span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownHeader className="noti-title">
                <h6 className="text-overflow m-0">Welcome !</h6>
              </DropdownHeader>
              <DropdownItem>
                <IconifyIcon
                  icon="ri:account-circle-line"
                  className="me-1 fs-16 align-middle"
                />
                <span className="align-middle">My Account</span>
              </DropdownItem>
              <DropdownItem>
                <IconifyIcon
                  icon="ri:wallet-3-line"
                  className="me-1 fs-16 align-middle"
                />
                <span className="align-middle">
                  Wallet : <span className="fw-semibold">$89.25k</span>
                </span>
              </DropdownItem>
              <DropdownItem>
                <IconifyIcon
                  icon="ri:settings-2-line"
                  className="me-1 fs-16 align-middle"
                />
                <span className="align-middle">Settings</span>
              </DropdownItem>
              <DropdownItem>
                <IconifyIcon
                  icon="ri:question-line"
                  className="me-1 fs-16 align-middle"
                />
                <span className="align-middle">Support</span>
              </DropdownItem>
              <div className="dropdown-divider" />
              <DropdownItem>
                <IconifyIcon
                  icon="ri:lock-line"
                  className="me-1 fs-16 align-middle"
                />
                <span className="align-middle">Lock Screen</span>
              </DropdownItem>
              <DropdownItem className=" active fw-semibold text-danger">
                <IconifyIcon
                  icon="ri:logout-box-line"
                  className="me-1 fs-16 align-middle"
                />
                <span className="align-middle">Sign Out</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Suspense fallback={<FallbackLoading />}>
          <AppMenu menuItems={menuItems} />
        </Suspense>

        <div className="help-box text-center">
          <h5 className="fw-semibold fs-16">Unlimited Access</h5>
          <p className="mb-3 text-muted">
            Upgrade to plan to get access to unlimited reports
          </p>
          <a href="javascript: void(0);" className="btn btn-danger btn-sm">
            Upgrade
          </a>
        </div>
        <div className="clearfix" />
      </SimplebarReactClient>
    </div>
  );
};

export default LeftSideBar;
