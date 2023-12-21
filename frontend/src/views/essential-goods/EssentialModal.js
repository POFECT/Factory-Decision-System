import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";
import { useState } from "react";

const EssentialModal = ({ open, handleClose, addEssentialRow }) => {
  const addData = {
    btiPosbPsFacTp: "03",
    conCalcOpxa01: "=",
    conCalcOpxa02: null,
    conCalcOpxa03: null,
    conCalcOpxa04: null,
    conCalcOpxa05: null,
    conCalcOpxa06: null,
    conCalcOpxa07: null,
    conCalcOpxa08: null,
    conCalcOpxa09: null,
    conCalcOpxa10: null,
    customerNumber: null,
    gcsCompCode: "01",
    id: 504,
    lastUpdateDate: null,
    millCd: "T",
    ordPdtItdsCdN: null,
    ordPdtItpCdN: "FM",
    orderThickMax: null,
    orderThickMin: null,
    orderUsageCdN: null,
    orderWidthMax: null,
    orderWidthMin: null,
    postTreatmentMethodCdN: null,
    pplBasPsgnoTp: "C",
    pplMmatCancAppDt: "2022-04-15",
    pplMmatCngMgtNo: "20190416361",
    processCd: "80",
    salCusLocLClsTp: null,
    seq: "26220",
    smSteelGrdN: null,
    specificationCdN: null,
    userId: null,
  };

  const gcsCompCodeChange = (event) => {
    console.log(event.target.value);
    addData.gcsCompCode = event.target.value;
  };
  const millCdChange = (event) => {
    console.log(event.target.value);
    addData.millCd = event.target.value;
  };
  const pplMmatCngMgtNoChange = (event) => {
    console.log(event.target.value);
    addData.pplMmatCngMgtNo = event.target.value;
  };
  const seqChange = (event) => {
    console.log(event.target.value);
    addData.seq = event.target.value;
  };
  const processCdChange = (event) => {
    console.log(event.target.value);
    addData.processCd = event.target.value;
  };
  const pplMmatCancAppDtChange = (event) => {
    console.log(event.target.value);
    addData.pplMmatCancAppDt = event.target.value;
  };
  const pplBasPsgnoTpChange = (event) => {
    console.log(event.target.value);
    addData.pplBasPsgnoTp = event.target.value;
  };
  const btiPosbPsFacTpChange = (event) => {
    console.log(event.target.value);
    addData.btiPosbPsFacTp = event.target.value;
  };

  const [check01, setCheck01] = useState(false);
  const conCalcOpxa01Change = (event) => {
    if (event.target.value === "=") {
      setCheck01(true);
    } else {
      setCheck01(false);
      addData.ordPdtItpCdN = null;
    }
    addData.conCalcOpxa01 = event.target.value;
  };

  const ordPdtItpCdNChange = (event) => {
    console.log(event.target.value);
    addData.ordPdtItpCdN = event.target.value;
  };

  const [check02, setCheck02] = useState(false);
  const conCalcOpxa02Change = (event) => {
    if (event.target.value === "=") {
      setCheck02(true);
    } else {
      setCheck02(false);
      addData.ordPdtItdsCdN = null;
    }
    addData.conCalcOpxa02 = event.target.value;
  };

  const ordPdtItdsCdNChange = (event) => {
    console.log(event.target.value);
    addData.ordPdtItdsCdN = event.target.value;
  };

  const [check03, setCheck03] = useState(false);
  const conCalcOpxa03Change = (event) => {
    if (event.target.value === "=") {
      setCheck03(true);
    } else {
      setCheck03(false);
      addData.specificationCdN = null;
    }
    addData.conCalcOpxa03 = event.target.value;
  };

  const specificationCdNChange = (event) => {
    console.log(event.target.value);
    addData.specificationCdN = event.target.value;
  };

  const [check04, setCheck04] = useState(false);

  const conCalcOpxa04Change = (event) => {
    if (event.target.value === "=") {
      setCheck04(true);
    } else {
      setCheck04(false);
      addData.orderUsageCdN = null;
    }
    addData.conCalcOpxa04 = event.target.value;
  };

  const orderUsageCdNChange = (event) => {
    console.log(event.target.value);
    addData.orderUsageCdN = event.target.value;
  };

  const [check05, setCheck05] = useState(0);

  const conCalcOpxa05Change = (event) => {
    if (
      event.target.value === "value >= a" ||
      event.target.value === "value > a" ||
      event.target.value === "value < a" ||
      event.target.value === "value <= a"
    ) {
      setCheck05(1);
      addData.orderThickMax = null;
    } else if (
      event.target.value === "value < a <= value" ||
      event.target.value === "value <= a < value" ||
      event.target.value === "value <= a <= value" ||
      event.target.value === "value <= a <= value"
    ) {
      setCheck05(2);
    } else {
      setCheck05(0);
      addData.orderThickMax = null;
      addData.orderThickMin = null;
    }
    addData.conCalcOpxa05 = event.target.value;
  };

  const orderThickMinChange = (event) => {
    console.log(event.target.value);
    addData.orderThickMin = event.target.value;
  };
  const orderThickMaxChange = (event) => {
    console.log(event.target.value);
    addData.orderThickMax = event.target.value;
  };

  const [check06, setCheck06] = useState(0);
  const conCalcOpxa06Change = (event) => {
    if (
      event.target.value === "value >= a" ||
      event.target.value === "value > a" ||
      event.target.value === "value < a" ||
      event.target.value === "value <= a"
    ) {
      setCheck06(1);
      addData.orderWidthMax = null;
    } else if (
      event.target.value === "value < a <= value" ||
      event.target.value === "value <= a < value" ||
      event.target.value === "value <= a <= value" ||
      event.target.value === "value <= a <= value"
    ) {
      setCheck06(2);
    } else {
      setCheck06(0);
      addData.orderWidthMax = null;
      addData.orderWidthMin = null;
    }
    addData.conCalcOpxa06 = event.target.value;
  };

  const orderWidthMinChange = (event) => {
    console.log(event.target.value);
    addData.orderWidthMin = event.target.value;
  };
  const orderWidthMaxChange = (event) => {
    console.log(event.target.value);
    addData.orderWidthMax = event.target.value;
  };

  const [check07, setCheck07] = useState(false);
  const conCalcOpxa07Change = (event) => {
    if (event.target.value === "=") {
      setCheck07(true);
    } else {
      setCheck07(false);
      addData.postTreatmentMethodCdN = null;
    }
    addData.conCalcOpxa07 = event.target.value;
  };

  const postTreatmentMethodCdNChange = (event) => {
    console.log(event.target.value);
    addData.postTreatmentMethodCdN = event.target.value;
  };

  const [check08, setCheck08] = useState(false);
  const conCalcOpxa08Change = (event) => {
    if (event.target.value === "=") {
      setCheck08(true);
    } else {
      setCheck08(false);
      addData.smSteelGrd = null;
    }
    addData.conCalcOpxa08 = event.target.value;
  };

  const smSteelGrdNChange = (event) => {
    console.log(event.target.value);
    addData.smSteelGrdN = event.target.value;
  };

  const [check09, setCheck09] = useState(false);
  const conCalcOpxa09Change = (event) => {
    if (event.target.value === "=") {
      setCheck09(true);
    } else {
      setCheck09(false);
      addData.salCusLocLClsTp = null;
    }
    addData.conCalcOpxa09 = event.target.value;
  };

  const salCusLocLClsTpChange = (event) => {
    console.log(event.target.value);
    addData.salCusLocLClsTp = event.target.value;
  };

  const [check10, setCheck10] = useState(false);
  const conCalcOpxa10Change = (event) => {
    if (event.target.value === "=") {
      setCheck10(true);
    } else {
      setCheck10(false);
      addData.customerNumber = null;
    }
    addData.conCalcOpxa10 = event.target.value;
  };

  const customerNumberChange = (event) => {
    console.log(event.target.value);
    addData.customerNumber = event.target.value;
  };

  // 값 업데이트
  const addEssentailRowCallBack = () => {
    addEssentialRow(addData);
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
          padding: "20px",
        }}
      >
        <Typography
          style={{ marginTop: "20px", padding: "0 20px 0 20px" }}
          variant="h4"
        >
          필수재 기준 추가
        </Typography>{" "}
        <DialogContent>
          <DialogContentText style={{ marginTop: "10px" }}>
            {/* 법인 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                법인
              </Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-label">법인</InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="법인"
                  onChange={gcsCompCodeChange}
                >
                  <MenuItem value={"01"}>01</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* 공정계획박판Mill구분 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                공적계획박판Mill구분
              </Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  공적계획박판Mill구분
                </InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="공적계획박판Mill구분"
                  onChange={millCdChange}
                >
                  <MenuItem value={"T"}>T</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* 공정계획필수재변경관리번호 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                공정계획필수재변경관리번호{" "}
              </Typography>
              <FormControl>
                <TextField
                  style={{ background: "#F6FAFE" }}
                  id="outlined-basic"
                  label="공정계획필수재변경관리번호"
                  variant="outlined"
                  type="number"
                  onChange={pplMmatCngMgtNoChange}
                />
              </FormControl>
            </div>

            {/* 일련번호 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                일련번호
              </Typography>
              <FormControl>
                <TextField
                  style={{ background: "#F6FAFE" }}
                  id="outlined-basic"
                  label="일련번호"
                  variant="outlined"
                  type="number"
                  onChange={seqChange}
                />
              </FormControl>
            </div>

            {/* 박판계획공정구분 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                박판계획공정구분
              </Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  박판계획공정구분
                </InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="박판계획공정구분"
                  onChange={processCdChange}
                >
                  <MenuItem value={"10"}>제강</MenuItem>
                  <MenuItem value={"20"}>열연</MenuItem>
                  <MenuItem value={"30"}>열연정정</MenuItem>
                  <MenuItem value={"40"}>냉간압연</MenuItem>
                  <MenuItem value={"50"}>1차소둔</MenuItem>
                  <MenuItem value={"60"}>2차소둔</MenuItem>
                  <MenuItem value={"70"}>도금</MenuItem>
                  <MenuItem value={"80"}>정정</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* 공정계회길수해지적용일자 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                일련번호
              </Typography>
              <FormControl>
                <TextField
                  style={{ background: "#F6FAFE" }}
                  id="outlined-basic"
                  label="공정계회길수해지적용일자"
                  variant="outlined"
                  type="number"
                  onChange={pplMmatCancAppDtChange}
                />
              </FormControl>
            </div>

            {/* 공정계획기준가등록구분 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                공정계획기준가등록구분
              </Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  공정계획기준가등록구분
                </InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="공정계획기준가등록구분"
                  onChange={pplBasPsgnoTpChange}
                >
                  <MenuItem value={"C"}>C</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* 박판가능통과공장구분 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                박판가능통과공장구분
              </Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  박판가능통과공장구분
                </InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="박판가능통과공장구분"
                  onChange={btiPosbPsFacTpChange}
                >
                  <MenuItem value={"01"}>01</MenuItem>
                  <MenuItem value={"02"}>02</MenuItem>
                  <MenuItem value={"03"}>03</MenuItem>
                  <MenuItem value={"04"}>04</MenuItem>
                  <MenuItem value={"05"}>05</MenuItem>
                  <MenuItem value={"06"}>06</MenuItem>
                  <MenuItem value={"07"}>07</MenuItem>
                  <MenuItem value={"08"}>08</MenuItem>
                  <MenuItem value={"09"}>09</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* 품종 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                품종
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa01Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check01 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <TextField
                        style={{ background: "#F6FAFE" }}
                        id="outlined-basic"
                        label="주문 품종 코드"
                        variant="outlined"
                        onChange={ordPdtItpCdNChange}
                      />
                    </FormControl>
                  </FormControl>
                )}
              </div>
            </div>

            {/* 품명 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                품명
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa02Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check02 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <TextField
                        style={{ background: "#F6FAFE" }}
                        id="outlined-basic"
                        label="주문 품명 코드"
                        variant="outlined"
                        onChange={ordPdtItdsCdNChange}
                      />
                    </FormControl>
                  </FormControl>
                )}
              </div>
            </div>

            {/* 고객사코드 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                고객사코드
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa03Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check03 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <TextField
                        style={{ background: "#F6FAFE" }}
                        id="outlined-basic"
                        label="고객사코드"
                        variant="outlined"
                        onChange={specificationCdNChange}
                      />
                    </FormControl>
                  </FormControl>
                )}
              </div>
            </div>

            {/* 주문용도지정코드 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                주문용도지정코드
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa04Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check04 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <TextField
                        style={{ background: "#F6FAFE" }}
                        id="outlined-basic"
                        label="주문용도지정코드"
                        variant="outlined"
                        onChange={orderUsageCdNChange}
                      />
                    </FormControl>
                  </FormControl>
                )}
              </div>
            </div>

            {/* 제품두께 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                제품두께
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa05Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"value >= a"}>{"value >= a"}</MenuItem>
                    <MenuItem value={"value > a"}>{"value > a"}</MenuItem>
                    <MenuItem value={"value < a"}>{"value < a"}</MenuItem>
                    <MenuItem value={"value <= a"}>{"value <= a"}</MenuItem>
                    <MenuItem value={"value < a <= value"}>
                      {"value < a <= value"}
                    </MenuItem>
                    <MenuItem value={"value <= a < value"}>
                      {"value <= a < value"}
                    </MenuItem>
                    <MenuItem value={"value <= a <= value"}>
                      {"value < a < value"}
                    </MenuItem>
                    <MenuItem value={"value <= a <= value"}>
                      {"value <= a <= value"}
                    </MenuItem>
                  </Select>
                </FormControl>
                {check05 === 1 || check05 === 2 ? (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <TextField
                      style={{ background: "#F6FAFE" }}
                      id="outlined-basic"
                      label="제품두께1"
                      variant="outlined"
                      onChange={orderThickMinChange}
                    />
                  </FormControl>
                ) : null}
                {check05 === 2 ? (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <TextField
                      style={{ background: "#F6FAFE" }}
                      id="outlined-basic"
                      label="제품두께2"
                      variant="outlined"
                      onChange={orderThickMaxChange}
                    />
                  </FormControl>
                ) : null}
              </div>
            </div>

            {/* 제품주문폭 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                제품주문폭
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa06Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"value >= a"}>{"value >= a"}</MenuItem>
                    <MenuItem value={"value > a"}>{"value > a"}</MenuItem>
                    <MenuItem value={"value < a"}>{"value < a"}</MenuItem>
                    <MenuItem value={"value <= a"}>{"value <= a"}</MenuItem>
                    <MenuItem value={"value < a <= value"}>
                      {"value < a <= value"}
                    </MenuItem>
                    <MenuItem value={"value <= a < value"}>
                      {"value <= a < value"}
                    </MenuItem>
                    <MenuItem value={"value <= a <= value"}>
                      {"value < a < value"}
                    </MenuItem>
                    <MenuItem value={"value <= a <= value"}>
                      {"value <= a <= value"}
                    </MenuItem>
                  </Select>
                </FormControl>
                {check06 === 1 || check06 === 2 ? (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <TextField
                      style={{ background: "#F6FAFE" }}
                      id="outlined-basic"
                      label="제품주문폭1"
                      variant="outlined"
                      onChange={orderWidthMinChange}
                    />
                  </FormControl>
                ) : null}
                {check06 === 2 ? (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <TextField
                      style={{ background: "#F6FAFE" }}
                      id="outlined-basic"
                      label="제품주문폭2"
                      variant="outlined"
                      onChange={orderWidthMaxChange}
                    />
                  </FormControl>
                ) : null}
              </div>
            </div>

            {/* 제품규격약효 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                제품규격약효
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa07Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check07 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <TextField
                        style={{ background: "#F6FAFE" }}
                        id="outlined-basic"
                        label="제품규격약효"
                        variant="outlined"
                        onChange={postTreatmentMethodCdNChange}
                      />
                    </FormControl>
                  </FormControl>
                )}
              </div>
            </div>

            {/* 판매고객사지역대분류구분 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                판매고객사지역대분류구분
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa08Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check08 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <TextField
                        style={{ background: "#F6FAFE" }}
                        id="outlined-basic"
                        label="판매고객사지역대분류구분"
                        variant="outlined"
                        onChange={smSteelGrdNChange}
                      />
                    </FormControl>
                  </FormControl>
                )}
              </div>
            </div>

            {/* 출강목표번호 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                출강목표번호
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa09Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check09 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <TextField
                        style={{ background: "#F6FAFE" }}
                        id="outlined-basic"
                        label="출강목표번호"
                        variant="outlined"
                        onChange={salCusLocLClsTpChange}
                      />
                    </FormControl>
                  </FormControl>
                )}
              </div>
            </div>

            {/* 주문제품후처리방법지정코드 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography
                style={{ marginBottom: "15px", color: "gray" }}
                variant="h6"
              >
                주문제품후처리방법지정코드
              </Typography>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel id="demo-simple-select-label">연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa10Change}
                  >
                    <MenuItem value={" "}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check10 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <TextField
                        style={{ background: "#F6FAFE" }}
                        id="outlined-basic"
                        label="주문제품후처리방법지정코드"
                        variant="outlined"
                        onChange={customerNumberChange}
                      />
                    </FormControl>
                  </FormControl>
                )}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#E29E21" }}
            onClick={() => {
              addEssentailRowCallBack();
            }}
          >
            저장
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#0A5380" }}
          >
            닫기
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default EssentialModal;
