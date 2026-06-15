import { Metadata } from "next";
import { Col, Row } from "react-bootstrap";
import BrandsListingCard from "./components/BrandsListingCard";
import OrdersChart from "./components/OrdersChart";
import SellingProductsCard from "./components/SellingProductsCard";
import Stat from "./components/Stat";
import Statistics from "./components/Statistics";
import TotalRevenue from "./components/TotalRevenue";
import UserCard from "./components/UserCard";

export const metadata: Metadata = { title: "Dashboard" };

const DashboardPage = () => {
  return (
    <>
      <Stat />
      <Row>
        <Col xxl={4} xl={6}>
          <OrdersChart />
        </Col>
        <Col xxl={4} xl={6}>
          <Statistics />
        </Col>
        <Col xxl={4} xl={12}>
          <TotalRevenue />
        </Col>
      </Row>
      <UserCard />
      <Row>
        <Col xxl={6}>
          <BrandsListingCard />
        </Col>
        <Col xxl={6}>
          <SellingProductsCard />
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
