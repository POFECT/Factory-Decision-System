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
      // console.log(data.response);
      // console.log(a)
      // console.log(a.processFacNum);
  
      // const processFacNumSet = (a.processFacNum);
      // const dataMap = data.response.reduce((list, { id, cdExpl, processName, firmPsFacTp }) => {
      //   // firmPsFacTp가 정의되지 않았거나 undefined일 경우 초기화
      //   list[firmPsFacTp] = list[firmPsFacTp] || {};
        
      //   // processFacNumSet이 정의되어 있다고 가정
      //   list[firmPsFacTp]['isSelected'] = processFacNumSet.includes(firmPsFacTp) ? 1 : 0;
      //   list[firmPsFacTp]['공정'] = cdExpl;
        
      //   console.log('id = ' + id + ', processName = ' + processName + ", firmPsFacTp = " + firmPsFacTp + ", isSelected = " + list[firmPsFacTp]['isSelected']);
      
      //   return list;
      // }, {});
      
  
      // const transformData = Object.entries(dataMap).map(([firmPsFacTp, item]) => ({
      //   id: firmPsFacTp,
      //   ...item,
      // }));
      // setProcessFactoryList(transformData);
      // console.log(transformData);
      setProcessFactoryList(data.response)
      data.response.map((e)=>{
          if (a.processFacNum.includes(Number(e.firmPsFacTp))) {
            console.log("배열에 포함되어 있습니다.");
          } else {
            console.log("배열에 포함되어 있지 않습니다.");
          }
      })     
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
                  padding:"5px"
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
            <TableRow align="right">
              <TableCell style={{padding:0, margin:0}}> 
                <Button size="small" type="submit" variant="contained">
                저장
              </Button>
              </TableCell>
              <TableCell style={{padding:0,margin:0}}>
              <Button size="small" type="submit" variant="contained" onClick={()=>{openFun(false)}}>
                닫기
              </Button>
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
                <TableCell>
                  <Checkbox
                    checked={
                      a.processFacNum.includes(Number(e.firmPsFacTp))?true:false
                    }
                  />
                </TableCell>
                <TableCell
                  align="center" 
                  style={{width:"20%"}}>{e.cdExpl}
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </>
  );
}

export default possibleDetail;