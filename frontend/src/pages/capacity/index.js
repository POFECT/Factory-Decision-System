import "react-datasheet-grid/dist/style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

//Alert
import { Alert, AlertTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";

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
import {
  DataGrid,
  GridCell,
  useGridApiContext,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";

import { Report } from "src/notifix/notiflix-report-aio";

import React, { useEffect, useState } from "react";
import CapacityStandardApi from "src/api/CapacityApi";
import MyD3Heatmap from "../../views/capacity/d3-heat";

import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
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
      backgroundColor: "#F5F9FF",
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

  // Alert
  const [showAlert, setShowAlert] = useState(false);

  //Update
  const handleCellEditCommit = (params) => {
    console.log(params);
    const updatedList = capacity.map((item) =>
      item.id === params.id ? params : item
    );

    setCapacity(updatedList);
  };

  const capacityApi = () => {
    CapacityStandardApi.getCapacityListByWeek(weekList.select, (data) => {
      setCapacity(data.response);
    });
  };

  useEffect(() => {
    CapacityStandardApi.getWeek("H", ["D", "E"], (data) => {
      const list = data.response;
      const select = list[0];
      setWeekList((prev) => {
        return { ...prev, list, select };
      });

      CapacityStandardApi.getCapacityListByWeek(select, (data) => {
        setCapacity(data.response);
      });
    });

    // setShowAlert(false);
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleAccept = () => {
    const capacityData = {
      ordRcpTapWekCd: weekList.select
    };

    CapacityStandardApi.createCapacity(capacityData)
      .then((response) => {
        CapacityStandardApi.getCapacityListByWeek(
          weekList.select,
          (newData) => {
            setCapacity(newData.response);
          }
        );
        handleCloseAlert();
      })
      .catch((error) => {
        console.error("Failed to create capacity data:", error);
      });
  };

  const handleSearch = async () => {
    console.log("Selected week:", weekList.select);
    capacityApi();

    // if (capacity.length === 0) {
    //   setShowAlert(true);
    //   // alert("데이터가 없으므로 데이터를 생성하겠습니다.");
    // } else {
    //   CapacityStandardApi.getCapacityListByWeek(weekList.select, (data) => {
    //     setCapacity(data.response);
    //   });
    // }
  };

  const handleInsert=() =>{

    setShowAlert(true);
  }
  //   console.log(" weeklist:", weekList);

  //컬럼
  const columns = [
    {
      field: "processName",
      rowspan: "rowspan",
      headerName: "공정",
      width: 115,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "firmPsFacTp",
      headerName: "공장",
      width: 65,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "planQty",
      headerName: "능력량",
      width: 110,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "faAdjustmentWgt",
      headerName: "조정량",
      width: 110,
      editable: true,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "progressQty",
      headerName: "투입량",
      width: 110,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "remainQty",
      headerName: "잔여량",
      width: 110,
      headerAlign: "center",
      sortable: false,
    },
  ];

  //update

  const updateCapacity = async () => {
    const updateFlag = false;
    let result = "다음 데이터를 확인해주세요.\n\n";

    capacity.map((item) => {
      if (isNaN(item.faAdjustmentWgt)) {
        result += item.processName + " " + item.firmPsFacTp + "공장 조정량\n";
        updateFlag = true;
      }
    });

    if (updateFlag) {
      alert(result);
      // getSizeStadards();
    } else if (!updateFlag) {
      await CapacityStandardApi.updateSave(capacity, (data) => {
        alert("저장되었습니다.");
        capacityApi();
      });
    }
  };

  //excel
  const fileType =
    "application/vnd.openxmlformats-officedcoument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(capacity);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "투입 능력 산정" + fileExtension);
  };

  return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Card></Card>
        <Typography variant="h4">투입 능력 관리</Typography>
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
            }}
          >
            <InputLabel id="label3" style={{ paddingTop: 10 }}>
              출강주
            </InputLabel>
            <Select
              labelId="출강주"
              id="demo-multiple-name"
              value={weekList.select}
              defaultValue={0}
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
          {capacity.length === 0 ?(
            <Button
              size="small"
              type="submit"
              variant="contained"
              onClick={handleInsert}
              style={{backgroundColor: "#0A5380"}}
          >
            추가
          </Button>):(<></>)}
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={handleSearch}
            style={{ backgroundColor: "#E29E21" }}
          >
            조회
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={updateCapacity}
            style={{ backgroundColor: "#0A5380" }}
          >
            저장
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={exportToExcel}
            style={{ backgroundColor: "darkgreen" }}
          >
            Excel
          </Button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Card
          elevation={3}
          style={{
            flexBasis: "50%",
            marginRight: "16px",
            padding: "16px",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{ paddingBottom: 5, paddingTop: 3, paddingLeft: 3 }}
          >
            <Typography variant="h5"> 공정별 능력 관리 </Typography>
          </Grid>

          <Box
            sx={{
              height: "100",
              width: "94.5%",
              marginBottom: "20px",
              marginLeft: "15px",
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

              "& .custom-data-grid .MuiDataGrid-columnHeadersInner": {
                backgroundColor: "#F5F9FF",
              },
              "& .custom-data-grid .MuiDataGrid-sortIcon": {
                display: "none",
              },
            }}
          >
            {capacity.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <Typography variant="h6">데이터가 없습니다.</Typography>
              </div>
            ) : (
              <DataGrid
                className="custom-data-grid"
                disableRowSelectionOnClick
                rows={capacity}
                columns={columns}
                processRowUpdate={(newVal) => {
                  handleCellEditCommit(newVal);
                  return newVal;
                }}
                components={{
                  Cell: MyCell,
                }}
                rowHeight={40}
                hideFooterPagination={true}
                hideFooter={true}
                disableColumnReorder
              />
            )}
          </Box>
        </Card>
        <Card
          elevation={3}
          style={{
            flexBasis: "50%",
            padding: "16px",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{ paddingBottom: 10, paddingTop: 3, paddingLeft: 3 }}
          >
            <Typography variant="h5"> 공장 부하 현황 </Typography>

            {capacity.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  marginTop: "20px",
                }}
              >
                <Typography variant="h6">데이터가 없습니다.</Typography>
              </div>
            ) : (
              <MyD3Heatmap capacity={capacity} />
            )}
          </Grid>
        </Card>
      </div>

      {/* alert */}
      {showAlert && (
        Report.warning(
        " ",
        "<div style='text-align: center;'>" +
          "현재 [" + weekList.select + "] 출강 주의 " +
          "<br />" + "투입 능력 관리 데이터가 없습니다." +
          "<br />" +
          "<br />" +

          "데이터를 추가 하시겠습니까?" +
        "</div>",
        "확인",
          () => {
            handleAccept();
          },
          "취소",
          () => {
            handleCloseAlert();
          },
          {
            backOverlayClickToClose: true,
            cssAnimationStyle: "zoom",
                cssAnimationDuration: 400,


          }
        )

      )}
    </>
  );
};

export default CapacityMgt;
