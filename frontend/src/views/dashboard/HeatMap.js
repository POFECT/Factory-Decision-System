import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  chart: {
    height: 350,
    type: "heatmap",
  },
  plotOptions: {
    heatmap: {
      colorScale: {
        ranges: [
          {
            from: -1,
            to: 0,
            color: "#4caf50",
            name: "low",
          },
        ],
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
};

const series = [
  {
    name: "Fri",
    data: formatData([
      0, 0, 0, 0, 20, 40, 45, 45, 30, 20, 5, 5, 15, 35, 35, 20, 45, 40, 25, 5,
      20, 25, 40, 5,
    ]),
  },
  {
    name: "Thu",
    data: formatData([
      0, 0, 15, 10, 40, 25, 35, 25, 30, 10, 5, 5, 5, 20, 30, 30, 10, 15, 15, 5,
      55, 20, 20, 5,
    ]),
  },
  {
    name: "Wed",
    data: formatData([
      0, 0, 5, 10, 35, 25, 30, 30, 5, 20, 0, 0, 15, 10, 20, 5, 40, 25, 20, 30,
      45, 20, 15, 5,
    ]),
  },
  {
    name: "Tue",
    data: formatData([
      0, 0, 4, 0, 28, 28, 12, 28, 44, 28, 28, 8, 0, 8, 16, 32, 20, 36, 36, 44,
      28, 32, 4, 4,
    ]),
  },
  {
    name: "Mon",
    data: formatData([
      0, 4, 0, 4, 4, 0, 4, 12, 16, 24, 16, 8, 16, 4, 20, 32, 48, 44, 36, 36, 90,
      28, 8, 16,
    ]),
  },
];

function formatData(data) {
  let newData = [];
  let categories = [
    "7:00-7.30",
    "7:30-8.00",
    "8:00-8.30",
    "8:30-9.00",
    "9:00-9.30",
    "9:30-10.00",
    "10:00-10.30",
    "10:30-11.00",
    "11:00-11.30",
    "11:30-12.00",
    "12:00-12.30",
    "12:30-1.00",
    "1:00-1.30",
    "1.30-2.00",
    "2:00-2.30",
    "2:30-3.00",
    "3:00-3.30",
    "3:30-4.00",
    "4:00-4.30",
    "4:30-5.00",
    "5:00-5.30",
    "5:30-6.00",
    "6:00-6.30",
    "6:30-7.00",
  ];

  for (var i = 0; i < categories.length; i++) {
    newData.push({
      x: categories[i],
      y: data[i],
    });
  }

  if (typeof window !== "undefined") {
    console.log(newData);
  }

  return newData;
}

export default function HeatMap() {
  useEffect(() => {
    console.log("Component mounted on the client side");
  }, []);

  return (
    <>
      <Typography variant="h5" style={{ padding: "10px 10px 0px 15px" }}>
        출강주 별 공장 투입 건 수{" "}
      </Typography>
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height="350"
        width="100%"
      />
    </>
  );
}
