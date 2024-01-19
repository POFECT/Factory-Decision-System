import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Backdrop,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import EssentialStandardApi from "src/pages/api/pofect/EssentialStandardApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Notify } from "src/notifix/notiflix-notify-aio";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import PassStandardApi from "src/pages/api/pofect/ProcessStandardApi";
import HelpIcon from "@mui/icons-material/Help";

const EssentialModal = ({
  open,
  handleClose,
  addEssentialRow,
  essentialList,
}) => {
  const [addData, setAddData] = useState({
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
    pplMmatCancAppDt: new Date(),
    pplMmatCngMgtNo: null,
    processCd: null,
    salCusLocLClsTp: null,
    seq: null,
    smSteelGrdN: null,
    specificationCdN: null,
    addDataId: null,
  });

  const addEssentailRowCallBack = () => {
    async function validateData(addData) {
      // gcsCompCode 조건 검사
      if (
        addData.gcsCompCode === null ||
        typeof addData.gcsCompCode !== "string" ||
        addData.gcsCompCode.length > 2
      ) {
        Notify.failure("[법인] 조건을 만족하지 않습니다.");
        console.error("gcsCompCode 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }
      // millCd 조건 검사
      if (
        addData.millCd === null ||
        typeof addData.millCd !== "string" ||
        addData.millCd.length !== 1
      ) {
        Notify.failure("[공적계획박판Mill구분] 조건을 만족하지 않습니다.");
        console.error("millCd 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }
      // pplMmatCngMgtNo 조건 검사
      if (
        addData.pplMmatCngMgtNo <= 0 ||
        addData.pplMmatCngMgtNo === null ||
        typeof addData.pplMmatCngMgtNo !== "string" ||
        addData.pplMmatCngMgtNo.length > 11
      ) {
        Notify.failure(
          "[공정계획필수재변경관리번호] 조건을 만족하지 않습니다."
        );
        console.error("pplMmatCngMgtNo 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }
      // seq 조건 검사
      if (
        addData.seq <= 0 ||
        addData.seq === null ||
        typeof addData.seq !== "string" ||
        addData.seq.length > 22
      ) {
        Notify.failure("[일련번호] 조건을 만족하지 않습니다.");
        console.error("seq 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }
      // processCd 조건 검사
      if (
        addData.processCd === null ||
        typeof addData.processCd !== "string" ||
        addData.processCd.length > 2
      ) {
        Notify.failure("[박판계획공정구분] 조건을 만족하지 않습니다.");
        console.error("processCd 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }
      // pplBasPsgnoTp 조건 검사
      if (
        addData.pplBasPsgnoTp === null ||
        typeof addData.pplBasPsgnoTp !== "string" ||
        addData.pplBasPsgnoTp.length > 1
      ) {
        Notify.failure("[공정계획기준가등록구분] 조건을 만족하지 않습니다.");
        console.error("pplBasPsgnoTp 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }
      // btiPosbPsFacTp 조건 검사
      if (
        addData.btiPosbPsFacTp === null ||
        typeof addData.btiPosbPsFacTp !== "string" ||
        addData.btiPosbPsFacTp.length > 2
      ) {
        Notify.failure("[박판가능통과공장구분] 조건을 만족하지 않습니다.");
        console.error("btiPosbPsFacTp 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }

      // 연산1
      if (
        addData.conCalcOpxa01 !== null &&
        (addData.ordPdtItpCdN == null ||
          typeof addData.ordPdtItpCdN !== "string" ||
          addData.ordPdtItpCdN.trim() === "" ||
          addData.ordPdtItpCdN.length > 2)
      ) {
        Notify.failure("[주문품종코드] 조건을 만족하지 않습니다.");
        console.error("ordPdtItpCdN 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }

      // 연산2
      if (
        addData.conCalcOpxa02 !== null &&
        (addData.ordPdtItdsCdN == null ||
          typeof addData.ordPdtItdsCdN !== "string" ||
          addData.ordPdtItdsCdN.trim() === "" ||
          addData.ordPdtItdsCdN.length > 4 ||
          addData.ordPdtItpCdN == null || // 추가된 조건
          (typeof addData.ordPdtItpCdN === "string" &&
            addData.ordPdtItpCdN.slice(0, 2) !==
              addData.ordPdtItdsCdN.slice(0, 2))) // 추가된 조건
      ) {
        Notify.failure("[품명] 조건을 만족하지 않습니다.");
        console.error("ordPdtItdsCdN 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }

      //  연산3
      if (
        addData.conCalcOpxa03 !== null &&
        (addData.customerNumber == null ||
          typeof addData.customerNumber !== "string" ||
          addData.customerNumber.trim() === "" ||
          addData.customerNumber.length > 10)
      ) {
        Notify.failure("[고객사코드] 조건을 만족하지 않습니다.");
        console.error("customerNumber 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }
      //  연산4
      if (
        addData.conCalcOpxa04 !== null &&
        (addData.orderUsageCdN == null ||
          typeof addData.orderUsageCdN !== "string" ||
          addData.orderUsageCdN.trim() === "" ||
          addData.orderUsageCdN.length > 6)
      ) {
        Notify.failure("[주문용도지정코드] 조건을 만족하지 않습니다.");
        console.error("orderUsageCdN 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }
      // 연산 5
      if (
        addData.orderThickMin < 0 ||
        addData.orderThickMax < 0 ||
        (addData.conCalcOpxa05 === "value < a <= value" &&
          !(addData.orderThickMin < addData.orderThickMax)) ||
        (addData.conCalcOpxa05 === "value <= a < value" &&
          !(addData.orderThickMin < addData.orderThickMax)) ||
        (addData.conCalcOpxa05 === "value <= a <= value" &&
          !(addData.orderThickMin <= addData.orderThickMax)) ||
        (addData.conCalcOpxa05 === "value < a < value" &&
          !(addData.orderThickMin < addData.orderThickMax)) ||
        (addData.conCalcOpxa05 === "value >= a" &&
          addData.orderUsageCdN === null) ||
        (addData.conCalcOpxa05 === "value > a" &&
          addData.orderUsageCdN === null) ||
        (addData.conCalcOpxa05 === "value < a" &&
          addData.orderUsageCdN === null) ||
        (addData.conCalcOpxa05 === "value <= a" &&
          addData.orderUsageCdN === null)
      ) {
        Notify.failure("[제품두께] 조건을 만족하지 않습니다.");
        console.error("conCalcOpxa05 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }

      // 연산 6
      if (
        addData.orderWidthMin < 0 ||
        addData.orderWidthMax < 0 ||
        (addData.conCalcOpxa06 === "value < a <= value" &&
          !(addData.orderWidthMin < addData.orderWidthMax)) ||
        (addData.conCalcOpxa06 === "value <= a < value" &&
          !(addData.orderWidthMin < addData.orderWidthMax)) ||
        (addData.conCalcOpxa06 === "value <= a <= value" &&
          !(addData.orderWidthMin <= addData.orderWidthMax)) ||
        (addData.conCalcOpxa06 === "value < a < value" &&
          !(addData.orderWidthMin < addData.orderWidthMax)) ||
        (addData.conCalcOpxa06 === "value >= a" &&
          addData.orderUsageCdN === null) ||
        (addData.conCalcOpxa06 === "value > a" &&
          addData.orderUsageCdN === null) ||
        (addData.conCalcOpxa06 === "value < a" &&
          addData.orderUsageCdN === null) ||
        (addData.conCalcOpxa06 === "value <= a" &&
          addData.orderUsageCdN === null)
      ) {
        Notify.failure("[제품주문폭] 조건을 만족하지 않습니다.");
        console.error("orderWidthMin 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }
      //  연산 7
      if (
        addData.conCalcOpxa07 !== null &&
        (addData.specificationCdN == null ||
          typeof addData.specificationCdN !== "string" ||
          addData.specificationCdN.trim() === "" ||
          addData.specificationCdN.length > 30)
      ) {
        Notify.failure("[제품규격약호] 조건을 만족하지 않습니다.");
        console.error("specificationCdN 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }

      //  연산 8
      if (
        addData.conCalcOpxa08 !== null &&
        (addData.salCusLocLClsTp == null ||
          typeof addData.salCusLocLClsTp !== "string" ||
          addData.salCusLocLClsTp.trim() === "" ||
          addData.salCusLocLClsTp.length > 1)
      ) {
        Notify.failure("[판매고객사지역대분류구분] 조건을 만족하지 않습니다.");
        console.error("salCusLocLClsTp 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }

      //  연산 9
      if (
        addData.conCalcOpxa09 !== null &&
        (addData.smSteelGrdN == null ||
          typeof addData.smSteelGrdN !== "string" ||
          addData.smSteelGrdN.trim() === "" ||
          addData.smSteelGrdN.length > 14)
      ) {
        Notify.failure("[출강목표번호] 조건을 만족하지 않습니다.");
        console.error("smSteelGrdN 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }

      //  연산 10
      if (
        addData.conCalcOpxa10 !== null &&
        (addData.postTreatmentMethodCdN == null ||
          typeof addData.postTreatmentMethodCdN !== "string" ||
          addData.postTreatmentMethodCdN.trim() === "" ||
          addData.postTreatmentMethodCdN.length > 3)
      ) {
        Notify.failure(
          "[주문제품후처리방법지정코드] 조건을 만족하지 않습니다."
        );
        console.error("postTreatmentMethodCdN 조건을 만족하지 않습니다.");
        return false; // 조건 통과 실패
      }

      await EssentialStandardApi.addEssential(addData).then((data) => {
        if (addData.processCd === "10") {
          data.processCd = "제강";
        } else if (addData.processCd === "20") {
          data.processCd = "열연";
        } else if (addData.processCd === "30") {
          data.processCd = "열연정정";
        } else if (addData.processCd === "40") {
          data.processCd = "냉각압연";
        } else if (addData.processCd === "50") {
          data.processCd = "1차소둔";
        } else if (addData.processCd === "60") {
          data.processCd = "2차소둔";
        } else if (addData.processCd === "70") {
          data.processCd = "도금";
        } else if (addData.processCd === "80") {
          data.processCd = "정정";
        }
        addEssentialRow([...essentialList, data]);
      });

      Notify.success("필수재 기준이 추가 되었습니다", {
        showOnlyTheLastOne: false,
      });
      setAddData({
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
        pplMmatCancAppDt: new Date(),
        pplMmatCngMgtNo: null,
        processCd: null,
        salCusLocLClsTp: null,
        seq: null,
        smSteelGrdN: null,
        specificationCdN: null,
        addDataId: null,
      });
      setCheck01(false);
      setCheck02(false);
      setCheck03(false);
      setCheck04(false);
      setCheck05(0);
      setCheck06(0);
      setCheck07(false);
      setCheck08(false);
      setCheck09(false);
      setCheck10(false);
      handleClose();

      return true;
    }
    if (!validateData(addData)) {
    }
  };
  const gcsCompCodeChange = (event) => {
    setAddData((prev) => ({ ...prev, gcsCompCode: event.target.value }));
  };
  const millCdChange = (event) => {
    setAddData((prev) => ({ ...prev, millCd: event.target.value }));
  };
  const pplMmatCngMgtNoChange = (event) => {
    if (event.target.value < 0) {
      event.target.value = "";
    }
    setAddData((prev) => ({ ...prev, pplMmatCngMgtNo: event.target.value }));
  };
  const seqChange = (event) => {
    if (event.target.value < 0) {
      event.target.value = "";
    }
    setAddData((prev) => ({ ...prev, seq: event.target.value }));
  };
  const processCdChange = (event) => {
    setAddData((prev) => ({ ...prev, processCd: event.target.value }));
  };
  // const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  // const pplMmatCancAppDtChange = (selectDate) => {
  //   setAddData((prev) => ({ ...prev, pplMmatCancAppDt: new Date(selectDate) }));
  //   setSelectedDate(new Date(selectDate));
  // };
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const pplMmatCancAppDtChange = (selectDate) => {
    const newDayjsDate = dayjs(selectDate); // dayjs 객체로 변환
    setAddData((prev) => ({
      ...prev,
      pplMmatCancAppDt: new Date(newDayjsDate),
    }));
    setSelectedDate(newDayjsDate);
  };

  const pplBasPsgnoTpChange = (event) => {
    setAddData((prev) => ({ ...prev, pplBasPsgnoTp: event.target.value }));
  };
  const btiPosbPsFacTpChange = (event) => {
    setAddData((prev) => ({ ...prev, btiPosbPsFacTp: event.target.value }));
  };

  const [check01, setCheck01] = useState(false);
  const conCalcOpxa01Change = (event) => {
    if (event.target.value === "=") {
      setCheck01(true);
      setAddData((prev) => ({ ...prev, conCalcOpxa01: "=" }));
    } else {
      setCheck01(false);
      setAddData((prev) => ({ ...prev, ordPdtItpCdN: null }));
      setAddData((prev) => ({ ...prev, conCalcOpxa01: null }));
    }
  };

  const ordPdtItpCdNChange = (event) => {
    setAddData((prev) => ({
      ...prev,
      ordPdtItpCdN: event.target.value.toUpperCase(),
    }));
  };

  const [check02, setCheck02] = useState(false);
  const conCalcOpxa02Change = (event) => {
    if (event.target.value === "=") {
      setCheck02(true);
      setAddData((prev) => ({ ...prev, conCalcOpxa02: event.target.value }));
    } else {
      setCheck02(false);
      setAddData((prev) => ({ ...prev, ordPdtItdsCdN: null }));
      setAddData((prev) => ({ ...prev, conCalcOpxa02: null }));
    }
  };

  const ordPdtItdsCdNChange = (event) => {
    setAddData((prev) => ({
      ...prev,
      ordPdtItdsCdN: event.target.value.toUpperCase(),
    }));
  };

  const [check03, setCheck03] = useState(false);
  const conCalcOpxa03Change = (event) => {
    if (event.target.value === "=") {
      setCheck03(true);
      setAddData((prev) => ({ ...prev, conCalcOpxa03: event.target.value }));
    } else {
      setCheck03(false);
      setAddData((prev) => ({ ...prev, specificationCdN: null }));
      setAddData((prev) => ({ ...prev, conCalcOpxa03: null }));
    }
  };

  const specificationCdNChange = (event) => {
    setAddData((prev) => ({
      ...prev,
      specificationCdN: event.target.value.toUpperCase(),
    }));
  };

  const [check04, setCheck04] = useState(false);

  const conCalcOpxa04Change = (event) => {
    if (event.target.value === "=") {
      setCheck04(true);
      setAddData((prev) => ({ ...prev, conCalcOpxa04: event.target.value }));
    } else {
      setCheck04(false);
      setAddData((prev) => ({
        ...prev,
        orderUsageCdN: null,
      }));
      setAddData((prev) => ({ ...prev, conCalcOpxa04: null }));
    }
  };

  const orderUsageCdNChange = (event) => {
    setAddData((prev) => ({
      ...prev,
      orderUsageCdN: event.target.value.toUpperCase(),
    }));
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
      setAddData((prev) => ({ ...prev, orderThickMax: null }));
      setAddData((prev) => ({ ...prev, conCalcOpxa05: event.target.value }));
    } else if (
      event.target.value === "value < a <= value" ||
      event.target.value === "value <= a < value" ||
      event.target.value === "value <= a <= value" ||
      event.target.value === "value < a < value"
    ) {
      setCheck05(2);
      setAddData((prev) => ({ ...prev, conCalcOpxa05: event.target.value }));
    } else {
      setCheck05(0);
      setAddData((prev) => ({ ...prev, conCalcOpxa05: null }));
      setAddData((prev) => ({ ...prev, orderThickMax: null }));
      setAddData((prev) => ({ ...prev, orderThickMin: null }));
    }
  };

  const orderThickMinChange = (event) => {
    setAddData((prev) => ({ ...prev, orderThickMin: event.target.value }));
  };
  const orderThickMaxChange = (event) => {
    setAddData((prev) => ({ ...prev, orderThickMax: event.target.value }));
  };

  const [check06, setCheck06] = useState(0);
  const conCalcOpxa06Change = (event) => {
    console.log(event.target.value);
    if (
      event.target.value === "value >= a" ||
      event.target.value === "value > a" ||
      event.target.value === "value < a" ||
      event.target.value === "value <= a"
    ) {
      setCheck06(1);
      setAddData((prev) => ({ ...prev, conCalcOpxa06: event.target.value }));
      setAddData((prev) => ({ ...prev, orderWidthMax: null }));
    } else if (
      event.target.value === "value < a <= value" ||
      event.target.value === "value <= a < value" ||
      event.target.value === "value <= a <= value" ||
      event.target.value === "value < a < value"
    ) {
      setCheck06(2);
      setAddData((prev) => ({ ...prev, conCalcOpxa06: event.target.value }));
    } else {
      setCheck06(0);
      setAddData((prev) => ({ ...prev, conCalcOpxa06: null }));
      setAddData((prev) => ({ ...prev, orderWidthMax: null }));
      setAddData((prev) => ({ ...prev, orderWidthMin: null }));
    }
  };

  const orderWidthMinChange = (event) => {
    console.log("min값" + event.target.value);
    setAddData((prev) => ({ ...prev, orderWidthMin: event.target.value }));
  };
  const orderWidthMaxChange = (event) => {
    console.log("max값" + event.target.value);
    setAddData((prev) => ({ ...prev, orderWidthMax: event.target.value }));
  };

  const [check07, setCheck07] = useState(false);
  const conCalcOpxa07Change = (event) => {
    if (event.target.value === "=") {
      setCheck07(true);
      setAddData((prev) => ({ ...prev, conCalcOpxa07: event.target.value }));
    } else {
      setCheck07(false);
      setAddData((prev) => ({ ...prev, conCalcOpxa07: null }));
      setAddData((prev) => ({ ...prev, postTreatmentMethodCdN: null }));
    }
  };

  const postTreatmentMethodCdNChange = (event) => {
    setAddData((prev) => ({
      ...prev,
      postTreatmentMethodCdN: event.target.value.toUpperCase(),
    }));
  };

  const [check08, setCheck08] = useState(false);
  const conCalcOpxa08Change = (event) => {
    if (event.target.value === "=") {
      setCheck08(true);
      setAddData((prev) => ({
        ...prev,
        conCalcOpxa08: event.target.value,
      }));
    } else {
      setCheck08(false);
      setAddData((prev) => ({ ...prev, conCalcOpxa08: null }));
      setAddData((prev) => ({
        ...prev,
        smSteelGrd: null,
      }));
    }
  };

  const smSteelGrdNChange = (event) => {
    setAddData((prev) => ({
      ...prev,
      smSteelGrdN: event.target.value.toUpperCase(),
    }));
  };

  const [check09, setCheck09] = useState(false);
  const conCalcOpxa09Change = (event) => {
    if (event.target.value === "=") {
      setCheck09(true);
      setAddData((prev) => ({
        ...prev,
        conCalcOpxa09: event.target.value,
      }));
    } else {
      setCheck09(false);
      setAddData((prev) => ({ ...prev, conCalcOpxa09: null }));
      setAddData((prev) => ({
        ...prev,
        salCusLocLClsTp: null,
      }));
    }
  };

  const salCusLocLClsTpChange = (event) => {
    setAddData((prev) => ({
      ...prev,
      salCusLocLClsTp: event.target.value.toUpperCase(),
    }));
  };

  const [check10, setCheck10] = useState(false);
  const conCalcOpxa10Change = (event) => {
    if (event.target.value === "=") {
      setAddData((prev) => ({
        ...prev,
        conCalcOpxa10: event.target.value,
      }));
      setCheck10(true);
    } else {
      setCheck10(false);
      setAddData((prev) => ({ ...prev, conCalcOpxa10: null }));
      setAddData((prev) => ({
        ...prev,
        customerNumber: null,
      }));
      setAddData((prev) => ({
        ...prev,
        conCalcOpxa10: null,
      }));
    }
  };

  const customerNumberChange = (event) => {
    setAddData((prev) => ({
      ...prev,
      customerNumber: event.target.value.toUpperCase(),
    }));
  };

  const posFacItem = [
    <MenuItem value={"01"}>01</MenuItem>,
    <MenuItem value={"02"}>02</MenuItem>,
    <MenuItem value={"06"}>06</MenuItem>,
  ];
  const posFacItem2 = [
    <MenuItem value={"01"}>01</MenuItem>,
    <MenuItem value={"02"}>02</MenuItem>,
    <MenuItem value={"03"}>03</MenuItem>,
  ];
  const posFacItem3 = [
    <MenuItem value={"01"}>01</MenuItem>,
    <MenuItem value={"02"}>02</MenuItem>,
    <MenuItem value={"03"}>03</MenuItem>,
    <MenuItem value={"06"}>06</MenuItem>,
    <MenuItem value={"07"}>07</MenuItem>,
    <MenuItem value={"08"}>08</MenuItem>,
    <MenuItem value={"09"}>09</MenuItem>,
  ];
  const posFacItem4 = [
    <MenuItem value={"01"}>01</MenuItem>,
    <MenuItem value={"03"}>03</MenuItem>,
    <MenuItem value={"08"}>08</MenuItem>,
  ];
  const posFacItem5 = [
    <MenuItem value={"03"}>03</MenuItem>,
    <MenuItem value={"04"}>04</MenuItem>,
    <MenuItem value={"06"}>06</MenuItem>,
  ];

  // 품종
  const [codeNameList, setCodeNameList] = useState({
    list: [],
    select: "All",
  });

  useEffect(() => {
    PassStandardApi.getCodeNameList((data) => {
      const list = data.response;
      setCodeNameList((prev) => {
        return { ...prev, list };
      });
    });
  }, []);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%" }}
      maxWidth="xl"
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: { backdropFilter: "blur(0)" },
      }}
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
        </Typography>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography style={{ color: "gray" }} variant="h6">
                    법인
                  </Typography>
                  <p style={{ color: "red" }}>*</p>
                </div>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      필수 요소입니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography style={{ color: "gray" }} variant="h6">
                    공적계획박판Mill구분
                  </Typography>
                  <p style={{ color: "red" }}>*</p>
                </div>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      필수 요소입니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography style={{ color: "gray" }} variant="h6">
                    공정계획필수재변경관리번호
                  </Typography>
                  <p style={{ color: "red" }}>*</p>
                </div>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      필수 요소이며, 최대 11글자까지 입력 가능합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography style={{ color: "gray" }} variant="h6">
                    일련번호
                  </Typography>
                  <p style={{ color: "red" }}>*</p>
                </div>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      필수 요소이며, 최대 22글자까지 입력 가능합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography style={{ color: "gray" }} variant="h6">
                    박판계획공정구분
                  </Typography>
                  <p style={{ color: "red" }}>*</p>
                </div>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      필수 요소입니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  공정계획필수해지적용일자
                </Typography>
              </div>
              <div style={{ background: "#F6FAFE" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    date={selectedDate}
                    value={selectedDate}
                    defaultValue={selectedDate}
                    onChange={pplMmatCancAppDtChange}
                    label="공정계획필수해지적용일자"
                    slotProps={{
                      textField: {
                        readOnly: true,
                        style: { width: "100%", color: "#5d86a7" },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
            {/* </div> */}

            {/* 공정계획기준가등록구분 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px 0 15px 0",
              }}
            >
              <Typography style={{ color: "gray" }} variant="h6">
                공정계획기준가등록구분
              </Typography>
              <FormControl>
                <InputLabel>공정계획기준가등록구분</InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
                  label="공정계획기준가등록구분"
                  onChange={pplBasPsgnoTpChange}
                  renderInput={(props) => <TextField {...props} disabled />}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  박판가능통과공장구분
                </Typography>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      박판계획공정구분 선택 후 선택 가능합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <FormControl>
                <InputLabel>박판가능통과공장구분</InputLabel>
                <Select
                  style={{ background: "#F6FAFE" }}
                  label="박판가능통과공장구분"
                  onChange={btiPosbPsFacTpChange}
                >
                  {addData.processCd === "10" || addData.processCd === "20" ? (
                    posFacItem
                  ) : (
                    <></>
                  )}
                  {addData.processCd === "30" ? posFacItem2 : <></>}
                  {addData.processCd === "40" || addData.processCd === "50" ? (
                    posFacItem3
                  ) : (
                    <></>
                  )}
                  {addData.processCd === "60" ? posFacItem4 : <></>}
                  {addData.processCd === "70" ? posFacItem5 : <></>}
                  {addData.processCd === "80" ? (
                    <MenuItem value={"01"}>01</MenuItem>
                  ) : (
                    <></>
                  )}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  품종
                </Typography>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    label="연산자 없음"
                    onChange={conCalcOpxa01Change}
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
                    <MenuItem value={"="}>=</MenuItem>
                  </Select>
                </FormControl>
                {!check01 ? null : (
                  <FormControl style={{ width: "100%", marginLeft: "10px" }}>
                    <FormControl>
                      <InputLabel>품종</InputLabel>
                      <Select
                        label="품종"
                        onChange={ordPdtItpCdNChange}
                        style={{ background: "#F6FAFE" }}
                      >
                        {codeNameList.list.map((code, idx) => (
                          <MenuItem key={idx} value={code.cdNm}>
                            {code.cdNm}
                          </MenuItem>
                        ))}
                      </Select>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  품명
                </Typography>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      품종 값이 품명 앞 두글자에 포함되어야 합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    label="연산자 없음"
                    onChange={conCalcOpxa02Change}
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  고객사코드
                </Typography>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      최대 10글자까지 입력 가능합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    label="연산자 없음"
                    onChange={conCalcOpxa03Change}
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  주문용도지정코드
                </Typography>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      최대 6글자까지 입력 가능합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    id="demo-simple-select"
                    label="연산자 없음"
                    onChange={conCalcOpxa04Change}
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  제품두께
                </Typography>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    id="demo-simple-select"
                    label="연산자 없음"
                    onChange={conCalcOpxa05Change}
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
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
                    <MenuItem value={"value < a < value"}>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  제품주문폭
                </Typography>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    label="연산자 없음"
                    onChange={conCalcOpxa06Change}
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
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
                    <MenuItem value={"value < a < value"}>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  제품규격약호
                </Typography>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      최대 30글자까지 입력 가능합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>

              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    id="demo-simple-select"
                    label="연산자 없음"
                    onChange={conCalcOpxa07Change}
                    type="number"
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  판매고객사지역대분류구분
                </Typography>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      최대 1글자까지 입력 가능합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    id="demo-simple-select"
                    label="연산자 없음"
                    onChange={conCalcOpxa08Change}
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  출강목표번호
                </Typography>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      최대 14글자까지 입력 가능합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    label="연산자 없음"
                    onChange={conCalcOpxa09Change}
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ color: "gray" }} variant="h6">
                  주문제품후처리방법지정코드
                </Typography>
                <Tooltip
                  title={
                    <div
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      최대 3글자까지 입력 가능합니다
                    </div>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl style={{ width: "100%", marginRight: "10px" }}>
                  <InputLabel>연산자 없음</InputLabel>
                  <Select
                    style={{ background: "#F6FAFE" }}
                    label="연산자 없음"
                    onChange={conCalcOpxa10Change}
                  >
                    <MenuItem value={"연산자 없음"}>연산자 없음</MenuItem>
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
              setAddData({
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
                pplMmatCancAppDt: new Date(),
                pplMmatCngMgtNo: null,
                processCd: null,
                salCusLocLClsTp: null,
                seq: null,
                smSteelGrdN: null,
                specificationCdN: null,
                addDataId: null,
              });
              setCheck01(false);
              setCheck02(false);
              setCheck03(false);
              setCheck04(false);
              setCheck05(0);
              setCheck06(0);
              setCheck07(false);
              setCheck08(false);
              setCheck09(false);
              setCheck10(false);
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
