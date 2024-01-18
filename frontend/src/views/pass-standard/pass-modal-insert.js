import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const InsertFormComponent = ({
  open,
  onSave,
  handleClose,
  columns,
  codeNameList,
  existingOrdPdtItdsCdNList,
}) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  //품명
  const [ordPdtItdsCdN, setOrdPdtItdsCdN] = useState("");
  //구분
  const [millCd, setmillCd] = useState("");
  //품종
  const [productType, setProductType] = useState("");

  //문자 에러
  const [error, setError] = useState("");

  const [error2, setError2] = useState("");

  const handleSave = () => {
    if (!millCd) {
      setError("구분 값이 비어있습니다.");
    } else if (!productType) {
      setError("품종 값이 비어있습니다.");
    } else if (!ordPdtItdsCdN) {
      setError("품명 값이 비어있습니다.");
    } else if (existingOrdPdtItdsCdNList.includes(ordPdtItdsCdN)) {
      setError("이미 사용 중인 품명입니다.");
    } else if (productType.substring(0, 2) !== ordPdtItdsCdN.substring(0, 2)) {
      setError("품종과 품명의 첫 두 글자가 일치하지 않습니다.");
    } else if (ordPdtItdsCdN.length == 2) {
      setError("품명은 세 글자부터 가능합니다.");
    } else if (selectedColumns.length === 0) {
      setError2("하나 이상의 공정을 선택해주세요.");
    } else {
      // If everything is valid, proceed with saving
      onSave({ ordPdtItdsCdN, selectedColumns, millCd, productType });
      setOrdPdtItdsCdN("");
      setSelectedColumns([]);
      setmillCd("");
      setProductType("");
      setError("");
      setError2("");
    }
  };

  const handleCancel = () => {
    handleClose();

    setOrdPdtItdsCdN("");
    setSelectedColumns([]);
    setmillCd("");
    setProductType("");
    setError("");
    setError2("");
  };

  const handleCheckboxChange = (field) => {
    if (selectedColumns.includes(field)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== field));
    } else {
      setSelectedColumns([...selectedColumns, field]);
    }
  };
  const handleProductTypeChange = (value) => {
    setProductType(value);
    setOrdPdtItdsCdN(value.slice(0, 2));
  };

  const handleOrdPdtItdsCdNChange = (e) => {
    const inputValue = e.target.value.toUpperCase();

    {
      setOrdPdtItdsCdN(inputValue.slice(0, 4));
    }
    if (/[^A-Z]/.test(inputValue.slice(2, 4))) {
      setError("품명에는 대문자만 입력 가능합니다.");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    setOrdPdtItdsCdN("");
    setSelectedColumns([]);
    setmillCd("");
    setProductType("");
    setError("");
    setError2("");
  }, [open]);

  return (

      <Dialog
          open={open}
          onClose={handleClose}
          sx={{ width: "100%",     overflow: 'hidden',
          }}
          maxWidth="xl"
      >
        <div style={{ maxWidth: "xl" }}>
          <DialogTitle>

          <Grid item xs={12} sx={{ paddingBottom: 4 }}>
            <Typography variant="h4">데이터 추가</Typography>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{
          overflowY: 'hidden',
        }}>
          <DialogContentText>
            <divdafdsfads
                style={{
                  // display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "-20px",
                }}
            >
            <div style={{ marginLeft: 5, marginRight: 5 }}>
              <p
                style={{ color: "#0A5380", marginRight: 16, marginBottom: 40 }}
              >
                구분과 품종 선택 후, 품명을 입력하세요:
                <br />
              </p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FormControl style={{ width: "30%", marginBottom: 6 }}>
                  <InputLabel id="label1">구분</InputLabel>
                  <Select
                    labelId="label1"
                    label="구분"
                    value={millCd}
                    defaultValue="T"
                    onChange={(e) => setmillCd(e.target.value)}
                    style={{ height: 55 }}
                    error={Boolean(error)}
                  >
                    <MenuItem value="T">포항</MenuItem>
                  </Select>
                </FormControl>
                <FormControl style={{ width: "30%", marginBottom: 6 }}>
                  <InputLabel id="label2" style={{ marginLeft: 0 }}>
                    품종
                  </InputLabel>
                  <Select
                    labelId="label2"
                    label="품종"
                    value={productType}
                    defaultValue="ALL"
                    onChange={(e) => handleProductTypeChange(e.target.value)}
                    style={{ height: 55 }}
                    error={Boolean(error)}
                  >
                    {codeNameList.list.map((code, idx) => (
                      <MenuItem key={idx} value={code.cdNm}>
                        {code.cdNm}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{ width: "30%", marginBottom: 6 }}>
                  <TextField
                    label="품명(4글자 이내)"
                    labelColor="grey"
                    variant="outlined"
                    fullWidth
                    value={ordPdtItdsCdN}
                    onChange={handleOrdPdtItdsCdNChange}
                    error={Boolean(error)}
                  />
                </FormControl>
              </div>
              <div style={{ height: "16px", marginTop: "4px" }}>
                {error && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ height: "100%" }}
                  >
                    {error}
                  </Typography>
                )}
              </div>
            </div>

            <div style={{ marginLeft: 5, marginRight: 5 }}>
              <h3 style={{ marginBottom: 20 }}></h3>
              <br />
              <p
                style={{ color: "#0A5380", marginRight: 16, marginBottom: 30 }}
              >
                추가할 공정을 선택하세요:
              </p>
              <div style={{ width: "112%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 16,
                    marginLeft: 10,
                  }}
                >
                  {columns.map((column, index) => {
                    if (column.field !== "ordPdtItdsCdN") {
                      if (index < columns.length / 2) {
                        return (
                          <FormControlLabel
                            key={column.field}
                            control={
                              <Checkbox
                                checked={selectedColumns.includes(column.field)}
                                onChange={() =>
                                  handleCheckboxChange(column.field)
                                }
                                color="primary"
                              />
                            }
                            style={{ width: "40%" }}
                            label={column.headerName}
                          />
                        );
                      }
                    }
                    return null;
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  {columns.map((column, index) => {
                    if (column.field !== "ordPdtItdsCdN") {
                      // Display the second half in the second row
                      if (index >= columns.length / 2) {
                        return (
                          <FormControlLabel
                            key={column.field}
                            control={
                              <Checkbox
                                checked={selectedColumns.includes(column.field)}
                                onChange={() =>
                                  handleCheckboxChange(column.field)
                                }
                                color="primary"
                              />
                            }
                            label={column.headerName}
                            style={{ width: "40%" }}
                          />
                        );
                      }
                    }
                    return null;
                  })}
                </div>
              </div>
              <div style={{ height: "16px", marginTop: "12px" }}>
                {error2 && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ height: "100%" }}
                  >
                    {error2}
                  </Typography>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 50,
              }}
            >
              <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#0A5380",
                    whiteSpace: "nowrap",
                  }}
              >
                저장
              </Button>
              <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  onClick={handleCancel}
                  style={{
                    backgroundColor: "darkred",
                    whiteSpace: "nowrap",
                  }}
              >
                닫기
              </Button>
              {/*<Button onClick={handleSave} style={{ marginRight: 8 }}>*/}
              {/*  저장*/}
              {/*</Button>*/}
              {/*<Button onClick={handleCancel} color="primary">*/}
              {/*  취소*/}
              {/*</Button>*/}
            </div>
            </divdafdsfads>
          </DialogContentText>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default InsertFormComponent;
