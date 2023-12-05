import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

const OrderDetail = (props) => {
  const [cfCode, setCfCode] = useState("");

  useEffect(async () => {
    console.log(props.order);
    setCfCode(props.order.cfirmPassOpCd.padEnd(8, " "));
  }, [props.order]);

  return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }} style={{ padding: 20 }}>
        <Typography variant="h5">
          주문단위 결과 조정 (공장변경 및 확인)
        </Typography>
      </Grid>
      <div
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <TableContainer style={{ marginBottom: 20 }}>
            <Table
              aria-label="custom pagination table"
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
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
                    {props.order.id}
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
                    주문량
                  </TableCell>
                  <TableCell
                    style={{ width: 200, color: "000000" }}
                    align="center"
                  >
                    {props.order.orderLineQty}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">구분</TableCell>
                  <TableCell align="center">제강</TableCell>
                  <TableCell align="center">열연</TableCell>
                  <TableCell align="center">열연정정</TableCell>
                  <TableCell align="center">냉간압연</TableCell>
                  <TableCell align="center">1차소둔</TableCell>
                  <TableCell align="center">2차소둔</TableCell>
                  <TableCell align="center">도금</TableCell>
                  <TableCell align="center">정정</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    공장
                  </TableCell>
                  <TableCell align="center">{cfCode.charAt(0)}</TableCell>
                  <TableCell align="center">{cfCode.charAt(1)}</TableCell>
                  <TableCell align="center">{cfCode.charAt(2)}</TableCell>
                  <TableCell align="center">{cfCode.charAt(3)}</TableCell>
                  <TableCell align="center">{cfCode.charAt(4)}</TableCell>
                  <TableCell align="center">{cfCode.charAt(5)}</TableCell>
                  <TableCell align="center">{cfCode.charAt(6)}</TableCell>
                  <TableCell align="center">{cfCode.charAt(7)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">구분</TableCell>
                  <TableCell align="center">제강</TableCell>
                  <TableCell align="center">열연</TableCell>
                  <TableCell align="center">열연정정</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    공장
                  </TableCell>
                  <TableCell align="center">ddd</TableCell>
                  <TableCell align="center">sss</TableCell>
                  <TableCell align="center">fff</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    공장
                  </TableCell>
                  <TableCell align="center">ddd</TableCell>
                  <TableCell align="center">sss</TableCell>
                  <TableCell align="center">fff</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;
