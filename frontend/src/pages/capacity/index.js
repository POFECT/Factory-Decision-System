import "react-datasheet-grid/dist/style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie, Radar } from "react-chartjs-2";
import RadarChart from './chart.js';
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import ModalTest from "./modal-test";
import React, {
  useEffect,
  useState,
} from "react";
import CapacityStandardApi from "src/api/CapacityApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

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

const CapacityMgt = () => {

  // 능력
  const [capacity, setCapacity] = useState([]);
  
  const [labels, setLabels] = useState([]);

  // 출강주
  const [weekList, setWeekList] = useState({
    list: [],
    select: "",
  });

  useEffect(() => {
    CapacityStandardApi.getCapacityListByWeek((data) => {
      setCapacity(data.response);
    });

    CapacityStandardApi.getWeek("H", ["D", "E"], (data) => {
      const list = data.response;
      const select = list[0];
      setWeekList((prev) => {
        return { ...prev, list, select };
      });

    
    });
  
  }, []);

  const handleSearch = () => {
  console.log("Selected week:", weekList.select);

  CapacityStandardApi.getCapacityListByWeek(weekList.select, (data) => {
    setCapacity(data.response);
  });
};

 console.log(weekList);

  
  console.log(capacity[0])
  console.log(capacity[0]?.processCd);
  console.log(capacity[0]?.processCd);
  console.log(capacity[0]?.firmPsfac_tp);

//   useEffect(() => {
//   const calculatedData = capacity.map((item) => {
//     const remainingQty = `${item.faAdjustmentWgt - item.progressQty}`;
//     return { ...item, remainingQty };
//   });
//    console.log("*", calculatedData); 

//   setRemainingQtyData(calculatedData);
// }, [capacity]);


  const options = {
    plugins: {
      title: {
        display: true,
        text: "부하",
      },
    },
  };
  const inputStatusChartData = {
    labels: labels,
    datasets: [
      {
        label: "공장1",
        data: capacity,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "공장2",
        data: capacity,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      }, {
        label: "공장3",
        data: capacity,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  // 

  //컬럼
  const columns = [
    { field: "processName", rowspan: "rowspan", headerName: "공정", width: 90, headerAlign: 'center', },
    { field: "firmPsFacTp", headerName: "공장", width: 70, headerAlign: 'center', },
    { field: "planQty", headerName: "능력량", width: 90, headerAlign: 'center', },
    { field: "faAdjustmentWgt", headerName: "조정량", width: 90, editable: true, headerAlign: 'center', },
    { field: "progressQty", headerName: "투입량", width: 90, headerAlign: 'center', },
    { field: "remainQty", headerName: "잔여량", width: 90, headerAlign: 'center', },

  ];

  
  return (

    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Card></Card>
        <Typography variant="h3">투입 능력 관리</Typography>
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
            }}>
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
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1 }}
            style={{
              paddingTop: 10,
              paddingBottom: 20,
              marginRight: 10,
            }}>
           <InputLabel id="label3" style={{ paddingTop: 10 }}>
              출강주
            </InputLabel>
            <Select
              labelId="출강주"
              id="demo-multiple-name"
              value={weekList.select}
              input={<OutlinedInput label="출강주" />}
              onChange={(e) => {
                setWeekList(
                  Object.assign({}, weekList, {
                    select: e.target.value,
                  })
                );
              }}
              style={{ height: 40 }}
            >
              {weekList.list.map((code, idx) => {
                return (
                  <MenuItem key={idx} value={code}>
                    {code}
                    
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button size="small" type="submit" variant="contained" onClick={handleSearch}>
            조회
          </Button>
          <Button size="small" type="submit" variant="contained">
            저장
          </Button>
          <Button size="small" type="submit" variant="contained">
            Excel
          </Button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Card
          elevation={3}
          style={{
            flexBasis: "calc(70% - 16px)",
            marginRight: "16px",
            padding: "16px",
          }}
        >
         

          <Box
            sx={{
              height: "100%",
              width: "100%",
              marginBottom: "20px",
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

              "& .custom-data-grid .MuiDataGrid-root": {
                paddingBottom: "0px",
              },
            }}
          >
            <DataGrid
              className="custom-data-grid"
              disableRowSelectionOnClick
              rows={capacity}
              columns={columns}
              onCellClick={(e) => {
                console.log(e);
              }}
              components={{
                Toolbar: GridToolbar,
                Cell: MyCell,
              }}
              rowHeight={31}

            />

          </Box>
        </Card>
        <Card
          elevation={3}
          style={{
            flexBasis: "70%",
            padding: "16px",
          }}
        >
          <Typography variant="h6">Chart</Typography>
         
          <Grid item xs={4} sx={{ paddingBottom: 4 }}>
            <Typography variant="h5">공장 부하 현황 </Typography>

            <Bar
              options={options}
              data={inputStatusChartData}
              style={{ width: "100%", height: "80%" }}
            />
            <RadarChart />

          </Grid>

          {/* <ul>
  {capacity.map((item) => (
    <li key={item.id}>
      ID: {item.id}, Company Code: {item.gcsCompCode}, Mill Code: {item.millCd}, ...
    </li>
  ))}
</ul> */}

          {/* <ul>
  {week.map((item) => (
    <li key={item.id}>
      ID: {item.id}, WEek Code: {item.ordThwTapWekCd}, Mill Code: {item.millCd}, ...
    </li>
  ))}
</ul> */}
        </Card>
      </div>

    </>
  );
};

export default CapacityMgt;