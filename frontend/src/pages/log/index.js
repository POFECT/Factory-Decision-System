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

// import { DataGrid } from "@mui/x-data-grid";

import { Report } from "src/notifix/notiflix-report-aio";

import React, { useEffect, useState } from "react";
import CapacityStandardApi from "src/api/CapacityApi";
import MyD3Heatmap from "../../views/capacity/d3-heat";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";

import MainApi from "src/api/MainApi";
import OrderList from "src/views/log/order-list";
import OrderDataGrid from "src/views/log/order-data-grid";

const Log = () => {
  // 주문
  const [orderList, setOrderList] = useState({
    list: [],
    order: {},
  });

  // Flag
  // const [flag, setFlag] = useState(["A", "B", "C", "D", "E", "F"]);

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

  const steps = [
    {
      label: "주문 완료",
      description: `A로그 - 날짜`,
    },
    {
      label: "가능통과공장 설계",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      label: "가능통과공장 확정",
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
    {
      label: "공장 결정",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      label: "제조 투입",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getOrders = (kind, week, status, flag) => {
    if (kind == 0) kind = null;
    if (week == 0) week = null;

    MainApi.getOrderList(kind, week, status, flag, (data) => {
      const list = data.response;
      const order = list[0];
      setOrderList((prev) => {
        return { ...prev, list, order };
      });
    });
  };

  const changeSelectedOrder = (row) => {
    // console.log(row);
    setOrderList(
      Object.assign({}, orderList, {
        order: row,
      })
    );
  };

  useEffect(() => {
    getOrders(null, null, null, null);
  }, []);

  useEffect(() => {
    if (orderList.order.faConfirmFlag == "A") {
      setActiveStep((prevActiveStep) => 1);
    } else if (
      orderList.order.faConfirmFlag == "B" ||
      orderList.order.faConfirmFlag == "C"
    ) {
      setActiveStep((prevActiveStep) => 2);
    } else if (orderList.order.faConfirmFlag == "D") {
      setActiveStep((prevActiveStep) => 3);
    } else if (orderList.order.faConfirmFlag == "E") {
      setActiveStep((prevActiveStep) => 4);
    } else if (orderList.order.faConfirmFlag == "F") {
      setActiveStep((prevActiveStep) => 5);
    }
  }, [orderList.order]);

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

  return (
    <>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant="h4">주문 로그</Typography>
      </Grid>
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
            <Typography variant="h5">진행 단계</Typography>
          </Grid>

          <Box
            sx={{
              height: "100",
              width: "94.5%",
              marginBottom: "20px",
              marginLeft: "30px",
            }}
          >
            <Box sx={{ maxWidth: 400 }}>
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                // nonLinear={true}
              >
                {steps.map((step, index) => (
                  <Step
                    active={index < activeStep ? true : false}
                    key={step.label}
                    // completed={false}
                  >
                    <StepLabel
                      sx={{
                        ".css-1xot491-MuiStepLabel-label.Mui-completed, .css-1xot491-MuiStepLabel-label":
                          {
                            fontSize: "20px",
                          },
                      }}
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}></Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button> */}
                </Paper>
              )}
            </Box>
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
            <Typography variant="h5">주문 목록</Typography>

            {orderList.list.length === 0 ? (
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
              <OrderList
                order={orderList}
                changeSelectedOrder={changeSelectedOrder}
              />
            )}
          </Grid>
        </Card>
      </div>
      <Card
        elevation={3}
        style={{ marginTop: 16, flexBasis: "50%", padding: 16 }}
      >
        <Grid
          item
          xs={4}
          sx={{ paddingBottom: 5, paddingTop: 3, paddingLeft: 3 }}
        >
          <Typography variant="h5">주문 상세 정보</Typography>
        </Grid>
        <OrderDataGrid order={orderList.order} />
      </Card>
    </>
  );
};

export default Log;
