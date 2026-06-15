"use client";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { ApexOptions } from "apexcharts";
import { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Col, Row } from "react-bootstrap";
import {
  annotationsChartOpts,
  brushChartOpts,
  brushChartOpts2,
  createDailyTimeSeries,
  dashedLineChartOpts,
  generateNewPoint,
  getRealTimeChartOptions,
  gradientLineChartOpts,
  lineWithDataChartOpts,
  missingNullValuesChartOpts,
  simpleLineChartOpts,
  stepLineChartOpts,
  syncingChartOpts,
  syncingChartOpts2,
  zoomableTimeseriesChartOpts,
} from "../data";

type DataPoint = [number, number]

const SimpleLineChart = () => {
  return (
    <ComponentContainerCard title="Simple line chart">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={simpleLineChartOpts}
          series={simpleLineChartOpts.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const LineWithData = () => {
  return (
    <ComponentContainerCard title="Line with Data Labels">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={lineWithDataChartOpts}
          series={lineWithDataChartOpts.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const ZoomableTimeseries = () => {
  return (
    <ComponentContainerCard title="Zoomable Timeseries">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={zoomableTimeseriesChartOpts}
          series={zoomableTimeseriesChartOpts.series}
          type="area"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const AnnotationsChart = () => {
  return (
    <ComponentContainerCard title="Line Chart with Annotations">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={annotationsChartOpts}
          series={annotationsChartOpts.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const SyncingCharts = () => {
  return (
    <ComponentContainerCard title="Syncing charts">
      <ReactApexChart
        height={200}
        options={syncingChartOpts}
        series={syncingChartOpts.series}
        type="line"
        className="apex-charts"
      />
      <div dir="ltr">
        <ReactApexChart
          height={160}
          options={syncingChartOpts2}
          series={syncingChartOpts2.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const GradientLineChart = () => {
  return (
    <ComponentContainerCard title="Gradient Line Chart">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={gradientLineChartOpts}
          series={gradientLineChartOpts.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const MissingNullValuesChart = () => {
  return (
    <ComponentContainerCard title="Missing / Null values">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={missingNullValuesChartOpts}
          series={missingNullValuesChartOpts.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const DashedLineChart = () => {
  return (
    <ComponentContainerCard title="Dashed Line Chart">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={dashedLineChartOpts}
          series={dashedLineChartOpts.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const SteplineChart = () => {
  return (
    <ComponentContainerCard title="Stepline Chart">
      <div dir="ltr">
        <ReactApexChart
          height={344}
          options={stepLineChartOpts}
          series={stepLineChartOpts.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const BrushChart = () => {
  return (
    <ComponentContainerCard title="Brush Chart">
      <div dir="ltr">
        <ReactApexChart
          height={230}
          options={brushChartOpts}
          series={brushChartOpts.series}
          type="line"
          className="apex-charts"
        />
        <ReactApexChart
          height={130}
          options={brushChartOpts2}
          series={brushChartOpts2.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  );
};

const RealtimeChart = () => {
   const [series, setSeries] = useState<{ data: DataPoint[] }[]>([{ data: [] }])
  const [options, setOptions] = useState<ApexOptions>(() => getRealTimeChartOptions([]))

  const dataRef = useRef<DataPoint[]>([])
  const lastDateRef = useRef<number>(0)

  useEffect(() => {
    const initialData = createDailyTimeSeries(new Date('11 May 2024 GMT').getTime(), 10, { min: 10, max: 90 })
    dataRef.current = initialData
    lastDateRef.current = initialData[initialData.length - 1][0]

    setSeries([{ data: [...initialData] }])
    setOptions(getRealTimeChartOptions(initialData))

    const updateInterval = setInterval(() => {
      const newPoint = generateNewPoint(lastDateRef.current, {
        min: 10,
        max: 90,
      })
      lastDateRef.current = newPoint[0]
      dataRef.current.push(newPoint)
      setSeries([{ data: [...dataRef.current] }])
    }, 2000)

    const resetInterval = setInterval(() => {
      dataRef.current = dataRef.current.slice(-10)
      setSeries([{ data: [...dataRef.current] }])
    }, 60000)

    return () => {
      clearInterval(updateInterval)
      clearInterval(resetInterval)
    }
  }, [])
  return (
    <ComponentContainerCard title="Realtime Chart">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={options}
          series={series}
          type="line"
          className="apex-charts"
        />

      </div>
    </ComponentContainerCard>
  );
};

const AllLineChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <SimpleLineChart />
        </Col>
        <Col xl={6}>
          <LineWithData />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ZoomableTimeseries />
        </Col>
        <Col xl={6}>
          <AnnotationsChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <SyncingCharts />
        </Col>
        <Col xl={6}>
          <GradientLineChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <MissingNullValuesChart />
        </Col>
        <Col xl={6}>
          <DashedLineChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <SteplineChart />
        </Col>
        <Col xl={6}>
          <BrushChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <RealtimeChart />
        </Col>
      </Row>
    </>
  );
};

export default AllLineChart;
