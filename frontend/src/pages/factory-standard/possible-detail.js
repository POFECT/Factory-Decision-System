import React, { useEffect, useState } from 'react';
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import { Grid, Typography, Button, Select, MenuItem, FormControl, 
  InputLabel, OutlinedInput, accordionActionsClasses, Card,Box,
  Table, TableBody, TableCell, TableContainer, TableRow, TableHead } 
from "@mui/material";
import FactoryStandardApi from 'src/api/FactoryStandardApi';

const possibleDetail =({a,openFun})=>{
  let processName=null;
  if(a.processCd==='10'){
    processName='제강'
  }else if(a.processCd==='20'){
    processName='열연'
  }else if(a.processCd==='30'){
    processName='열연정정'
  }else if(a.processCd==='40'){
    processName='냉간압연'
  }else if(a.processCd==='50'){
    processName='1차소둔'
  }else if(a.processCd==='60'){
    processName='2차소둔'
  }else if(a.processCd==='70'){
    processName='도금'
  }else if(a.processCd==='80'){
    processName='정정'
  }
  const [processFactoryList,setProcessFactoryList]=useState([]);//공정별 리스트
  
  useEffect(()=>{
    FactoryStandardApi.getPossiblePopper(a.processCd,(data)=>{
      console.log(data.response);
      const dataMap=data.response.reduce((list,{id,cdExpl,processName,firmPsFacTp})=>{
        console.log('id = '+id+', processName = '+processName+", firmPsFacTp = "+firmPsFacTp)
        if (!list[firmPsFacTp]) {
          list[firmPsFacTp] = {};
        }
        list[firmPsFacTp]['isSelected'] = Math.random() < 0.5;
        list[firmPsFacTp]['공정']=cdExpl;
        return list;
      },{});

      const transformData=Object.entries(dataMap).map(([firmPsFacTp,item])=>({
        id:firmPsFacTp,
        ...item,
      }));
      setProcessFactoryList(transformData);
      console.log(transformData)
    })
  },[]);

  const processColumn = [
    { field: "공정",headerName:processName, width:160, type:'text',alignItems:'left',headerAlign: "left"},
  ]
  return (
    <>
      {/*<div style={{backgroundColor:"#05507d",color:"white",padding:"0px",fontSize:"20px"}}>코드상세</div>
      <div>
          <Button size="small" type="submit" variant="contained">
            저장
          </Button>
          <Button size="small" type="submit" variant="contained" onClick={()=>{openFun(false)}}>
            닫기
          </Button>

      </div>
      <div>
      <Card>
        <Box
          sx={{
            height: "inherit",
            width: "100%",
            "& .custom-data-grid .MuiDataGrid-columnsContainer, & .custom-data-grid .MuiDataGrid-cell":
              {
                borderBottom: "1px solid rgba(225, 234, 239, 1)",
                borderRight: "1px solid rgba(225, 234, 239, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            "& .custom-data-grid .MuiDataGrid-columnHeader": {
              cursor: "pointer",
              borderBottom: "1px solid rgba(225, 234, 239, 1)",
              borderRight: "1px solid rgba(225, 234, 239, 1)",
            },
            "& .custom-data-grid .MuiDataGrid-columnHeader--filledGroup  .MuiDataGrid-columnHeaderTitleContainer":
              {
                borderBottomStyle: "none",
              },
          }}
        >  
        <DataGrid
          checkboxSelection
          rows={processFactoryList}
          columns={processColumn}
          hideFooter = {true}
        />
        </Box>
      </Card>
      </div>*/}
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  width: "100%",
                  backgroundColor: "#05507d",
                  color: "white",
                  fontSize:"20px"
                }}
              >
                코드상세
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
}

export default possibleDetail;