import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import PassStandardApi from "/api/ProcessStandardApi";

const PassProcessDash = () => {
  const [passStandard, setPassStandard] = useState([]);

  useEffect(() => {
    PassStandardApi.getList((data) => {
      setPassStandard(data.response);
      console.log(data.response);
    });
  }, []);
  return <Card elevation={3} style={{ padding: "15px" }}></Card>;
};

export default PassProcessDash;
