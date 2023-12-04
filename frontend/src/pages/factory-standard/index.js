import { React, useState, useEffect } from "react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";

import "react-datasheet-grid/dist/style.css";
import { Grid, Typography, Button, Select, MenuItem, FormControl, InputLabel, OutlinedInput, } from "@mui/material";
import FactoryStandardApi from "src/api/FactoryStandardApi";

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
// const axios = require('axios');
// const GetPos = axios.get('http://localhost:8080/api/factory-standard/getPossibleAll')
//   .then(function (response) {
//     // 성공 핸들링
//     console.log(response);
//   })
//   .catch(function (error) {
//     // 에러 핸들링
//     console.log(error);
//   })
//   .finally(function () {
//     // 항상 실행되는 영역
//   });

// console.log(GetPos);
const Capacity = () => {
  /* Data */
  const [possibleList,setPossibleList]=useState([]);//가통리스트
  const [confirmList,setConfirmList]=useState([]);//확통리스트

  useEffect(()=>{
    FactoryStandardApi.getList((data)=>{
      console.log(data);
      setPossibleList(data.response);

      if(possibleList.length!=0){
        setPossibleList(possibleList[0].id);
      }
    });
  },[]);

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
    <div>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">가능통과공장/확정통과공장 코드</Typography>
      </Grid>
      <div>
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
                console.log(e);
              }}
              style={{ height: 40 }}
            >
              <MenuItem value="T">포항</MenuItem>
              <MenuItem value="K">광양</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1 }}
            style={{
              paddingTop: 10,
              paddingBottom: 20,
              marginRight: 10,
            }}
          >
            <InputLabel id="label2" style={{ paddingTop: 10 }}>
              품종
            </InputLabel>

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
          <FormControl
            sx={{ m: 1 }}
            style={{
              paddingTop: 10,
              paddingBottom: 20,
              marginRight: 10,
            }}
          >
            <InputLabel id="label3" style={{ paddingTop: 10 }}>
              출강주
            </InputLabel>
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
          </FormControl>
        </div>
        <div>
          <Button size="small" type="submit" variant="contained">
            대상 조회
          </Button>
          <Button size="small" type="submit" variant="contained">
            설계
          </Button>
          <Button size="small" type="submit" variant="contained">
            확정 처리
          </Button>
          <Button size="small" type="submit" variant="contained">
            Excel
          </Button>
        </div>
      </div>
      <div style={{height:400}}>
      <DataGrid
        // experimentalFeatures={{ columnGrouping: true }}
        //checkboxSelection
        disableRowSelectionOnClick
        rows={possibleList}
        columns={columns}
        onCellClick={(e) => {
          setPossibleList(e.row.id);
          console.log(e);
        }}
        slots={{
          cell: MyCell,
        }}
      />
      </div>
    </div>
  );
};

export default Capacity;
