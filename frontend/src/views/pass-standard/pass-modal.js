// pass-standard/pass-modal.js
import React, { useEffect, useState } from 'react';
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
  Button
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton, // Rename Button to MuiButton to avoid conflict
} from '@mui/material';
import "react-datasheet-grid/dist/style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import ProcessStandardApi from "src/api/ProcessStandardApi";
import InsertFormComponent from '../../views/pass-standard/pass-modal-insert';

//excel
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

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
    headerAlign: 'center',
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

  // 품종
  const [codeNameList, setCodeNameList] = useState({
    list: [],
    select: "ALL",
  });

  //insert
  const [insertMode, setInsertMode] = useState(false);

  const handleInsert = () => {
  
  setInsertMode(!insertMode);
    };

  const handleInsertSave = (newRecordData) => {
    console.log("!!!!!!!", passStandard);

    console.log("$#$#$##$", newRecordData);

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

  console.log("New Pass Standard:", newPassStandard);
  ProcessStandardApi.insertSave(newPassStandard, (data) => {
        alert("저장되었습니다.");

      });   
    setInsertMode(false);
  };

  
  const handleInsertCancel = () => {
  setInsertMode(false);
  };

  //Update
  const handleCellEditCommit = (params) => {
    console.log(params);
    const updatedList = passStandard.map((item) =>
      item.id === params.id ? params : item
    );

    setPassStandard(updatedList);
  };



  useEffect(() => {

    handleInsertCancel();
    handleSearch();


  }, []);

  const handleSearch = () => {

    setInsertMode(false);

    ProcessStandardApi.getList((data) => {
      setPassStandard(data.response);
    });

    ProcessStandardApi.getCodeNameList((data) => {
      const list = data.response;
      setCodeNameList((prev) => {
        return { ...prev, list };
      })
    });
    console.log("Selected item:", codeNameList.select);

    if (codeNameList.select === "ALL") {
      ProcessStandardApi.getList((data) => {
        setPassStandard(data.response);
      });
    } else {
      ProcessStandardApi.getListByItem(codeNameList.select, (data) => {
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
    let updateFlag = false;
    let result = "데이터를 확인해주세요.\n\n빈값 혹은 *만 들어갈 수 있습니다.";


    passStandard.map(item => {
      for (let i = 1; i <= 8; i++) {
        const columnName = `availablePassFacCdN${i}`;
        const value = item[columnName];
        if (value !== null && value !== '' && value !== '*') {
          updateFlag = true;

          break;
        }
      }
      for (let i = 1; i <= 8; i++) {
        const columnName = `availablePassFacCdN${i}`;
        const value = item[columnName];
        if (value === '') {
          value = null;
          console.log("*****", value)

        }
      }
    });

    if (updateFlag) {
      alert(result);
      handleSearch();

    } else if (!updateFlag) {
      await ProcessStandardApi.updateSave(passStandard, (data) => {
        alert("저장되었습니다.");
        handleSearch();
      });

    }

  };

  //excel
  const fileType =
    "application/vnd.openxmlformats-officedcoument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(passStandard);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "경유 공정 기준" + fileExtension);
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }} maxWidth="xl">
      <div style={{ maxWidth: '1200px' }}>
        <DialogTitle>
          <Grid item xs={12} sx={{ paddingBottom: 4 }}>
            {/* <Card></Card> */}
            <Typography variant="h4">경유 공정 기준</Typography>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* ./pass-standard/index.js 파일 내용 또는 원하는 모달 내용을 여기에 추가 */}
               {insertMode ? (<></>

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
                  }}>
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
                    defaultValue="ALL"
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
                    <MenuItem value="ALL">ALL</MenuItem>
                    {codeNameList.list.map((code, idx) => (
                      <MenuItem key={idx} value={code.cdNm}>
                        {code.cdNm}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
             
                    <Button size="small" type="submit" variant="contained" onClick={handleSearch} style={{ backgroundColor: "#E29E21" }}>
                      조회
                    </Button>
                    <Button
                      size="small"
                      type="submit"
                      variant="contained"
                      onClick={handleInsert}
                      style={{ backgroundColor: "#0A5380" }}
                    >
                      추가
                    </Button>
                    <Button
                      size="small"
                      type="submit"
                      variant="contained"
                      onClick={updatePass}
                      style={{ backgroundColor: "#0A5380" }}
                    >
                      저장
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

            </divdafdsfads>
            )}

          {insertMode ? (
                  
<Grid item xs={4} sx={{ paddingBottom: 1 , paddingTop:3, paddingLeft:3 }}>
                        <Typography variant="h5" > 데이터 추가 </Typography>
                    </ Grid>
                    
                    )
                      :(<></>)}

                      
            <div style={{ height: 400, display: "flex", justifyContent: "center", marginTop: 30, }}>

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
                    }, "& .custom-data-grid .MuiDataGrid-columnHeadersInner": {
                      backgroundColor: "#F5F9FF",
                    },
                  }}
                >


                  {insertMode ? (
                   
                  <InsertFormComponent onSave={handleInsertSave} onCancel={handleInsertCancel} columns={columns} codeNameList={codeNameList}/>
                  
                   ) : (
                  <DataGrid
                    className="custom-data-grid"
                    disableRowSelectionOnClick
                    rows={passStandard}
                    columns={columns}
                    processRowUpdate={(newVal) => {
                      handleCellEditCommit(newVal)
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
 {insertMode ? (<><Grid item xs={4} sx={{ paddingBottom: 1 , paddingTop:3, paddingLeft:3 }}>
                    </ Grid></>)
                      :(<>        
                      <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
        </>)}



      </div>
    </Dialog>
  );
};

export default PassModal;
