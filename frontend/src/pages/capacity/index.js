import "react-datasheet-grid/dist/style.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  Paper,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";import {GridToolbar } from "@mui/x-data-grid";

import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import ModalTest from "./modal-test";


function MyCell(props) {
  let style = {
    minWidth: props.width,
    maxWidth: props.width,
    minHeight: props.height,
    maxHeight: props.height === "auto" ? "none" : props.height,
    ...props.style,
    //중앙배열
      display: "flex",
    alignItems: "center", 
    justifyContent: "center", 
  };
  const apiRef = useGridApiContext();
  const row = apiRef.current.getRow(props.rowId);

  if (row && row.rowSpan && row.rowSpan[props.column.field]) {
    const span = row.rowSpan[props.column.field];
    style = {
      ...style,
      minHeight: props.height * span,
      maxHeight: props.height * span,
      backgroundColor: "gray",
      zIndex: 1,
    };
  }
  return <GridCell {...props} style={style} />;
}

const CapacityMgt = () => {
  const rows = [
    {
      id: 1,
      공정: "제강",
      rowSpan: { 공정: "2" },

      공장: "1",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
    {
      id: 2,
      공장: "1",
      공정: "제강",
      구분: "2",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
    {
      id: 3,
      공정: "열연",
      rowSpan: { 공정: "3" },

      공장: "1",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
    {
      id: 4,
      공장: "2",
      공정: "열연",
      구분: "2",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
        {
      id: 5,
      공장: "3",
      공정: "열연",
      구분: "2",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
    {
      id: 6,
      공정: "열연정정",
      rowSpan: { 공정: "2" },

      공장: "1",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
    {
      id: 7,
      공장: "2",
      공정: "열연정정",
      구분: "2",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
        {
      id: 8,
      공정: "열연정정",
      rowSpan: { 공정: "2" },

      공장: "1",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
    {
      id: 9,
      공장: "2",
      공정: "열연정정",
      구분: "2",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
        {
      id: 10,
      공정: "열연정정",
      rowSpan: { 공정: "2" },

      공장: "1",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
    {
      id:11,
      공장: "2",
      공정: "열연정정",
      구분: "2",
      능력량: "100",
      조정량: "20",
      투입량: "2",
      잔여량: "3",
    },
    
  ];

  const columns = [
    { field: "공정", headerName: "공정", width: 95, editable: true },
    { field: "공장", headerName: "공장", width: 70, editable: true },
    { field: "능력량", headerName: "능력량", width: 95, editable: true },
    { field: "조정량", headerName: "조정량", width: 95, editable: true },
    { field: "투입량", headerName: "투입량", width: 95, editable: true },
    { field: "잔여량", headerName: "잔여량", width: 95, editable: true },
 
  ];
 return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">투입 능력 관리</Typography>
      </Grid>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px", // Added margin for better spacing
        }}
      >
        <div style={{ display: "flex" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="label1">구분</InputLabel>
            <Select
              labelId="분류"
              id="demo-multiple-name"
              defaultValue="T"
              input={<OutlinedInput label="구분" />}
              onChange={(e) => {
                console.log(e);
              }}
              style={{ height: 40 }}
            >
              <MenuItem value="T">포항</MenuItem>
              <MenuItem value="K">광양</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="label2">품종</InputLabel>
            <Select
              labelId="분류"
              id="demo-multiple-name"
              defaultValue="T"
              input={<OutlinedInput label="품종" />}
              onChange={(e) => {
                console.log(e);
              }}
              style={{ height: 40 }}
            >
              <MenuItem value="T">포항</MenuItem>
              <MenuItem value="K">광양</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="label3">출강주</InputLabel>
            <Select
              labelId="출강주"
              id="demo-multiple-name"
              defaultValue="T"
              input={<OutlinedInput label="출강주" />}
              onChange={(e) => {
                console.log(e);
              }}
              style={{ height: 40 }}
            >
              <MenuItem value="T">포항</MenuItem>
              <MenuItem value="K">광양</MenuItem>
            </Select>
          </FormControl> */}
        </div>
        <div>

          <Button size="small" type="submit" variant="contained">
            조회
          </Button>
          <Button size="small" type="submit" variant="contained">
            저장
          </Button>
          <Button size="small" type="submit" variant="contained">
            Excel
          </Button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Paper
          elevation={3}
          style={{
            flexBasis: "calc(70% - 16px)",
            marginRight: "16px",
            padding: "16px",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
              Cell: MyCell,
            }}
          />
        </Paper>
        <Paper
          elevation={3}
          style={{
            flexBasis: "100%", 
            padding: "16px",
          }}
        >
          <Typography variant="h6">Chart</Typography>
          <Typography>차트....................</Typography>
        </Paper>
      </div>
    </>
  );
};

export default CapacityMgt;