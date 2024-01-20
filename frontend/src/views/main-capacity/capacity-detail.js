import { useState, useEffect } from "react";
import { Grid, Typography, Card } from "@mui/material";
import { GridCell, useGridApiContext } from "@mui/x-data-grid";
import MainApi from "src/pages/api/pofect/MainApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

const CapacityDetail = (props) => {
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
          <Card style={{ marginBottom: 20 }}>
            <TableContainer>
              <Table
                aria-label="custom pagination table"
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              >
                <TableBody>
                  <TableRow>
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
                      style={{ width: "21%", color: "000000" }}
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
                      설계 일시
                    </TableCell>
                    <TableCell
                      style={{ width: "18%", color: "000000" }}
                      align="center"
                    >
                      {props.order.posbPassFacUpdateDate}
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
                      style={{ width: "19%", color: "000000" }}
                      align="center"
                    >
                      {props.order.posbPassFacCdN}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

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
              <Table
                sx={{
                  minWidth: 700,
                  "& .MuiTableCell-head, & .css-1det703-MuiTableBody-root": {
                    fontSize: 17,
                  },
                }}
                aria-label="spanning table"
              >
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
                    <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                      경유공정
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        props.order.posbPassFacProcess != null &&
                        props.order.posbPassFacProcess.substr(0, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        props.order.posbPassFacProcess != null &&
                        props.order.posbPassFacProcess.substr(1, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        props.order.posbPassFacProcess != null &&
                        props.order.posbPassFacProcess.substr(2, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={
                        props.order.posbPassFacProcess != null &&
                        props.order.posbPassFacProcess.substr(3, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={
                        props.order.posbPassFacProcess != null &&
                        props.order.posbPassFacProcess.substr(4, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        props.order.posbPassFacProcess != null &&
                        props.order.posbPassFacProcess.substr(5, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        props.order.posbPassFacProcess != null &&
                        props.order.posbPassFacProcess.substr(6, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacProcess != null &&
                        props.order.posbPassFacProcess.substr(7, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                      필수재
                    </TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(0, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(1, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(2, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(3, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(4, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(5, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(6, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(7, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(8, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(9, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(10, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(11, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(12, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(13, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(14, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(15, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacEs != null &&
                        props.order.posbPassFacEs.substr(16, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                      사이즈
                    </TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(0, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(1, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(2, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(3, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(4, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(5, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(6, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(7, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(8, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(9, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(10, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(11, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(12, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(13, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(14, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(15, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        props.order.posbPassFacSize != null &&
                        props.order.posbPassFacSize.substr(16, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
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
                      {props.order.posbPassFacCdN != null
                        ? props.order.posbPassFacCdN.substr(0, 2)
                        : null}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN != null
                        ? props.order.posbPassFacCdN.substr(2, 2)
                        : null}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN != null
                        ? props.order.posbPassFacCdN.substr(4, 2)
                        : null}
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN != null
                        ? props.order.posbPassFacCdN.substr(6, 2)
                        : null}
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN != null
                        ? props.order.posbPassFacCdN.substr(8, 2)
                        : null}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN != null
                        ? props.order.posbPassFacCdN.substr(10, 2)
                        : null}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.order.posbPassFacCdN != null
                        ? props.order.posbPassFacCdN.substr(12, 2)
                        : null}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      {props.order.posbPassFacCdN != null
                        ? props.order.posbPassFacCdN.substr(14, 2)
                        : null}
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
