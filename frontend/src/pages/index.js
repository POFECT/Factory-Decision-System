import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DashBoardApi from "src/api/DashBoardApi";
import { Paper, Typography, Grid, Box, Card, Tabs, Tab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

import dynamic from "next/dynamic";
import WeeklyHeatMap from "src/views/dashboard/WeeklyHeatMap";
import HeatMap from "src/views/dashboard/HeatMap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function BarChart() {
  const [inputStatusData, setInputStatusData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [orderInquiry, setOrderInquiry] = useState([]);
  const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

  const options = {
    plugins: {
      title: {
        display: true,
        text: "품종 별 투입 현황",
      },
    },
  };
  const inputStatusChartData = {
    labels: labels,
    datasets: [
      {
        label: "품종",
        data: inputStatusData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    DashBoardApi.getDashBoardInputStatus((responseData) => {
      const newLabels = responseData.response.map((item) => item.ordPdtItpCdN);
      const newDatas = responseData.response.map((item) => item.count);
      setLabels(newLabels);
      setInputStatusData(newDatas);
    });
    DashBoardApi.getDashBoardOrderInquiry((responseData) => {
      setOrderInquiry(responseData.response);
    });
  }, []);

  const columns = [
    {
      field: "ordPdtItpCdN",
      headerName: "품종",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "countA",
      headerName: "주문 처리 상태",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "countB",
      headerName: "가능통과공장 확정",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "countC",
      headerName: "가능통과공장 조치 필요",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "countD",
      headerName: "가능통과공장 확정",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "countE",
      headerName: "확정통과공장 확정",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "countF",
      headerName: "제조 투입",
      width: 200,
      headerAlign: "center",
    },
  ];

  const changeRowData = orderInquiry.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Card>
            <HeatMap />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <WeeklyHeatMap />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ paddingBottom: 4 }}>
          <Paper>
            <Typography variant="h5" style={{ padding: "10px 10px 0px 15px" }}>
              품종 별 투입 현황
            </Typography>
            <Bar
              options={options}
              data={inputStatusChartData}
              style={{
                padding: "0px 15px 0px 15px",
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" style={{ padding: "10px 20px 10px 20px" }}>
              공장 부하 현황
            </Typography>
            <Box sx={{ width: "100%", marginBottom: "15px" }}>
              <Tabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where each tab needs to be selected manually"
              >
                <Tab label="제강" />
                <Tab label="열연" />
                <Tab label="열연정정" />
                <Tab label="냉각압연" />
                <Tab label="1차소둔" />
                <Tab label="2차소둔" />
                <Tab label="도금" />
                <Tab label="정정" />
              </Tabs>
            </Box>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <GaugeChart
                id="gauge-chart4"
                nrOfLevels={10}
                arcPadding={0.1}
                cornerRadius={3}
                percent={0.4}
                textColor={"black"}
                style={{ width: "33%" }}
              />
              <GaugeChart
                id="gauge-chart5"
                nrOfLevels={3}
                colors={["green", "orange", "red"]}
                arcWidth={0.3}
                percent={0.6}
                textColor={"black"}
                style={{ width: "33%" }}
              />
              <GaugeChart
                id="gauge-chart6"
                nrOfLevels={3}
                colors={["green", "orange", "red"]}
                arcWidth={0.3}
                percent={0.6}
                textColor={"black"}
                style={{ width: "33%" }}
              />
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h5" style={{ padding: "10px 20px 10px 20px" }}>
              주문 조회
            </Typography>
            <Box
              sx={{
                "& .custom-data-grid .MuiDataGrid-columnsContainer, & .custom-data-grid .MuiDataGrid-cell":
                  {
                    borderBottom: "1px solid rgba(225, 234, 239, 1)",
                    borderRight: "1px solid rgba(225, 234, 239, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                "& .custom-data-grid .MuiDataGrid-columnHeader": {
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(225, 234, 239, 1)",
                  borderRight: "1px solid rgba(225, 234, 239, 1)",
                },
                "& .custom-data-grid .MuiDataGrid-columnHeader--filledGroup  .MuiDataGrid-columnHeaderTitleContainer":
                  {
                    borderBottomStyle: "none",
                  },
              }}
              style={{
                height: 285,
                padding: "30px",
                padding: "0px 20px 30px 20px",
              }}
            >
              <DataGrid
                className="custom-data-grid"
                rows={changeRowData}
                columns={columns}
                rowHeight={40}
                hideFooterPagination={true}
                hideFooter={true}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
}
