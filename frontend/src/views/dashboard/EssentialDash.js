import { Button, Link, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
import EssentialStandardApi from "src/pages/api/pofect/EssentialStandardApi";

const EssentialDash = () => {
  const [essentialList, setessentialList] = useState([]);
  const count = 52;

  useEffect(() => {
    EssentialStandardApi.getEssentialStandardList((data) => {
      setessentialList(data.response);
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
      <div>필수재 기준</div>
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
            {essentialList.length}개
          </Typography>
          {essentialList.length - count > 0 ? (
            <div style={{ color: "red" }}>+{essentialList.length - count}</div>
          ) : null}
          {essentialList.length - count < 0 ? (
            <div style={{ color: "blue" }}>{essentialList.length - count}</div>
          ) : null}
        </div>
        {essentialList.length - count > 0 ? (
          <FontAwesomeIcon icon={faUpLong} size="2x" style={{ color: "red" }} />
        ) : null}
        {essentialList.length - count < 0 ? (
          <FontAwesomeIcon
            icon={faDownLong}
            size="2x"
            style={{ color: "blue" }}
          />
        ) : null}
        {essentialList.length - count === 0 ? (
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
        <Link href="/essential-goods/" style={{ width: "100%" }}>
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
            필수재 기준
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default EssentialDash;
