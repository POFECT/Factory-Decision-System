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
        <TableCell align="center">{row.flag}</TableCell>
        <TableCell align="center">{row.possibleData.code}</TableCell>
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
                상세 설계 이력
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead
                  sx={{
                    "& .MuiTableCell-head": {
                      border: "1px solid rgba(225, 234, 239, 1)",
                      fontSize: 14,
                    },
                  }}
                >
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
                <TableBody
                  sx={{
                    "& .MuiTableCell-body": {
                      border: "1px solid rgba(225, 234, 239, 1)",
                      fontWeight: "bold",
                      fontSize: 14,
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>경유공정</TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        row.possibleData.passResult != null &&
                        row.possibleData.passResult.substr(0, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        row.possibleData.passResult != null &&
                        row.possibleData.passResult.substr(1, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        row.possibleData.passResult != null &&
                        row.possibleData.passResult.substr(2, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={
                        row.possibleData.passResult != null &&
                        row.possibleData.passResult.substr(3, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={
                        row.possibleData.passResult != null &&
                        row.possibleData.passResult.substr(4, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        row.possibleData.passResult != null &&
                        row.possibleData.passResult.substr(5, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={
                        row.possibleData.passResult != null &&
                        row.possibleData.passResult.substr(6, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.passResult != null &&
                        row.possibleData.passResult.substr(7, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>필수재</TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(0, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(1, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(2, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(3, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(4, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(5, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(6, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(7, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(8, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(9, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(10, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(11, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(12, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(13, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(14, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(15, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.essentialResult != null &&
                        row.possibleData.essentialResult.substr(16, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>사이즈</TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(0, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(1, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(2, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(3, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(4, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(5, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(6, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(7, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(8, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(9, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(10, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(11, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(12, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(13, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(14, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(15, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                    <TableCell
                      align="center"
                      style={
                        row.possibleData.sizeResult != null &&
                        row.possibleData.sizeResult.substr(16, 1) == "1"
                          ? { background: "#E8EFF9" }
                          : null
                      }
                    ></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>설계 결과</TableCell>
                    <TableCell colSpan={2} align="center">
                      {row.possibleData.code.substr(0, 2)}
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                      {row.possibleData.code.substr(2, 2)}
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                      {row.possibleData.code.substr(4, 2)}
                    </TableCell>
                    <TableCell colSpan={3} align="center">
                      {row.possibleData.code.substr(6, 2)}
                    </TableCell>
                    <TableCell colSpan={3} align="center">
                      {row.possibleData.code.substr(8, 2)}
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                      {row.possibleData.code.substr(10, 2)}
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                      {row.possibleData.code.substr(12, 2)}
                    </TableCell>
                    <TableCell align="center">
                      {row.possibleData.code.substr(14, 2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const PossibleModal = ({ open, handleClose, possibleList }) => {
  useEffect(() => {
    console.log(possibleList);
  }, []);

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
            <Typography variant="h5">가능통과공장 상세 내역</Typography>
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
                    <TableCell align="center" style={{ fontSize: 16 }}>
                      플래그
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: 16 }}>
                      가능통과공장코드
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
                  {possibleList.map((row) => (
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

export default PossibleModal;
