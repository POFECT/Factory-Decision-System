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
  Backdrop,
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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const EssentialModal = ({ open, handleClose }) => {
  const [regressionData, setRegressionData] = useState(0);
  const [objectData, setObjectData] = useState({
    x0: "A002007FFBF201",
    x1: 970,
    x2: 1,
    x3: 10000,
  });
  const [remainData, setRemainData] = useState(0);
  const [modalState, setModalState] = useState(false);
  const modalOpen = () => setModalState(true);
  const modalClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setModalState(false);
    }
  };
  const axios = require("axios");
  const [clearTimeoutId, setClearTimeoutId] = useState(null);

  const regressionClick = () => {
    const inputValue = Number(objectData.x3);
    if (!isNaN(inputValue) && inputValue >= 10000 && inputValue <= 1000000) {
      const apiUrl = "https://ai.pofect.store/predict";
      modalOpen();
      // 기존의 setTimeout 제거
      if (clearTimeoutId) {
        clearTimeout(clearTimeoutId);
        setClearTimeoutId(null);
      }
      const newTimeoutId = setTimeout(() => {
        modalClose();
        axios.get(apiUrl, { params: objectData }).then((response) => {
          setRegressionData(response.data.prediction);
          setRemainData(objectData.x3 - response.data.prediction);
          Notify.success("출강 LOT 투입량을 예측하였습니다.", {
            showOnlyTheLastOne: false,
          });
        });
      }, 4000);
      setClearTimeoutId(newTimeoutId);
    } else {
      Notify.failure("투입량은 10000이상 1,000,000이하");
    }
    console.log(objectData);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 300,
    bgcolor: "background.paper", //"#7A7A7D",
    boxShadow: 24,
    borderRadius: "10px",
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
          padding: "10px",
        }}
      >
        <DialogContent style={{ paddingBottom: "10px" }}>
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
                  <div
                    style={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      maxWidth: "none",
                    }}
                  >
                    투입량은 최소 10000 최대 1,000,000 까지 가능합니다
                  </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Image
                  src="/images/fire.jpg"
                  alt="My Image"
                  width={200}
                  height={200}
                />
              </div>
              <div style={{ display: "flex", fontSize: "18px" }}>
                출강 LOT 투입 예측량 :
                <div style={{ color: "red" }}>{regressionData.toFixed(2)}</div>
                (ton)
              </div>
              <div style={{ display: "flex", fontSize: "18px" }}>
                출강 LOT 투입 대기예측량 :
                <div style={{ color: "blue" }}>{remainData.toFixed(2)}</div>
                (ton)
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
              backgroundColor: "#0A5380",
            }}
          >
            예측 하기
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={{ backgroundColor: "rgb(190, 46, 34)" }}
            onClick={() => {
              handleClose();
              setObjectData({
                x0: "A002007FFBF201",
                x1: 970,
                x2: 1,
                x3: 10000,
              });
              setRegressionData(0);
              setRemainData(0);
            }}
          >
            닫기
          </Button>
          <Modal
            open={modalState}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
              style: { backdropFilter: "blur(0)" },
            }}
          >
            <Box sx={style}>
              <img
                src="/images/spinner.gif"
                alt="GIF"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Modal>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default EssentialModal;
