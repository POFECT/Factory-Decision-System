import { useCallback, useState } from "react";

import "react-datasheet-grid/dist/style.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box, Modal, Button, Grid, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    outline: "none",
    overflow: "auto",
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    backgroundColor: "#f8f8f8",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#555",
    "&:hover": {
      color: "#000",
    },
  },
}));

const ModalTest = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rowData] = useState([
    {
      seq: "1",
      해지일자: "2023-08-01",
      공정: "열연",
      가능통과공장코드: 80,
      품종: "ㄴㅇㅁㅇ",
    },
    {
      seq: "2",
      해지일자: "2023-08-01",
      공정: "열연",
      가능통과공장코드: 80,
      부호: "ㄴㅁㅇ",
      기준: "ㄴㅇㅁ",
    },
    { seq: "3", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
    { seq: "4", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
    { seq: "5", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
    { seq: "6", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
    {
      seq: "7",
      해지일자: "2023-08-01",
      공정: "열연",
      가능통과공장코드: 80,
    },
    {
      seq: "8",
      해지일자: "2023-08-01",
      공정: "열연",
      가능통과공장코드: 80,
      품명: "ㅇㅁㄴㅇ",
    },
    { seq: "8", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
    { seq: "8", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
    { seq: "8", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
    { seq: "8", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
    { seq: "8", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
    { seq: "8", 해지일자: "2023-08-01", 공정: "열연", 가능통과공장코드: 80 },
  ]);

  const [columnDefs] = useState([
    { field: "seq", sortable: true, filter: true },
    { field: "해지일자", sortable: true, filter: true },
    {
      headerName: "품종",
      children: [
        {
          field: "부호",
          minWidth: 100,
          maxWidth: 100,
          flex: 2,
        },
        {
          field: "기준",
          flex: 1,
          minWidth: 100,
          maxWidth: 100,
        },
      ],
    },
    { field: "공정", sortable: true, filter: true },
    { field: "가능통과공장코드", sortable: true, filter: true },
    { field: "품명", sortable: true, filter: true },
    { field: "규격", sortable: true, filter: true },
    { field: "용도", sortable: true, filter: true },
    { field: "주문두께", sortable: true, filter: true },
    { field: "주문폭", sortable: true, filter: true },
    { field: "수정자", sortable: true, filter: true },
    { field: "수정일시", sortable: true, filter: true },
  ]);

  const [clickedCount, setClickedCount] = useState(0);

  const onCellClicked = (event) => {
    console.log(event);
    const { data, colDef } = event;
    if (colDef.field === "공정" && data.공정 === "열연") {
      handleOpen(data);
    }
  };

  const onCellValueChanged = useCallback(() => {
    console.log(`number of clicks is ${clickedCount}`);
  }, []);

  const clickMenu = (e) => {
    console.log(e);
  };
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper className={classes.modalPaper}>
          <Button onClick={handleClose} className={classes.closeButton}>
            &times;
          </Button>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            공장을 변경??
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            모달내용..........
          </Typography>
        </Paper>
      </Modal>

      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">필수재 기준</Typography>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "15px",
        }}
      >
        <Button
          size="small"
          type="submit"
          variant="contained"
          sx={{ width: "7%" }}
        >
          조회
        </Button>
        <Button
          size="small"
          type="submit"
          variant="contained"
          sx={{ width: "7%" }}
        >
          저장
        </Button>
        <Button
          size="small"
          type="submit"
          variant="contained"
          sx={{ width: "7%" }}
        >
          Excel
        </Button>
      </div>
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <div
          className="ag-theme-alpine"
          style={{
            width: "100%",
            height: "70%",
            margin: "10px",
            fontFamily: "HakgyoansimWoojuR",
          }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onCellClicked={onCellClicked}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
    </>
  );
};

export default ModalTest;
