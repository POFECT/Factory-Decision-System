import { React, useState, useEffect } from "react";
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

import EssentialStandardApi from "src/pages/api/pofect/EssentialStandardApi";

import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import EssentialModal from "src/views/essential-goods/EssentialModal";
const util = require("util");

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
      backgroundColor: "gray",
      zIndex: 1,
    };
  }
  return <GridCell {...props} style={style} />;
}

const EssentialGoods = () => {
  const [essentialList, setessentialList] = useState([]);
  const [codeNameList, setCodeNameList] = useState({
    list: [],
    select: "All",
  });

  const removeDuplicatesAndNull = (array) => {
    return array.filter((value, index, self) => {
      return value !== null && self.indexOf(value) === index;
    });
  };

  useEffect(() => {
    EssentialStandardApi.getEssentialStandardList((data) => {
      const responseData = data.response;
      console.log(responseData);
      const processCdMappings = {
        10: "제강",
        20: "열연",
        30: "열연정정",
        40: "냉간압연",
        50: "1차소둔",
        60: "2차소둔",
        70: "도금",
        80: "정정",
      };

      const responseDataFilter = responseData.map((item) => {
        const mappedProcessCd =
          processCdMappings[item.processCd] || item.processCd;
        return { ...item, processCd: mappedProcessCd };
      });
      setessentialList(responseDataFilter);

      setCodeNameList((prev) => {
        return {
          ...prev,
          list: removeDuplicatesAndNull(
            data.response.map((item) => {
              return item.ordPdtItpCdN;
            })
          ),
        };
      });
    });
  }, []);

  const columns = [
    {
      field: "gcsCompCode",
      headerName: "법인",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "millCd",
      headerName: "공정계획박판Mill구분",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "pplMmatCngMgtNo",
      headerName: "공정계획필수재변경관리번호",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "seq",
      headerName: "일련번호",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "processCd",
      headerName: "박판공정계획공정구분",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "pplMmatCancAppDt",
      headerName: "공정계획필수해지적용일자",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "pplBasPsgnoTp",
      headerName: "공정계획기준가등록구분",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "btiPosbPsFacTp",
      headerName: "박판가능통과공장구분",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa01",
      headerName: "연산자",
      width: 100,
      headerAlign: "center",
      headerAlign: "center",
    },
    {
      field: "ordPdtItpCdN",
      headerName: "주문품종코드",
      width: 180,
      headerAlign: "center",
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa02",
      headerName: "연산자",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "ordPdtItdsCdN",
      headerName: "주문품명코드",
      width: 180,
      headerAlign: "center",
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa03",
      headerName: "연산자",
      width: 130,
      headerAlign: "center",
    },
    {
      field: "customerNumber",
      headerName: "고객사코드",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa04",
      headerName: "연산자",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "orderUsageCdN",
      headerName: "주문용도지정코드",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa05",
      headerName: "연산자",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "orderThickMin",
      headerName: "제품주문두께1",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "orderThickMax",
      headerName: "제품주문두께2",
      width: 130,
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa06",
      headerName: "연산자",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "orderWidthMin",
      headerName: "제품주문폭1",
      width: 130,
      headerAlign: "center",
    },
    {
      field: "orderWidthMax",
      headerName: "제품주문폭2",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa07",
      headerName: "연산자",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "specificationCdN",
      headerName: "제품규격약호",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa08",
      headerName: "연산자",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "salCusLocLClsTp",
      headerName: "판매고객사지역대분류구분",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa09",
      headerName: "연산자",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "smSteelGrdN",
      headerName: "출강목표번호",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "conCalcOpxa10",
      headerName: "연산자",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "postTreatmentMethodCdN",
      headerName: "제품후처리방법지정코드",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "userId",
      headerName: "박판공정계획사용자ID",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "lastUpdateDate",
      headerName: "최종수정일자",
      width: 150,
      headerAlign: "center",
    },
  ];

  const columnGroupingModel = [
    {
      groupId: "품종",
      children: [{ field: "conCalcOpxa01" }, { field: "ordPdtItpCdN" }],
      headerAlign: "center",
    },
    {
      groupId: "품명",
      children: [{ field: "conCalcOpxa02" }, { field: "ordPdtItdsCdN" }],
      headerAlign: "center",
    },
    {
      groupId: "고객사코드",
      children: [{ field: "conCalcOpxa03" }, { field: "customerNumber" }],
      headerAlign: "center",
    },
    {
      groupId: "주문용도지정코드",
      children: [{ field: "conCalcOpxa04" }, { field: "orderUsageCdN" }],
      headerAlign: "center",
    },
    {
      groupId: "제품두께",
      children: [
        { field: "conCalcOpxa05" },
        { field: "orderThickMin" },
        { field: "orderThickMax" },
      ],
      headerAlign: "center",
    },
    {
      groupId: "제품주문폭",
      children: [
        { field: "conCalcOpxa06" },
        { field: "orderWidthMin" },
        { field: "orderWidthMax" },
      ],
      headerAlign: "center",
    },
    {
      groupId: "제품규격약호",
      children: [{ field: "conCalcOpxa07" }, { field: "specificationCdN" }],
      headerAlign: "center",
    },
    {
      groupId: "판매고객사지역대분류구분",
      children: [{ field: "conCalcOpxa08" }, { field: "salCusLocLClsTp" }],
      headerAlign: "center",
    },
    {
      groupId: "출강목표번호",
      children: [{ field: "conCalcOpxa09" }, { field: "smSteelGrdN" }],
      headerAlign: "center",
    },
    {
      groupId: "주문제품후처리방법지정코드",
      children: [
        { field: "conCalcOpxa10" },
        { field: "postTreatmentMethodCdN" },
      ],
      headerAlign: "center",
    },
  ];

  const fileType =
    "application/vnd.openxmlformats-officedcoument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    // 한글 헤더 매핑 (엑셀용)
    const koreanHeaderMap = {
      gcsCompCode: "법인",
      millCd: "공정계획박판Mill구분",
      pplMmatCngMgtNo: "공정계획필수재변경관리번호",
      seq: "일련번호",
      processCd: "박판공정계획공정구분",
      pplMmatCancAppDt: "공정계획필수해지적용일자",
      pplBasPsgnoTp: "공정계획기준가등록구분",
      btiPosbPsFacTp: "박판가능통과공장구분",
      conCalcOpxa01: "품종 연산자",
      ordPdtItpCdN: "품종",
      conCalcOpxa02: "품명 연산자",
      ordPdtItdsCdN: "품명",
      conCalcOpxa03: "고객사코드 연산자",
      customerNumber: "고객사코드",
      conCalcOpxa04: "주문용도지정코드 연산자",
      orderUsageCdN: "주문용도지정코드",
      conCalcOpxa05: "제품두께 연산자",
      orderThickMin: "제품두께 최소",
      orderThickMax: "제품두께 최대",
      conCalcOpxa06: "제품규격약효 연산자",
      orderWidthMin: "제품규격약효 최소",
      orderWidthMax: "제품규격약효 최대",
      conCalcOpxa07: "판매고객사지역대분류구분 연산자",
      specificationCdN: "판매고객사지역대분류구분",
      conCalcOpxa08: "출강목표번호 연산자",
      salCusLocLClsTp: "출강목표번호",
      conCalcOpxa09: "출강목표번호 연산자",
      smSteelGrdN: "출강목표번호",
      conCalcOpxa10: "주문제품후처리방법지정코드 연산자",
      postTreatmentMethodCdN: "주문제품후처리방법지정코드",
      userId: "박판공정계획사용자ID",
      id: "아이디",
      lastUpdateDate: "최종수정일자",
    };

    const originalHeader = [
      "gcsCompCode",
      "millCd",
      "pplMmatCngMgtNo",
      "seq",
      "processCd",
      "pplMmatCancAppDt",
      "pplBasPsgnoTp",
      "btiPosbPsFacTp",
      "conCalcOpxa01",
      "ordPdtItpCdN",
      "conCalcOpxa02",
      "ordPdtItdsCdN",
      "conCalcOpxa03",
      "customerNumber",
      "conCalcOpxa04",
      "orderUsageCdN",
      "conCalcOpxa05",
      "orderThickMin",
      "orderThickMax",
      "conCalcOpxa06",
      "orderWidthMin",
      "orderWidthMax",
      "conCalcOpxa07",
      "specificationCdN",
      "conCalcOpxa08",
      "salCusLocLClsTp",
      "conCalcOpxa09",
      "smSteelGrdN",
      "conCalcOpxa10",
      "postTreatmentMethodCdN",
      "userId",
      "id",
      "lastUpdateDate",
    ];

    // possibleList의 id를 기준으로 정렬
    const sortedEssentialList = [...essentialList].sort((a, b) => a.id - b.id);

    // 데이터를 헤더와 일치하는 형식으로 변환
    const excelData = sortedEssentialList.map((item) =>
      originalHeader.map((key) => item[key])
    );

    // 헤더를 한글로 변경
    const koreanHeader = originalHeader.map(
      (englishKey) => koreanHeaderMap[englishKey] || englishKey
    );
    const ws = XLSX.utils.json_to_sheet([koreanHeader, ...excelData]);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "필수재기준" + fileExtension);
  };

  const filteredCondeNameList = async () => {
    const responseData = await EssentialStandardApi.getEssentialStandardList();

    const processCdMappings = {
      10: "제강",
      20: "열연",
      30: "열연정정",
      40: "냉간압연",
      50: "1차소둔",
      60: "2차소둔",
      70: "도금",
      80: "정정",
    };

    let responseDataFilter = responseData.map((item) => {
      const mappedProcessCd =
        processCdMappings[item.processCd] || item.processCd;
      return { ...item, processCd: mappedProcessCd };
    });

    if (codeNameList.select !== "All") {
      responseDataFilter = responseDataFilter.filter((item) => {
        if (item.ordPdtItpCdN === codeNameList.select) {
          return item;
        }
      });
    }

    setessentialList(responseDataFilter);
  };

  const [openPassStandard, setOpenPassStandard] = useState(false);

  const passClick = () => {
    setOpenPassStandard(true);
  };
  const passClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenPassStandard(false);
    }
  };

  return (
    <div style={{ height: "800px", width: "100%" }}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h4">필수재 기준</Typography>
      </Grid>

      <EssentialModal
        open={openPassStandard}
        handleClose={passClose}
        addEssentialRow={(value) => {
          setessentialList(value);
        }}
        essentialList={essentialList}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
              구분
            </InputLabel>
            <Select
              labelId="분류"
              id="demo-multiple-name"
              defaultValue="T"
              input={<OutlinedInput label="구분" />}
              onChange={(e) => {}}
              style={{ height: 40 }}
            >
              <MenuItem value="T">포항</MenuItem>
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
            <InputLabel id="label2" style={{ paddingTop: 10 }}>
              품종
            </InputLabel>

            <Select
              labelId="분류"
              id="demo-multiple-name"
              defaultValue="T"
              input={<OutlinedInput label="품종" />}
              value={codeNameList.select}
              onChange={(e) => {
                setCodeNameList(
                  Object.assign({}, codeNameList, {
                    select: e.target.value,
                  })
                );
              }}
              style={{ height: 40 }}
            >
              <MenuItem key={0} value="All">
                All
              </MenuItem>
              {codeNameList.list.map((code, idx) => {
                return (
                  <MenuItem key={idx + 1} value={code}>
                    {code}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={filteredCondeNameList}
            style={{ backgroundColor: "#E29E21" }}
          >
            조회
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#0A5380" }}
            onClick={passClick}
          >
            기준 추가
          </Button>

          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={exportToExcel}
            style={{ backgroundColor: "darkgreen" }}
          >
            Excel
          </Button>
        </div>
      </div>
      <Card>
        <Box
          sx={{
            height: 600,
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
            checkboxSelection
            disableRowSelectionOnClick
            rows={essentialList}
            columns={columns}
            columnGroupingModel={columnGroupingModel}
            onCellClick={(e) => {}}
            slots={{
              cell: MyCell,
            }}
            rowHeight={40}
          />
        </Box>
      </Card>
    </div>
  );
};

export default EssentialGoods;
