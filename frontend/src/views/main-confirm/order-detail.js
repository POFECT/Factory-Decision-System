import { useState, useEffect } from "react";
import { Card, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import FactoryDetail from "./factory-detail";

const OrderDetail = (props) => {
  const [cfCode, setCfCode] = useState("");
  useEffect(() => {
    setCfCode(
      props.order.cfirmPassOpCd != null
        ? props.order.cfirmPassOpCd.padEnd(8, " ")
        : ""
    );
  }, [props.order]);

  const changeFactory = (e, code) => {
    props.setFactory((prev) => {
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Grid item xs={12} sx={{ paddingBottom: 4 }} style={{ padding: 20 }}>
          <Typography variant="h5">
            주문단위 결과 조정 (공장변경 및 확인)
          </Typography>
        </Grid>
        <div
          style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginRight: "20px", height: "200px" }}>
            {/* <Card style={{ marginRight: "20px", height: "200px" }}> */}
            <Card style={{ marginBottom: 10 }}>
              <TableContainer>
                <Table
                  aria-label="custom pagination table"
                  style={{
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <TableBody style={{ width: "100%" }}>
                    <TableRow style={{ width: "100%" }}>
                      <TableCell
                        style={{
                          width: "14%",
                          backgroundColor: "#0A5380",
                          color: "#FFFFFF",
                        }}
                        align="center"
                      >
                        주문번호
                      </TableCell>
                      <TableCell
                        style={{
                          width: "24%",
                          color: "000000",
                        }}
                        align="center"
                      >
                        {props.order.orderHeadLineNo}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "14%",
                          backgroundColor: "#0A5380",
                          color: "#FFFFFF",
                        }}
                        align="center"
                      >
                        주문량
                      </TableCell>
                      <TableCell
                        style={{ width: "17%", color: "000000" }}
                        align="center"
                      >
                        {props.order.orderLineQty}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "14%",
                          backgroundColor: "#0A5380",
                          color: "#FFFFFF",
                        }}
                        align="center"
                      >
                        설계 결과
                      </TableCell>
                      <TableCell
                        style={{ width: "17%", color: "000000" }}
                        align="center"
                      >
                        {props.order.cfirmPassOpCd == null
                          ? " "
                          : props.order.cfirmPassOpCd}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

            <Card>
              <TableContainer>
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow
                      sx={{
                        "& .MuiTableCell-head:first-child": {
                          cursor: "auto",
                          textDecoration: "auto",
                        },
                        "& .MuiTableCell-head": {
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontSize: 17,
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      <TableCell align="center">구분</TableCell>
                      <TableCell
                        align="center"
                        accessKey={10}
                        onClick={(e) => {
                          changeFactory(e, cfCode.charAt(0));
                        }}
                        style={{
                          color: `${
                            props.factory.no === "10" ? "darkred" : ""
                          }`,
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
                          color: `${
                            props.factory.no === "20" ? "darkred" : ""
                          }`,
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
                          color: `${
                            props.factory.no === "30" ? "darkred" : ""
                          }`,
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
                          color: `${
                            props.factory.no === "40" ? "darkred" : ""
                          }`,
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
                          color: `${
                            props.factory.no === "50" ? "darkred" : ""
                          }`,
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
                          color: `${
                            props.factory.no === "60" ? "darkred" : ""
                          }`,
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
                          color: `${
                            props.factory.no === "70" ? "darkred" : ""
                          }`,
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
                          color: `${
                            props.factory.no === "80" ? "darkred" : ""
                          }`,
                        }}
                      >
                        정정
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bold",
                          fontSize: 17,
                          whiteSpace: "nowrap",
                        }}
                      >
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
          </div>
          <div style={{ marginLeft: "20px", width: "55%" }}>
            <FactoryDetail
              factory={props.factory}
              order={props.order}
              getOrder={props.getOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;
