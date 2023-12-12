import { React, useState, useEffect } from "react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import PossibleDetail from "./possible-detail";
import PassModal from './pass-modal';

import "react-datasheet-grid/dist/style.css";
import { Grid, Typography, 
          Button, Select, MenuItem, FormControl, 
          InputLabel, OutlinedInput,
          Card, Box, Dialog,
          DialogTitle,DialogContent,
          DialogContentText,DialogActions } from "@mui/material";
import FactoryStandardApi from "src/api/FactoryStandardApi";


function MyCell(props) {
  let style = {
    minWidth: props.width,
    maxWidth: props.width,
    minHeight: props.height,
    maxHeight: props.height === "auto" ? "none" : props.height,
    ...props.style,
    //중앙배열
    display: "flex",
    alignItems: "center",
    headerAlign: 'center',
    justifyContent: "center",
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

const Capacity = () => {
  /* Data */
  const [possibleList,setPossibleList]=useState([]);//가통리스트
  const [confirmList,setConfirmList]=useState([]);//확통리스트
  const [millCd,setMillCd]=useState([]);//소구분
  const [open, setOpen] = useState(false); //가통Popper오픈
  const [anchorEl, setAnchorEl] = useState(null);//Popper
  const [placement, setPlacement] = useState();//Popper위치
  const [openPassStandard, setOpenPassStandard] = useState(false);

  const [a,setA] = useState({
    processCd:null,
    processFacNum:null
  })
  const passClick = () => {
    setOpenPassStandard(true);
  };

  const passClose = () => {
    setOpenPassStandard(false);
  };
  const openFun= (check)=>{
    setOpen(check)
  }
  useEffect(() => {
    
    FactoryStandardApi.getPossibleList((data) => {
      const dataMap = data.response.reduce((list, { btiPosbPsFacTp, processCd, feasibleRoutingGroup }) => {
        list[btiPosbPsFacTp] = list[btiPosbPsFacTp]||{};
        list[btiPosbPsFacTp][processCd] = feasibleRoutingGroup;
        return list;
      }, {});
 
      const possibleBtiPosbPsFacTpValues = Array.from(
        { length: Math.max(...Object.keys(dataMap).map(Number)) },
        (_, index) => String(index + 1).padStart(2, '0')
      );

      // const transformData = Object.entries(dataMap).map(([code, processCd]) => ({
      //   id: code,
      //   code,
      //   ...processCd,
      // }));
      const transformData = possibleBtiPosbPsFacTpValues.map((code) => ({
        id: code,
        code,
        ...(dataMap[code] || {}), // Use an empty object if the key is missing
      }));
      
      setPossibleList(transformData);
    }, []);

    FactoryStandardApi.getCommonList((data) => {
      const dataMap = data.response.reduce((list, { cdExpl,firmPsFacTp, id,lastUpdate, processCd }) => {
        //console.log(firmPsFacTp+", "+processCd+", "+cdExpl)
        list[firmPsFacTp] = list[firmPsFacTp] || {};
        list[firmPsFacTp][processCd] = cdExpl;
        return list;
      }, {});

      const transformData = Object.entries(dataMap).map(([code, processCd]) => ({
        id: code,
        code,
        ...processCd,
      }));

      setConfirmList(transformData);
    }, []);
  },[]);
  //가통 컬럼
  const possibleColumns = [
    { field: "code",headerName:"Code", width:150, headerAlign: "center"},
    { field: "10", headerName: "제강", width:150, headerAlign: "center"},
    { field: "20", headerName: "열연", width:150, headerAlign: "center"},
    { field: "30", headerName: "열연정정", width:150,  headerAlign: "center"},
    { field: "40", headerName: "냉간압연", width:150,  headerAlign: "center"},
    { field: "50", headerName: "1차소둔", width:150,  headerAlign: "center"},
    { field: "60", headerName: "2차소둔", width:150,  headerAlign: "center"},
    { field: "70", headerName: "도금", width:150, headerAlign: "center"},
    { field: "80", headerName: "정정", width:150, headerAlign: "center"},
  ];

  //확통 컬럼
  const confirmColumns=[
    { field: "code",headerName:"Code", width:150, headerAlign: "center"   },
    { field: "10", headerName: "제강", width:150, headerAlign: "center"    },
    { field: "20", headerName: "열연", width:150, headerAlign: "center"     },
    { field: "30", headerName: "열연정정", width:150,headerAlign: "center"  },
    { field: "40", headerName: "냉간압연", width:150,headerAlign: "center"  },
    { field: "50", headerName: "1차소둔", width:150, headerAlign: "center"  },
    { field: "60", headerName: "2차소둔", width:150, headerAlign: "center"  },
    { field: "70", headerName: "도금", width:150, headerAlign: "center"     },
    { field: "80", headerName: "정정", width:150, headerAlign: "center"     },
  ]
  let pPopupProcessCd=null;
  let feasibleArray = null;

  const openPossibleOne=(e)=>{
    pPopupProcessCd = e.currentTarget.dataset.field;
    const code = e.currentTarget.parentElement.dataset.id;
    const feasibleRoutingGroup = e.currentTarget.querySelector('.MuiDataGrid-cellContent').title;
    feasibleArray=String(feasibleRoutingGroup).split('').map(Number);
    console.log('code = '+code+", pPopupProcessCd = "+pPopupProcessCd);
    console.log('feasibleArray = '+feasibleArray)

    setA({
      ...a,
      processCd: e.currentTarget.dataset.field,  
      processFacNum: String(feasibleRoutingGroup).split('').map(Number) 
    });

    setAnchorEl(e.currentTarget);
    setOpen((previousOpen)=>!previousOpen);

    if(pPopupProcessCd==='code'){
      setOpen(false);
    }
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
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
          </Select>
        </FormControl>
      </div>
        <div>
          <Button size="small" type="submit" variant="contained" onClick={passClick}>
          경유공정
          </Button>
          <PassModal open={openPassStandard} handleClose={passClose} />
          <Button size="small" type="submit" variant="contained">
            조회
          </Button>
          <Button size="small" type="submit" variant="contained">
            Excel
          </Button>
        </div>
      </div>
      <div style={{height:"auto", marginBottom:20}}>
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
        //disableRowSelectionOnClick
        rows={possibleList}
        columns={possibleColumns}
        slotProps={{
          cell:{
            onDoubleClick:openPossibleOne,
          },
        }}
        slots={{
          cell: MyCell,
        }}
        hideFooter = {true}
        
      /></Box>
      </Card>
      
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              {/* 가능통과공장 팝업 */}
              <Typography sx={{p:4,backgroundColor:'#f4f5fa'}}>
                <PossibleDetail  a={a} openFun={openFun}/>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
                {/*isPossibleModal && <ModalTest onClose={() => setPossibleModalOpen(false)}/>*/}

      </div>
      <div style={{height:250}}>
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
        //disableRowSelectionOnClick
        rows={confirmList}
        columns={confirmColumns}
        hideFooter = {true}last
        slots={{
          cell: MyCell,
        }}
      /></Box>
      </Card>
      </div>
    </div>
  );
};

export default Capacity;