import React from 'react';
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import { Grid, Typography, Button, Select, MenuItem, FormControl, InputLabel, OutlinedInput, accordionActionsClasses, Card,Box } from "@mui/material";

const rows=[
  { id:1,process:'1제강',check:true},
  { id:2,process:'2제강'}
]
const processColumn = [
  { field: "process",headerName:"공정이름", width:160, type:'text',alignItems:'center'},
]

function possibleDetail(a) {
  console.log(a)
  return (
    <>
      <div style={{backgroundColor:"#05507d",color:"white",padding:"0px",fontSize:"20px"}}>코드상세</div>
      <div>
          <Button size="small" type="submit" variant="contained">
            저장
          </Button>
          <Button size="small" type="submit" variant="contained">
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
          rows={rows}
          columns={processColumn}
          hideFooter = {true}
        />
        </Box>
      </Card>
      </div>
    </>
  );
}

export default possibleDetail;