import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import MainCapacityApi from "/src/api/MainCapacityApi";

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];

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

const MainCapacity = (props) => {
  const [order, setOrder] = useState([]);

  useEffect(async () => {
    await MainCapacityApi.getOrder(props.orderNo, (data) => {
      setOrder(data.response);
    });
  }, [order]);

  const rows = [
    {
      id: 1,
      강종: "Hello",
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
    { field: "강종", headerName: "적용", width: 100 },
    { field: "제강1", headerName: "1", width: 50 },
    { field: "제강2", headerName: "2", width: 50 },
    { field: "열연1", headerName: "1", width: 50 },
    { field: "열연2", headerName: "2", width: 50 },
    { field: "냉간압연1", headerName: "1", width: 50 },
    { field: "냉간압연2", headerName: "2", width: 50 },
    { field: "냉간압연3", headerName: "3", width: 50 },
    { field: "1차소둔1", headerName: "1", width: 50 },
    { field: "1차소둔2", headerName: "2", width: 50 },
    { field: "1차소둔3", headerName: "3", width: 50 },
    { field: "2차소둔1", headerName: "1", width: 50 },
    { field: "2차소둔3", headerName: "3", width: 50 },
    { field: "도금2", headerName: "2", width: 50 },
    { field: "도금3", headerName: "3", width: 50 },
    { field: "정정", headerName: "1", width: 50 },
  ];

  const columnGroupingModel = [
    {
      groupId: "제강",
      children: [{ field: "제강1" }, { field: "제강2" }],
    },
    {
      groupId: "열연",
      children: [{ field: "열연1" }, { field: "열연2" }],
    },
    {
      groupId: "냉간압연",
      children: [
        { field: "냉간압연1" },
        { field: "냉간압연2" },
        { field: "냉간압연3" },
      ],
    },
    {
      groupId: "1차소둔",
      children: [
        { field: "1차소둔1" },
        { field: "1차소둔2" },
        { field: "1차소둔3" },
      ],
    },
    {
      groupId: "2차소둔",
      children: [{ field: "2차소둔1" }, { field: "2차소둔3" }],
    },
    {
      groupId: "도금",
      children: [{ field: "도금2" }, { field: "도금3" }],
    },
    {
      groupId: "정정",
      children: [{ field: "정정" }],
    },
  ];

  return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }} style={{ padding: 20 }}>
        <Typography variant="h5">
          가능통과공장 설계 상세 내역 : {order.id}
        </Typography>
      </Grid>

      <div
        style={{
          width: "73%",
          height: 400,
          paddingBottom: 20,
          margin: "auto",
        }}
      >
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
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
          rowHeight={40}
          headerAlign={"center"}
        />
      </div>
    </>
  );
};

export default MainCapacity;
