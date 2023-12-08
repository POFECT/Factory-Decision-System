import { useState, useEffect } from "react";
import { Grid, Typography, Card } from "@mui/material";
import { GridCell, useGridApiContext } from "@mui/x-data-grid";
import MainCapacityApi from "/src/api/MainCapacityApi";
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
    await MainCapacityApi.getOrder(props.orderNo, (data) => {
      const order = data.response;
      setOrder({
        id: order.id,
        orderHeadLineNo: order.orderHeadLineNo,
        posbPassFacUpdateDate: order.posbPassFacUpdateDate,
        posbPassFacCdN: order.posbPassFacCdN,
      });
    });
  }, [props.orderNo]);

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
                  주문번호
                </TableCell>
                <TableCell
                  style={{ width: 200, color: "000000" }}
                  align="center"
                >
                  {order.orderHeadLineNo}
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
        <Card>
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
                  <TableCell colSpan={2} align="center">
                    열연정정
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
                    colSpan={2}
                    align="center"
                    style={{ background: "grey" }}
                  ></TableCell>
                  <TableCell colSpan={3} align="center"></TableCell>
                  <TableCell
                    colSpan={3}
                    align="center"
                    style={{ background: "grey" }}
                  ></TableCell>
                  <TableCell colSpan={2} align="center"></TableCell>
                  <TableCell
                    colSpan={2}
                    align="center"
                    style={{ background: "grey" }}
                  ></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>필수재</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>사이즈</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    설계 결과
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </>
  );
};
export default CapacityDetail;
