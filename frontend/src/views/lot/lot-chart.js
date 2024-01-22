import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LotChart = ({ open, handleClose, sumValue }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "기투입 차트",
        font: {
          family: "JalnanGothic",
        },
      },

    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "JalnanGothic",
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "JalnanGothic",
          },
        },
      },
    },
  };
  const labels = ["970m", "1270m", "1570m", "1570m~"];
  const data = {
    labels,
    datasets: [
      {
        label: "1공장(ton)",
        data: [
          sumValue.width_9701_sum,
          sumValue.width_12701_sum,
          sumValue.width_15701_sum,
          sumValue.width_over_15701_sum,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "2공장(ton)",
        data: [
          sumValue.width_9702_sum,
          sumValue.width_12702_sum,
          sumValue.width_15702_sum,
          sumValue.width_over_15702_sum,
        ],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const optionStand = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "투입대기 차트",
        font: {
          family: "JalnanGothic",
        },
      },

    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "JalnanGothic",
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "JalnanGothic",
          },
        },
      },
    },
  };
  const dataStand = {
    labels,
    datasets: [
      {
        label: "대기량(ton)",
        data: [
          sumValue.width_970_stand_sum,
          sumValue.width_1270_stand_sum,
          sumValue.width_1570_stand_sum,
          sumValue.width_over_1570_stand_sum,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const test = {
    labels: ["투입대기(ton)", "기투입(ton)"],
    datasets: [
      {
        label: "합계량",
        data: [
          sumValue.width_970_stand_sum +
          sumValue.width_1270_stand_sum +
          sumValue.width_1570_stand_sum +
          sumValue.width_over_1570_stand_sum,
          sumValue.width_9701_sum +
          sumValue.width_12701_sum +
          sumValue.width_15701_sum +
          sumValue.width_over_15701_sum +
          sumValue.width_9702_sum +
          sumValue.width_12702_sum +
          sumValue.width_15702_sum +
          sumValue.width_over_15702_sum,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%" }}
      maxWidth="xl"
    >
      <DialogTitle>
        <Grid item xs={12}>
          <Typography variant="h5">출강Lot 전체 차트</Typography>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingTop: "15px",
            }}
          >
            <div>
              <Card style={{
                width: 400,
                height: 200
              }}>
                <Bar options={optionStand} data={dataStand} />
              </Card>
              <Card style={{
                width: 400,
                height: 200
              }}>
                <Bar options={options} data={data} />
              </Card>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <Card style={{
                width: 400,
                height: 400,
              }}>
                <Doughnut data={test} />
              </Card>
            </div>

          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default LotChart;
