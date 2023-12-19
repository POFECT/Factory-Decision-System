import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import DashBoardApi from "src/api/DashBoardApi";

const InputStatusBar = () => {
  const [labels, setLabels] = useState([]);
  const [inputStatusData, setInputStatusData] = useState([]);

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
  }, []);

  return (
    <Card>
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
    </Card>
  );
};
export default InputStatusBar;
