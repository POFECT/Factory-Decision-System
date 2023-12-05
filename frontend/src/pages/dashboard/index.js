import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import getDashBoardInputStatus from "src/api/DashBoardInputStatus";
import { Paper, Typography, Grid } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ... (imports and other code)

export default function BarChart() {
  const [inputStatusData, setInputStatusData] = useState([]);
  const [labels, setLabels] = useState([]);
  const options = {
    responsive: true,
    plugins: {
      // legend: {
      //   position: "top",
      // },
      title: {
        display: true,
        text: "품종 별 투입 현황",
      },
    },
  };
  const data = {
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
    getDashBoardInputStatus.getDashBoardInputStatus((responseData) => {
      const newLabels = responseData.response.map((item) => item.ordPdtItpCdN);
      const newDatas = responseData.response.map((item) => item.count);
      setLabels(newLabels);

      setInputStatusData(newDatas);
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "100%", marginLeft: "30px" }}>
          <Grid item xs={6} sx={{ paddingBottom: 4 }}>
            <Typography variant="h5">품종 별 투입 현황</Typography>
          </Grid>
          <Paper>
            <div className="contentWrap" style={{ padding: "30px" }}>
              <Bar options={options} data={data} />
            </div>
          </Paper>
        </div>
        <div style={{ width: "100%", marginLeft: "30px" }}>
          <Grid item xs={12} sx={{ paddingBottom: 4 }}>
            <Typography variant="h5">주문 조회</Typography>
          </Grid>
          <Paper>
            <div className="contentWrap" style={{ padding: "30px" }}>
              <Bar options={options} data={data} />
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
