import React from "react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";

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
    { field: "강종", headerName: "강종", width: 150, editable: true },
    { field: "구분", headerName: "구분", width: 150, editable: true },
    { field: "1", headerName: "1", width: 50, editable: true },
    { field: "2", headerName: "2", width: 50, editable: true },
    { field: "3", headerName: "3", width: 50, editable: true },
    { field: "대기", headerName: "대기", width: 50, editable: true },
    { field: "11", headerName: "1", width: 50, editable: true },
    { field: "22", headerName: "2", width: 50, editable: true },
    { field: "33", headerName: "3", width: 50, editable: true },
    { field: "대기4", headerName: "대기", width: 50, editable: true },
  ];

  const columnGroupingModel = [
    {
      groupId: "970",
      children: [
        { field: "1" },
        { field: "2" },
        { field: "3" },
        { field: "대기" },
      ],
    },
    {
      groupId: "1279",
      groupId: "1270 children",
      children: [
        { field: "11" },
        { field: "22" },
        { field: "33" },
        { field: "대기4" },
      ],
    },
  ];

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <DataGrid
        experimentalFeatures={{ columnGrouping: true }}
        checkboxSelection
        disableRowSelectionOnClick
        rows={rows}
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
  );
};

export default App;
