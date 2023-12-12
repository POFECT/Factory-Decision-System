import { useState, useEffect } from "react";
import { Grid, Typography, Checkbox } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import MainCapacityApi from "src/api/MainCapacityApi";

const FactoryDetail = (props) => {
  const [factoryList, setFactoryList] = useState({
    list: [],
  });

  useEffect(() => {
    MainCapacityApi.getFaCapacityList(props.factory.no, (data) => {
      const list = data.response;
      setFactoryList((prev) => {
        return { ...prev, list };
      });
    });
  }, [props.factory, props.order]);

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
            {factoryList.list.map((f) => {
              return (
                <TableRow key={f.firmPsFacTp}>
                  <TableCell align="center" style={{ width: "80px" }}>
                    {f.factoryName}
                  </TableCell>
                  <TableCell align="center">
                    {f.faAdjustmentWgt - f.progressQty}
                  </TableCell>
                  <TableCell align="center">
                    {props.factory.code == f.firmPsFacTp
                      ? props.order.orderLineQty
                      : ""}
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={
                        props.factory.code == f.firmPsFacTp ? true : false
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default FactoryDetail;
