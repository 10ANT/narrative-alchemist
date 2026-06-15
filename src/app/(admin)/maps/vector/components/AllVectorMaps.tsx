"use client";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import dynamic from "next/dynamic";

import { Col, Row } from "react-bootstrap";
import { getWorldMapOptions } from "./data";

const BaseVectorMap = dynamic(() => import('@/components/VectorMap/BaseVectorMap'), { ssr: false })
const WorldMapMarkerLine = dynamic(() => import('./WorldMapMarkerLine'), { ssr: false })
const USAVectorMap = dynamic(() => import('./USAVectorMap'), { ssr: false })
const CanadaVectorMap = dynamic(() => import('./CanadaVectorMap'), { ssr: false })
const RussiaVectorMap = dynamic(() => import('./RussiaVectorMap'), { ssr: false })
const IraqVectorMap = dynamic(() => import('./IraqVectorMap'), { ssr: false })
const SpainVectorMap = dynamic(() => import('./SpainVectorMap'), { ssr: false })
const IndiaVectorMap = dynamic(() => import('./IndiaVectorMap'), { ssr: false })

const GlobalWorldVectorMap = () => {
  return (
    <ComponentContainerCard title="World Vector Map">
      <BaseVectorMap id="world-map" options={getWorldMapOptions()} style={{ height: 360 }} />
    </ComponentContainerCard>
  );
};

const WorldVectorMap2 = () => {
  return (
    <ComponentContainerCard title="World Vector Map">
      <WorldMapMarkerLine />
    </ComponentContainerCard>
  );
};

const IndiaVectorMaps = () => {
  return (
    <ComponentContainerCard title="India Vector Map">
      <IndiaVectorMap />
    </ComponentContainerCard>
  );
};

const CanadaVectorMaps = () => {
  return (
    <ComponentContainerCard title="Canada Vector Map">
       <CanadaVectorMap />
    </ComponentContainerCard>
  );
};

const RussiaVectorMaps = () => {
  return (
    <ComponentContainerCard title="Russia Vector Map">
     <RussiaVectorMap />
    </ComponentContainerCard>
  );
};

const USVectorMaps = () => {
  return (
    <ComponentContainerCard title="US Vector Map">
      <USAVectorMap />
    </ComponentContainerCard>
  );
};
const IraqVectorMaps = () => {
  return (
    <ComponentContainerCard title="Iraq Vector Map">
     <IraqVectorMap />
    </ComponentContainerCard>
  );
};
const SpainVectorMaps = () => {
  return (
    <ComponentContainerCard title="Spain Vector Map">
      <SpainVectorMap />
    </ComponentContainerCard>
  );
};

const AllVectorMaps = () => {
  return (
    <Row>
      <Col lg={6}>
        <GlobalWorldVectorMap />
      </Col>
      <Col lg={6}>
        <WorldVectorMap2 />
      </Col>
      <Col lg={6}>
          <IndiaVectorMaps />
      </Col>
      <Col lg={6}>
        <CanadaVectorMaps />
      </Col>
      <Col lg={6}>
        <RussiaVectorMaps />
      </Col>
      <Col lg={6}>
        <USVectorMaps />
      </Col>
      <Col lg={6}>
        <IraqVectorMaps />
      </Col>
      <Col lg={6}>
        <SpainVectorMaps />
      </Col>
    </Row>
  );
};

export default AllVectorMaps;
