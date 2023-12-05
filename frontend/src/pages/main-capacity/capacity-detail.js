import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import MainCapacityApi from "/src/api/MainCapacityApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

import { ConsoleLine } from "mdi-material-ui";

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
  const [order, setOrder] = useState({
    id: 0,
    posbPassFacUpdateDate: null,
    posbPassFacCdN: null,
  });

  useEffect(async () => {
    await MainCapacityApi.getOrder(props.orderNo, (data) => {
      const order = data.response;
      setOrder({
        id: order.id,
        posbPassFacUpdateDate: order.posbPassFacUpdateDate,
        posbPassFacCdN: order.posbPassFacCdN,
      });
    });
  }, [props.orderNo]);

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
          paddingBottom: 20,
          margin: "auto",
        }}
      >
        <TableContainer style={{ marginBottom: 20 }}>
          <Table
            aria-label="custom pagination table"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TableBody
              component={Paper}
              style={{ border: "1px solid #8E8E8E" }}
            >
              <TableRow key="1">
                <TableCell
                  style={{
                    width: 160,
                    backgroundColor: "#8E8E8E",
                    color: "#FFFFFF",
                  }}
                  align="center"
                >
                  설계 일시
                </TableCell>
                <TableCell
                  style={{ width: 200, color: "000000" }}
                  align="center"
                >
                  {order.posbPassFacUpdateDate}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody
              component={Paper}
              style={{ border: "1px solid #8E8E8E" }}
            >
              <TableRow key="1">
                <TableCell
                  style={{
                    width: 160,
                    backgroundColor: "#8E8E8E",
                    color: "#FFFFFF",
                  }}
                  align="center"
                >
                  설계 결과
                </TableCell>
                <TableCell
                  style={{ width: 200, color: "000000" }}
                  align="center"
                >
                  {order.posbPassFacCdN}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* <DataGrid
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
        /> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} align="center">
                  적용
                </TableCell>
                <TableCell colSpan={2} align="center">
                  제강
                </TableCell>
                <TableCell colSpan={2} align="center">
                  열연
                </TableCell>
                <TableCell colSpan={3} align="center">
                  냉간압연
                </TableCell>
                <TableCell colSpan={3} align="center">
                  1차소둔
                </TableCell>
                <TableCell colSpan={2} align="center">
                  2차소둔
                </TableCell>
                <TableCell colSpan={2} align="center">
                  도금
                </TableCell>
                <TableCell align="center">정정</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">3</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">3</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">3</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">3</TableCell>
                <TableCell align="center">1</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>경유공정</TableCell>
                <TableCell
                  colSpan={2}
                  align="center"
                  style={{ background: "grey" }}
                ></TableCell>
                <TableCell colSpan={2} align="center"></TableCell>
                <TableCell
                  colSpan={3}
                  align="center"
                  style={{ background: "grey" }}
                ></TableCell>
                <TableCell colSpan={3} align="center"></TableCell>
                <TableCell
                  colSpan={2}
                  align="center"
                  style={{ background: "grey" }}
                ></TableCell>
                <TableCell colSpan={2} align="center"></TableCell>
                <TableCell
                  align="center"
                  style={{ background: "grey" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>필수재</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>사이즈</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>설계 결과</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default MainCapacity;
