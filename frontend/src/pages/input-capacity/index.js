"use strict";
import { useCallback, useState, useMemo, StrictMode } from "react";
import { DataSheetGrid, textColumn, keyColumn } from "react-datasheet-grid";

import "react-datasheet-grid/dist/style.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Grid, Typography } from "@mui/material";
import styles from "./styles.module.css";

const rowSpan = (params) => {
  var process = params.data ? params.data.process : undefined;
  if (process === "제강" || process === "열연" || process === "열연정정") {
    return 2;
  } else if (process === "냉간압연" || process === "1차소둔") {
    return 3;
  } else if (process === "2차소둔" || process === "도금") {
    return 2;
  } else {
    return 1;
  }
};
const Capacity = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "70%", width: "80%" }), []);
  const [rowData, setRowData] = useState([
    {
      process: "제강",
      공정: "제강",
      공장: 1,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "",
      공정: "제강",
      공장: 2,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "열연",
      공정: "열연",
      공장: 1,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "",
      공정: "열연",
      공장: 2,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "열연정정",
      공정: "열연정정",
      공장: 1,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "",
      공정: "열연정정",
      공장: 2,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "냉간압연",
      공정: "냉간압연",
      공장: 1,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "",
      공정: "냉간압연",
      공장: 2,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "",
      공정: "냉간압연",
      공장: 3,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "1차소둔",
      공정: "1차소둔",
      공장: 1,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "",
      공정: "1차소둔",
      공장: 2,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "",
      공정: "1차소둔",
      공장: 3,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "2차소둔",
      공정: "2차소둔",
      공장: 1,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "",
      공정: "2차소둔",
      공장: 3,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "도금",
      공정: "도금",
      공장: 3,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "",
      공정: "도금",
      공장: 4,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
    {
      process: "정정",
      공정: "정정",
      공장: 1,
      능력량: 1020,
      조정량: 0,
      투입량: 20,
      잔여량: 1000,
    },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "process",
      width: 100,
      rowSpan: rowSpan,
      cellClassRules: {
        "cell-span":
          "value==='제강' || value==='열연' || value==='열연정전'|| value==='냉간압연'|| value==='1차소둔'|| value==='2차소둔'|| value==='도금'",
      },
    },
    { field: "공장", width: 80 },
    { field: "능력량", width: 120 },
    { field: "조정량", width: 120 },
    { field: "투입량", width: 120 },
    { field: "잔여량", width: 120 },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      width: 170,
      resizable: true,
      sortable: true,
    };
  }, []);

  const [clickedCount, setClickedCount] = useState(0);

  // // good callback, no hook, no stale data
  const onCellClicked = (event) => {
    console.log(event);
  };

  // // bad callback - stale data, dependency missing,
  // // will ALWAYS print 0
  const onCellValueChanged = useCallback(() => {
    console.log(`number of clicks is ${clickedCount}`);
  }, []);

  return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">투입 능력 관리</Typography>
      </Grid>
      <StrictMode>
        <div style={containerStyle}>
          <div
            style={{ height: "70%", width: "80%" }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              style={styles}
              rowData={rowData}
              columnDefs={columnDefs}
              onCellClicked={onCellClicked}
              //onCellValueChanged={onCellValueChanged}
              defaultColDef={defaultColDef}
              suppressRowTransform={true}
            />
          </div>
        </div>
      </StrictMode>
    </>
  );
};

export default Capacity;
