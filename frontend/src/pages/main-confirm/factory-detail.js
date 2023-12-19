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
import MainCapacityApi from "src/api/MainApi";

const FactoryDetail = (props) => {
  const [factoryList, setFactoryList] = useState({
    list: [],
  });
  const [selectedFac, setSelectedFac] = useState(null);

  useEffect(() => {
    setSelectedFac(props.factory.code);

    MainCapacityApi.getFaCapacityList(props.factory.no, (data) => {
      const list = data.response;
      setFactoryList((prev) => {
        return { ...prev, list };
      });
    });
  }, [props.factory, props.order]);

  const handleFactory = (facNo) => {
    console.log(facNo);
    setSelectedFac(facNo);
  };

  const changeFactory = () => {
    // 이전 값이랑 같으면 pass
    if (props.factory.code == selectedFac) return;

    console.log(
      props.order.id,
      props.order.orderLineQty,
      props.factory,
      selectedFac
    );
  };

  return (
    <>
      <TableContainer
        style={{
          background: "#FFFFFF",
          marginBottom: 20,
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
                  color: "white",
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
                            disabled={props.factory.code == " " ? true : false}
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
        style={{ backgroundColor: "#0A5380", float: "right" }}
        onClick={changeFactory}
      >
        저장
      </Button>
    </>
  );
};
export default FactoryDetail;
