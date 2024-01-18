"use strict";
import { useState, useEffect } from "react";

import "react-datasheet-grid/dist/style.css";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Card,
} from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SelectColumn from "react-select";
import makeAnimated from "react-select/animated";
import LotApi from "src/pages/api/pofect/LotApi";
import MainApi from "src/pages/api/pofect/MainApi";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import LotDetail from "src/views/lot/lot-detail";
import LotChart from "src/views/lot/lot-chart";
import LotRegression from "src/views/lot-regression/LotRegresion";

function MyCell(props) {
  let style = {
    minWidth: props.width,
    maxWidth: props.width,
    minHeight: props.height,
    maxHeight: props.height === "auto" ? "none" : props.height,
    ...props.style,
  };
  const apiRef = useGridApiContext();
  const row = apiRef.current.getRow(props.rowId);
  if (row && row.rowSpan && row.rowSpan[props.column.field]) {
    const span = row.rowSpan[props.column.field];
    style = {
      ...style,
      minHeight: props.height * span,
      maxHeight: props.height * span,
      backgroundColor: "#F5F9FF",
      color: "#05507DAD",
      zIndex: 1,
    };
  }
  return <GridCell {...props} style={style} />;
}

const Lot = () => {
  const [lotData, setLotData] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  // 출강주
  const [weekList, setWeekList] = useState({
    list: [],
    select: "",
  });

  const [ordPdtItpCdNList, setOrdPdtItpCdNList] = useState([]);
  const [smList, setSmList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCellValue, setSelectedCellValue] = useState([]);

  // 차트보기
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [sumValue, setSumValue] = useState([]);

  const getLotList = (week) => {
    if (week == 0) week = null;
    const ordPdtItpCdNString =
      ordPdtItpCdNList.selectordPdtItpCdN != undefined &&
      ordPdtItpCdNList.selectordPdtItpCdN.size != 0
        ? ordPdtItpCdNList.selectordPdtItpCdN.join(",")
        : undefined;

    const smString =
      smList.selectSm != undefined && smList.selectSm.size != 0
        ? smList.selectSm.join(",")
        : undefined;

    console.log(smString);
    LotApi.getList(week, isChecked, ordPdtItpCdNString, smString, (data) => {
      const resData = data.response;
      const testNum = 2;

      if (!isChecked) {
        testNum = 1;
      }

      const resultData = resData.map((item, index) => {
        const newItem = { ...item, id: index + 1 };
        const sum = 0;
        const sum2 = 0;
        if (item && item.faConfirmFlag === "E") {
          const sumStand = 0;
          newItem = {
            ...newItem,
            faConfirmFlag: "투입대기",
            rowSpan: { smSteelGrdN: testNum },
          };
          if (item && item.widthGroups && item.widthGroups.width_970_stand) {
            newItem = {
              ...newItem,
              width_970_stand: item.widthGroups.width_970_stand,
            };
            sumStand += item.widthGroups.width_970_stand;
          }
          if (item && item.widthGroups && item.widthGroups.width_1270_stand) {
            newItem = {
              ...newItem,
              width_1270_stand: item.widthGroups.width_1270_stand,
            };
            sumStand += item.widthGroups.width_1270_stand;
          }
          if (item && item.widthGroups && item.widthGroups.width_1570_stand) {
            newItem = {
              ...newItem,
              width_1570_stand: item.widthGroups.width_1570_stand,
            };
            sumStand += item.widthGroups.width_1570_stand;
          }
          if (
            item &&
            item.widthGroups &&
            item.widthGroups.width_over_1570_stand
          ) {
            newItem = {
              ...newItem,
              width_over_1570_stand: item.widthGroups.width_over_1570_stand,
            };
            sumStand += item.widthGroups.width_over_1570_stand;
          }
          return { ...newItem, sum_stand: sumStand == 0 ? "" : sumStand };
        } else if (item && item.faConfirmFlag === "F") {
          newItem = { ...newItem, faConfirmFlag: "기투입" };
          // const sum = 0;
          // const sum2 = 0;

          if (item && item.widthGroups && item.widthGroups.width_9701) {
            newItem = { ...newItem, width_9701: item.widthGroups.width_9701 };
            sum += item.widthGroups.width_9701;
          }
          if (item && item.widthGroups && item.widthGroups.width_9702) {
            newItem = { ...newItem, width_9702: item.widthGroups.width_9702 };
            sum2 += item.widthGroups.width_9702;
          }
          if (item && item.widthGroups && item.widthGroups.width_12701) {
            newItem = { ...newItem, width_12701: item.widthGroups.width_12701 };
            sum += item.widthGroups.width_12701;
          }
          if (item && item.widthGroups && item.widthGroups.width_12702) {
            newItem = { ...newItem, width_12702: item.widthGroups.width_12702 };
            sum2 += item.widthGroups.width_12702;
          }
          if (item && item.widthGroups && item.widthGroups.width_15701) {
            newItem = { ...newItem, width_15701: item.widthGroups.width_15701 };
            sum += item.widthGroups.width_15701;
          }
          if (item && item.widthGroups && item.widthGroups.width_15702) {
            newItem = { ...newItem, width_15702: item.widthGroups.width_15702 };
            sum2 += item.widthGroups.width_15702;
          }
          if (item && item.widthGroups && item.widthGroups.width_over_15701) {
            newItem = {
              ...newItem,
              width_over_15701: item.widthGroups.width_over_15701,
            };
            sum += item.widthGroups.width_over_15701;
          }
          if (item && item.widthGroups && item.widthGroups.width_over_15702) {
            newItem = {
              ...newItem,
              width_over_15702: item.widthGroups.width_over_15702,
            };
            sum2 += item.widthGroups.width_over_15702;
          }
        }
        return {
          ...newItem,
          sum: sum == 0 ? "" : sum,
          sum2: sum2 == 0 ? "" : sum2,
        };
      });

      setLotData(resultData);
    });
  };

  useEffect(() => {
    getLotList(null, true);

    MainApi.getWeekList("H", ["E", "F"], (data) => {
      const list = data.response;
      // const select = list[0];
      setWeekList((prev) => {
        return { ...prev, list };
      });
    });
  }, []);

  const buttonList = [
    {
      value: "FS",
      label: "SLAB",
    },
    {
      value: "FH",
      label: "HR",
    },
    {
      value: "FD",
      label: "PO",
    },
    {
      value: "FF",
      label: "FH",
    },
    {
      value: "FC",
      label: "CR",
    },
    {
      value: "FB",
      label: "BP",
    },
    {
      value: "FG",
      label: "GI",
    },
    {
      value: "HO",
      label: "C.PM3/5",
    },
    {
      value: "HA",
      label: "PM 1.5",
    },
    {
      value: "FA",
      label: "GA",
    },
    {
      value: "FZ",
      label: "EG",
    },
    {
      value: "FL",
      label: "HG",
    },
    {
      value: "FE",
      label: "GO",
    },
    {
      value: "FM",
      label: "NO",
    },

    {
      value: "F6",
      label: "HGA",
    },
    {
      value: "HF",
      label: "H.PM3/5",
    },
    {
      value: "HL",
      label: "AlFe",
    },
  ];

  const testList = [
    {
      value: "SM1",
      label: "극저",
    },
    {
      value: "SM2",
      label: "중저탄",
    },
    {
      value: "SM3",
      label: "중고탄",
    },
  ];

  const columns = [
    {
      field: "smSteelGrdN",
      headerName: "강종",
      width: 175,
      headerAlign: "center",
    },
    {
      field: "faConfirmFlag",
      headerName: "구분",
      width: 115,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_9701",
      headerName: "1",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_9702",
      headerName: "2",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_970_stand",
      headerName: "대기",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_12701",
      headerName: "1",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_12702",
      headerName: "2",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_1270_stand",
      headerName: "대기",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_15701",
      headerName: "1",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_15702",
      headerName: "2",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_1570_stand",
      headerName: "대기",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_over_15701",
      headerName: "1",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_over_15702",
      headerName: "2",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "width_over_1570_stand",
      headerName: "대기",
      width: 100,
      sortable: false,
      headerAlign: "center",
    },

    {
      field: "sum",
      headerName: "1",
      width: 80,
      // valueGetter: (params) => {
      //     const width_9701 = params.row.width_9701 || 0;
      //     const width_12701 = params.row.width_12701 || 0;
      //     const width_15701 = params.row.width_15701 || 0;
      //     const width_over_15701 = params.row.width_over_15701 || 0;

      //     return width_9701 + width_12701 + width_15701 + width_over_15701 || "";
      // },
      headerAlign: "center",
    },
    {
      field: "sum2",
      headerName: "2",
      width: 80,
      // valueGetter: (params) => {
      //     const width_9702 = params.row.width_9702 || 0;
      //     const width_12702 = params.row.width_12702 || 0;
      //     const width_15702 = params.row.width_15702 || 0;
      //     const width_over_15702 = params.row.width_over_15702 || 0;

      //     return width_9702 + width_12702 + width_15702 + width_over_15702 || "";
      // },
      headerAlign: "center",
    },
    {
      field: "sum_stand",
      headerName: "대기",
      width: 80,
      // valueGetter: (params) => {
      //     const width_970_stand = params.row.width_970_stand || 0;
      //     const width_1270_stand = params.row.width_1270_stand || 0;
      //     const width_1570_stand = params.row.width_1570_stand || 0;
      //     const width_over_1570_stand = params.row.width_over_1570_stand || 0;

      //     return width_970_stand + width_1270_stand + width_1570_stand + width_over_1570_stand || "";
      // },
      headerAlign: "center",
    },
  ];

  const columnGroupingModel = [
    {
      groupId: "주문 폭(m)",
      children: [{ field: "smSteelGrdN" }, { field: "faConfirmFlag" }],
      headerAlign: "center",
    },
    {
      groupId: "970",
      children: [
        { field: "width_9701" },
        { field: "width_9702" },
        { field: "width_970_stand" },
      ],
      headerAlign: "center",
    },
    {
      groupId: "1270",
      children: [
        { field: "width_12701" },
        { field: "width_12702" },
        { field: "width_1270_stand" },
      ],
      headerAlign: "center",
    },
    {
      groupId: "1570",
      children: [
        { field: "width_15701" },
        { field: "width_15702" },
        { field: "width_1570_stand" },
      ],
      headerAlign: "center",
    },
    {
      groupId: "1570~",
      children: [
        { field: "width_over_15701" },
        { field: "width_over_15702" },
        { field: "width_over_1570_stand" },
      ],
      headerAlign: "center",
    },
    {
      groupId: "합계량",
      children: [{ field: "sum" }, { field: "sum2" }, { field: "sum_stand" }],
      headerAlign: "center",
    },
  ];

  const handleCellClick = (params) => {
    if (params.field === "smSteelGrdN") {
      const filteredData = lotData.filter(
        (item) => item.smSteelGrdN === params.value
      );
      setSelectedCellValue(filteredData);
      setIsModalOpen(true);
    }
  };

  const handleChartClick = () => {
    const width_9701_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_9701);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_9702_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_9702);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_12701_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_12701);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_12702_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_12702);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_15701_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_15701);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_15702_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_15702);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_over_15701_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_over_15701);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_over_15702_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_over_15702);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_970_stand_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_970_stand);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_1270_stand_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_1270_stand);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_1570_stand_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_1570_stand);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const width_over_1570_stand_sum = lotData.reduce((total, row) => {
      const ageValue = Number(row.width_over_1570_stand);

      if (!isNaN(ageValue)) {
        return total + ageValue;
      } else {
        return total;
      }
    }, 0);

    const newObjcet = {
      ...sumValue,
      width_9701_sum: width_9701_sum,
      width_9702_sum: width_9702_sum,
      width_12701_sum: width_12701_sum,
      width_12702_sum: width_12702_sum,
      width_15701_sum: width_15701_sum,
      width_15702_sum: width_15702_sum,
      width_over_15701_sum: width_over_15701_sum,
      width_over_15702_sum: width_over_15702_sum,
      width_970_stand_sum: width_970_stand_sum,
      width_1270_stand_sum: width_1270_stand_sum,
      width_1570_stand_sum: width_1570_stand_sum,
      width_over_1570_stand_sum: width_over_1570_stand_sum,
    };

    setSumValue(newObjcet);

    setIsChartOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseChart = () => {
    setIsChartOpen(false);
  };

  const [openPassStandard, setOpenPassStandard] = useState(false);

  const passClick = () => {
    setOpenPassStandard(true);
  };
  const passClose = () => {
    setOpenPassStandard(false);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 260,
    }),
  };

  const customStylesItem = {
    control: (provided, state) => ({
      ...provided,
      width: 400,
    }),
  };

  const handleCheckboxChange = () => {
    console.log(smList);
    setIsChecked(!isChecked);
  };

  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    calculateSum();
  }, []); // Runs once on initial render

  const calculateSum = () => {
    const sum = lotData.reduce((accumulator, row) => {
      const width_9702 = row.width_9702 || 0;
      const width_12702 = row.width_12702 || 0;
      const width_15702 = row.width_15702 || 0;
      const width_over_15702 = row.width_over_15702 || 0;
      return (
        accumulator +
        (width_9702 + width_12702 + width_15702 + width_over_15702)
      );
    }, "");

    setTotalSum(sum);
  };

  // excel
  const fileType =
    "application/vnd.openxmlformats-officedcoument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const koreanHeaderMap = {
    smSteelGrdN: "강종",
    faConfirmFlag: "구분",
    width_9701: "길이 970 이하 공장 1",
    width_9702: "길이 970 이하 공장 2",
    width_970_stand: "길이 970 이하 대기",
    width_12701: "길이 1270 이하 공장 1",
    width_12702: "길이 1270 이하 공장 2",
    width_1270_stand: "길이 1270 이하 공장 대기",
    width_15701: "길이 1570 이하 공장 1",
    width_15702: "길이 1570 이하 공장 2",
    width_1570_stand: "길이 1570 이하 공장 대기",
    width_over_15701: "길이 1570 초과 공장 1",
    width_over_15702: "길이 1570 초과 공장 2",
    width_over_1570_stand: "길이 1570 이하 공장 대기",
    sum: "공장 1 합계량",
    sum2: "공장 2 합계량",
    sum_stand: "투입대기 합계량",
  };

  const exportToExcelLot = async () => {
    const originalHeader = [
      "smSteelGrdN",
      "faConfirmFlag",
      "width_9701",
      "width_9702",
      "width_970_stand",
      "width_12701",
      "width_12702",
      "width_1270_stand",
      "width_15701",
      "width_15702",
      "width_1570_stand",
      "width_over_15701",
      "width_over_15702",
      "width_over_1570_stand",
      "sum",
      "sum2",
      "sum_stand",
    ];

    const sortedLotList = [...lotData].sort((a, b) => a.id - b.id);
    const excelData = sortedLotList.map((item) =>
      originalHeader.map((key) => item[key])
    );
    const koreanHeader = originalHeader.map(
      (englishKey) => koreanHeaderMap[englishKey] || englishKey
    );

    const ws = XLSX.utils.aoa_to_sheet([koreanHeader, ...excelData]);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "출강Lot" + fileExtension);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h4">출강Lot</Typography>
      </Grid>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <FormControl
              sx={{ m: 1 }}
              style={{
                paddingTop: 10,
                // paddingBottom: 10,
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
          <div>
            <FormControl
              sx={{ m: 1 }}
              style={{
                paddingTop: 10,
                // paddingBottom: 10,
                marginRight: 10,
              }}
            >
              <InputLabel
                id="label1"
                style={{ paddingTop: 13, marginBottom: 100 }}
              >
                출강주
              </InputLabel>
              <Select
                labelId="출강주"
                id="demo-multiple-name"
                defaultValue={0}
                input={<OutlinedInput label="출강주" />}
                onChange={(e) => {
                  setWeekList(
                    Object.assign({}, weekList, {
                      select: e.target.value,
                    })
                  );
                }}
                style={{ height: 40, width: 150 }}
              >
                <MenuItem value={0}>All</MenuItem>
                {weekList.list.map((code, idx) => {
                  return (
                    <MenuItem key={idx} value={code}>
                      {code}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          size="large"
          type="submit"
          variant="contained"
          style={{ backgroundColor: "rgb(190, 46, 34)", whiteSpace: "nowrap" }}
          onClick={passClick}
        >
          예측하기
        </Button>
        <LotRegression
          open={openPassStandard}
          handleClose={passClose}
          sumValue={sumValue}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ paddingRight: 10, paddingLeft: 10 }}>진도</div>
          <input
            type="checkbox"
            checked={isChecked}
            defaultChecked={true}
            onChange={handleCheckboxChange}
          />
          <label style={{ fontSize: "16px", paddingLeft: 5 }}>
            기투입 포함
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: 30,
              paddingRight: 10,
            }}
          >
            강종별
          </div>
          <div>
            <SelectColumn
              styles={customStyles}
              closeMenuOnSelect={false}
              components={makeAnimated}
              isMulti
              options={testList}
              onChange={(e) => {
                setSmList((prev) => {
                  const selectSm = e.map((item) => {
                    return item.value;
                  });
                  return { ...prev, selectSm };
                });
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: 30,
              paddingRight: 10,
            }}
          >
            품종
          </div>
          <div>
            <SelectColumn
              styles={customStylesItem}
              closeMenuOnSelect={false}
              components={makeAnimated}
              isMulti
              options={buttonList}
              onChange={(e) => {
                setOrdPdtItpCdNList((prev) => {
                  const selectordPdtItpCdN = e.map((item) => {
                    return item.value;
                  });
                  return { ...prev, selectordPdtItpCdN };
                });
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBlock: "15px",
          }}
        >
          <div>
            <Button
              size="small"
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#0A5380" }}
              onClick={handleChartClick}
            >
              차트보기
            </Button>
            <LotChart
              open={isChartOpen}
              handleClose={handleCloseChart}
              sumValue={sumValue}
            />
            <Button
              size="small"
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#E29E21" }}
              onClick={() => {
                getLotList(weekList.select);
              }}
            >
              조회
            </Button>
            <Button
              size="small"
              type="submit"
              variant="contained"
              style={{ backgroundColor: "darkgreen" }}
              onClick={exportToExcelLot}
            >
              Excel
            </Button>
          </div>
        </div>
      </div>
      <Card>
        <Box
          sx={{
            height: "800px",
            width: "100%",
            "& .custom-data-grid .MuiDataGrid-columnsContainer, & .custom-data-grid .MuiDataGrid-cell":
              {
                borderBottom: "1px solid rgba(225, 234, 239, 1)",
                borderRight: "1px solid rgba(225, 234, 239, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "gray",
              },
            "& .custom-data-grid .MuiDataGrid-columnHeader": {
              cursor: "pointer",
              borderBottom: "1px solid rgba(225, 234, 239, 1)",
              borderRight: "1px solid rgba(225, 234, 239, 1)",
            },
            "& .custom-data-grid .MuiDataGrid-columnHeader--filledGroup  .MuiDataGrid-columnHeaderTitleContainer":
              {
                borderBottomStyle: "none",
              },
            "& .custom-data-grid .MuiDataGrid-columnHeadersInner": {
              backgroundColor: "#F5F9FF",
            },
          }}
        >
          <DataGrid
            className="custom-data-grid"
            experimentalFeatures={{ columnGrouping: true }}
            disableRowSelectionOnClick
            rows={lotData}
            columns={columns}
            onCellClick={handleCellClick}
            columnGroupingModel={columnGroupingModel}
            slots={{
              cell: MyCell,
            }}
          />
        </Box>
      </Card>
      <LotDetail
        open={isModalOpen}
        handleClose={handleCloseModal}
        selectedCellValue={selectedCellValue}
      />
    </div>
  );
};

export default Lot;
