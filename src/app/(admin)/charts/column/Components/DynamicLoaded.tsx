"use client";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import ApexCharts from "apexcharts";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

const DynamicLoaded = () => {
  useEffect(() => {
    /* ---------------- Utils ---------------- */
    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    /* ---------------- Raw Data ---------------- */
    const arrayData = [
      {
        y: 400,
        quarters: [
          { x: "Q1", y: 120 },
          { x: "Q2", y: 90 },
          { x: "Q3", y: 100 },
          { x: "Q4", y: 90 },
        ],
      },
      {
        y: 430,
        quarters: [
          { x: "Q1", y: 120 },
          { x: "Q2", y: 110 },
          { x: "Q3", y: 90 },
          { x: "Q4", y: 110 },
        ],
      },
      {
        y: 448,
        quarters: [
          { x: "Q1", y: 70 },
          { x: "Q2", y: 100 },
          { x: "Q3", y: 140 },
          { x: "Q4", y: 138 },
        ],
      },
      {
        y: 470,
        quarters: [
          { x: "Q1", y: 150 },
          { x: "Q2", y: 60 },
          { x: "Q3", y: 190 },
          { x: "Q4", y: 70 },
        ],
      },
      {
        y: 540,
        quarters: [
          { x: "Q1", y: 120 },
          { x: "Q2", y: 120 },
          { x: "Q3", y: 130 },
          { x: "Q4", y: 170 },
        ],
      },
      {
        y: 580,
        quarters: [
          { x: "Q1", y: 170 },
          { x: "Q2", y: 130 },
          { x: "Q3", y: 120 },
          { x: "Q4", y: 160 },
        ],
      },
    ];

    /* ---------------- Build Year Data ---------------- */
    const makeData = () => {
      const dataSet = shuffleArray([...arrayData]);

      return [
        {
          x: "2011",
          y: dataSet[0].y,
          color: "#5b69bc",
          quarters: dataSet[0].quarters,
        },
        {
          x: "2012",
          y: dataSet[1].y,
          color: "#35b8e0",
          quarters: dataSet[1].quarters,
        },
        {
          x: "2013",
          y: dataSet[2].y,
          color: "#10c469",
          quarters: dataSet[2].quarters,
        },
        {
          x: "2014",
          y: dataSet[3].y,
          color: "#fa5c7c",
          quarters: dataSet[3].quarters,
        },
        {
          x: "2015",
          y: dataSet[4].y,
          color: "#f9c851",
          quarters: dataSet[4].quarters,
        },
        {
          x: "2016",
          y: dataSet[5].y,
          color: "#39afd1",
          quarters: dataSet[5].quarters,
        },
      ];
    };

    /* ---------------- Update Quarter Chart ---------------- */
    const updateQuarterChart = (sourceChart: any) => {
      const selected = sourceChart.w.globals.selectedDataPoints[0];
      const yearSeries = sourceChart.w.config.series[0];

      if (!selected || selected.length === 0) {
        ApexCharts.exec("barQuarter", "updateSeries", [{ data: [] }]);
        return;
      }

      const series = selected.map((index: number) => ({
        name: yearSeries.data[index].x,
        data: yearSeries.data[index].quarters,
      }));

      const colors = selected.map(
        (index: number) => yearSeries.data[index].color,
      );

      ApexCharts.exec("barQuarter", "updateOptions", {
        series,
        colors,
        fill: { colors },
      });
    };

    /* ---------------- Year Chart ---------------- */
    const yearChart = new ApexCharts(document.querySelector("#chart-year"), {
      series: [{ data: makeData() }],
      chart: {
        id: "barYear",
        type: "bar",
        height: 400,
        toolbar: { show: false },
        events: {
          dataPointSelection: (_e: any, chart: any) => {
            updateQuarterChart(chart);
          },
          updated: (chart: any) => {
            updateQuarterChart(chart);
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          barHeight: "75%",
          dataLabels: {
            position: "bottom",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (_val: number, opts: any) =>
          opts.w.globals.labels[opts.dataPointIndex],
        style: { colors: ["#fff"] },
      },
      xaxis: {
        categories: ["2011", "2012", "2013", "2014", "2015", "2016"],
      },
      yaxis: { labels: { show: false } },
      title: {
        text: "Yearly Results",
        offsetX: 15,
      },
      subtitle: {
        text: "(Click on bar to see details)",
        offsetX: 15,
      },
    });

    yearChart.render();

    /* ---------------- Quarter Chart ---------------- */
    const quarterChart = new ApexCharts(
      document.querySelector("#chart-quarter"),
      {
        series: [{ data: [] }],
        chart: {
          id: "barQuarter",
          type: "bar",
          stacked: true,
          height: 400,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
        yaxis: { labels: { show: false } },
        title: {
          text: "Quarterly Results",
          offsetX: 10,
        },
        tooltip: {
          x: {
            formatter: (_: any, opts: any) =>
              opts.w.globals.seriesNames[opts.seriesIndex],
          },
        },
      },
    );

    quarterChart.render();

    /* ---------------- Cleanup ---------------- */
    return () => {
      yearChart.destroy();
      quarterChart.destroy();
    };
  }, []);

  return (
    <ComponentContainerCard title="Dynamic Loaded Chart">
      <Row>
        <Col sm={6}>
          <div id="chart-year" />
        </Col>
        <Col sm={6}>
          <div id="chart-quarter" />
        </Col>
      </Row>
    </ComponentContainerCard>
  );
};

export default DynamicLoaded;
