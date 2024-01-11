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
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

// ** Icons Imports
import Magnify from "mdi-material-ui/Magnify";

const OrderList = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchedList, setSearchedList] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const search = (word) => {
    const list = props.order.list.filter((item) => {
      return Object.values(item.orderHeadLineNo)
        .join("")
        .toLowerCase()
        .includes(word.toLowerCase());
    });

    setSearchedList(list);
  };

  useEffect(async () => {
    setSearchedList(props.order.list);
  }, []);

  return (
    <>
      <Box
        className="actions-left"
        sx={{ mr: 2, display: "flex", alignItems: "center", marginTop: "15px" }}
      >
        <TextField
          size="small"
          placeholder="주문번호로 검색"
          onChange={(e) => {
            search(e.target.value);
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Magnify fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer
        sx={{ maxHeight: 500, marginTop: "20px" }}
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
            {searchedList
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
        count={searchedList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ marginTop: 15 }}
      />
    </>
  );
};

export default OrderList;
