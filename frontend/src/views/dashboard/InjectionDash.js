import { Button, Link, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
import MainApi from "src/pages/api/pofect/MainApi";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const InjectionDash = () => {
  const [confirmList, setConfirmList] = useState([]);
  const count = 0;
  useEffect(() => {
    MainApi.getOrderList(null, null, "C", "F", (data) => {
      setConfirmList(data.response);
    });
  }, []);
  return (
    <Card
      elevation={3}
      style={{
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>제조 투입 결정 주문 건수</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <Typography variant="h4" sx={{ mr: 2 }} style={{ color: "#212121" }}>
            {confirmList.length}개
          </Typography>
          {confirmList.length - count > 0 ? (
            <div style={{ color: "red" }}>+{confirmList.length - count}</div>
          ) : null}
          {confirmList.length - count < 0 ? (
            <div style={{ color: "blue" }}>{confirmList.length - count}</div>
          ) : null}
        </div>
        {confirmList.length - count > 0 ? (
          <FontAwesomeIcon icon={faUpLong} size="2x" style={{ color: "red" }} />
        ) : null}
        {confirmList.length - count < 0 ? (
          <FontAwesomeIcon
            icon={faDownLong}
            size="2x"
            style={{ color: "blue" }}
          />
        ) : null}
        {confirmList.length - count === 0 ? (
          <FontAwesomeIcon
            icon={faMinus}
            size="2x"
            style={{ color: "black" }}
          />
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "90%",
          justifyContent: "center",
        }}
      >
        <Link href="/pass-standard/" style={{ width: "100%" }}>
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "rgb(10, 83, 128)",
              whiteSpace: "nowrap",
              fontSize: "15px",
              width: "100%",
            }}
          >
            제조 투입 결정 주문
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default InjectionDash;
