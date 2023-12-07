import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

const FactoryDetail = (props) => {
  return (
    <>
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  width: "40%",
                  backgroundColor: "#8E8E8E",
                  color: "white",
                }}
              >
                공정
              </TableCell>
              <TableCell align="center">{props.factory.name}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  fontSize: 17,
                }}
              >
                공장
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontSize: 17,
                }}
              >
                능력 여유량
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontSize: 17,
                }}
              >
                능력 사용량
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontSize: 17,
                }}
              >
                선택
              </TableCell>
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
    </>
  );
};
export default FactoryDetail;
