import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const FactoryGuage = () => {
  const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper
      elevation={6}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "15px",
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
    </Paper>
  );
};
export default FactoryGuage;
