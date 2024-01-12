import { React, useState, useEffect } from "react";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import {
  Chip,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

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

const OrderDataGrid = (props) => {
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

  useEffect(() => {
    // console.log(props.order.order);
  }, [props.order.order]);

  return (
    <>
      {/* <DataGrid
        className="custom-data-grid"
        experimentalFeatures={{ columnGrouping: true }}
        // checkboxSelection
        // disableRowSelectionOnClick
        rows={props.order.order}
        columns={columns}
        slots={{
          cell: MyCell,
        }}
        rowHeight={40}
      /> */}
      {/* <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}> */}
      <TableContainer sx={{ maxHeight: 410, marginTop: "15px" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((o, idx) => {
                return (
                  <TableCell
                    key={idx}
                    align="center"
                    style={{
                      width: 200,
                      whiteSpace: "nowrap",
                      fontSize: 16,
                      backgroundColor: "#F9FAFC",
                    }}
                  >
                    {o.headerName}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align="center"
                  style={{
                    width: 200,
                    whiteSpace: "nowrap",
                    borderRight: "1px solid rgba(225, 234, 239, 1)",
                  }}
                >
                  {props.order[column.field]}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Paper> */}
    </>
  );
};

export default OrderDataGrid;
