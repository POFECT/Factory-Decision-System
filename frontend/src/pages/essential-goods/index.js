import { useCallback, useState } from "react";
import { DataSheetGrid, textColumn, keyColumn } from "react-datasheet-grid";

import "react-datasheet-grid/dist/style.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Grid, Typography } from "@mui/material";
const EssentialGoods = () => {
  const [data, setData] = useState([
    { seq: 1, firstName: "2024-01-13", lastName: "Musk" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
    { seq: 2, firstName: "2024-01-13", lastName: "Bezos" },
  ]);

  const columns = [
    { ...keyColumn("seq", textColumn), title: "seq" },
    { ...keyColumn("firstName", textColumn), title: "해지일자" },
    { ...keyColumn("lastName", textColumn), title: "공정" },
    { ...keyColumn("a", textColumn), title: "가능통과공정코드" },
    { ...keyColumn("b", textColumn), title: "품종" },
    { ...keyColumn("c", textColumn), title: "품명" },
    { ...keyColumn("d", textColumn), title: "규격" },
    { ...keyColumn("e", textColumn), title: "용도" },
    { ...keyColumn("f", textColumn), title: "주문두께" },
    { ...keyColumn("g", textColumn), title: "수정자" },
    { ...keyColumn("h", textColumn), title: "수정일시" },
  ];

  const [rowData] = useState([
    { brand: "칠성", name: "사이다", capacity: 500, price: 2000 },
    { brand: "칠성", name: "사이다", capacity: 1000, price: 3000 },
    { brand: "칠성", name: "제로사이다", capacity: 360, price: 1000 },
    { brand: "펩시", name: "콜라", capacity: 500, price: 1500 },
    { brand: "펩시", name: "제로콜라", capacity: 500, price: 1500 },
    { brand: "코카콜라", name: "콜라", capacity: 500, price: 1800 },
    { brand: "코카콜라", name: "제로콜라", capacity: 500, price: 2000 },
    { brand: "해태", name: "갈아만든배", capacity: 360, price: 1500 },
  ]);

  const [columnDefs] = useState([
    { field: "brand", sortable: true, filter: true },
    { field: "name", sortable: true, filter: true },
    { field: "capacity", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
  ]);

  const [clickedCount, setClickedCount] = useState(0);

  // good callback, no hook, no stale data
  const onCellClicked = (event) => {
    console.log(event);
  };

  // bad callback - stale data, dependency missing,
  // will ALWAYS print 0
  const onCellValueChanged = useCallback(() => {
    console.log(`number of clicks is ${clickedCount}`);
  }, []);

  return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">필수재 기준</Typography>
      </Grid>
      <DataSheetGrid value={data} onChange={setData} columns={columns} />
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "30%", margin: "0 auto" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellClicked={onCellClicked}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </>
  );
};

export default EssentialGoods;
