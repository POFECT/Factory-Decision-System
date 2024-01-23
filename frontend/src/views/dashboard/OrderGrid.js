import { Box, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DashBoardApi from "src/pages/api/pofect/DashBoardApi";

const OrderGrid = () => {
  const [orderInquiry, setOrderInquiry] = useState([]);

  useEffect(() => {
    DashBoardApi.getDashBoardOrderInquiry((responseData) => {
      setOrderInquiry(responseData.response);
    });
  }, []);

  const columns = [
    {
      field: "ordPdtItpCdN",
      headerName: "품종",
      width: 50,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "countA",
      headerName: "주문 처리 상태",
      width: 91,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "countB",
      headerName: "가능통과공장 확정",
      width: 91,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "countC",
      headerName: "가능통과공장 조치 필요",
      width: 91,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "countD",
      headerName: "가능통과공장 확정",
      width: 91,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "countE",
      headerName: "확정통과공장 확정",
      width: 91,
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "countF",
      headerName: "제조 투입",
      width: 91,
      headerAlign: "center",
      sortable: false,
    },
  ];

  const changeRowData = orderInquiry.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  return (
    <Paper elevation={3} style={{ padding: "15px" }}>
      <Typography variant="h5" style={{ padding: "10px 20px 10px 20px" }}>
        품종-단계별 주문 건수
      </Typography>
      <Box
        sx={{
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
        }}
        style={{
          height: 285,
          padding: "30px",
          padding: "0px 20px 30px 20px",
        }}
      >
        <DataGrid
          className="custom-data-grid"
          rows={changeRowData}
          columns={columns}
          rowHeight={30}
          hideFooterPagination={true}
          hideFooter={true}
        />
      </Box>
    </Paper>
  );
};
export default OrderGrid;
