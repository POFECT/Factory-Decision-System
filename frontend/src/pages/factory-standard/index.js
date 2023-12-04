import { useCallback, useState, useMemo, StrictMode } from "react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";

import "react-datasheet-grid/dist/style.css";
import { Grid, Typography } from "@mui/material";
function MyCell(props) {
  let style = {
    minWidth: props.width,
    maxWidth: props.width,
    minHeight: props.height,
    maxHeight: props.height === "auto" ? "none" : props.height,
    ...props.style,
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
const axios = require('axios');
const GetPos = axios.get('http://localhost:8080/api/factory-standard/getPossibleAll')
  .then(function (response) {
    // 성공 핸들링
    console.log(response);
  })
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
  .finally(function () {
    // 항상 실행되는 영역
  });
const GetPossibleFactoryStandard
 = fetch('http://localhost:8080/api/factory-standard/getPossibleAll')
  .then(res=>res.json())
  .then(res=>{
    if(res.success){
      console.log(res);
    }
  })

console.log(GetPos);
const Capacity = () => {
  const rows = [
    { id:1,10:"1",20:"1",30:"1",40:"1",50:"1",60:"1",70:"",80:"1" },
    { id:2,10:"2",20:"2",30:"2",40:"",50:"",60:"",70:"",80:"2" },
  ];

  const columns = [
    { field: "10", headerName: "제강", width: 100, editable: true, type:'number' },
    { field: "20", headerName: "열연", width: 100, editable: true, type:'number'  },
    { field: "30", headerName: "열연정정", width: 100, editable: true, type:'number'  },
    { field: "40", headerName: "냉간압연", width: 100, editable: true, type:'number'  },
    { field: "50", headerName: "1차소둔", width: 100, editable: true, type:'number'  },
    { field: "60", headerName: "2차소둔", width: 100, editable: true, type:'number'  },
    { field: "70", headerName: "도금", width: 100, editable: true, type:'number'  },
    { field: "80", headerName: "정정", width: 100, editable: true, type:'number'  },
  ];

  return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">가능통과공장/확정통과공장 코드</Typography>
      </Grid>
      <DataGrid
        // experimentalFeatures={{ columnGrouping: true }}
        //checkboxSelection
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        onCellClick={(e) => {
          console.log(e);
        }}
        slots={{
          cell: MyCell,
        }}
      />
    </>
  );
};

export default Capacity;
