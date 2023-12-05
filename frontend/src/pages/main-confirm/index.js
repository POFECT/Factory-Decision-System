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
  const [orderList, setOrderList] = useState({
    list: [],
    order: null,
  }); // 주문 데이터 리스트
  const [codeNameList, setCodeNameList] = useState([]);
  const [selectCodeName, setSelectCodeName] = useState("FS");

  useEffect(() => {
    MainCapacityApi.getOrderList((data) => {
      const list = data.response;
      const order = list[0];
      setOrderList((prev) => {
        return { ...prev, list, order };
      });
    });
    MainCapacityApi.getCodeNameList((data) => {
      setCodeNameList(data.response);
    });
  }, []);

  /* column 필드 */
  const columns = [
    {
      field: "gcsCompCode",
      headerName: "연결결산법인구분",
      width: 150,
      editable: true,
    },
    {
      field: "millCd",
      headerName: "공정계획박판Mill구분",
      width: 150,
      editable: true,
    },
    {
      field: "orderHeadLineNo",
      headerName: "OrderHeadLineNumber",
      width: 180,
      editable: true,
    },
    {
      field: "creationDate",
      headerName: "생성일자",
      width: 150,
      editable: true,
    },
    {
      field: "osMainStatusCd",
      headerName: "주문진도상태",
      width: 150,
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
      field: "cfirmPassOpCd",
      headerName: "확정통과공정코드",
      width: 150,
      editable: true,
    },
    {
      field: "ordPdtItpCdN",
      headerName: "주문품종",
      width: 100,
      editable: true,
    },
    {
      field: "ordPdtItdsCdN",
      headerName: "주문품명",
      width: 100,
      editable: true,
    },
    {
      field: "adjustConsBktStartDttm",
      headerName: "주문ATP능력사용조정일",
      width: 180,
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
      headerName: "주문투입출강주",
      width: 130,
      editable: true,
    },
    { field: "orderType", headerName: "수주구분", width: 100, editable: true },
    { field: "orderLineQty", headerName: "주문량", width: 100, editable: true },
    {
      field: "orderThick",
      headerName: "제품주문두께",
      width: 100,
      editable: true,
    },
    {
      field: "orderWidth",
      headerName: "제품주문폭",
      width: 100,
      editable: true,
    },
    {
      field: "orderLength",
      headerName: "주문길이",
      width: 100,
      editable: true,
    },
    {
      field: "orderUsageCdN",
      headerName: "주문용도지정코드",
      width: 130,
      editable: true,
    },
    {
      field: "orderEdgeCode",
      headerName: "제품주문Edge",
      width: 130,
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
      headerName: "제품경매 영업담당자명",
      width: 150,
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
      width: 100,
      editable: true,
    },
    {
      field: "surfaceFinishCd",
      headerName: "제품표면마무리지정코드",
      width: 180,
      editable: true,
    },
    {
      field: "postTreatmentMethodCdN",
      headerName: "제품후처리방법지정코드",
      width: 180,
      editable: true,
    },
    {
      field: "oilingMethodCd",
      headerName: "제품도유방법지정코드",
      width: 150,
      editable: true,
    },
    {
      field: "planningItemCodeN",
      headerName: "PlanningItem코드",
      width: 150,
      editable: true,
    },
    {
      field: "smSteelGrdN",
      headerName: "출강목표번호",
      width: 100,
      editable: true,
    },
    {
      field: "moltenSteelCharCdN",
      headerName: "품질설계 용강특성",
      width: 150,
      editable: true,
    },
    {
      field: "tsAim",
      headerName: "품질설계 목표TS",
      width: 150,
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
      headerName: "품질설계 열연SkinPass합성지정",
      width: 200,
      editable: true,
    },
    {
      field: "surfaceGrd",
      headerName: "품질설계표면등급",
      width: 130,
      editable: true,
    },
    {
      field: "shapeGrd",
      headerName: "품질설계형상등급",
      width: 130,
      editable: true,
    },
    {
      field: "poscoProdGrdN",
      headerName: "제품사내보증번호",
      width: 150,
      editable: true,
    },
    {
      field: "hrProdThkAim",
      headerName: "품질설계열연목표두께",
      width: 150,
      editable: true,
    },
    {
      field: "hrProdWthAim",
      headerName: "품질설계열연목표폭",
      width: 150,
      editable: true,
    },
    {
      field: "hrRollUnitWgtMax",
      headerName: "열연공장압연가능재료상한중량",
      width: 200,
      editable: true,
    },
    {
      field: "sm2ndRfnCd",
      headerName: "품질설계제강2차정련코드",
      width: 180,
      editable: true,
    },
    {
      field: "skinpassFlag",
      headerName: "제품SkinPass지정여부",
      width: 150,
      editable: true,
    },
    {
      field: "packingType",
      headerName: "제품포장방법코드",
      width: 150,
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
      width: 100,
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
      width: 150,
      editable: true,
    },
  ];

  return (
    <div style={{ height: "600px", width: "100%" }}>
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
              onChange={(e) => {
                console.log(e);
              }}
              style={{ height: 40 }}
            >
              <MenuItem value="T">포항</MenuItem>
              <MenuItem value="K">광양</MenuItem>
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
              defaultValue="FS"
              input={<OutlinedInput label="품종" />}
              onChange={(e) => {
                setSelectCodeName(e.target.value);
              }}
              style={{ height: 40 }}
            >
              {codeNameList.map((code, idx) => {
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
              defaultValue="T"
              input={<OutlinedInput label="출강주" />}
              onChange={(e) => {
                console.log(e);
              }}
              style={{ height: 40 }}
            >
              <MenuItem value="T">포항</MenuItem>
              <MenuItem value="K">광양</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button size="small" type="submit" variant="contained">
            대상조회
          </Button>
          <Button size="small" type="submit" variant="contained">
            공장부여
          </Button>
          <Button size="small" type="submit" variant="contained">
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
    </div>
  );
};

export default MainConfirm;
