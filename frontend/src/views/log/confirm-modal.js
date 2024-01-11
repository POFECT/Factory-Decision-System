import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const map = new Map();
map.set("10", "제강");
map.set("20", "열연");
map.set("30", "열연정정");
map.set("40", "냉간압연");
map.set("50", "1차소둔");
map.set("60", "2차소둔");
map.set("70", "도금");
map.set("80", "정정");

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.etc}</TableCell>
        <TableCell align="center">{row.confirmData.code}</TableCell>
        <TableCell align="center">{row.orderLineQty}</TableCell>
        <TableCell align="right">{row.updateDate}</TableCell>
        <TableCell align="right">user</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                공장 능력 이력
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: 14 }}>공정</TableCell>
                    <TableCell style={{ fontSize: 14 }}>공장</TableCell>
                    <TableCell
                      align="right"
                      style={{ fontSize: 14, textTransform: "lowercase" }}
                    >
                      투입 전 (t)
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ fontSize: 14, textTransform: "lowercase" }}
                    >
                      투입 후 (t)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.confirmData.capacityData.map((capacityRow, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {map.get(capacityRow.processCd)}
                      </TableCell>
                      <TableCell>{capacityRow.factory}</TableCell>
                      <TableCell align="right">
                        {capacityRow.capacityQty + row.orderLineQty}
                      </TableCell>
                      <TableCell align="right">
                        {capacityRow.capacityQty}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ConfirmModal = ({ open, handleClose, confirmList }) => {
  // useEffect(() => {
  //   console.log(confirmList);
  // }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%" }}
      maxWidth="xl"
    >
      <div style={{ maxWidth: "1200px" }}>
        <DialogTitle>
          <Grid item xs={12} sx={{ paddingBottom: 4 }}>
            {/* <Card></Card> */}
            <Typography variant="h5">공장 결정 상세 내역</Typography>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead style={{ backgroundColor: "#F9FAFC" }}>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center" style={{ fontSize: 16 }}>
                      구분
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: 16 }}>
                      확정통과공장코드
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ fontSize: 16, textTransform: "lowercase" }}
                    >
                      주문량 (t)
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: 16 }}>
                      설계일
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: 16 }}>
                      관리자
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {confirmList.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "#0A5380" }}
            onClick={handleClose}
          >
            닫기
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
