import "react-datasheet-grid/dist/style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Notify } from "src/notifix/notiflix-notify-aio";

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
import { useRouter } from "next/router";
import CapacityStandardApi from "src/pages/api/pofect/CapacityApi";
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
  const router = useRouter();

  // 능력
  const [capacity, setCapacity] = useState([]);
  const [labels, setLabels] = useState([]);

  const [originalCapacity, setoriginalCapacity] = useState([]);//변경 확인을 위한 capacity
  // 출강주
  const [weekList, setWeekList] = useState({
    list: [],
    select: "",
  });

  // Alert
  const [showAlert, setShowAlert] = useState(false);

  // 로딩
  const [loading, setLoading] = useState(true);

  //Update
  const handleCellEditCommit = (params) => {
    // console.log(params);
    const updatedList = capacity.map((item) =>
      item.id === params.id ? params : item
    );

    setCapacity(updatedList);
  };

  const capacityApi = () => {
    CapacityStandardApi.getCapacityListByWeek(weekList, (data) => {
      setCapacity(data.response);
      setoriginalCapacity(data.response); // 원래 상태를 저장(변경여부확인용)

    });
  };

  useEffect(() => {
    setLoading(true);

    CapacityStandardApi.getWeek("H", ["D", "E"], (data) => {
      const list = data.response;

      const select = null;
      if (router.query.week === undefined) select = list[0];
      else select = router.query.week;

      // console.log("select ", select);
      setWeekList((prev) => {
        return { ...prev, list, select };
      });

      CapacityStandardApi.getCapacityListByWeek(select, (data) => {
        setCapacity(data.response);
        setLoading(false);
        setoriginalCapacity(data.response); // 원래 상태를 저장(변경여부확인용)

      });
    });
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleAccept = () => {
    const capacityData = {
      ordRcpTapWekCd: weekList.select,
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
    // console.log("Selected week:", weekList.select);
    // capacityApi();

    const data = await new Promise((resolve, reject) => {
      CapacityStandardApi.getCapacityListByWeek(weekList.select, (data) => {
        resolve(data);
      });
    });

    setCapacity(data.response);
    setoriginalCapacity(data.response);
  };

  const handleInsert = () => {
    setShowAlert(true);
  };
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
      type: "number",
      valueFormatter: (params) => Math.max(0, params.value),
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

    const isModified = JSON.stringify(capacity) !== JSON.stringify(originalCapacity);
    if(!isModified) {
      Notify.failure("변경된 값이 없습니다.");

    } else {
      capacity.map((item) => {
        if (isNaN(item.faAdjustmentWgt)) {
          Notify.failure("공정 조정량은 숫자만 가능합니다.");
          updateFlag = true;
        } else if (
            item.faAdjustmentWgt === undefined ||
            item.faAdjustmentWgt === null ||
            item.faAdjustmentWgt === ""
        ) {
          Notify.failure("공정 조정량이 비어있습니다.");
          updateFlag = true;
        }
      });

      if (updateFlag) {
        // alert(result);
      } else if (!updateFlag) {
        Report.warning(
            "",
            "조정량 수정 값을 저장하시겠습니까?",
            "확인",
            () => {
              CapacityStandardApi.updateSave(capacity, (data) => {
                Notify.success("저장되었습니다.");
                // capacityApi();
                handleSearch();
                setoriginalCapacity(data.response); // 원래 상태를 저장(변경여부확인용)

              });
            },
            "취소",
            {
              backOverlayClickToClose: true,
            }
        );
      }
    }
  };

  //excel
  // 한글 헤더
  const koreanHeaderMap = {
    id: "code",
    processName: "공정",
    firmPsFacTp: "공장",
    planQty: "능력량",
    faAdjustmentWgt: "조정량",
    progressQty: "투입량",
    remainQty: "잔여량",
    // "rowSpan": ""
  };

  const fileType =
    "application/vnd.openxmlformats-officedcoument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    // 헤더 순서
    const originalHeader = [
      "id",
      "processName",
      "firmPsFacTp",
      "planQty",
      "faAdjustmentWgt",
      "progressQty",
      "remainQty",
    ];

    // possibleList의 id를 기준으로 정렬
    const sortedCapacityList = [...capacity].sort((a, b) => a.id - b.id);

    // 데이터를 헤더와 일치하는 형식으로 변환
    const excelData = sortedCapacityList.map((item) =>
      originalHeader.map((key) => item[key])
    );

    // 헤더를 한글로 변경
    const koreanHeader = originalHeader.map(
      (englishKey) => koreanHeaderMap[englishKey] || englishKey
    );

    // 헤더와 데이터를 함께 전달하여 엑셀 생성
    const ws = XLSX.utils.aoa_to_sheet([koreanHeader, ...excelData]);
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
                // console.log(e);
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
          {!loading && capacity.length === 0 ? (
            <Button
              size="small"
              type="submit"
              variant="contained"
              onClick={handleInsert}
              style={{ backgroundColor: "darkred" }}
            >
              추가
            </Button>
          ) : (
            <></>
          )}
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
            <Typography variant="h5"> 공장 부하 예상 현황 </Typography>
            {loading && <div>Loading...</div>}

            {!loading && capacity.length === 0 ? (
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
      {showAlert &&
        Report.warning(
          " ",
          "<div style='text-align: center;'>" +
            "현재 [" +
            weekList.select +
            "] 출강 주의 " +
            "<br />" +
            "투입 능력 관리 데이터가 없습니다." +
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
        )}
    </>
  );
};

export default CapacityMgt;
