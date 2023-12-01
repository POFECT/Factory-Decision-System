import React from "react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import { Grid, Typography, Button } from "@mui/material";

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

const App = () => {
  /** 데이터 */
  const rows = [
    {
      id: 1,
      강종: "Hello",
      rowSpan: { 강종: "2" },
      구분: "World",
      1: "1",
      2: "2",
      3: "3",
      대기: "대기",
      11: "11231",
      22: "2231",
      33: "32313",
      대기4: "대기",
    },
    {
      id: 2,
      강종: "DataGridPro",
      구분: "is Awesome",
      1: "4",
      2: "5",
      3: "6",
      대기: "대기",
      11: "12",
      22: "223",
      33: "334",
      대기4: "대기",
    },
    {
      id: 3,
      강종: "MUI",
      구분: "is Amazing",
      1: "7",
      2: "8",
      3: "9",
      대기: "대기",
      11: "111",
      22: "222",
      33: "333",
      대기4: "대기",
    },
    {
      id: 4,
      강종: "DataGridPro",
      구분: "is Awesome",
      1: "4",
      2: "5",
      3: "6",
      대기: "대기",
      11: "12",
      22: "223",
      33: "334",
      대기4: "대기",
    },
    {
      id: 5,
      강종: "DataGridPro",
      구분: "is Awesome",
      1: "4",
      2: "5",
      3: "6",
      대기: "대기",
      11: "12",
      22: "223",
      33: "334",
      대기4: "대기",
    },
  ];

  const columns = [
    {
      field: "강종",
      headerName: "연결결산법인구분",
      width: 150,
      editable: true,
    },
    {
      field: "구분",
      headerName: "공정계획박판Mill구분",
      width: 150,
      editable: true,
    },
    {
      field: "1",
      headerName: "OrderHeadLineNumber",
      width: 180,
      editable: true,
    },
    { field: "2", headerName: "생성일자", width: 150, editable: true },
    { field: "3", headerName: "주문진도상태", width: 150, editable: true },
    { field: "대기", headerName: "공장결정확정", width: 150, editable: true },
    { field: "11", headerName: "가능통과공정코드", width: 150, editable: true },
    { field: "22", headerName: "확정통과공정코드", width: 150, editable: true },
    { field: "33", headerName: "주문품종", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    {
      field: "대기4",
      headerName: "주문ATP능력사용조정일",
      width: 150,
      editable: true,
    },
    { field: "대기4", headerName: "고객사코드", width: 100, editable: true },
    { field: "대기4", headerName: "고객사명", width: 100, editable: true },
    {
      field: "대기4",
      headerName: "주문투입 출강주코드",
      width: 100,
      editable: true,
    },
    { field: "대기4", headerName: "수주구분", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
    { field: "대기4", headerName: "주문품명", width: 100, editable: true },
  ];

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">가능통과공장 설계</Typography>
      </Grid>
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
      <DataGrid
        experimentalFeatures={{ columnGrouping: true }}
        checkboxSelection
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        onCellClick={(e) => {
          console.log(e);
        }}
        slots={{
          cell: MyCell,
        }}
      />
    </div>
  );
};

export default App;
