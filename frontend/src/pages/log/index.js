import "react-datasheet-grid/dist/style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Box, Card, Grid, Typography, Button } from "@mui/material";

import React, { useEffect, useState } from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import MainApi from "src/pages/api/pofect/MainApi";
import LogApi from "src/pages/api/pofect/LogApi";
import OrderList from "src/views/log/order-list";
import OrderDataGrid from "src/views/log/order-data-grid";
import ConfirmModal from "src/views/log/confirm-modal";
import PossibleModal from "src/views/log/possible-modal";

const Log = () => {
  // 주문
  const [orderList, setOrderList] = useState({
    list: [],
    order: {},
  });

  // 로그
  const [logList, setLogList] = useState([]);

  // 상세 Modal
  const [possibleList, setPossibleList] = useState([]);
  const [confirmList, setConfirmList] = useState([]);

  const [possibleModal, setPossibleModal] = useState(false);
  const closePossibleModal = () => {
    setPossibleModal(false);
  };

  const [confirmModal, setConfirmModal] = useState(false);
  const closeConfirmModal = () => {
    setConfirmModal(false);
  };

  const [steps, setSteps] = useState([
    {
      label: "주문 완료",
      description: [],
    },
    {
      label: "가능통과공장 설계",
      description: [],
    },
    {
      label: "가능통과공장 확정",
      description: [],
    },
    {
      label: "공장 결정",
      description: [],
    },
    {
      label: "제조 투입",
      description: [],
    },
  ]);

  const [activeStep, setActiveStep] = useState(0);

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
    setOrderList(
      Object.assign({}, orderList, {
        order: row,
      })
    );
  };

  /** 선택 주문 로그 데이터 수신 */
  const getLogs = async () => {
    await LogApi.getLogList(orderList.order.id, (data) => {
      const list = data.response;
      setLogList((prev) => {
        return { ...prev, list };
      });

      updateStepContents(list);

      const possible = list.filter((item) => {
        return item.flag == "B" || item.flag == "C";
      });
      setPossibleList(possible);

      const confirm = list.filter((item) => {
        return item.flag == "E";
      });
      setConfirmList(confirm);
    });
  };

  // stepper 로그 내용 업데이트
  const updateStepContents = (list) => {
    const updatedSteps = [...steps]; // 복제하여 새로운 배열 생성
    updatedSteps[0].description = [];
    updatedSteps[1].description = [];
    updatedSteps[2].description = [];
    updatedSteps[3].description = [];
    updatedSteps[4].description = [];

    for (const obj of list) {
      // 주문 완료
      if (obj.flag == "A") {
        updatedSteps[0].description.push(`(${obj.updateDate})`);
      }
      // 가통 설계
      else if (obj.flag == "B" || obj.flag == "C") {
        updatedSteps[1].description.push(
          `[${obj.etc}] 결과: ${obj.possibleData.code}\n(${obj.updateDate}) - ${obj.userName}`
        );
      }
      // 가통 확정
      else if (obj.flag == "D") {
        updatedSteps[2].description.push(
          `(${obj.updateDate}) - ${obj.userName}`
        );
      }
      // 공장 결정 / 공장 변경
      else if (obj.flag == "E") {
        updatedSteps[3].description.push(
          `[${obj.etc}] 결과: ${obj.confirmData.code}\n(${obj.updateDate}) - ${obj.userName}`
        );
      }
      // 제조 투입
      else if (obj.flag == "F") {
        updatedSteps[4].description.push(
          `(${obj.updateDate}) - ${obj.userName}`
        );
      }
    }

    setSteps(updatedSteps); // 업데이트된 배열을 상태로 설정
  };

  useEffect(async () => {
    getOrders(null, null, null, null);
  }, []);

  useEffect(() => {
    /** stepper 단계 설정 */
    const flag = orderList.order.faConfirmFlag;

    if (flag == "A") {
      setActiveStep((prevActiveStep) => 1);
    } else if (flag == "B" || flag == "C") {
      setActiveStep((prevActiveStep) => 2);
    } else if (flag == "D") {
      setActiveStep((prevActiveStep) => 3);
    } else if (flag == "E") {
      setActiveStep((prevActiveStep) => 4);
    } else if (flag == "F") {
      setActiveStep((prevActiveStep) => 5);
    }

    if (orderList.order.id != undefined) {
      getLogs();
    }
  }, [orderList.order]);

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
            height: "750px",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{ paddingBottom: 5, paddingTop: 3, paddingLeft: 3 }}
          >
            <Typography variant="h5">
              진행 단계 ({orderList.order.ordPdtItdsCdN}-
              {orderList.order.orderHeadLineNo})
            </Typography>
          </Grid>

          <Box
            sx={{
              overflow: "auto",
              height: "85%",
              // width: "94.5%",
              marginBottom: "20px",
              marginLeft: "30px",
            }}
          >
            <PossibleModal
              open={possibleModal}
              handleClose={closePossibleModal}
              possibleList={possibleList}
            />
            <ConfirmModal
              open={confirmModal}
              handleClose={closeConfirmModal}
              confirmList={confirmList}
            />
            {/* <Box sx={{ maxWidth: 400 }}> */}
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
                      "& .css-1wh1125, & .css-1xot491-MuiStepLabel-label": {
                        fontSize: "20px",
                      },
                    }}
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent
                    sx={{
                      ".css-1rw7nzj-MuiCollapse-root-MuiStepContent-transition":
                        {
                          color: "#6b6a6a",
                        },
                    }}
                  >
                    {step.label == "가능통과공장 설계" ? (
                      <Button
                        startIcon={<ExpandCircleDownIcon />}
                        style={{ marginTop: -10 }}
                        onClick={() => setPossibleModal(true)}
                      >
                        상세 내역 조회
                      </Button>
                    ) : null}
                    {step.label == "공장 결정" ? (
                      <Button
                        startIcon={<ExpandCircleDownIcon />}
                        style={{ marginTop: -10 }}
                        onClick={() => setConfirmModal(true)}
                      >
                        상세 내역 조회
                      </Button>
                    ) : null}
                    {step.description.map((des, index) => (
                      <li
                        key={index}
                        style={{
                          textIndent: "-25px",
                          paddingLeft: "25px",
                        }}
                      >
                        {des.split("\n").map((line) => {
                          return (
                            <>
                              {line}
                              <br />
                            </>
                          );
                        })}
                      </li>
                    ))}
                    {/* <Box sx={{ mb: 2 }}></Box> */}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {/* </Box> */}
          </Box>
        </Card>
        <Card
          elevation={3}
          style={{
            flexBasis: "50%",
            padding: "16px",
            height: "750px",
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
