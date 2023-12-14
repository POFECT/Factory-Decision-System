import React, { useEffect, useState } from 'react';
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import { Grid, Typography, Button, Select, MenuItem, FormControl, 
  InputLabel, OutlinedInput, accordionActionsClasses, Card,Box,
  Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Checkbox } 
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
  const isSelected=2;
  useEffect(() => {
    FactoryStandardApi.getPossiblePopper(a.processCd, (data) => {
      setProcessFactoryList(data.response);
    }, []);
  }, []);

  const processColumn = [
    { field:'isSelected', headerName:isSelected, hidden:true},
    { field: "공정",headerName:processName, width:160, type:'text',alignItems:'left',headerAlign: "left"},
  ]
  return (
    <>
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  width: "100%",
                  backgroundColor: "#05507d",
                  color: "white",
                  fontSize:"20px",
                  padding:"10px"
                }}
              >
                코드상세
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  width: "40%",
                  color: "#05507d",
                  background:"#F5F9FF",
                  fontSize:"15px",
                  padding:"10px"
                }}
              >
                Code
              </TableCell>
              <TableCell
                align="center"
                style={{
                  width: "70%",
                  color: "#05507d",
                  background:"#F5F9FF",
                  fontSize:"15px",
                  padding:"10px"
                }}
              >
                {processName}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableBody>
        {
          processFactoryList.map((e)=>{
            return(
              <TableRow key={e.id}>
                <TableCell style={{width:"30%"}}>
                  {e.processCd}
                </TableCell>
                <TableCell padding="checkbox" style={{width:"20%"}}>
                  <Checkbox
                    checked={
                      a.processFacNum.includes(Number(e.firmPsFacTp))?true:false
                    }                                                                                    
                    style={{margin:0,padding:0}}
                  />
                </TableCell>
                <TableCell
                  align="center" 
                  style={{width:"35%"}}>{e.cdExpl}
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow align="right" style={{width:"400px"}}>
              <TableCell style={{padding:0, margin:0}}> 
                <Button size="small" type="submit" variant="contained" style={{ backgroundColor: "#0A5380",color:"white" }}>
                저장
              </Button>
              </TableCell>
              <TableCell style={{padding:0,margin:0}}>
              <Button size="small" type="submit" variant="contained" style={{ backgroundColor: "#BE2E22",color:"white" }} onClick={()=>{openFun(false)}}>
                X
              </Button>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
}

export default possibleDetail;