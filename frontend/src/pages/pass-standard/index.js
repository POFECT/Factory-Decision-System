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
} from "@mui/material";
import {GridToolbar } from "@mui/x-data-grid";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import React, {
  useEffect,
  useState,
} from "react";
import PassStandardApi from "src/api/PassStandardApi";

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
    headerAlign: 'center',
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

const passStandard = () => {

  const [passStandard, setPassStandard] = useState([]);

  
  useEffect(() => {
    // CapacityStandardApi.getList((data) => {
    //   setCapacity(data.response);
    // });

        PassStandardApi.getList((data) => {
      setPassStandard(data.response);
    });
  }, []);

  //   const uniqueWeekCodes = [...new Set(week.map((item) => item.ordThwTapWekCd))];
  // const handleWeekSelectChange = (e) => {
  //   console.log(e);
  // };
const columns = [
  { field: "ordPdtItdsCdN", headerName: "|    품명    |", width: 130, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' } },
  { field: "availablePassFacCdN1", headerName: "|   제강   |", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' } },
  { field: "availablePassFacCdN2", headerName: "|   열연   |", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' } },
  { field: "availablePassFacCdN3", headerName: "|   열연정정   |", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' } },
  { field: "availablePassFacCdN4", headerName: "|   냉연   |", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' } },
  { field: "availablePassFacCdN5", headerName: "|   1차소둔   |", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' } },
  { field: "availablePassFacCdN6", headerName: "|   2차소둔   |", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' } },
  { field: "availablePassFacCdN7", headerName: "|   도금   |", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' } },
  { field: "availablePassFacCdN8", headerName: "|   정정   |", width: 100, headerAlign: 'center', headerClassName: 'custom-header', style: { borderRight: '1px solid #ccc', paddingRight: '8px' } },
];


 return (
    <>

      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Paper></Paper>
        <Typography variant="h3">경유 관리</Typography>
      </Grid>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
          {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
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
                {uniqueWeekCodes.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
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
          rows={passStandard}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
            Cell: MyCell,
          }}
        />
        </Paper>
        {/* <Paper
          elevation={3}
          style={{
            flexBasis: "70%", 
            padding: "16px",
          }}
        >
         

        </Paper> */}
      </div>
    </>
  );
};

export default passStandard;