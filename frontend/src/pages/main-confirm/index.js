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
  Card,
} from "@mui/material";
import MainCapacityApi from "src/api/MainCapacityApi";
import OrderDetail from "./order-detail";

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

const MainConfirm = () => {
  /* 데이터 */

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

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    getOrders(null, null);

    MainCapacityApi.getCodeNameList((data) => {
      const list = data.response;
      // const select = list[0].cdNm;
      setCodeNameList((prev) => {
        return { ...prev, list };
      });
    });

    MainCapacityApi.getWeekList("H", ["A", "B", "C"], (data) => {
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
    MainCapacityApi.getOrderList(kind, week, (data) => {
      const list = data.response;
      const order = list[0];
      // console.log(list);
      // console.log(order);
      setOrderList((prev) => {
        return { ...prev, list, order };
      });
    });
  };

  const inputFactory = async () => {
    const selectedIdx = new Set(rowSelectionModel);
    const rows = orderList.list.filter((row) => selectedIdx.has(row.id));
    // console.log(rows);

    /** 공장결정 되지 않은 주문이 있다면 실패 */
    for (const row of rows) {
      if (row.faConfirmFlag != "E") {
        alert("공장 결정이 되지 않은 주문이 존재합니다.");
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
    // console.log(selectedIdList);

    MainCapacityApi.updateFlag("F", selectedIdList, (data) => {
      const cnt = data.response;
      alert(cnt + "건 제조투입 완료되었습니다.");
      setRowSelectionModel([]);
    });
  };

  /* column 필드 */
  const columns = [
    {
      field: "gcsCompCode",
      headerName: "법인",
      width: 100,

      editable: true,
    },
    {
      field: "millCd",
      headerName: "소구분",
      width: 100,

      editable: true,
    },
    {
      field: "orderHeadLineNo",
      headerName: "주문번호",
      width: 180,
      editable: true,
    },
    {
      field: "creationDate",
      headerName: "생성일자",
      width: 180,
      editable: true,
    },
    {
      field: "osMainStatusCd",
      headerName: "진도",
      width: 100,

      editable: true,
    },
    {
      field: "faConfirmFlag",
      headerName: "공장결정확정구분",
      width: 150,
      editable: true,
    },
    {
      field: "posbPassFacCdN",
      headerName: "가능통과공정코드",
      width: 150,
      editable: true,
    },
    {
      field: "posbPassFacUpdateDate",
      headerName: "가능통과공정설계일자",
      width: 180,
      editable: true,
    },
    {
      field: "cfirmPassOpCd",
      headerName: "확정통과공정코드",
      width: 150,
      editable: true,
    },
    {
      field: "ordPdtItpCdN",
      headerName: "품종",
      width: 100,
      editable: true,
    },
    {
      field: "ordPdtItdsCdN",
      headerName: "품명",
      width: 100,
      editable: true,
    },
    {
      field: "adjustConsBktStartDttm",
      headerName: "ATP조정일",
      width: 150,
      editable: true,
    },
    {
      field: "customerNumber",
      headerName: "고객사코드",
      width: 100,
      editable: true,
    },
    {
      field: "customerName",
      headerName: "고객사명",
      width: 320,
      editable: true,
    },
    {
      field: "ordThwTapWekCd",
      headerName: "출강주",
      width: 130,
      editable: true,
    },
    { field: "orderType", headerName: "수주구분", width: 100, editable: true },
    { field: "orderLineQty", headerName: "주문량", width: 100, editable: true },
    {
      field: "orderThick",
      headerName: "두께",
      width: 100,
      editable: true,
    },
    {
      field: "orderWidth",
      headerName: "폭",
      width: 100,
      editable: true,
    },
    {
      field: "orderLength",
      headerName: "길이",
      width: 100,
      editable: true,
    },
    {
      field: "orderUsageCdN",
      headerName: "용도",
      width: 100,
      editable: true,
    },
    {
      field: "orderEdgeCode",
      headerName: "Edge",
      width: 100,
      editable: true,
    },
    {
      field: "stockCode",
      headerName: "제품재고판매",
      width: 130,
      editable: true,
    },
    {
      field: "salesPerson",
      headerName: "영업담당자",
      width: 100,
      editable: true,
    },
    { field: "salesCodeN", headerName: "판매특기", width: 100, editable: true },
    {
      field: "salCusManDblTp",
      headerName: "판매고객사 대표산업",
      width: 150,
      editable: true,
    },
    {
      field: "salCusLocLClsTp",
      headerName: "판매고객사 지역대분류",
      width: 150,
      editable: true,
    },
    {
      field: "prodStdPackTolMin",
      headerName: "제품정포장하한중량",
      width: 150,
      editable: true,
    },
    {
      field: "prodStdPackTolMax",
      headerName: "제품정포장상한중량",
      width: 150,
      editable: true,
    },
    {
      field: "specificationCdN",
      headerName: "제품규격약호",
      width: 120,
      editable: true,
    },
    {
      field: "surfaceFinishCd",
      headerName: "표면지정코드",
      width: 120,
      editable: true,
    },
    {
      field: "postTreatmentMethodCdN",
      headerName: "후처리코드",
      width: 120,
      editable: true,
    },
    {
      field: "oilingMethodCd",
      headerName: "도유코드",
      width: 120,
      editable: true,
    },
    {
      field: "planningItemCodeN",
      headerName: "PlanningItem코드",
      width: 180,
      editable: true,
    },
    {
      field: "smSteelGrdN",
      headerName: "출강목표번호",
      width: 160,
      editable: true,
    },
    {
      field: "moltenSteelCharCdN",
      headerName: "용강특성",
      width: 100,
      editable: true,
    },
    {
      field: "tsAim",
      headerName: "목표TS",
      width: 100,
      editable: true,
    },
    {
      field: "unitWeight",
      headerName: "제품칫수계산단중",
      width: 130,
      editable: true,
    },
    {
      field: "hrSpComposite",
      headerName: "열연SkinPass합성지정",
      width: 180,
      editable: true,
    },
    {
      field: "surfaceGrd",
      headerName: "표면등급",
      width: 100,
      editable: true,
    },
    {
      field: "shapeGrd",
      headerName: "형상등급",
      width: 100,
      editable: true,
    },
    {
      field: "poscoProdGrdN",
      headerName: "제품사내보증번호",
      width: 160,
      editable: true,
    },
    {
      field: "hrProdThkAim",
      headerName: "열연목표두께",
      width: 130,
      editable: true,
    },
    {
      field: "hrProdWthAim",
      headerName: "열연목표폭",
      width: 130,
      editable: true,
    },
    {
      field: "hrRollUnitWgtMax",
      headerName: "압연상한중량",
      width: 130,
      editable: true,
    },
    {
      field: "sm2ndRfnCd",
      headerName: "제강2차정련코드",
      width: 150,
      editable: true,
    },
    {
      field: "skinpassFlag",
      headerName: "제품SkinPass지정여부",
      width: 160,
      editable: true,
    },
    {
      field: "packingType",
      headerName: "포장방법",
      width: 120,
      editable: true,
    },
    {
      field: "facAllocWgt",
      headerName: "소내공장결정중량",
      width: 130,
      editable: true,
    },
    {
      field: "faAllocDate",
      headerName: "생산가능공장결정일자",
      width: 150,
      editable: true,
    },
    {
      field: "errorMessage",
      headerName: "ErrorMessage",
      width: 130,
      editable: true,
    },
    {
      field: "msgcode",
      headerName: "박판공정계획Message코드",
      width: 180,
      editable: true,
    },
    {
      field: "lastUpdateDate",
      headerName: "최종수정일자",
      width: 180,
      editable: true,
    },
  ];

  return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h3">공장 결정</Typography>
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
            <InputLabel id="label3" style={{ paddingTop: 10 }}>
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
        </div>
        <div>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              getOrders(codeNameList.select, weekList.select);
              setRowSelectionModel([]);
            }}
          >
            대상조회
          </Button>
          <Button size="small" type="submit" variant="contained">
            공장부여
          </Button>
          <Button size="small" variant="contained" onClick={inputFactory}>
            제조투입
          </Button>
          <Button size="small" type="submit" variant="contained">
            Excel
          </Button>
        </div>
      </div>
      <Card style={{ height: 400 }}>
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
          checkboxSelection
          disableRowSelectionOnClick
          rows={orderList.list}
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          columns={columns}
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
      </Card>

      {orderList.order ? <OrderDetail order={orderList.order} /> : null}
    </>
  );
};

export default MainConfirm;
