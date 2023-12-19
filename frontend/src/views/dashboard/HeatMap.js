import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, Typography } from "@mui/material";

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
            color: "#8ECEFF",
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
    name: "제4 출강주",
    data: formatData([
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
    ]),
  },
  {
    name: "제3 출강주",
    data: formatData([
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
    ]),
  },
  {
    name: "제2 출강주",
    data: formatData([
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
    ]),
  },
  {
    name: "제1 출강주",
    data: formatData([
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
    ]),
  },
];

function formatData(data) {
  let newData = [];
  let categories = [
    "1제강",
    "2제강",
    "1열연",
    "2열연",
    "1열연정정",
    "2열연정정",
    "1PCM",
    "2PCM",
    "3PCM",
    "1CAL",
    "2CAL",
    "3CAL",
    "1ACL",
    "3ACL",
    "2EGL",
    "3EGL",
    "1RCL",
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
    <Card>
      <Typography variant="h5" style={{ padding: "10px 10px 0px 15px" }}>
        출강주 별 공장 투입 건 수
      </Typography>
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height="350"
        width="100%"
      />
    </Card>
  );
}
