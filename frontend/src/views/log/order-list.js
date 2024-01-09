import { useState, useEffect } from "react";
import {
  Paper,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

const OrderList = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {/* <Card> */}
      {/* <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}> */}
      <TableContainer
        sx={{ maxHeight: 500, marginTop: "30px" }}
        component={Paper}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontSize: 18 }}>
                주문번호
              </TableCell>
              <TableCell align="center" style={{ fontSize: 18 }}>
                품명
              </TableCell>
              <TableCell align="center" style={{ fontSize: 18 }}>
                출강주
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.order.list
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((o) => {
                return (
                  <TableRow
                    onClick={() => {
                      props.changeSelectedOrder(o);
                    }}
                    key={o.id}
                    hover
                    tabIndex={-1}
                    style={{ height: 30 }}
                  >
                    <TableCell align="center">{o.orderHeadLineNo}</TableCell>
                    <TableCell align="center">{o.ordPdtItdsCdN}</TableCell>
                    <TableCell align="center">{o.ordThwTapWekCd}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.order.list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ marginTop: 15 }}
      />
      {/* </Paper> */}

      {/* <TableContainer style={{ marginTop: 15, height: 350 }}>
        <Table aria-label="spanning table">
          <TableBody>
            {props.order.list.map((o) => {
              return (
                <TableRow key={o.id}>
                  <TableCell align="center">{o.orderHeadLineNo}</TableCell>
                  <TableCell align="center">{o.ordPdtItdsCdN}</TableCell>
                  <TableCell align="center">{o.ordThwTapWekCd}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> */}
      {/* </Card> */}
    </>
  );
};

export default OrderList;
