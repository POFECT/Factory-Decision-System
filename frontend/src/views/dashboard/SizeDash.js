import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import PassStandardApi from "src/pages/api/pofect/ProcessStandardApi";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const SizeDash = () => {
  const [passStandard, setPassStandard] = useState([]);

  useEffect(() => {
    PassStandardApi.getList((data) => {
      setPassStandard(data.response);
      console.log(data.response);
    });
  }, []);
  return (
    <Card elevation={3} style={{ padding: "15px" }}>
      <div>사이즈 기준</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <div>
          <Typography variant="h4" sx={{ mr: 2 }} style={{ color: "#212121" }}>
            52개
          </Typography>
          <div style={{ color: "#4dd6d3" }}>+2</div>
        </div>
        <ArrowUpwardIcon
          style={{
            fontWeight: "bold",
            width: "60px",
            height: "50px",
            color: "#4dd6d3",
          }}
        />
      </div>
      <Button
        size="small"
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#E29E21" }}
      >
        경유 공정
      </Button>
    </Card>
  );
};

export default SizeDash;
