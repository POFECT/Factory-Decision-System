import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CapacityStandardApi from "src/api/CapacityApi";

const FactoryGuage = () => {
  const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

  const [value, setValue] = useState(0);
  const [capacity, setCapacity] = useState([]);
  const [firstFac, setFirstFac] = useState({
    planQty: 1,
    progressQty: 0,
    check: false,
  });
  const [secondFac, setSecondFac] = useState({
    planQty: 1,
    progressQty: 0,
    check: false,
  });
  const [thirdFac, setThirdFac] = useState({
    planQty: 1,
    progressQty: 0,
    check: false,
  });

  const reset = () => {
    setFirstFac({ planQty: 1, progressQty: 0, check: false });
    setSecondFac({ planQty: 1, progressQty: 0, check: false });
    setThirdFac({ planQty: 1, progressQty: 0, check: false });
  };
  const handleChange = (event, newValue) => {
    reset();
    if (newValue === 0) {
      const filterCapacity = capacity.filter((c) => {
        return c.processCd === "10";
      });
      filterCapacity.map((filter) => {
        if (filter.firmPsFacTp === "1") {
          setFirstFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "2") {
          setSecondFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "3") {
          setThirdFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
      });
    }
    if (newValue === 1) {
      const filterCapacity = capacity.filter((c) => {
        return c.processCd === "20";
      });
      filterCapacity.map((filter) => {
        if (filter.firmPsFacTp === "1") {
          setFirstFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "2") {
          setSecondFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "3") {
          setThirdFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
      });
    }
    if (newValue === 2) {
      const filterCapacity = capacity.filter((c) => {
        return c.processCd === "30";
      });
      filterCapacity.map((filter) => {
        if (filter.firmPsFacTp === "1") {
          setFirstFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "2") {
          setSecondFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "3") {
          setThirdFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
      });
    }
    if (newValue === 3) {
      const filterCapacity = capacity.filter((c) => {
        return c.processCd === "40";
      });
      filterCapacity.map((filter) => {
        if (filter.firmPsFacTp === "1") {
          setFirstFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "2") {
          setSecondFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "3") {
          setThirdFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
      });
    }
    if (newValue === 4) {
      const filterCapacity = capacity.filter((c) => {
        return c.processCd === "50";
      });
      filterCapacity.map((filter) => {
        if (filter.firmPsFacTp === "1") {
          setFirstFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "2") {
          setSecondFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "3") {
          setThirdFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
      });
    }
    if (newValue === 5) {
      const filterCapacity = capacity.filter((c) => {
        return c.processCd === "60";
      });
      filterCapacity.map((filter) => {
        if (filter.firmPsFacTp === "1") {
          setFirstFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "2") {
          setSecondFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "3") {
          setThirdFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
      });
    }
    if (newValue === 6) {
      const filterCapacity = capacity.filter((c) => {
        return c.processCd === "70";
      });
      filterCapacity.map((filter) => {
        if (filter.firmPsFacTp === "1") {
          setFirstFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "2") {
          setSecondFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "3") {
          setThirdFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
      });
    }
    if (newValue === 7) {
      const filterCapacity = capacity.filter((c) => {
        return c.processCd === "80";
      });
      filterCapacity.map((filter) => {
        if (filter.firmPsFacTp === "1") {
          setFirstFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "2") {
          setSecondFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "3") {
          setThirdFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
      });
    }
    setValue(newValue);
  };

  useEffect(() => {
    CapacityStandardApi.getCapacityListByWeek(20240123, (data) => {
      setCapacity(data.response);

      const filterCapacity = data.response.filter((c) => c.processCd === "10");

      filterCapacity.forEach((filter) => {
        if (filter.firmPsFacTp === "1") {
          setFirstFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
        if (filter.firmPsFacTp === "2") {
          setSecondFac({
            planQty: filter.planQty,
            progressQty: filter.progressQty,
            check: true,
          });
        }
      });
    });
  }, []);

  return (
    <Paper
      elevation={6}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "15px",
      }}
    >
      <Typography variant="h5" style={{ padding: "10px 20px 10px 20px" }}>
        공장 부하 현황
      </Typography>
      <Box
        sx={{ width: "100%", marginBottom: "15px" }}
        style={{ display: "flex", justifyContent: "center" }}
      >
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
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {firstFac.check ? (
          <div>
            <GaugeChart
              id="1"
              nrOfLevels={10}
              arcPadding={0.1}
              cornerRadius={3}
              percent={firstFac.progressQty / firstFac.planQty}
              textColor={"black"}
              style={{ width: "250px" }}
            />
            <p style={{ textAlign: "center", marginBottom: "0px" }}>1공장</p>
          </div>
        ) : null}
        {secondFac.check ? (
          <div>
            <GaugeChart
              id="2"
              nrOfLevels={10}
              arcPadding={0.1}
              cornerRadius={3}
              percent={secondFac.progressQty / secondFac.planQty}
              textColor={"black"}
              style={{ width: "250px" }}
            />
            <p style={{ textAlign: "center", marginBottom: "0px" }}>2공장</p>
          </div>
        ) : null}
        {thirdFac.check ? (
          <div>
            <GaugeChart
              id="3"
              nrOfLevels={10}
              arcPadding={0.1}
              cornerRadius={3}
              percent={thirdFac.progressQty / thirdFac.planQty}
              textColor={"black"}
              style={{ width: "250px" }}
            />
            <p style={{ textAlign: "center", marginBottom: "0px" }}>3공장</p>
          </div>
        ) : null}
      </div>
    </Paper>
  );
};
export default FactoryGuage;
