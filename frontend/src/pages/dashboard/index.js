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
import { Paper, Typography, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EssentialStandardApi from "src/api/EssentialStandardApi";

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
      width: 50,
    },
    {
      field: "countA",
      headerName: "주문 처리 상태",
      width: 100,
    },
    {
      field: "countB",
      headerName: "가능통과공장 확정",
      width: 150,
    },
    {
      field: "countC",
      headerName: "가능통과공장 조치 필요",
      width: 150,
    },
    {
      field: "countD",
      headerName: "가능통과공장 확정",
      width: 150,
    },
    {
      field: "countE",
      headerName: "확정통과공장 확정",
      width: 150,
    },
    {
      field: "countF",
      headerName: "제조 투입",
      width: 150,
    },
  ];

  const changeRowData = orderInquiry.map((item, index) => ({
    id: index + 1,
    ...item,
  }));
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ paddingBottom: 4 }}>
          <Typography variant="h5">품종 별 투입 현황</Typography>
          <Paper>
            <Bar
              options={options}
              data={inputStatusChartData}
              style={{ width: "100%", height: "80%" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={8} sx={{ paddingBottom: 4 }}>
          <Typography variant="h5">주문 조회</Typography>
          <Paper>
            <div style={{ height: 400, padding: "30px" }}>
              <DataGrid
                rows={changeRowData}
                columns={columns}
                rowHeight={40}
                hideFooterPagination={true}
                hideFooter={true}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
