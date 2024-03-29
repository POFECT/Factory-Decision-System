// pass-standard/pass-modal.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton, // Rename Button to MuiButton to avoid conflict
} from "@mui/material";
import "react-datasheet-grid/dist/style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import PassStandardApi from "src/pages/api/pofect/ProcessStandardApi";
import InsertFormComponent from "../../views/pass-standard/pass-modal-insert";

//excel
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

//Alert
import { Report } from "src/notifix/notiflix-report-aio";
import { Notify } from "../../notifix/notiflix-notify-aio";

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
  return <GridCell {...props} style={style} />;
}

const PassModal = ({ open, handleClose }) => {

  // 경유공정
  const [passStandard, setPassStandard] = useState([]);
  const [originalPassStandard, setOriginalPassStandard] = useState([]);//변경 확인을 위한 passStandard

  // 품종
  const [codeNameList, setCodeNameList] = useState({
    list: [],
    select: "All",
  });

  // Alert
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  //insert
  const [insertMode, setInsertMode] = useState(false);

  const [openPassStandard, setOpenPassStandard] = useState(false);

  const passClick = () => {
    setOpenPassStandard(true);
  };

  const passClose = () => {
    setOpenPassStandard(false);
    handleSearch();


  };

  const handleInsertSave = (newRecordData) => {

    const maxId = passStandard.reduce((max, record) => (record.id > max ? record.id : max), 0);
    const newId = maxId + 1;

    const { ordPdtItdsCdN, millCd, selectedColumns } = newRecordData;

    const newPassStandard = {
      id: newId,
      gcsCompCode: "01",
      ordPdtItdsCdN,
      millCd,

    };
    selectedColumns.forEach((columnName) => {
      newPassStandard[columnName] = "*";
    });

    PassStandardApi.insertSave(newPassStandard, (data) => {
      // alert("저장되었습니다.");
      Notify.success("저장되었습니다.");
      setOriginalData([...passStandard]);//저장 성공 후 원래 데이터 업데이트
    });
  };

  const [existingOrdPdtItdsCdNList, setExistingOrdPdtItdsCdNList] = useState(
    []
  );

  //Update
  const handleCellEditCommit = (params) => {
    const updatedList = passStandard.map((item) =>
      item.id === params.id ? params : item
    );

    setPassStandard(updatedList);
  };

  //delete
  // State to keep track of selected row(s)
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  // Function to handle the delete button click
  const handleDelete = async () => {
    const selectedIdx = new Set(rowSelectionModel);

    const rows = passStandard.filter((row) => selectedIdx.has(row.id));

    if (rows.length === 0) {
      Notify.failure("삭제할 품명을 선택해주세요");
      return;
    }

    /** ID 추출 */
    const selectedIdList = rows.map((selectedRow) => {
      const selectedId = passStandard.find((row) => row.id === selectedRow.id);
      return selectedId.id;
    });

    const allCnt = selectedIdList.length;

    await PassStandardApi.delete(selectedIdList, (data) => {
      const res = data.response;
      Notify.success(allCnt + "건 삭제되었습니다.", {
        showOnlyTheLastOne: false,
      });

      setRowSelectionModel([]);

      /** 리스트 update */
      handleSearch();
    });
  };

  useEffect(() => {
    PassStandardApi.getList((data) => {
      setPassStandard(data.response);
      setOriginalPassStandard(data.response); // 원래 상태를 저장(변경여부확인용)
    });

    PassStandardApi.getCodeNameList((data) => {
      const list = data.response;
      setCodeNameList((prev) => {
        return { ...prev, list };
      });
    });

    handleSearch();
  }, []);

  useEffect(() => {
    if (!open) {
      setShowAlert(false);
      setRowSelectionModel([]);
    }
    handleSearch();
  }, [open]);

  const handleSearch = () => {

    setRowSelectionModel([]);
    if (codeNameList.select === "All") {
      PassStandardApi.getList((data) => {
        const passStandardList = data.response;
        setPassStandard(passStandardList);
        const ordPdtItdsCdNList = passStandardList.map((item) => item.ordPdtItdsCdN);
        setExistingOrdPdtItdsCdNList(ordPdtItdsCdNList);
      });
    } else {
      PassStandardApi.getListByItem(codeNameList.select, (data) => {
        setPassStandard(data.response);
      });
    }
  };
  const columns = [
    { field: "ordPdtItdsCdN", headerName: "품명", width: 130, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: false, type:"number" },
    {
      field: "availablePassFacCdN1", headerName: "제강", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true,
    },
    { field: "availablePassFacCdN2", headerName: "열연", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN3", headerName: "열연정정", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN4", headerName: "냉연", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN5", headerName: "1차소둔", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN6", headerName: "2차소둔", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN7", headerName: "도금", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN8", headerName: "정정", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
  ];

  //Update
  const updatePass = async () => {
    let updateFlag = 0;
    let isNull = 0;
    passStandard.some((item) => {
      for (let i = 1; i <= 8; i++) {
        const columnName = `availablePassFacCdN${i}`;
        const value = item[columnName];

        if (value === "*") {
          isNull +=1;
        }

      }
      if (isNull === 0) {
        updateFlag = 1
        return true;
      }
        return false;
    });

    if (updateFlag === 0) {
      passStandard.some((item) => {
        for (let i = 1; i <= 8; i++) {
          const columnName = `availablePassFacCdN${i}`;
          const value = item[columnName];
          if (value !== null && value !== '' && value !== '*' &&  value !== ' ') {
            updateFlag = 2;
            return true; // Exit the loop
          }
        }
        return false; // Continue the loop
      });
    }

    const isModified = JSON.stringify(passStandard) !== JSON.stringify(originalPassStandard);
    if(!isModified){
        Notify.failure("변경된 값이 없습니다.");
        handleSearch();
    }else{
      if (updateFlag === 2) {
        Notify.failure("수정할 데이터를 확인해주세요.\n(* 또는 빈값만 가능)");
        handleSearch();
      } else if (updateFlag === 1) {
        Notify.failure("모든 공정의 값이 비어 수정이 불가합니다.");
        handleSearch();
      }else{
        await PassStandardApi.updateSave(passStandard, (data) => {
          Notify.success("저장되었습니다.", {
            showOnlyTheLastOne: false });
          handleSearch();
        });
        PassStandardApi.getList((data) => {
          setPassStandard(data.response);
          setOriginalPassStandard(data.response); // 원래 상태를 저장(변경여부확인용)
        });
      }
    }
  };


  //excel
  // 한글 헤더
  const koreanHeaderMap = {
    "gcsCompCode": "품명",
    "millCd" :"구분",
    "ordPdtItdsCdN" : "품종",
    "availablePassFacCdN1" :"제강",
    "availablePassFacCdN2": "열연",
    "availablePassFacCdN3":"열연정정",
    "availablePassFacCdN4":"냉연",
    "availablePassFacCdN5":"1차소둔",
    "availablePassFacCdN6":"2차소둔",
    "availablePassFacCdN7":"도금",
    "availablePassFacCdN8":"정정",

  };
  const fileType =
    "application/vnd.openxmlformats-officedcoument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    // 헤더 순서
    const originalHeader = ["gcsCompCode", "millCd", "ordPdtItdsCdN",
      "availablePassFacCdN1", "availablePassFacCdN2", "availablePassFacCdN3", "availablePassFacCdN4",
    "availablePassFacCdN5", "availablePassFacCdN6", "availablePassFacCdN7","availablePassFacCdN8"];

    // possibleList의 id를 기준으로 정렬
    const sortedPassStandard = [...passStandard].sort((a, b) => a.id - b.id);

    // 데이터를 헤더와 일치하는 형식으로 변환
    const excelData = sortedPassStandard.map(item => originalHeader.map(key => item[key]));

    // 헤더를 한글로 변경
    const koreanHeader = originalHeader.map(englishKey => koreanHeaderMap[englishKey] || englishKey);

    // 헤더와 데이터를 함께 전달하여 엑셀 생성
    const ws = XLSX.utils.aoa_to_sheet([koreanHeader, ...excelData]);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "경유 공정 기준" + fileExtension);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%" }}
      maxWidth="xl"
    >
      <div style={{ maxWidth: "1200px" }}>
        <DialogTitle>
          <Grid item xs={12} sx={{ paddingBottom: 4 }}>
            {/* <Card></Card> */}
            <Typography variant="h4">경유 공정 기준</Typography>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* ./pass-standard/index.js 파일 내용 또는 원하는 모달 내용을 여기에  */}
            {insertMode ? (
              <></>
            ) : (
              <divdafdsfads
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
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
                        console.log(e);
                      }}
                      style={{ height: 40 }}
                    >
                      <MenuItem value="T">포항</MenuItem>
                      {/* <MenuItem value="K">광양</MenuItem> */}
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
                      defaultValue="All"
                      input={<OutlinedInput label="품종" />}
                      onChange={(e) => {
                        setCodeNameList(
                          Object.assign({}, codeNameList, {
                            select: e.target.value,
                          })
                        );
                      }}
                      style={{ height: 40 }}
                    >
                      <MenuItem value="All">All</MenuItem>
                      {codeNameList.list.map((code, idx) => (
                        <MenuItem key={idx} value={code.cdNm}>
                          {code.cdNm}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        onClick={handleSearch}
                        style={{ backgroundColor: "#E29E21" }}
                      >
                        조회
                      </Button>

                      <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        onClick={passClick}
                        style={{ backgroundColor: "#0A5380" }}
                      >
                        추가
                      </Button>
                      <InsertFormComponent
                        open={openPassStandard}
                        handleClose={passClose}
                        onSave={handleInsertSave}
                        columns={columns}
                        codeNameList={codeNameList}
                        existingOrdPdtItdsCdNList={existingOrdPdtItdsCdNList}
                      />
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        onClick={updatePass}
                        style={{
                          backgroundColor: "#0A5380",
                          whiteSpace: "nowrap",
                        }}
                      >
                        저장
                      </Button>
                      <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        onClick={handleDelete}
                        style={{
                          backgroundColor: "darkred",
                          whiteSpace: "nowrap",
                        }}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                </div>
              </divdafdsfads>
            )}

            <div
              style={{
                height: 400,
                display: "flex",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Card
                elevation={3}
                style={{
                  flexBasis: "85",
                  marginRight: "16px ",
                  padding: "20px",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    marginBottom: "20px",
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
                  {insertMode ? (
                    <InsertFormComponent
                      onSave={handleInsertSave}
                      handleClose={passClose}
                      columns={columns}
                      codeNameList={codeNameList}
                    />
                  ) : (
                    <DataGrid
                      className="custom-data-grid"
                      disableRowSelectionOnClick
                      rows={passStandard}
                      columns={columns}
                      checkboxSelection
                      rowSelectionModel={rowSelectionModel}
                      onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                      }}
                      processRowUpdate={(newVal) => {
                        handleCellEditCommit(newVal);
                        return newVal;
                      }}
                      components={{
                        // Toolbar: GridToolbar,
                        Cell: MyCell,
                      }}
                      rowHeight={31}
                    />
                  )}
                </Box>
              </Card>
            </div>
          </DialogContentText>
        </DialogContent>
        {insertMode ? (
          <>
            <Grid
              item
              xs={4}
              sx={{ paddingBottom: 1, paddingTop: 3, paddingLeft: 3 }}
            ></Grid>
          </>
        ) : (
          <>
            <DialogActions>
              <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  onClick={handleClose}
                  style={{
                    backgroundColor: "darkred",
                    whiteSpace: "nowrap",
                  }}
              >
                닫기
              </Button>
              {/*<Button onClick={handleClose} color="primary">*/}
              {/*  닫기*/}
              {/*</Button>*/}
            </DialogActions>
          </>
        )}

        {/* alert */}
        {showAlert &&
          Report.warning(
            " ",
            "<div style='text-align: center;'>" +
              " 출강 주의 " +
              "<br />" +
              "투입 능력 관리 데이터가 없습니다." +
              "<br />" +
              "<br />" +
              "데이터를 추가 하시겠습니까?" +
              "</div>",
            "확인",
            () => {
              handleAccept();
            },
            "취소",
            () => {
              handleCloseAlert();
            },
            {
              backOverlayClickToClose: true,
              cssAnimationStyle: "zoom",
              cssAnimationDuration: 400,
            }
          )}
      </div>
    </Dialog>
  );
};

export default PassModal;