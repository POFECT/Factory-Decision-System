"use strict";
import { useCallback, useState, useMemo, StrictMode, useEffect } from "react";

import "react-datasheet-grid/dist/style.css";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import { Button, Grid, Typography, FormControl, OutlinedInput } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Select from "@mui/material/Select";
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
<<<<<<< HEAD
    { field: "공장", width: 150, sortable: false},
    { field: "thickMin", headerName: "min", width: 100, sortable: false, editable: true },
    { field: "thickMax", headerName: "max", width: 100, sortable: false, editable: true },
    { field: "widthMin", headerName: "min", width: 100, sortable: false, editable: true },
    { field: "widthMax", headerName: "max", width: 100, sortable: false, editable: true },
    { field: "lengthMin", headerName: "min", width: 100, sortable: false, editable: true },
    { field: "lengthMax", headerName: "max", width: 100, sortable: false, editable: true },
    { field: "tonMin", headerName: "min", width: 100, sortable: false, editable: true },
    { field: "tonMax", headerName: "max", width: 100, sortable: false, editable: true },
=======
    { field: "processCd", headerName: "공정", width: 180, sortable: false },
    { field: "firmPsFacTp", headerName: "공장", width: 100, sortable: false },
    { field: "orderThickMin", headerName: "min", width: 138, sortable: false, editable: true },
    { field: "orderThickMax", headerName: "max", width: 138, sortable: false, editable: true },
    { field: "orderWidthMin", headerName: "min", width: 138, sortable: false, editable: true },
    { field: "orderWidthMax", headerName: "max", width: 138, sortable: false, editable: true },
    { field: "orderLengthMin", headerName: "min", width: 138, sortable: false, editable: true },
    { field: "orderLengthMax", headerName: "max", width: 138, sortable: false, editable: true },
    { field: "hrRollUnitWgtMax1", headerName: "min", width: 138, sortable: false, editable: true },
    { field: "hrRollUnitWgtMax2", headerName: "max", width: 138, sortable: false, editable: true },
>>>>>>> 31efaf1aea7695d47e5b98cb16fafe702e39030d
  ];

  const columnGroupingModel = [
    {
      groupId: "두께",
      children: [{ field: "orderThickMin" }, { field: "orderThickMax" }],
    },
    {
      groupId: "폭",
      children: [{ field: "orderWidthMin" }, { field: "orderWidthMax" }],
    },
    {
      groupId: "길이",
      children: [{ field: "orderLengthMin" }, { field: "orderLengthMax" }],
    },
    {
      groupId: "단중",
      children: [{ field: "hrRollUnitWgtMax1" }, { field: "hrRollUnitWgtMax2" }],
    },
  ];

  const hideVerticalScrollbar = {
    "& .MuiDataGrid-virtualScroller": {
      overflowY: "hidden",
    },
  };

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
              <MenuItem value="K">광양</MenuItem>
            </Select>
          </FormControl>

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

      <div style={{ height: "83%", width: "100%", ...hideVerticalScrollbar }}>
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
          // checkboxSelection
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
        />
      </div>
    </div>
  );
};

export default Standard;
