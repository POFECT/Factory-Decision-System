import { Button, Link, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import SizeStandardApi from "src/pages/api/pofect/SizeStandardApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
const SizeDash = () => {
  const [sizeStandardList, setSizeStandardList] = useState([]);
  const count = 16;

  useEffect(() => {
    SizeStandardApi.getList((data) => {
      setSizeStandardList(data.response);
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
      <div>사이즈 기준</div>
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
            {sizeStandardList.length}개
          </Typography>
          <div style={{ color: "red" }}>+{sizeStandardList.length - count}</div>
        </div>
        <FontAwesomeIcon icon={faUpLong} size="2x" style={{ color: "red" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "90%",
          justifyContent: "center",
        }}
      >
        <Link href="/size-standard/" style={{ width: "100%" }}>
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
            사이즈 기준
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default SizeDash;
