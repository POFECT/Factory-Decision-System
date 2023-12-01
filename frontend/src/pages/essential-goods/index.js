import { useCallback, useMemo, useRef, useState } from "react";

import "react-datasheet-grid/dist/style.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeItem, TreeView } from "@mui/lab";

const EssentialGoods = () => {
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
    {
      field: "seq",
      sortable: true,
      filter: true,
      minWidth: 180,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
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
    {
      field: "공정",
      sortable: true,
      filter: true,
      cellStyle: {
        color: "rgb(110,120,55)",
        backgroundColor: "rgb(110,120,55)",
      },
    },
    { field: "가능통과공장코드", sortable: true, filter: true },
    { field: "품명", sortable: true, filter: true },
    { field: "규격", sortable: true, filter: true },
    { field: "용도", sortable: true, filter: true },
    { field: "주문두께", sortable: true, filter: true },
    { field: "주문폭", sortable: true, filter: true },
    { field: "수정자", sortable: true, filter: true },
    { field: "수정일시", sortable: true, filter: true },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  const [clickedCount, setClickedCount] = useState(0);

  const onCellClicked = (event) => {
    console.log(event);
  };

  const onCellValueChanged = useCallback(() => {
    console.log(`number of clicks is ${clickedCount}`);
  }, []);

  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const clickMenu = (e) => {
    console.log(e);
  };
  return (
    <>
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
      {/* <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId="1" label="광양" onClick={clickMenu}>
              <TreeItem nodeId="2" label="제강" />
            </TreeItem>
            <TreeItem nodeId="3" label="포항">
              <TreeItem nodeId="4" label="제강" />
              <TreeItem nodeId="5" label="열연" />
              <TreeItem nodeId="6" label="열연정정" />
              <TreeItem nodeId="7" label="PCM(APL, CRM, ZRM)" />
              <TreeItem nodeId="8" label="HGGL" />
              <TreeItem nodeId="9" label="CAL(BAF)" />
            </TreeItem>
          </TreeView>
        </Box> */}
      <div
        className="ag-theme-alpine"
        style={{
          width: "100%",
          height: "70%",
          margin: "0",
          fontFamily: "HakgyoansimWoojuR",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellClicked={onCellClicked}
          onCellValueChanged={onCellValueChanged}
          ref={gridRef}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          rowSelection={"multiple"}
        />
      </div>
    </>
  );
};

export default EssentialGoods;
