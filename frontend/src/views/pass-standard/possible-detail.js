import React, { useEffect, useState } from "react";
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
  accordionActionsClasses,
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Checkbox,
} from "@mui/material";
import { CheckNetworkOutline } from "mdi-material-ui";
import { Notify } from "src/notifix/notiflix-notify-aio";
import PassStandardApi from "src/pages/api/pofect/PassStandardApi";

const possibleDetail = ({ a, openFun, checkNone, test }) => {
  let processName = null;
  if (a.processCd === "10") {
    processName = "제강";
  } else if (a.processCd === "20") {
    processName = "열연";
  } else if (a.processCd === "30") {
    processName = "열연정정";
  } else if (a.processCd === "40") {
    processName = "냉간압연";
  } else if (a.processCd === "50") {
    processName = "1차소둔";
  } else if (a.processCd === "60") {
    processName = "2차소둔";
  } else if (a.processCd === "70") {
    processName = "도금";
  } else if (a.processCd === "80") {
    processName = "정정";
  }
  const [processFactoryList, setProcessFactoryList] = useState([]); //공정별 리스트
  const isSelected = 2;
  const [checkedItemList, setCheckedItemList] = useState([]); //check여부 리스트
  const [checkedExplList, setCheckedExplList] = useState([]); //check된것들 Expl
  const setInitialData = null;
  const checking = () => {
    checkNone(!test);
  };
  useEffect(() => {
    PassStandardApi.getPossiblePopper(
      a.processCd,
      (data) => {
        setProcessFactoryList(data.response); //Table에 보여줄 리스트 세팅
        //processFacNum값이 초기 세팅된 값이므로 setCheckedItemList에 세팅
        setCheckedItemList(a.processFacNum.map(String));
        const checkedExplList = data.response
          .filter((item) =>
            a.processFacNum.map(String).includes(item.firmPsFacTp)
          )
          .map((item) => item.cdExpl);
        setCheckedExplList(checkedExplList);
      },
      []
    );
  }, [a.processFacNum]);

  const handleCheckboxChange = (event, firmPsFacTp, cdExpl) => {
    const updatedCheckedItemList = [...checkedItemList];
    const updatedCheckedExplList = [...checkedExplList];
    if (event.target.checked) {
      // 체크가 되어 있지 않으면 추가
      updatedCheckedItemList.push(firmPsFacTp);
      updatedCheckedExplList.push(cdExpl);
    } else {
      // 체크가 해제되면 제거
      const index = updatedCheckedItemList.indexOf(firmPsFacTp);
      if (index !== -1) {
        updatedCheckedItemList.splice(index, 1);
        updatedCheckedExplList.splice(index, 1);
      }
    }
    setCheckedItemList(updatedCheckedItemList);
    setCheckedExplList(updatedCheckedExplList);
  };
  const savePossibleFactory = async () => {
    const checkedList = checkedItemList.sort().join("");
    const saveResult = "";
    const res = await PassStandardApi.updatePossibleFactory(
      a.btiPosbPsFacTp,
      a.processCd,
      checkedList,
      checkedExplList.sort().join(","),
      (data) => {
        saveResult = data.response.result;
      }
    );

    switch (saveResult) {
      case "Delete":
        Notify.success("코드 조합이 삭제되었습니다.");
        checking();
        break;
      case "Update":
      case "Insert":
        Notify.success("코드 조합이 변경되었습니다.");
        checking();
        break;
      case "Fail":
        Notify.failure("이미 존재하는 코드 조합입니다.");
        break;
    }
  };

  const processColumn = [
    { field: "isSelected", headerName: isSelected, hidden: true },
    {
      field: "공정",
      headerName: processName,
      width: 160,
      type: "text",
      alignItems: "left",
      headerAlign: "left",
    },
  ];
  return (
    <div
      style={{
        borderRadius: "6px",
        boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
        overflow: "hidden", // Optional: 컴포넌트 내용이 박스 쉐도우를 벗어나는 경우 숨김
      }}
    >
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  width: "100%",
                  backgroundColor: "#05507d",
                  color: "white",
                  fontSize: "20px",
                  padding: "10px",
                }}
              >
                코드상세
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  width: "40%",
                  color: "#05507d",
                  background: "#F5F9FF",
                  fontSize: "15px",
                  padding: "3%",
                  paddingLeft: "25%",
                }}
              >
                Code
              </TableCell>
              <TableCell
                align="center"
                style={{
                  width: "70%",
                  color: "#05507d",
                  background: "#F5F9FF",
                  fontSize: "15px",
                  padding: "3%",
                  paddingLeft: "17%",
                }}
              >
                {processName}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableBody>
        {processFactoryList.map((e) => {
          return (
            <TableRow key={e.id}>
              <TableCell padding="checkbox" style={{ width: "20%" }}>
                <Checkbox
                  checked={checkedItemList.includes(e.firmPsFacTp)}
                  onChange={(event) =>
                    handleCheckboxChange(event, e.firmPsFacTp, e.cdExpl)
                  }
                  style={{ margin: 0, padding: 0 }}
                />
              </TableCell>
              <TableCell style={{ width: "30%" }}>{e.processCd}</TableCell>
              <TableCell align="center" style={{ width: "35%" }}>
                {e.cdExpl}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow align="right" style={{ width: "400px" }}>
              <TableCell style={{ padding: 0, margin: 0 }}>
                <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#0A5380", color: "white" }}
                  onClick={savePossibleFactory}
                >
                  저장
                </Button>
              </TableCell>
              <TableCell style={{ padding: 0, margin: 0 }}>
                <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#BE2E22",
                    color: "white",
                    margin: "10px",
                  }}
                  onClick={() => {
                    openFun(false);
                  }}
                >
                  닫기
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

export default possibleDetail;
