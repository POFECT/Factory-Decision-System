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
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import PassStandardApi from "src/api/PassStandardApi";
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
  const [passStandard, setPassStandard] = useState([]);
  
  // 품종
  const [codeNameList, setCodeNameList] = useState({
    list: [],
    select: "ALL", 
  });


  useEffect(() => {

    PassStandardApi.getList((data) => {
      setPassStandard(data.response);
    });
    
    PassStandardApi.getCodeNameList((data) => {
      const list = data.response;
      setCodeNameList((prev) => {
        return { ...prev, list};
      })
    });

   
  }, []);

  const handleSearch = () => {

    console.log("Selected item:", codeNameList.select);

    if (codeNameList.select === "ALL") {
      PassStandardApi.getList((data) => {
        setPassStandard(data.response);
      });
    } else {
      PassStandardApi.getListByItem(codeNameList.select, (data) => {
        setPassStandard(data.response);
      });
    }
  };
  const columns = [
    { field: "ordPdtItdsCdN", headerName: "품명", width: 130, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN1", headerName: "제강", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN2", headerName: "열연", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN3", headerName: "열연정정", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN4", headerName: "냉연", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN5", headerName: "1차소둔", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN6", headerName: "2차소둔", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN7", headerName: "도금", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
    { field: "availablePassFacCdN8", headerName: "정정", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' }, editable: true },
  ];

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
    <Dialog open={open} onClose={handleClose} sx={{ width: '100%'}} maxWidth="xl">
      <div style={{maxWidth:'1200px'}}>
      <DialogTitle>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          {/* <Card></Card> */}
          <Typography variant="h3">경유 공정 기준</Typography>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* ./pass-standard/index.js 파일 내용 또는 원하는 모달 내용을 여기에 추가 */}
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

                <Button size="small" type="submit" variant="contained" onClick={handleSearch}>
                  조회
            </Button>
            <Button size="small" type="submit" variant="contained">
              저장
            </Button>
            <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={exportToExcel}>
            Excel
            </Button>
          </div>
        </divdafdsfads>
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
                },
              }}
            >
              <DataGrid
                className="custom-data-grid"

                disableRowSelectionOnClick
                rows={passStandard}
                columns={columns}
                onCellClick={(e) => {
                  console.log(e);
                }}
                components={{
                  // Toolbar: GridToolbar,
                  Cell: MyCell,
                }}
                rowHeight={31}

              />
            </Box>
          </Card>
        </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫기
        </Button>
      </DialogActions>
      </div>
    </Dialog>
  );
};

export default PassModal;
