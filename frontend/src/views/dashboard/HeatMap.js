import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Paper, Typography } from "@mui/material";
import MainApi from "/api/MainApi";

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
    // console.log(newData);
  }

  return newData;
}

const HeatMap = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    MainApi.cfrmOrderCount((data) => {
      const formattedData = data.map((item) => {
        const weekLabel = item[0];
        const values = item.slice(1); // 제외한 숫자 데이터만 추출

        return {
          name: weekLabel,
          data: formatData(values),
        };
      });

      setChartData(formattedData);
    }, []);
  }, []);

  return (
    <Paper elevation={3} style={{ padding: "15px" }}>
      <Typography variant="h5" style={{ padding: "10px 10px 0px 15px" }}>
        출강주별 공장 확통결정 현황
      </Typography>
      <ReactApexChart
        options={options}
        series={chartData}
        type="heatmap"
        height="280"
        width="100%"
      />
    </Paper>
  );
};
export default HeatMap;
