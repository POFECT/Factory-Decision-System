import { React, useState, useEffect } from "react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";

import "react-datasheet-grid/dist/style.css";
import { Grid, Typography, Button, Select, MenuItem, FormControl, InputLabel, OutlinedInput, } from "@mui/material";
import FactoryStandardApi from "src/api/FactoryStandardApi";

// function MyCell(props) {
//   let style = {
//     minWidth: props.width,
//     maxWidth: props.width,
//     minHeight: props.height,
//     maxHeight: props.height === "auto" ? "none" : props.height,
//     ...props.style,
//   };
//   const apiRef = useGridApiContext();
//   const row = apiRef.current.getRow(props.rowId);
//   if (row && row.rowSpan && row.rowSpan[props.column.field]) {
//     const span = row.rowSpan[props.column.field];
//     style = {
//       ...style,
//       minHeight: props.height * span,
//       maxHeight: props.height * span,
//       backgroundColor: "gray",
//       zIndex: 1,
//     };
//   }
//   return <GridCell {...props} style={style} />;
// }
const Capacity = () => {
  /* Data */
  const [possibleList,setPossibleList]=useState([]);//가통리스트
  const [confirmList,setConfirmList]=useState([]);//확통리스트
  const [millCd,setMillCd]=useState([]);//소구분
  
  useEffect(()=>{
    FactoryStandardApi.getGridList((data)=>{
      const dataMap=data.reduce((acc,[code,processCd,feasibleRoutingGroup])=>{
        acc[code]=acc[code]||{};
        acc[code][processCd]=feasibleRoutingGroup;
        return acc;
      },{});
      const transformData=Object.entries(dataMap).map(([code,processCd]) =>({ id:code,code,...processCd
    }));

    setPossibleList(transformData);

      if(possibleList.length!=0){
        //setPossibleList(possibleList[0].id);
      }
    });
  },[]);

  //가통 컬럼
  const possibleColumns = [
    { field: "code",headerName:"Code", width:120, type:'number',alignItems:'left'},
    { field: "10", headerName: "제강", width:120, type:'number' },
    { field: "20", headerName: "열연", width:120, editable: true,     type:'number'  },
    { field: "30", headerName: "열연정정", width:120, type:'number'  },
    { field: "40", headerName: "냉간압연", width:120, type:'number'  },
    { field: "50", headerName: "1차소둔", width:120, type:'number'  },
    { field: "60", headerName: "2차소둔", width:120, type:'number'  },
    { field: "70", headerName: "도금", width:120, type:'number'  },
    { field: "80", headerName: "정정", width:120, type:'number'  },
  ];

  //확통 컬럼
  const confirmColumns=[
    { field: "code",headerName:"Code", width:120, type:'number'},
    { field: "10", headerName: "제강", width:120, type:'number' },
    { field: "20", headerName: "열연", width:120, editable: true,     type:'number'  },
    { field: "30", headerName: "열연정정", width:120, type:'number'  },
    { field: "40", headerName: "냉간압연", width:120, type:'number'  },
    { field: "50", headerName: "1차소둔", width:120, type:'number'  },
    { field: "60", headerName: "2차소둔", width:120, type:'number'  },
    { field: "70", headerName: "도금", width:120, type:'number'  },
    { field: "80", headerName: "정정", width:120, type:'number'  },
  ]

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">가능통과공장/확정통과공장 코드</Typography>
      </Grid>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
      <div>
          <FormControl
            sx={{ m: 1 }}
            style={{
              paddingTop: 10,
              paddingBottom: 20,
              marginRight: 10,
            }}
          >
          <InputLabel id="label1" style={{ paddingTop: 10 }}>
            구분
          </InputLabel>
          <Select
            labelId="분류"
            id="demo-multiple-name"
            defaultValue="T"
            input={<OutlinedInput label="구분" />}
            onChange={(e) => {
              console.log(e.target.value);
              setMillCd(e.target.value);
            }}
            style={{ height: 40 }}
          >
            <MenuItem value="T">포항</MenuItem>
            <MenuItem value="K">광양</MenuItem>
          </Select>
        </FormControl>
      </div>
        <div>
          <Button size="small" type="submit" variant="contained">
            경유공정
          </Button>
          <Button size="small" type="submit" variant="contained">
            조회
          </Button>
          <Button size="small" type="submit" variant="contained">
            Excel
          </Button>
        </div>
      </div>
      <div style={{height:400, marginBottom:20}}>
      <DataGrid
        //disableRowSelectionOnClick
        rows={possibleList}
        columns={possibleColumns}
        onCellClick={(e) => {
          
          setPossibleList(e);
          console.log('소구분 : '+e);
        }}
        hideFooter = {true}
      /></div>
      <div style={{height:300}}>
      <DataGrid
        //disableRowSelectionOnClick
        rows={confirmList}
        columns={confirmColumns}
        onCellClick={(e) => {
          
          setConfirmList(e);
          console.log('소구분 : '+e);
        }}
        hideFooter = {true}
      />
      </div>
    </div>
  );
};

export default Capacity;
