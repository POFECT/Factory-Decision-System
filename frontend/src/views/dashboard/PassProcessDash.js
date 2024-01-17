import { Button, Link, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import PassStandardApi from "src/pages/api/pofect/ProcessStandardApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const PassProcessDash = () => {
  const [passStandard, setPassStandard] = useState([]);
  const count = 50;
  useEffect(() => {
    PassStandardApi.getList((data) => {
      setPassStandard(data.response);
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
      <div>경유 공정 기준</div>
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
            {passStandard.length}개
          </Typography>
          {passStandard.length - count > 0 ? (
            <div style={{ color: "red" }}>+{passStandard.length - count}</div>
          ) : null}
          {passStandard.length - count < 0 ? (
            <div style={{ color: "blue" }}>{passStandard.length - count}</div>
          ) : null}
        </div>
        {passStandard.length - count > 0 ? (
          <FontAwesomeIcon icon={faUpLong} size="2x" style={{ color: "red" }} />
        ) : null}
        {passStandard.length - count < 0 ? (
          <FontAwesomeIcon
            icon={faDownLong}
            size="2x"
            style={{ color: "blue" }}
          />
        ) : null}
        {passStandard.length - count === 0 ? (
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
            경유 공정 기준
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default PassProcessDash;
