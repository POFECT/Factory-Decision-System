import {
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
import EssentialStandardApi from "src/api/EssentialStandardApi";

import { TuiDatePicker } from "nextjs-tui-date-picker";
import { Notify } from "src/notifix/notiflix-notify-aio";

const EssentialModal = ({ open, handleClose, addEssentialRow }) => {
  const addData = {
    btiPosbPsFacTp: null,
    conCalcOpxa01: null,
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
    gcsCompCode: null,
    lastUpdateDate: null,
    millCd: null,
    ordPdtItdsCdN: null,
    ordPdtItpCdN: null,
    orderThickMax: null,
    orderThickMin: null,
    orderUsageCdN: null,
    orderWidthMax: null,
    orderWidthMin: null,
    postTreatmentMethodCdN: null,
    pplBasPsgnoTp: null,
    pplMmatCancAppDt: null,
    pplMmatCngMgtNo: null,
    processCd: null,
    salCusLocLClsTp: null,
    seq: null,
    smSteelGrdN: null,
    specificationCdN: null,
    addDataId: null,
  };
  const addEssentailRowCallBack = () => {
    console.log(addData);
    // function validateData(addData) {
    //   console.log(addData);
    //   // gcsCompCode 조건 검사
    //   if (
    //     addData.gcsCompCode === null ||
    //     typeof addData.gcsCompCode !== "string" ||
    //     addData.gcsCompCode.length > 2
    //   ) {
    //     Notify.failure("[법인] 조건을 만족하지 않습니다.");
    //     console.error("gcsCompCode 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // millCd 조건 검사
    //   if (
    //     addData.millCd === null ||
    //     typeof addData.millCd !== "string" ||
    //     addData.millCd.length !== 1
    //   ) {
    //     Notify.failure("[공적계획박판Mill구분] 조건을 만족하지 않습니다.");
    //     console.error("millCd 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // pplMmatCngMgtNo 조건 검사
    //   if (
    //     addData.pplMmatCngMgtNo === null ||
    //     typeof addData.pplMmatCngMgtNo !== "string" ||
    //     addData.pplMmatCngMgtNo.length > 11
    //   ) {
    //     Notify.failure(
    //       "[공정계획필수재변경관리번호] 조건을 만족하지 않습니다."
    //     );
    //     console.error("pplMmatCngMgtNo 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // seq 조건 검사
    //   if (
    //     addData.seq === null ||
    //     typeof addData.seq !== "string" ||
    //     addData.seq.length > 22
    //   ) {
    //     Notify.failure("[일련번호] 조건을 만족하지 않습니다.");
    //     console.error("seq 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // processCd 조건 검사
    //   if (
    //     addData.processCd === null ||
    //     typeof addData.processCd !== "string" ||
    //     addData.processCd.length > 2
    //   ) {
    //     Notify.failure("[박판계획공정구분] 조건을 만족하지 않습니다.");
    //     console.error("processCd 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // pplBasPsgnoTp 조건 검사
    //   if (
    //     addData.pplBasPsgnoTp === null ||
    //     typeof addData.pplBasPsgnoTp !== "string" ||
    //     addData.pplBasPsgnoTp.length > 1
    //   ) {
    //     Notify.failure("[공정계획기준가등록구분] 조건을 만족하지 않습니다.");
    //     console.error("pplBasPsgnoTp 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // btiPosbPsFacTp 조건 검사
    //   if (
    //     addData.btiPosbPsFacTp === null ||
    //     typeof addData.btiPosbPsFacTp !== "string" ||
    //     addData.btiPosbPsFacTp.length > 2
    //   ) {
    //     Notify.failure("[박판가능통과공장구분] 조건을 만족하지 않습니다.");
    //     console.error("btiPosbPsFacTp 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa01 조건 검사
    //   if (
    //     addData.conCalcOpxa01 === null ||
    //     typeof addData.conCalcOpxa01 !== "string" ||
    //     addData.conCalcOpxa01.length > 20
    //   ) {
    //     Notify.failure("[품종] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa01 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // ordPdtItpCdN 조건 검사
    //   if (
    //     addData.ordPdtItpCdN === null ||
    //     typeof addData.ordPdtItpCdN !== "string" ||
    //     addData.ordPdtItpCdN.length > 2
    //   ) {
    //     Notify.failure("[주문품종코드] 조건을 만족하지 않습니다.");
    //     console.error("ordPdtItpCdN 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa02 조건 검사
    //   if (
    //     addData.conCalcOpxa02 === null ||
    //     typeof addData.conCalcOpxa02 !== "string" ||
    //     addData.conCalcOpxa02.length > 20
    //   ) {
    //     Notify.failure("[품명] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa02 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // ordPdtItdsCdN 조건 검사
    //   if (
    //     addData.ordPdtItdsCdN === null ||
    //     typeof addData.ordPdtItdsCdN !== "string" ||
    //     addData.ordPdtItdsCdN.length > 4
    //   ) {
    //     Notify.failure("[주문품명코드] 조건을 만족하지 않습니다.");
    //     console.error("ordPdtItdsCdN 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa03 조건 검사
    //   if (
    //     addData.conCalcOpxa03 === null ||
    //     typeof addData.conCalcOpxa03 !== "string" ||
    //     addData.conCalcOpxa03.length > 20
    //   ) {
    //     Notify.failure("[고객사코드] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa03 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // customerNumber 조건 검사
    //   if (
    //     addData.customerNumber === null ||
    //     typeof addData.customerNumber !== "string" ||
    //     addData.customerNumber.length > 10
    //   ) {
    //     Notify.failure("[고객사코드] 조건을 만족하지 않습니다.");
    //     console.error("customerNumber 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa04 조건 검사
    //   if (
    //     addData.conCalcOpxa04 === null ||
    //     typeof addData.conCalcOpxa04 !== "string" ||
    //     addData.conCalcOpxa04.length > 20
    //   ) {
    //     Notify.failure("[주문용도지정코드] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa04 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // orderUsageCdN 조건 검사
    //   if (
    //     addData.orderUsageCdN === null ||
    //     typeof addData.orderUsageCdN !== "string" ||
    //     addData.orderUsageCdN.length > 6
    //   ) {
    //     Notify.failure("[주문용도지정코드] 조건을 만족하지 않습니다.");
    //     console.error("orderUsageCdN 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa05 조건 검사
    //   if (
    //     addData.conCalcOpxa05 === null ||
    //     typeof addData.conCalcOpxa05 !== "string" ||
    //     addData.conCalcOpxa05.length > 20
    //   ) {
    //     Notify.failure("[제품두께] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa05 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   if (
    //     (addData.conCalcOpxa05 === "value < a <= value" &&
    //       !(addData.orderThickMin < addData.orderThickMax)) ||
    //     (addData.conCalcOpxa05 === "value <= a < value" &&
    //       !(addData.orderThickMin < addData.orderThickMax)) ||
    //     (addData.conCalcOpxa05 === "value <= a <= value" &&
    //       !(addData.orderThickMin <= addData.orderThickMax)) ||
    //     (addData.conCalcOpxa05 === "value < a < value" &&
    //       !(addData.orderThickMin < addData.orderThickMax))
    //   ) {
    //     Notify.failure("[제품두께] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa05 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   if (
    //     addData.conCalcOpxa06 === null ||
    //     typeof addData.conCalcOpxa06 !== "string" ||
    //     addData.conCalcOpxa06.length > 20
    //   ) {
    //     // conCalcOpxa06 조건 검사
    //     Notify.failure("[제품주문폭] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa06 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa06 조건 검사
    //   if (
    //     (addData.conCalcOpxa06 === "value < a <= value" &&
    //       !(addData.orderWidthMin < addData.orderWidthMax)) ||
    //     (addData.conCalcOpxa06 === "value <= a < value" &&
    //       !(addData.orderWidthMin < addData.orderWidthMax)) ||
    //     (addData.conCalcOpxa06 === "value <= a <= value" &&
    //       !(addData.orderWidthMin <= addData.orderWidthMax)) ||
    //     (addData.conCalcOpxa06 === "value < a < value" &&
    //       !(addData.orderWidthMin < addData.orderWidthMax))
    //   ) {
    //     Notify.failure("[제품주문폭] 조건을 만족하지 않습니다.");
    //     console.error("orderWidthMin 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa07 조건 검사
    //   if (
    //     addData.conCalcOpxa07 === null ||
    //     typeof addData.conCalcOpxa07 !== "string" ||
    //     addData.conCalcOpxa07.length > 20
    //   ) {
    //     Notify.failure("[제품규격약호] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa07 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // specificationCdN 조건 검사
    //   if (
    //     addData.specificationCdN !== null &&
    //     (typeof addData.specificationCdN !== "string" ||
    //       addData.specificationCdN.length > 30)
    //   ) {
    //     Notify.failure("[제품규격약호] 조건을 만족하지 않습니다.");
    //     console.error("specificationCdN 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa08 조건 검사
    //   if (
    //     addData.conCalcOpxa08 === null ||
    //     typeof addData.conCalcOpxa08 !== "string" ||
    //     addData.conCalcOpxa08.length > 20
    //   ) {
    //     Notify.failure("[판매고객사지역대분류구분] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa08 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // salCusLocLClsTp 조건 검사
    //   if (
    //     addData.salCusLocLClsTp !== null &&
    //     (typeof addData.salCusLocLClsTp !== "string" ||
    //       addData.salCusLocLClsTp.length > 1)
    //   ) {
    //     Notify.failure("[판매고객사지역대분류구분] 조건을 만족하지 않습니다.");
    //     console.error("salCusLocLClsTp 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa09 조건 검사
    //   if (
    //     addData.conCalcOpxa09 === null ||
    //     typeof addData.conCalcOpxa09 !== "string" ||
    //     addData.conCalcOpxa09.length > 20
    //   ) {
    //     Notify.failure("[출강목표번호] 조건을 만족하지 않습니다.");
    //     console.error("conCalcOpxa09 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // salCusLocLClsTp 조건 검사
    //   if (
    //     addData.smSteelGrdN !== null &&
    //     (typeof addData.smSteelGrdN !== "string" ||
    //       addData.smSteelGrdN.length > 14)
    //   ) {
    //     Notify.failure("[출강목표번호] 조건을 만족하지 않습니다.");
    //     console.console.error("smSteelGrdN 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // conCalcOpxa09 조건 검사
    //   if (
    //     addData.conCalcOpxa010 === null ||
    //     typeof addData.conCalcOpxa010 !== "string" ||
    //     addData.conCalcOpxa010.length > 20
    //   ) {
    //     Notify.failure(
    //       "[주문제품후처리방법지정코드] 조건을 만족하지 않습니다."
    //     );
    //     console.console.error("conCalcOpxa010 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // postTreatmentMethodCdN 조건 검사
    //   if (
    //     addData.postTreatmentMethodCdN !== null &&
    //     (typeof addData.postTreatmentMethodCdN !== "string" ||
    //       addData.postTreatmentMethodCdN.length > 3)
    //   ) {
    //     Notify.failure(
    //       "[주문제품후처리방법지정코드] 조건을 만족하지 않습니다."
    //     );
    //     console.error("postTreatmentMethodCdN 조건을 만족하지 않습니다.");
    //     return false; // 조건 통과 실패
    //   }
    //   // 모든 조건을 통과했을 경우
    //   console.log("데이터 유효성 검사 통과");
    //   EssentialStandardApi.addEssential(addData);
    //   console.log(addData);
    //   return true;
    // }
    // if (!validateData(addData)) {
    //   console.log("실패");
    // }
  };
  const gcsCompCodeChange = (event) => {
    addData.gcsCompCode = event.target.value;
    console.log(event.target.value);
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
  const pplMmatCancAppDtChange = (selectDate) => {
    console.log(selectDate);
    addData.pplMmatCancAppDt = selectDate;
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
      addData.conCalcOpxa01 = "=";
    } else {
      setCheck01(false);
      addData.ordPdtItpCdN = null;
      addData.conCalcOpxa01 = null;
      console.log(addData.conCalcOpxa01);
    }
    console.log(addData.conCalcOpxa01);
  };

  const ordPdtItpCdNChange = (event) => {
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
      event.target.value === "value < a < value"
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
      event.target.value === "value < a < value"
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
      addData.conCalcOpxa10 = "=";
      setCheck10(true);
    } else {
      setCheck10(false);
      addData.customerNumber = null;
      addData.conCalcOpxa10 = null;
    }
  };

  const customerNumberChange = (event) => {
    console.log(event.target.value);
    addData.customerNumber = event.target.value;
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
                <InputLabel>법인</InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
                  label="법인"
                  onChange={gcsCompCodeChange}
                  required={true}
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
                <InputLabel>공적계획박판Mill구분</InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
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
                공정계획필수재변경관리번호
              </Typography>
              <FormControl>
                <TextField
                  style={{ background: "#F6FAFE" }}
                  label="공정계획필수재변경관리번호"
                  variant="outlined"
                  onChange={pplMmatCngMgtNoChange}
                  type="number"
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
                <InputLabel>박판계획공정구분</InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
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
                공정계획필수재해지적용일자
              </Typography>
              <div
                style={{
                  background: "#F6FAFE",
                  width: "500px",
                  cursor: "pointer",
                  borderRadius: "6px",
                }}
              >
                <TuiDatePicker
                  handleChange={pplMmatCancAppDtChange}
                  date={new Date()}
                  fontSize={20}
                  backgroundColor="#F6FAFE"
                  color="gray"
                  inputWidth={230}
                />
              </div>
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
                <InputLabel>공정계획기준가등록구분</InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
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
                <InputLabel>박판가능통과공장구분</InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    label="연산자"
                    onChange={conCalcOpxa01Change}
                  >
                    <MenuItem value={""}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check01 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <TextField
                        style={{ background: "#F6FAFE" }}
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
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
                      label="제품두께1"
                      variant="outlined"
                      onChange={orderThickMinChange}
                      type="number"
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
                      type="number"
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
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
                      label="제품주문폭1"
                      variant="outlined"
                      onChange={orderWidthMinChange}
                      type="number"
                    />
                  </FormControl>
                ) : null}
                {check06 === 2 ? (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <TextField
                      style={{ background: "#F6FAFE" }}
                      label="제품주문폭2"
                      variant="outlined"
                      onChange={orderWidthMaxChange}
                      type="number"
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    id="demo-simple-select"
                    label="연산자"
                    onChange={conCalcOpxa07Change}
                    type="number"
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
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
                  <InputLabel>연산자</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
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
