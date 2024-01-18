import { React, useState, useEffect } from "react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import PossibleDetail from "../../views/pass-standard/possible-detail";
import PassModal from "../../views/pass-standard/pass-modal";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

import "react-datasheet-grid/dist/style.css";
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
  Box,
} from "@mui/material";
import PassStandardApi from "src/pages/api/pofect/PassStandardApi";

function MyCell(props) {
  let style = {
    minWidth: props.width,
    maxWidth: props.width,
    minHeight: props.height,
    maxHeight: props.height === "auto" ? "none" : props.height,
    ...props.style,
    //중앙배열
    display: "flex",
    alignItems: "center",
    headerAlign: "center",
    justifyContent: "center",
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
  let confirmListforExcel = null;
  return <GridCell {...props} style={style} />;
}
let possibleBtiPosbPsFacTpValues = null;

const PassStandard = () => {
  /* Data */
  const [possibleList, setPossibleList] = useState([]); //가통리스트
  const [confirmList, setConfirmList] = useState([]); //확통리스트
  const [millCd, setMillCd] = useState([]); //소구분
  const [open, setOpen] = useState(false); //가통Popper오픈
  const [anchorEl, setAnchorEl] = useState(null); //Popper
  const [placement, setPlacement] = useState(); //Popper위치
  const [openPassStandard, setOpenPassStandard] = useState(false);
  const [test, setTest] = useState(false);
  const [a, setA] = useState({
    processCd: null,
    processFacNum: null,
    btiPosbPsFacTp: null,
  });
  const passClick = () => {
    setOpenPassStandard(true);
  };

  const passClose = () => {
    setOpenPassStandard(false);
  };
  const openFun = (check, popperId) => {
    setOpen(check);
    setCurrentPopperId(check ? popperId : null);
  };

  const searchList=()=>{
    setOpen(false);
    setTest((test) => !test);
  }

  useEffect(() => {
    PassStandardApi.getPossibleList((data) => {
      const dataMap = data.response.reduce(
        (list, { btiPosbPsFacTp, processCd, feasibleRoutingGroup }) => {
          list[btiPosbPsFacTp] = list[btiPosbPsFacTp] || {};
          list[btiPosbPsFacTp][processCd] = feasibleRoutingGroup;
          return list;
        },
        {}
      );

      possibleBtiPosbPsFacTpValues = Array.from(
        { length: Math.max(...Object.keys(dataMap).map(Number)) },
        (_, index) => String(index + 1).padStart(2, "0")
      );

      const transformData = possibleBtiPosbPsFacTpValues.map((code) => ({
        ...(dataMap[code] || ""), //code값이 빈 경우에도 나오게하기
        id: code,
      }));
      setPossibleList(transformData);
    }, []);

    PassStandardApi.getCommonList((data) => {
      const dataMap = data.response.reduce(
        (list, { cdExpl, firmPsFacTp, id, lastUpdate, processCd }) => {
          list[firmPsFacTp] = list[firmPsFacTp] || {};
          list[firmPsFacTp][processCd] = cdExpl;
          return list;
        },
        {}
      );

      const transformData = Object.entries(dataMap).map(
        ([code, processCd]) => ({
          id: code,
          ...processCd,
        })
      );
      setConfirmList(transformData);
    }, []);
  }, [test]);
  //가통 컬럼
  const possibleColumns = [
    { field: "id", headerName: "Code", width: 158, headerAlign: "center",sortable: false },
    { field: "10", headerName: "제강", width: 154, headerAlign: "center",sortable: false },
    { field: "20", headerName: "열연", width: 154, headerAlign: "center",sortable: false },
    { field: "30", headerName: "열연정정", width: 154, headerAlign: "center",sortable: false },
    { field: "40", headerName: "냉간압연", width: 154, headerAlign: "center",sortable: false },
    { field: "50", headerName: "1차소둔", width: 154, headerAlign: "center",sortable: false },
    { field: "60", headerName: "2차소둔", width: 154, headerAlign: "center",sortable: false },
    { field: "70", headerName: "도금", width: 154, headerAlign: "center",sortable: false },
    { field: "80", headerName: "정정", width: 154, headerAlign: "center",sortable: false },
  ];

  //확통 컬럼
  const confirmColumns = [
    { field: "id", headerName: "Code", width: 158, headerAlign: "center",sortable: false },
    { field: "10", headerName: "제강", width: 154, headerAlign: "center",sortable: false },
    { field: "20", headerName: "열연", width: 154, headerAlign: "center",sortable: false },
    { field: "30", headerName: "열연정정", width: 154, headerAlign: "center",sortable: false },
    { field: "40", headerName: "냉간압연", width: 154, headerAlign: "center",sortable: false },
    { field: "50", headerName: "1차소둔", width: 154, headerAlign: "center",sortable: false },
    { field: "60", headerName: "2차소둔", width: 154, headerAlign: "center",sortable: false },
    { field: "70", headerName: "도금", width: 154, headerAlign: "center",sortable: false },
    { field: "80", headerName: "정정", width: 154, headerAlign: "center",sortable: false },
  ];
  let pPopupProcessCd = null;
  let feasibleArray = null;

  const openPossibleOne = (e) => {
    pPopupProcessCd = e.currentTarget.dataset.field;
    const code = e.currentTarget.parentElement.dataset.id;
    const feasibleRoutingGroup = e.currentTarget.querySelector(
      ".MuiDataGrid-cellContent"
    ).title;
    feasibleArray = String(feasibleRoutingGroup).split("").map(Number);
    console.log("code = " + code + ", pPopupProcessCd = " + pPopupProcessCd);
    console.log("feasibleArray = " + feasibleArray);

    setA({
      ...a,
      processCd: e.currentTarget.dataset.field,
      processFacNum: String(feasibleRoutingGroup).split("").map(Number),
      btiPosbPsFacTp: e.currentTarget.parentElement.dataset.id,
    });

    setAnchorEl(e.currentTarget);
    setOpen((previousOpen) => !previousOpen);

    if (pPopupProcessCd === "id") {
      setOpen(false);
    }
  };
  // 한글 헤더 매핑 (엑셀용)
  const koreanHeaderMap = {
    id: "Code",
    10: "제강",
    20: "열연",
    30: "열연정정",
    40: "냉간압연",
    50: "1차소둔",
    60: "2차소둔",
    70: "도금",
    80: "정정",
  };

  const fileType =
    "application/vnd.openxmlformats-officedcoument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcelPossible = async () => {
    // 헤더 순서
    const originalHeader = [
      "id",
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
    ];

    // possibleList의 id를 기준으로 정렬
    const sortedPossibleList = [...possibleList].sort((a, b) => a.id - b.id);

    // 데이터를 헤더와 일치하는 형식으로 변환
    const excelData = sortedPossibleList.map((item) =>
      originalHeader.map((key) => item[key])
    );

    // 헤더를 한글로 변경
    const koreanHeader = originalHeader.map(
      (englishKey) => koreanHeaderMap[englishKey] || englishKey
    );

    // 헤더와 데이터를 함께 전달하여 엑셀 생성
    const ws = XLSX.utils.aoa_to_sheet([koreanHeader, ...excelData]);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "가능통과공장기준" + fileExtension);
  };
  const exportToExcelConfirm = async () => {
    const originalHeader = [
      "id",
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
    ];
    const sortedConfirmList = [...confirmList].sort((a, b) => a.id - b.id);
    const excelData = sortedConfirmList.map((item) =>
      originalHeader.map((key) => item[key])
    );
    // 헤더를 한글로 변경
    const koreanHeader = originalHeader.map(
      (englishKey) => koreanHeaderMap[englishKey] || englishKey
    );

    const ws = XLSX.utils.aoa_to_sheet([koreanHeader, ...excelData]);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "확정통과공장기준" + fileExtension);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h4">가능통과공장/확정통과공장 코드</Typography>
      </Grid>
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
              onChange={(e) => {
                console.log(e.target.value);
                setMillCd(e.target.value);
              }}
              style={{ height: 40 }}
            >
              <MenuItem value="T">포항</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ width: "60%", textAlign: "right" }}>
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={passClick}
            style={{ backgroundColor: "#0A5380", whiteSpace: "nowrap" }}
          >
            경유공정
          </Button>
          <PassModal open={openPassStandard} handleClose={passClose} />
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={searchList} // 조회 버튼 클릭 시 searchList 함수 호출
            style={{ backgroundColor: "#E29E21" }}
          >
            조회
          </Button>
          <Button
            sx={{ width: "130px" }}
            size="small"
            type="submit"
            variant="contained"
            onClick={exportToExcelPossible}
            style={{ backgroundColor: "darkgreen" }}
          >
            가통 Excel
          </Button>
          <Button
            sx={{ width: "130px" }}
            size="small"
            type="submit"
            variant="contained"
            onClick={exportToExcelConfirm}
            style={{ backgroundColor: "darkgreen" }}
          >
            확통 Excel
          </Button>
        </div>
      </div>
      <div style={{ height: "auto", marginBottom: 20 }}>
        <Card>
          <Box
            sx={{
              height: "inherit",
              width: "100%",
              "& .custom-data-grid .MuiDataGrid-columnsContainer, & .custom-data-grid .MuiDataGrid-cell":
                {
                  borderBottom: "1px solid rgba(225, 234, 239, 1)",
                  borderRight: "1px solid rgba(225, 234, 239, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
              "& .custom-data-grid .MuiDataGrid-root": {
                paddingBottom: "0px",
              },
              "& .custom-data-grid .MuiDataGrid-columnHeadersInner": {
                backgroundColor: "#F5F9FF",
              },
            }}
          >
            <DataGrid
              //disableRowSelectionOnClick
              className="custom-data-grid"
              rows={possibleList}
              columns={possibleColumns}
              slotProps={{
                cell: {
                  onDoubleClick: openPossibleOne,
                },
              }}
              slots={{
                cell: MyCell,
              }}
              hideFooter={true}
              hideFooterPagination={true}
            />
          </Box>
        </Card>

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                {/* 가능통과공장 팝업 */}
                <Typography sx={{ p: 4, backgroundColor: "#f4f5fa" }}>
                  <PossibleDetail
                    a={a}
                    openFun={(check) => openFun(check, a.btiPosbPsFacTp)}
                    checkNone={(value) => {
                      setTest(value);
                    }}
                    test={test}
                  />
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        {/*isPossibleModal && <ModalTest onClose={() => setPossibleModalOpen(false)}/>*/}
      </div>
      {/* <div style={{height:250}}> */}
      <Card>
        <Box
          sx={{
            height: "inherit",
            width: "100%",
            "& .custom-data-grid .MuiDataGrid-columnsContainer, & .custom-data-grid .MuiDataGrid-cell":
              {
                borderBottom: "1px solid rgba(225, 234, 239, 1)",
                borderRight: "1px solid rgba(225, 234, 239, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
            //disableRowSelectionOnClick
            className="custom-data-grid"
            rows={confirmList}
            columns={confirmColumns}
            hideFooter={true}
            slots={{
              cell: MyCell,
            }}
          />
        </Box>
      </Card>
    </div>
    // </div>
  );
};

export default PassStandard;
