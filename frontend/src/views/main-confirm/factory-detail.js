import { useState, useEffect } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Button,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import MainApi from "src/pages/api/pofect/MainApi";
import { Notify } from "src/notifix/notiflix-notify-aio";
import withAuth from "src/pages/api/auth/withAuth";
import { useSession } from "next-auth/react";

const FactoryDetail = (props) => {
  const { data: session } = useSession();
  const reversedName = session.user.name.split(" ").reverse().join("");

  const [factoryList, setFactoryList] = useState({
    list: [],
  });
  const [selectedFac, setSelectedFac] = useState(null);
  const [changeData, setChangeData] = useState({
    userName: "",
    orderId: 0,
    processCd: "",
    prevFactory: "",
    nextFactory: "",
  });

  useEffect(() => {
    setSelectedFac(props.factory.code);

    setChangeData((prev) => {
      return {
        ...prev,
        userName: reversedName,
        orderId: props.order.id,
        processCd: props.factory.no,
        prevFactory: props.factory.code,
      };
    });

    MainApi.getFaCapacityList(
      props.factory.no,
      props.order.ordThwTapWekCd,
      (data) => {
        const list = data.response;
        setFactoryList((prev) => {
          return { ...prev, list };
        });
      }
    );
  }, [props.factory, props.order]);

  const handleFactory = (facNo) => {
    setSelectedFac(facNo);

    setChangeData((prev) => {
      return {
        ...prev,
        nextFactory: facNo,
      };
    });
  };

  const changeFactory = () => {
    // 이전 값이랑 같으면 pass
    if (props.factory.code == selectedFac) return;

    MainApi.changeFactory(changeData, (data) => {
      const res = data.response;
      Notify.success("변경되었습니다.");
      props.getOrder(null, null, props.order.id);
    });
  };

  return (
    <>
      <Card style={{ marginBottom: 10 }}>
        <TableContainer>
          <Table aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    width: 140,
                    backgroundColor: "#0A5380",
                    color: "#FFFFFF",
                    whiteSpace: "nowrap",
                  }}
                >
                  공정
                </TableCell>
                <TableCell align="center">{props.factory.name}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card>
        <TableContainer
          sx={{
            "& .css-1nrlq1o-MuiFormControl-root, & .css-13sljp9": {
              display: "flex",
            },
          }}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={selectedFac}
            >
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow
                    sx={{
                      "& .MuiTableCell-head": {
                        fontSize: 17,
                        whiteSpace: "nowrap",
                      },
                    }}
                  >
                    <TableCell align="center">공장</TableCell>
                    <TableCell align="center">능력 여유량</TableCell>
                    <TableCell align="center">능력 사용량</TableCell>
                    <TableCell align="center">선택</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {props.factory.name != ""
                    ? factoryList.list.map((f) => {
                        return (
                          <TableRow key={f.firmPsFacTp}>
                            <TableCell
                              align="center"
                              style={{ width: "80px", whiteSpace: "nowrap" }}
                            >
                              {f.factoryName}
                            </TableCell>
                            <TableCell align="center">
                              {f.faAdjustmentWgt - f.progressQty}
                            </TableCell>
                            <TableCell align="center">
                              {props.factory.code == f.firmPsFacTp
                                ? props.order.orderLineQty
                                : ""}
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                value={f.firmPsFacTp}
                                onChange={() => {
                                  handleFactory(f.firmPsFacTp);
                                }}
                                control={<Radio />}
                                style={{ margin: "auto" }}
                                disabled={
                                  props.factory.code == " " ||
                                  props.order.cfirmPassOpCd == null
                                    ? true
                                    : false
                                }
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </RadioGroup>
          </FormControl>
        </TableContainer>
      </Card>
      <Button
        size="small"
        variant="contained"
        style={{ backgroundColor: "#0E9DDE", float: "right" }}
        onClick={changeFactory}
      >
        저장
      </Button>
    </>
  );
};
export default withAuth(FactoryDetail, { userData: true });
