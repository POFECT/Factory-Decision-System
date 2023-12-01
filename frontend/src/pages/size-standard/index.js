"use strict";
import { useCallback, useState, useMemo, StrictMode } from "react";
import { DataSheetGrid, textColumn, keyColumn } from "react-datasheet-grid";

import "react-datasheet-grid/dist/style.css";
import { AgGridReact } from "ag-grid-react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import { Button, Grid, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination'
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
  }
  return <GridCell {...props} style={style} />;
}

const Standard = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  const [rowData, setRowData] = useState([
    {
      id: 1,
      공정: "제강",
      rowSpan: { 공정: "2" },
      공장: 1,
      thickMin: 108,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 2,
      공정: "제강",
      공장: 2,
      thickMin: 108,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 3,
      공정: "열연",
      rowSpan: { 공정: "2" },
      공장: 1,
      thickMin: 6756,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 4,
      공정: "열연",
      공장: 2,
      thickMin: 7654,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 5,
      공정: "열연정정",
      rowSpan: { 공정: "2" },
      공장: 1,
      thickMin: 272,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 6,
      공정: "열연정정",
      공장: 2,
      thickMin: 6754,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 7,
      공정: "냉간압연",
      rowSpan: { 공정: "3" },
      공장: 1,
      thickMin: 545,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 8,
      공정: "냉간압연",
      공장: 2,
      thickMin: 375,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 9,
      공정: "냉간압연",
      공장: 3,
      thickMin: 7765,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 10,
      공정: "1차소둔",
      rowSpan: { 공정: "3" },
      공장: 1,
      thickMin: 34,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 11,
      공정: "1차소둔",
      공장: 2,
      thickMin: 7954,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 12,
      공정: "1차소둔",
      공장: 3,
      thickMin: 345,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 13,
      공정: "2차소둔",
      rowSpan: { 공정: "3" },
      공장: 1,
      thickMin: 7654,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 14,
      공정: "2차소둔",
      공장: 3,
      thickMin: 124,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 15,
      공정: "도금",
      rowSpan: { 공정: "2" },
      공장: 3,
      thickMin: 765,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 16,
      공정: "도금",
      공장: 4,
      thickMin: 134,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
    {
      id: 17,
      공정: "정정",
      rowSpan: { 공정: "1" },
      공장: 1,
      thickMin: 789,
      thickMax: 0,
      widthMin: 412,
      widthMax: 3,
      lengthMin: 55,
      lengthMax: 11,
      tonMin: 1020,
      tonMax: 0,
    },
  ]);

  const columns = [
    { field: "공정", width: 150 },
    { field: "공장", width: 150 },
    { field: "thickMin", headerName: "min", width: 100,},
    { field: "thickMax", headerName: "max", width: 100 },
    { field: "widthMin", headerName: "min", width: 100 },
    { field: "widthMax", headerName: "max", width: 100 },
    { field: "lengthMin", headerName: "min", width: 100 },
    { field: "lengthMax", headerName: "max", width: 100 },
    { field: "tonMin", headerName: "min", width: 100 },
    { field: "tonMax", headerName: "max", width: 100 },
  ];

  const columnGroupingModel = [
    {
      groupId: "두께",
      children: [
        { field: "thickMin", },
        { field: "thickMax" },
      ],
    },
    {
      groupId: "폭",
      children: [
        { field: "widthMin" },
        { field: "widthMax" },
      ],
    },
    {
      groupId: "길이",
      children: [
        { field: "lengthMin" },
        { field: "lengthMax" },
      ],
    },
    {
      groupId: "단중",
      children: [
        { field: "tonMin" },
        { field: "tonMax" },
      ],
    },
  ];

  return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">공장 공정 별 사이즈 기준</Typography>
      </Grid>


      <InputLabel id='form-layouts-separator-select-label'>소구분</InputLabel>

      <Select
        label='Country'
        defaultValue='T'
        // id='form-layouts-separator-select'
        // labelId='form-layouts-separator-select-label'
        onClick={(e) => { console.log(e) }}
      >
        <MenuItem value='T'>포항</MenuItem>
        <MenuItem value='K'>광양</MenuItem>
      </Select>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "15px",
        }}
      >
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
      <div style={{ height: "83%", width: "100%" }}>
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
          checkboxSelection
          disableRowSelectionOnClick
          rows={rowData}
          columns={columns}
          onCellClick={(e) => {
            console.log(e);
          }}
          columnGroupingModel={columnGroupingModel}
          slots={{
            cell: MyCell,
          }}
        />
      </div>
    </>
  );
};

export default Standard;