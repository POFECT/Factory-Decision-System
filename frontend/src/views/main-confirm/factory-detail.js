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
import MainApi from "/api/MainApi";
import { Notify } from "src/notifix/notiflix-notify-aio";

const FactoryDetail = (props) => {
  const [factoryList, setFactoryList] = useState({
    list: [],
  });
  const [selectedFac, setSelectedFac] = useState(null);
  const [changeData, setChangeData] = useState({
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
    console.log(facNo);
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

    console.log(changeData);

    MainApi.changeFactory(changeData, (data) => {
      const res = data.response;
      Notify.success("변경되었습니다.");
      props.getOrder(null, null);
    });
  };

  return (
    <>
      {/* order: {props.order.id} :{props.factory.code} */}
      <Card style={{ marginBottom: 20 }}>
        <TableContainer
          style={{
            // background: "#FFFFFF",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    width: "40%",
                    backgroundColor: "#0A5380",
                    color: "#FFFFFF",
                    fontSize: 17,
                  }}
                >
                  공정
                </TableCell>
                <TableCell align="center" style={{ fontSize: 17 }}>
                  {props.factory.name}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Card>
      <Card>
        <TableContainer>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={selectedFac}
            >
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 17,
                        whiteSpace: "nowrap",
                      }}
                    >
                      공장
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 17,
                        whiteSpace: "nowrap",
                      }}
                    >
                      능력 여유량
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 17,
                        whiteSpace: "nowrap",
                      }}
                    >
                      능력 사용량
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 17,
                      }}
                    >
                      선택
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {factoryList.list.map((f) => {
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
                          {/* <Checkbox
                          checked={
                            props.factory.code == f.firmPsFacTp ? true : false
                          }
                        /> */}
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
                  })}
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
export default FactoryDetail;
