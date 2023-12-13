import { useState, useEffect } from "react";
import { Grid, Typography, Card } from "@mui/material";
import { GridCell, useGridApiContext } from "@mui/x-data-grid";
import MainApi from "/src/api/MainApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

const CapacityDetail = (props) => {
  const [order, setOrder] = useState({
    id: 0,
    orderHeadLineNo: null,
    posbPassFacUpdateDate: null,
    posbPassFacCdN: null,
  });

  useEffect(async () => {
    // await MainCapacityApi.getOrder(props.order.id, (data) => {
    //   const order = data.response;
    //   setOrder({
    //     id: order.id,
    //     orderHeadLineNo: order.orderHeadLineNo,
    //     posbPassFacUpdateDate: order.posbPassFacUpdateDate,
    //     posbPassFacCdN: order.posbPassFacCdN,
    //   });
    // });
  }, [props.order]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Grid item xs={12} sx={{ paddingBottom: 4 }} style={{ padding: 20 }}>
          <Typography variant="h5">가능통과공장 설계 상세 내역</Typography>
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
                    주문번호
                  </TableCell>
                  <TableCell
                    style={{ width: 200, color: "000000" }}
                    align="center"
                  >
                    {props.order.orderHeadLineNo}
                  </TableCell>
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
                    {props.order.posbPassFacUpdateDate}
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
                    {props.order.posbPassFacCdN}
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
          <Card>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      align="center"
                      style={{ fontSize: 17 }}
                    >
                      적용
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontSize: 17 }}
                    >
                      제강
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontSize: 17 }}
                    >
                      열연
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontSize: 17 }}
                    >
                      열연정정
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontSize: 17 }}
                    >
                      냉간압연
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontSize: 17 }}
                    >
                      1차소둔
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontSize: 17 }}
                    >
                      2차소둔
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontSize: 17 }}
                    >
                      도금
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: 17 }}>
                      정정
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">2</TableCell>
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
                    <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                      경유공정
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell colSpan={2} align="center"></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell colSpan={3} align="center"></TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell colSpan={2} align="center"></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                      필수재
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                      사이즈
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "lightgrey" }}
                    ></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                      설계 결과
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN.substr(0, 2)}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN.substr(2, 2)}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN.substr(4, 2)}
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN.substr(6, 2)}
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN.substr(8, 2)}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN.substr(10, 2)}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN.substr(12, 2)}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      {props.order.posbPassFacCdN.substr(14, 2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </div>
    </>
  );
};
export default CapacityDetail;
