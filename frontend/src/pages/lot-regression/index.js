import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const Standard = () => {
  const [regressionData, setRegressionData] = useState(0);
  const axios = require("axios");
  const regressionClick = () => {
    const apiUrl = "http://localhost:4000/predict";
    const params = {
      x0: "C100040LAXX001",
      x1: 1270,
      x2: 1,
      x3: 70000,
    };

    axios
      .get(apiUrl, { params })
      .then((response) => {
        console.log("Response:", response.data.prediction);
        setRegressionData(response.data.prediction);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h4">출강 LOT 투입 예측</Typography>
      </Grid>
      <Card style={{ padding: "30px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <FormControl
              sx={{ m: 1 }}
              style={{
                paddingTop: 10,
                paddingBottom: 20,
                marginRight: 10,
              }}
            >
              <InputLabel id="label1" style={{ paddingTop: 10 }}>
                강종
              </InputLabel>
              <Select
                labelId="분류"
                id="demo-multiple-name"
                defaultValue="T"
                input={<OutlinedInput label="강종" />}
                style={{ height: 40 }}
              >
                <MenuItem value="C100040LAXX001">C100040LAXX001</MenuItem>
                <MenuItem value="Y002015Y8XX002">Y002015Y8XX002</MenuItem>
                <MenuItem value="C200045L3CA101">C200045L3CA101</MenuItem>
                <MenuItem value="A040015LFXX001">A040015LFXX001</MenuItem>
                <MenuItem value="Y001013L3XX001">Y001013L3XX001</MenuItem>
                <MenuItem value="A040020FFBB104">A040020FFBB104</MenuItem>
                <MenuItem value="A040025LFBB104">A040025LFBB104</MenuItem>
                <MenuItem value="A020020HFXX002">A020020HFXX002</MenuItem>
                <MenuItem value="A120050LAXX001">A120050LAXX001</MenuItem>
                <MenuItem value="A150070LAXX002">A150070LAXX002</MenuItem>
                <MenuItem value="Y001019LYSN101">Y001019LYSN101</MenuItem>
                <MenuItem value="A070035FFXX001">A070035FFXX001</MenuItem>
                <MenuItem value="A060035HFXX001">A060035HFXX001</MenuItem>
                <MenuItem value="A150080LANB101">A150080LANB101</MenuItem>
                <MenuItem value="A003040YDTI101">A003040YDTI101</MenuItem>
                <MenuItem value="Y001030FYSN101">Y001030FYSN101</MenuItem>
                <MenuItem value="A180050LAXX001">A180050LAXX001</MenuItem>
                <MenuItem value="A002007FFBF201">A002007FFBF201</MenuItem>
                <MenuItem value="A020020FFXX003">A020020FFXX003</MenuItem>
                <MenuItem value="C003055YFL9401">C003055YFL9401</MenuItem>
                <MenuItem value="A040020RRXX001">A040020RRXX001</MenuItem>
                <MenuItem value="A040020LLXX001">A040020LLXX001</MenuItem>
                <MenuItem value="A180050LAXX001">A180050LAXX001</MenuItem>
                <MenuItem value="A180050LAXX001">A180050LAXX001</MenuItem>
                <MenuItem value="A180050LAXX001">A180050LAXX001</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1 }}
              style={{
                paddingTop: 10,
                paddingBottom: 20,
                marginRight: 10,
              }}
            >
              <InputLabel id="label1" style={{ paddingTop: 10 }}>
                길이
              </InputLabel>
              <Select
                labelId="길이"
                id="demo-multiple-name"
                defaultValue="T"
                input={<OutlinedInput label="강종" />}
                style={{ height: 40 }}
              >
                <MenuItem value="970">970</MenuItem>
                <MenuItem value="1270">1270</MenuItem>
                <MenuItem value="1570">1570</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1 }}
              style={{
                paddingTop: 10,
                paddingBottom: 20,
                marginRight: 10,
              }}
            >
              <InputLabel id="label1" style={{ paddingTop: 10 }}>
                구분
              </InputLabel>
              <Select
                labelId="분류"
                id="demo-multiple-name"
                defaultValue="T"
                input={<OutlinedInput label="강종" />}
                style={{ height: 40 }}
              ></Select>
            </FormControl>
            <FormControl
              sx={{ m: 1 }}
              style={{
                paddingTop: 10,
                paddingBottom: 20,
                marginRight: 10,
              }}
            >
              <InputLabel id="label1" style={{ paddingTop: 10 }}>
                구분
              </InputLabel>
              <Select
                labelId="분류"
                id="demo-multiple-name"
                defaultValue="T"
                input={<OutlinedInput label="구분" />}
                style={{ height: 40 }}
              >
                <MenuItem value="T">포항</MenuItem>
                {/* <MenuItem value="K">광양</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={regressionClick}
            style={{ backgroundColor: "#0A5380", margin: "0px 0px 8px 0px" }}
          >
            예측 하기
          </Button>
        </div>
        <Image src="/images/fire.jpg" alt="My Image" width={200} height={200} />{" "}
        <div style={{ display: "flex" }}>
          출강 LOT 투입 예측량 :{" "}
          <div style={{ color: "red" }}>{regressionData}</div>
        </div>
      </Card>
    </div>
  );
};

export default Standard;
