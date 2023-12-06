"use strict";
import { useCallback, useState, useMemo, StrictMode, useEffect } from "react";

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
// import { Grid, Typography } from "@mui/material";

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
      color: "white",
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

  useEffect(() => {
    SizeStandardApi.getList((data) => {
      const test = data.response;

      const test2 = test.map(item => {
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

      setSizeStandardList(test2);


      if (sizeStandardList.length != 0) {
        setSizeStandardList(sizeStandardList[0].id);
      }
    });
  }, []);

  const columns = [

    {
      field: "processCd", headerName: "공정", width: 180, sortable: false, headerAlign: "center",
    },
    {
      field: "firmPsFacTp", headerName: "공장", width: 100, sortable: false, headerAlign: "center",
    },
    {
      field: "orderThickMin", headerName: "min", width: 138, sortable: false, headerAlign: "center",
      editable: true
    },
    {
      field: "orderThickMax", headerName: "max", width: 138, sortable: false, headerAlign: "center",
      editable: true
    },
    {
      field: "orderWidthMin", headerName: "min", width: 138, sortable: false, headerAlign: "center",
      editable: true
    },
    {
      field: "orderWidthMax", headerName: "max", width: 138, sortable: false, headerAlign: "center",
      editable: true
    },
    {
      field: "orderLengthMin", headerName: "min", width: 138, sortable: false, headerAlign: "center",
      editable: true
    },
    {
      field: "orderLengthMax", headerName: "max", width: 138, sortable: false, headerAlign: "center",
      editable: true
    },
    {
      field: "hrRollUnitWgtMax1", headerName: "min", width: 138, sortable: false, headerAlign: "center",
      editable: true
    },
    {
      field: "hrRollUnitWgtMax2", headerName: "max", width: 138, sortable: false, headerAlign: "center",
      editable: true
    },
  ];

  console.log(sizeStandardList);

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

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">공장 공정 별 사이즈 기준</Typography>
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

        </div>
        <div>
          <Button size="small" type="submit" variant="contained">
            조회
          </Button>
          <Button size="small" type="submit" variant="contained">
            저장
          </Button>
          <Button size="small" type="submit" variant="contained">
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
          }}
        >
          <DataGrid
            className="custom-data-grid"
            experimentalFeatures={{ columnGrouping: true }}
            disableRowSelectionOnClick
            rows={sizeStandardList}
            columns={columns}
            onCellClick={(e) => {
              console.log(e);
            }}
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
