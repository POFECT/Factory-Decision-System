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
        if(item.processCd === "10"){
          return { ...item, processCd: "제강"}
        } else if (item.processCd === "20"){
          return { ...item, processCd: "열연"}
        } else if (item.processCd === "30"){
          return { ...item, processCd: "열연정정"}
        } else if (item.processCd === "40"){
          return { ...item, processCd: "냉간압연"}
        } else if (item.processCd === "50"){
          return { ...item, processCd: "1차소둔"}
        } else if (item.processCd === "60"){
          return { ...item, processCd: "2차소둔"}
        } else if (item.processCd === "70"){
          return { ...item, processCd: "도금"}
        } else if (item.processCd === "80"){
          return { ...item, processCd: "정정"}
        }

        return item;
      })

      setSizeStandardList(test2);
  

      if(sizeStandardList.length != 0) {
        setSizeStandardList(sizeStandardList[0].id);
      }
    });
  }, []);



  // const [rowData, setRowData] = useState([
  //   {
  //     id: 1,
  //     공정: "제강",
  //     rowSpan: { 공정: "2" },
  //     공장: 1,
  //     thickMin: 108,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 2,
  //     공정: "제강",
  //     공장: 2,
  //     thickMin: 108,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 3,
  //     공정: "열연",
  //     rowSpan: { 공정: "2" },
  //     공장: 1,
  //     thickMin: 6756,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 4,
  //     공정: "열연",
  //     공장: 2,
  //     thickMin: 7654,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 5,
  //     공정: "열연정정",
  //     rowSpan: { 공정: "2" },
  //     공장: 1,
  //     thickMin: 272,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 6,
  //     공정: "열연정정",
  //     공장: 2,
  //     thickMin: 6754,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 7,
  //     공정: "냉간압연",
  //     rowSpan: { 공정: "3" },
  //     공장: 1,
  //     thickMin: 545,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 8,
  //     공정: "냉간압연",
  //     공장: 2,
  //     thickMin: 375,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 9,
  //     공정: "냉간압연",
  //     공장: 3,
  //     thickMin: 7765,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 10,
  //     공정: "1차소둔",
  //     rowSpan: { 공정: "3" },
  //     공장: 1,
  //     thickMin: 34,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 11,
  //     공정: "1차소둔",
  //     공장: 2,
  //     thickMin: 7954,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 12,
  //     공정: "1차소둔",
  //     공장: 3,
  //     thickMin: 345,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 13,
  //     공정: "2차소둔",
  //     rowSpan: { 공정: "3" },
  //     공장: 1,
  //     thickMin: 7654,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 14,
  //     공정: "2차소둔",
  //     공장: 3,
  //     thickMin: 124,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 15,
  //     공정: "도금",
  //     rowSpan: { 공정: "2" },
  //     공장: 3,
  //     thickMin: 765,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 16,
  //     공정: "도금",
  //     공장: 4,
  //     thickMin: 134,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  //   {
  //     id: 17,
  //     공정: "정정",
  //     rowSpan: { 공정: "1" },
  //     공장: 1,
  //     thickMin: 789,
  //     thickMax: 0,
  //     widthMin: 412,
  //     widthMax: 3,
  //     lengthMin: 55,
  //     lengthMax: 11,
  //     tonMin: 1020,
  //     tonMax: 0,
  //   },
  // ]);

  const columns = [
    { field: "processCd", headerName: "공정", width: 180, sortable: false },
    { field: "firmPsFacTp", headerName: "공장", width: 170, sortable: false },
    { field: "orderThickMin", headerName: "min", width: 130, sortable: false, editable: true },
    { field: "orderThickMax", headerName: "max", width: 130, sortable: false, editable: true },
    { field: "orderWidthMin", headerName: "min", width: 130, sortable: false, editable: true },
    { field: "orderWidthMax", headerName: "max", width: 130, sortable: false, editable: true },
    { field: "orderLengthMin", headerName: "min", width: 130, sortable: false, editable: true },
    { field: "orderLengthMax", headerName: "max", width: 130, sortable: false, editable: true },
    { field: "hrRollUnitWgtMax1", headerName: "min", width: 130, sortable: false, editable: true },
    { field: "hrRollUnitWgtMax2", headerName: "max", width: 130, sortable: false, editable: true },
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
      <div style={{ height: "83%", width: "100%" }}>
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
          hideFooter = {true}
        />
      </div>
    </div>
  );
};

export default Standard;
