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
import { Bar, Pie } from "react-chartjs-2";
import DashBoardApi from "src/api/DashBoardApi";
import { Paper, Typography, Grid, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import StatisticsCard from "src/views/dashboard/StatisticsCard";
import Trophy from "src/views/dashboard/Trophy";
import CardStatisticsVerticalComponent from "src/@core/components/card-statistics/card-stats-vertical";
import Poll from "mdi-material-ui/Poll";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";
import BriefcaseVariantOutline from "mdi-material-ui/BriefcaseVariantOutline";
import SalesByCountries from "src/views/dashboard/SalesByCountries";
import DepositWithdraw from "src/views/dashboard/DepositWithdraw";

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
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
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
        <Grid item xs={12} md={6} lg={4} sx={{ paddingBottom: 4 }}>
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
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="$25.6k"
                icon={<Poll />}
                color="success"
                trendNumber="+42%"
                title="Total Profit"
                subtitle="Weekly Profit"
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="$78"
                title="Refunds"
                trend="negative"
                color="secondary"
                trendNumber="-15%"
                subtitle="Past Month"
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="862"
                trend="negative"
                trendNumber="-18%"
                title="New Project"
                subtitle="Yearly Project"
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="15"
                color="warning"
                trend="negative"
                trendNumber="-18%"
                subtitle="Last Week"
                title="Sales Queries"
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
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
