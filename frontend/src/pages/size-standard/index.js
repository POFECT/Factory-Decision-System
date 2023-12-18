"use strict";
import { useCallback, useState, useMemo, StrictMode, useEffect, useRef } from "react";

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
import SizeStandardApi from "/src/api/SizeStandardApi";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    };
  } else if (props.column.field === "firmPsFacTp") {
    style = {
      ...style,
      alignItems: "center",
      justifyContent: "center",
    }
  }
  return <GridCell {...props} style={style} />;
}

const Standard = () => {
  const [sizeStandardList, setSizeStandardList] = useState([]);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [editedCellValue, setEditedCellValue] = useState('');


  const handleCellEditCommit = (params) => {
    console.log(params);
    const updatedList = sizeStandardList.map((item) =>
      item.id === params.id ? params : item
    );

    setSizeStandardList(updatedList);
  };

  useEffect(() => {
    getSizeStadards();
  }, []);

  const getSizeStadards = () => {
    SizeStandardApi.getList((data) => {
      const resData = data.response;

      const resultData = resData.map(item => {
        console.log(item.id);
        if (item.processCd === "10") {
          return { ...item, processCd: "제강" }
        } else if (item.processCd === "20") {
          return { ...item, processCd: "열연" }
        } else if (item.processCd === "30") {
          return { ...item, processCd: "열연정정" }
        } else if (item.processCd === "40") {
          return { ...item, processCd: "냉간압연" }
        } else if (item.processCd === "50") {
          return { ...item, processCd: "1차소둔" }
        } else if (item.processCd === "60") {
          return { ...item, processCd: "2차소둔" }
        } else if (item.processCd === "70") {
          return { ...item, processCd: "도금" }
        } else if (item.processCd === "80") {
          return { ...item, processCd: "정정" }
        }

        return item;
      })


      setSizeStandardList(resultData);

      // if (sizeStandardList.length != 0) {
      //   setSizeStandardList(sizeStandardList[0].id);
      // }
    })
  };

  const updateSizeStandard = async () => {
    const updateFlag = false;
    let result = "다음 데이터를 확인해주세요.\n\n";

    sizeStandardList.map(item => {
      if (item.orderThickMin < 0 || item.orderThickMax < 0 || item.orderThickMin > item.orderThickMax) {
        result += item.processCd + " " + item.firmPsFacTp + "공장 두께\n";
        updateFlag = true;
      }
      if (item.orderWidthMin < 0 || item.orderWidthMax < 0 || item.orderWidthMin > item.orderWidthMax) {
        result += item.processCd + " " + item.firmPsFacTp + "공장 폭\n"
        updateFlag = true;
      }
      if (item.orderLengthMin < 0 || item.orderLengthMax < 0 || item.orderLengthMin > item.orderLengthMax) {
        result += item.processCd + " " + item.firmPsFacTp + "공장 길이\n"
        updateFlag = true;
      }
      if (item.hrRollUnitWgtMax1 < 0 || item.hrRollUnitWgtMax2 < 0 || item.hrRollUnitWgtMax1 > item.hrRollUnitWgtMax2) {
        result += item.processCd + " " + item.firmPsFacTp + "공장 단중\n"
        updateFlag = true;
      }
    })

    if (updateFlag) {
      alert(result);
      // getSizeStadards();
    } else if (!updateFlag) {
      await SizeStandardApi.updateSize(sizeStandardList, (data) => {
        alert("저장되었습니다.");
        getSizeStadards();

      });

    }

  };

  const columns = [

    {
      field: "processCd", headerName: "공정", width: 169, sortable: false, headerAlign: "center"
    },
    {
      field: "firmPsFacTp", headerName: "공장", width: 100, sortable: false, headerAlign: "center",
    },
    {
      field: "orderThickMin", headerName: "min", width: 138, sortable: false, headerAlign: "center", type: 'number',
      editable: true
    },
    {
      field: "orderThickMax", headerName: "max", width: 138, sortable: false, headerAlign: "center", type: 'number',
      editable: true
    },
    {
      field: "orderWidthMin", headerName: "min", width: 138, sortable: false, headerAlign: "center", type: 'number',
      editable: true
    },
    {
      field: "orderWidthMax", headerName: "max", width: 138, sortable: false, headerAlign: "center", type: 'number',
      editable: true
    },
    {
      field: "orderLengthMin", headerName: "min", width: 138, sortable: false, headerAlign: "center", type: 'number',
      editable: true
    },
    {
      field: "orderLengthMax", headerName: "max", width: 138, sortable: false, headerAlign: "center", type: 'number',
      editable: true
    },
    {
      field: "hrRollUnitWgtMax1", headerName: "min", width: 138, sortable: false, headerAlign: "center", type: 'number',
      editable: true
    },
    {
      field: "hrRollUnitWgtMax2", headerName: "max", width: 138, sortable: false, headerAlign: "center", type: 'number',
      editable: true
    },
  ];

  const columnGroupingModel = [
    {
      groupId: "두께",
      children: [{ field: "orderThickMin" }, { field: "orderThickMax" }],
      headerAlign: "center",
    },
    {
      groupId: "폭",
      children: [{ field: "orderWidthMin" }, { field: "orderWidthMax" }],
      headerAlign: "center",
    },
    {
      groupId: "길이",
      children: [{ field: "orderLengthMin" }, { field: "orderLengthMax" }],
      headerAlign: "center",
    },
    {
      groupId: "단중",
      children: [{ field: "hrRollUnitWgtMax1" }, { field: "hrRollUnitWgtMax2" }],
      headerAlign: "center",
    },
  ];

  // excel
  const fileType =
    "application/vnd.openxmlformats-officedcoument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const koreanHeaderMap = {
    "processCd": "공정",
    "firmPsFacTp": "공장",
    "orderThickMin20": "두께min",
    "orderThickMax": "두께max",
    "orderWidthMin": "폭min",
    "orderWidthMax": "폭max",
    "orderLengthMin": "길이min",
    "orderLengthMax": "길이max",
    "hrRollUnitWgtMax1": "단중min",
    "hrRollUnitWgtMax2": "단중max",
  };

  const exportToExcelSize = async () => {
    const originalHeader = ["processCd","firmPsFacTp","orderThickMin", "orderThickMax", "orderWidthMin", "orderWidthMax", "orderLengthMin", "orderLengthMax", "hrRollUnitWgtMax1", "hrRollUnitWgtMax2"]
    const sortedSizeList = [...sizeStandardList].sort((a, b) => a.id - b.id);
    const excelData = sortedSizeList.map(item => originalHeader.map(key => item[key]));
    const koreanHeader = originalHeader.map(englishKey => koreanHeaderMap[englishKey] || englishKey);
  
    const ws = XLSX.utils.aoa_to_sheet([koreanHeader, ...excelData]);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "사이즈기준" + fileExtension);
  }


  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h4">공장 공정 별 사이즈 기준</Typography>
      </Grid>


      <div
        style={{
          height: "78px",
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
                console.log(e);
              }}
              style={{ height: 40 }}
            >
              <MenuItem value="T">포항</MenuItem>
              {/* <MenuItem value="K">광양</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={getSizeStadards}

            style={{ backgroundColor: "#E29E21" }}
          >
            조회
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#0A5380" }}
            onClick={updateSizeStandard}
          >
            저장
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            // onClick={exportToExcel}
            style={{ backgroundColor: "darkgreen" }}
            onClick={exportToExcelSize}
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
            disableRowSelectionOnClick
            rows={sizeStandardList}
            columns={columns}
            // onCellEditStart={handleCellEditStart}
            // onCellEditStop={handleCellEditCommit}


            processRowUpdate={(newVal) => {
              handleCellEditCommit(newVal)
              return newVal;
            }}


            //  onCellEditStop={handleCellEditCommit}
            // onCellClick={(e) => {
            //   console.log(e.field);
            //   console.log(e.id);
            //   console.log(e.formattedValue);
            // }}
            columnGroupingModel={columnGroupingModel}
            slots={{
              cell: MyCell,
            }}
            disableColumnFilter
            disableColumnMenu
            hideFooterPagination={true}
            hideFooter={true}
          // rowHeight={40}
          />
        </Box>
      </Card>
    </div>
  );
};

export default Standard;
