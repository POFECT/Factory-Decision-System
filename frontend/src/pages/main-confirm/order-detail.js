import { useState, useEffect } from "react";
import { Card, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import FactoryDetail from "./factory-detail";

const OrderDetail = (props) => {
  const [cfCode, setCfCode] = useState("");
  const [factory, setFactory] = useState({
    no: "10",
    name: "제강",
    code: props.order.cfirmPassOpCd.charAt(0),
  });

  useEffect(() => {
    setCfCode(props.order.cfirmPassOpCd.padEnd(8, " "));
  }, [props.order]);

  const changeFactory = (e, code) => {
    setFactory((prev) => {
      return {
        ...prev,
        no: e.target.accessKey,
        name: e.target.innerText,
        code,
      };
    });
  };

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
        <Card>
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
                <TableRow>
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
                <TableRow>
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

          <TableContainer>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontSize: 17 }}>
                    구분
                  </TableCell>
                  <TableCell
                    align="center"
                    accessKey={10}
                    onClick={(e) => {
                      changeFactory(e, cfCode.charAt(0));
                    }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: 17,
                      padding: 0,
                    }}
                  >
                    제강
                  </TableCell>
                  <TableCell
                    align="center"
                    accessKey={20}
                    onClick={(e) => {
                      changeFactory(e, cfCode.charAt(1));
                    }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: 17,
                      padding: 0,
                    }}
                  >
                    열연
                  </TableCell>
                  <TableCell
                    align="center"
                    accessKey={30}
                    onClick={(e) => {
                      changeFactory(e, cfCode.charAt(2));
                    }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: 17,
                      padding: 0,
                    }}
                  >
                    열연정정
                  </TableCell>
                  <TableCell
                    align="center"
                    accessKey={40}
                    onClick={(e) => {
                      changeFactory(e, cfCode.charAt(3));
                    }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: 17,
                      padding: 0,
                    }}
                  >
                    냉간압연
                  </TableCell>
                  <TableCell
                    align="center"
                    accessKey={50}
                    onClick={(e) => {
                      changeFactory(e, cfCode.charAt(4));
                    }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: 17,
                      padding: 0,
                    }}
                  >
                    1차소둔
                  </TableCell>
                  <TableCell
                    align="center"
                    accessKey={60}
                    onClick={(e) => {
                      changeFactory(e, cfCode.charAt(5));
                    }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: 17,
                      padding: 0,
                    }}
                  >
                    2차소둔
                  </TableCell>
                  <TableCell
                    align="center"
                    accessKey={70}
                    onClick={(e) => {
                      changeFactory(e, cfCode.charAt(6));
                    }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: 17,
                      padding: 0,
                    }}
                  >
                    도금
                  </TableCell>
                  <TableCell
                    align="center"
                    accessKey={80}
                    onClick={(e) => {
                      changeFactory(e, cfCode.charAt(7));
                    }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: 17,

                      padding: 0,
                    }}
                  >
                    정정
                  </TableCell>
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
        </Card>
        <Card>
          <FactoryDetail factory={factory} order={props.order} />
        </Card>
      </div>
    </>
  );
};
export default OrderDetail;
