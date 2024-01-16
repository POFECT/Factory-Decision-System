import { React, useState, useEffect } from "react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";
import MainApi from "src/pages/api/MainApi";
import Card from "@mui/material/Card";
import { Notify } from "src/notifix/notiflix-notify-aio";

import CapacityDetail from "../../views/main-capacity/capacity-detail";

import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CapacityModal from "src/views/main-capacity/capacity-modal";
import withAuth from "src/pages/api/auth/withAuth";

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

const MainCapacity = ({ userData }) => {
  /* 데이터 */

  const osMainStatusCd = "H";

  // 주문
  const [orderList, setOrderList] = useState({
    list: [],
    order: null,
  });
  // 품종
  const [codeNameList, setCodeNameList] = useState({
    list: [],
    select: "",
  });
  // 출강주
  const [weekList, setWeekList] = useState({
    list: [],
    select: "",
  });
  // Flag
  const [flag, setFlag] = useState(["A", "B", "C"]);
  // Modal Flag
  const [modal, setModal] = useState({ open: false, time: 0 });

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    getOrders(null, null);

    MainApi.getCodeNameList((data) => {
      const list = data.response;
      // const select = list[0].cdNm;
      setCodeNameList((prev) => {
        return { ...prev, list };
      });
    });
    MainApi.getWeekList("H", ["A", "B", "C"], (data) => {
      const list = data.response;
      // const select = list[0];
      setWeekList((prev) => {
        return { ...prev, list };
      });
    });
  }, []);

  const getOrders = (kind, week) => {
    if (kind == 0) kind = null;
    if (week == 0) week = null;
    MainApi.getOrderList(kind, week, osMainStatusCd, flag, (data) => {
      const list = data.response;
      const order = list[0];
      setOrderList((prev) => {
        return { ...prev, list, order };
      });
    });
  };

  const updateConfirmFlag = async () => {
    const selectedIdx = new Set(rowSelectionModel);
    const rows = orderList.list.filter((row) => selectedIdx.has(row.id));
    // console.log(rows);

    // 선택한 행이 없을 경우
    if (rows.length == 0) {
      Notify.failure("주문을 선택해주세요");
      return;
    }

    /** 정상설계 되지 않은 주문이 있다면 실패 */
    for (const row of rows) {
      if (row.faConfirmFlag != "B") {
        Notify.failure("정상 설계되지 않은 주문이 존재합니다.");
        return;
      }
    }

    /** FLAG 변경할 주문들의 ID 추출 */
    const selectedIdList = rows.map((selectedRow) => {
      const selectedId = orderList.list.find(
        (row) => row.id === selectedRow.id
      );
      return selectedId.id;
    });

    MainApi.updateFlag(userData.name, "D", selectedIdList, (data) => {
      const cnt = data.response;
      Notify.success(cnt + "건 설계 확정되었습니다.");
      setRowSelectionModel([]);

      /** 리스트 update */
      getOrders(codeNameList.select, weekList.select);
    });
  };

  const possibleDecision = async () => {
    const selectedIdx = new Set(rowSelectionModel);
    const rows = orderList.list.filter((row) => selectedIdx.has(row.id));

    // 선택한 행이 없을 경우
    if (rows.length == 0) {
      Notify.failure("주문을 선택해주세요");
      return;
    }

    /** 가통 설계할 주문들의 ID 추출 */
    const selectedIdList = rows.map((selectedRow) => {
      const selectedId = orderList.list.find(
        (row) => row.id === selectedRow.id
      );
      return selectedId.id;
    });

    const allCnt = selectedIdList.length;

    // 가통 설계 start
    const res = {};
    await MainApi.possibleDecision(userData.name, selectedIdList, (data) => {
      res = data.response;
    });

    // 설계 modal, progress bar start
    const time = allCnt * 0.2;
    setModal((prev) => {
      return { ...prev, open: true, time };
    });

    // time초 후 실행
    setTimeout(() => {
      setModal((prev) => {
        return { ...prev, open: false };
      });

      Notify.success(res.success + "/" + allCnt + "건 성공", {
        showOnlyTheLastOne: false,
      });
      Notify.failure(res.fail + "/" + allCnt + "건 실패", {
        showOnlyTheLastOne: false,
      });
      setRowSelectionModel([]);

      /** 리스트 update */
      getOrders(codeNameList.select, weekList.select);
    }, time * 1000);
  };

  const exportToExcel = async () => {
    const fileType =
      "application/vnd.openxmlformats-officedcoument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(orderList.list);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "주문 목록_가능통과공장" + fileExtension);
  };

  /* column 필드 */
  const columns = [
    {
      field: "gcsCompCode",
      headerName: "법인",
      width: 100,

      editable: false,
      headerAlign: "center",
    },
    {
      field: "millCd",
      headerName: "소구분",
      width: 100,

      editable: false,
      headerAlign: "center",
    },
    {
      field: "orderHeadLineNo",
      headerName: "주문번호",
      width: 180,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "creationDate",
      headerName: "생성일자",
      width: 150,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "osMainStatusCd",
      headerName: "진도",
      width: 100,

      editable: false,
      headerAlign: "center",
    },
    {
      field: "faConfirmFlag",
      headerName: "공장결정확정구분",
      width: 140,
      editable: false,
      headerAlign: "center",
      renderCell: (params) => {
        const flag = params.value;

        if (flag === "A") {
          return (
            <Chip
              variant="outlined"
              color="primary"
              size="small"
              label={params.value}
            />
          );
        }
        if (flag === "B") {
          return (
            <Chip
              variant="outlined"
              color="success"
              size="small"
              label={params.value}
            />
          );
        }
        if (flag === "C") {
          return (
            <Chip
              variant="outlined"
              color="error"
              size="small"
              label={params.value}
            />
          );
        }
        // <Chip icon={isRejected ? <WarningIcon/> : <CheckIcon/>}  label={params.value} variant={"outlined"} color={isRejected ? "error" : "success"} />;
      },
    },
    {
      field: "posbPassFacCdN",
      headerName: "가능통과공정코드",
      width: 150,
      editable: false,
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ textAlign: "left", width: "100%" }}>{params.value}</div>
      ),
    },
    {
      field: "posbPassFacUpdateDate",
      headerName: "가능통과공정설계일자",
      width: 170,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "cfirmPassOpCd",
      headerName: "확정통과공정코드",
      width: 150,
      editable: false,
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ textAlign: "left", width: "100%" }}>{params.value}</div>
      ),
    },
    {
      field: "ordPdtItpCdN",
      headerName: "품종",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "ordPdtItdsCdN",
      headerName: "품명",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "adjustConsBktStartDttm",
      headerName: "ATP조정일",
      width: 180,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "customerNumber",
      headerName: "고객사코드",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "customerName",
      headerName: "고객사명",
      width: 320,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "ordThwTapWekCd",
      headerName: "출강주",
      width: 130,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "orderType",
      headerName: "수주구분",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "orderLineQty",
      headerName: "주문량",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "orderThick",
      headerName: "두께",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "orderWidth",
      headerName: "폭",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "orderLength",
      headerName: "길이",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "orderUsageCdN",
      headerName: "용도",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "orderEdgeCode",
      headerName: "Edge",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "stockCode",
      headerName: "제품재고판매",
      width: 130,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "salesPerson",
      headerName: "영업담당자",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "salesCodeN",
      headerName: "판매특기",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "salCusManDblTp",
      headerName: "판매고객사 대표산업",
      width: 150,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "salCusLocLClsTp",
      headerName: "판매고객사 지역대분류",
      width: 150,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "prodStdPackTolMin",
      headerName: "제품정포장하한중량",
      width: 150,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "prodStdPackTolMax",
      headerName: "제품정포장상한중량",
      width: 150,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "specificationCdN",
      headerName: "제품규격약호",
      width: 120,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "surfaceFinishCd",
      headerName: "표면지정코드",
      width: 120,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "postTreatmentMethodCdN",
      headerName: "후처리코드",
      width: 120,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "oilingMethodCd",
      headerName: "도유코드",
      width: 120,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "planningItemCodeN",
      headerName: "PlanningItem코드",
      width: 180,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "smSteelGrdN",
      headerName: "출강목표번호",
      width: 160,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "moltenSteelCharCdN",
      headerName: "용강특성",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "tsAim",
      headerName: "목표TS",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "unitWeight",
      headerName: "제품칫수계산단중",
      width: 130,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "hrSpComposite",
      headerName: "열연SkinPass합성지정",
      width: 180,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "surfaceGrd",
      headerName: "표면등급",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "shapeGrd",
      headerName: "형상등급",
      width: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "poscoProdGrdN",
      headerName: "제품사내보증번호",
      width: 160,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "hrProdThkAim",
      headerName: "열연목표두께",
      width: 130,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "hrProdWthAim",
      headerName: "열연목표폭",
      width: 130,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "hrRollUnitWgtMax",
      headerName: "압연상한중량",
      width: 130,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "sm2ndRfnCd",
      headerName: "제강2차정련코드",
      width: 150,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "skinpassFlag",
      headerName: "제품SkinPass지정여부",
      width: 160,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "packingType",
      headerName: "포장방법",
      width: 120,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "facAllocWgt",
      headerName: "소내공장결정중량",
      width: 130,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "faAllocDate",
      headerName: "생산가능공장결정일자",
      width: 150,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "errorMessage",
      headerName: "ErrorMessage",
      width: 130,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "msgcode",
      headerName: "박판공정계획Message코드",
      width: 180,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "lastUpdateDate",
      headerName: "최종수정일자",
      width: 180,
      editable: false,
      headerAlign: "center",
    },
  ];

  return (
    <>
      <CapacityModal modal={modal} />

      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h4">가능통과공장 설계</Typography>
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
            <InputLabel id="label2" style={{ paddingTop: 10 }}>
              품종
            </InputLabel>

            <Select
              labelId="분류"
              id="demo-multiple-name"
              defaultValue={0}
              input={<OutlinedInput label="품종" />}
              onChange={(e) => {
                setCodeNameList(
                  Object.assign({}, codeNameList, {
                    select: e.target.value,
                  })
                );
                // setSelectCodeName(e.target.value);
              }}
              style={{ height: 40 }}
            >
              <MenuItem value={0}>All</MenuItem>
              {codeNameList.list.map((code, idx) => {
                return (
                  <MenuItem key={idx} value={code.cdNm}>
                    {code.cdNm}
                  </MenuItem>
                );
              })}
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
            <InputLabel id="label3" style={{ paddingTop: 10, height: 40 }}>
              출강주
            </InputLabel>
            <Select
              labelId="출강주"
              id="demo-multiple-name"
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
              <MenuItem value={0}>All</MenuItem>
              {weekList.list.map((code, idx) => {
                return (
                  <MenuItem key={idx} value={code}>
                    {code}
                  </MenuItem>
                );
              })}
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
            <InputLabel id="label3" style={{ paddingTop: 10, height: 40 }}>
              진행 단계
            </InputLabel>
            <Select
              labelId="진행 단계"
              id="demo-multiple-name"
              defaultValue={0}
              input={<OutlinedInput label="진행 단계" />}
              onChange={(e) => {}}
              style={{ height: 40 }}
            >
              <MenuItem
                value={0}
                onClick={() => {
                  setFlag(["A", "B", "C"]);
                }}
              >
                ALL
              </MenuItem>
              <MenuItem
                value={1}
                onClick={() => {
                  setFlag(["A"]);
                }}
              >
                A
              </MenuItem>
              <MenuItem
                value={2}
                onClick={() => {
                  setFlag(["B"]);
                }}
              >
                B
              </MenuItem>
              <MenuItem
                value={3}
                onClick={() => {
                  setFlag(["C"]);
                }}
              >
                C
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "#E29E21" }}
            onClick={() => {
              getOrders(codeNameList.select, weekList.select);
              setRowSelectionModel([]);
            }}
          >
            조회
          </Button>
          <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "#0A5380" }}
            onClick={possibleDecision}
          >
            설계
          </Button>
          <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "#0A5380" }}
            onClick={updateConfirmFlag}
          >
            확정처리
          </Button>
          <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "darkgreen" }}
            onClick={exportToExcel}
          >
            Excel
          </Button>
        </div>
      </div>
      <Card>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .custom-data-grid .MuiDataGrid-columnsContainer, & .custom-data-grid .MuiDataGrid-cell":
              {
                borderBottom: "1px solid rgba(225, 234, 239, 1)",
                borderRight: "1px solid rgba(225, 234, 239, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "gray",
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
          }}
        >
          <DataGrid
            className="custom-data-grid"
            experimentalFeatures={{ columnGrouping: true }}
            checkboxSelection
            disableRowSelectionOnClick
            rows={orderList.list}
            columns={columns}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            onCellClick={(e) => {
              setOrderList(
                Object.assign({}, orderList, {
                  order: e.row,
                })
              );
            }}
            slots={{
              cell: MyCell,
            }}
            rowHeight={40}
          />
        </Box>
      </Card>

      {orderList.order ? <CapacityDetail order={orderList.order} /> : null}
    </>
  );
};

export default withAuth(MainCapacity, { userData: true });
