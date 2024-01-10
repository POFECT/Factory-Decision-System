import {
  Typography,
  Button,
  Grid,
  Card,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import { Notify } from "src/notifix/notiflix-notify-aio";

const EssentialModal = ({ open, handleClose }) => {
  const [regressionData, setRegressionData] = useState(0);

  const [objectData, setObjectData] = useState({
    x0: "A002007FFBF201",
    x1: 970,
    x2: 1,
    x3: 10000,
  });

  const axios = require("axios");
  const regressionClick = () => {
    const inputValue = Number(objectData.x3);
    if (!isNaN(inputValue) && inputValue >= 10000 && inputValue <= 1000000) {
      const apiUrl = "http://localhost:4000/predict";
      axios.get(apiUrl, { params: objectData }).then((response) => {
        console.log("Response:", response.data.prediction);
        setRegressionData(response.data.prediction);
      });
    } else {
      Notify.failure("투입량은 10000이상 1,000,000이하");
    }
    console.log(objectData);
  };
  const x0Click = (event) => {
    setObjectData((prev) => ({ ...prev, x0: event.target.value }));
    console.log(objectData);
  };
  const x1Click = (event) => {
    setObjectData((prev) => ({ ...prev, x1: event.target.value }));
  };
  const x2Click = (event) => {
    setObjectData((prev) => ({ ...prev, x2: event.target.value }));
  };
  const x3Click = (event) => {
    setObjectData((prev) => ({ ...prev, x3: event.target.value }));
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%" }}
      maxWidth="xl"
    >
      <div
        style={{
          width: "600px",
          maxHeight: "100vh",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        <DialogContent>
          <div style={{ height: "100%", width: "100%" }}>
            <Grid
              item
              xs={12}
              sx={{ paddingBottom: 4 }}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h4">출강 LOT 투입 예측</Typography>

              <Tooltip
                title={
                  <Typography
                    fontSize={15}
                    style={{
                      color: "white",
                      whiteSpace: "nowrap",
                    }}
                  >
                    투입량은 최소 10000 최대 1,000,000 까지 가능합니다
                  </Typography>
                }
              >
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Card style={{ padding: "30px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormControl
                  sx={{ m: 1 }}
                  style={{
                    paddingTop: 10,
                    paddingBottom: 20,
                  }}
                >
                  <InputLabel id="label1" style={{ paddingTop: 10 }}>
                    강종
                  </InputLabel>
                  <Select
                    labelId="강종"
                    defaultValue={objectData.x0}
                    input={<OutlinedInput label="강종" />}
                    onChange={x0Click}
                  >
                    <MenuItem value={"A002007FFBF201"}>A002007FFBF201</MenuItem>
                    <MenuItem value={"A003007FFTI105"}>A003007FFTI105</MenuItem>
                    <MenuItem value={"A003010YCPE201"}>A003010YCPE201</MenuItem>
                    <MenuItem value={"C003055YFL9401"}>C003055YFL9401</MenuItem>
                    <MenuItem value={"Y002015J3XX001"}>Y002015J3XX001</MenuItem>
                    <MenuItem value={"Y002015YAXX001"}>Y002015YAXX001</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ m: 1 }}
                  style={{
                    paddingTop: 10,
                    paddingBottom: 20,
                  }}
                >
                  <InputLabel id="label1" style={{ paddingTop: 10 }}>
                    길이
                  </InputLabel>
                  <Select
                    labelId="길이"
                    defaultValue={objectData.x1}
                    input={<OutlinedInput label="길이" />}
                    onChange={x1Click}
                  >
                    <MenuItem value="970">970</MenuItem>
                    <MenuItem value="1270">1270</MenuItem>
                    <MenuItem value="1570">1570</MenuItem>
                    <MenuItem value="1600">1570~</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ m: 1 }}
                  style={{
                    paddingTop: 10,
                    paddingBottom: 20,
                  }}
                >
                  <InputLabel id="label1" style={{ paddingTop: 10 }}>
                    공장
                  </InputLabel>
                  <Select
                    labelId="공장"
                    defaultValue={objectData.x2}
                    input={<OutlinedInput label="공장" />}
                    onChange={x2Click}
                  >
                    <MenuItem value="1">1공장</MenuItem>
                    <MenuItem value="2">2공장</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  style={{ height: "40px" }}
                  sx={{ m: 1, marginBottom: "50px" }}
                >
                  <TextField
                    style={{ height: "40px" }}
                    label="투입량"
                    variant="outlined"
                    type="number"
                    inputProps={{
                      pattern: "[0-9]*",
                    }}
                    defaultValue={objectData.x3}
                    onChange={x3Click}
                  />
                </FormControl>
              </div>
              <Image
                src="/images/fire.jpg"
                alt="My Image"
                width={200}
                height={200}
              />
              <div style={{ display: "flex" }}>
                출강 LOT 투입 예측량 :
                <div style={{ color: "red" }}>{regressionData}</div>
              </div>
            </Card>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={regressionClick}
            style={{
              backgroundColor: "darkred",
            }}
          >
            예측 하기
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#0A5380" }}
            onClick={() => {
              handleClose();
            }}
          >
            닫기
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default EssentialModal;
