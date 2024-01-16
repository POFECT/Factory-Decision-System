// pass-standard/pass-modal.js
import React, { useState } from "react";
import { Box, Card, Grid, Typography, Button } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button as MuiButton, // Rename Button to MuiButton to avoid conflict
} from "@mui/material";
import "react-datasheet-grid/dist/style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
//excel
import SizeStandardApi from "/api/SizeStandardApi";

const SizeDesignModal = ({ open, handleClose }) => {
  const [columns, setColumns] = useState([
    { field: "name", headerName: "", sortable: false, headerAlign: "center" },
    {
      field: "inputValue",
      headerName: "입력창",
      sortable: false,
      width: 150,
      headerAlign: "center",
      type: "number",
      editable: true,
    },
  ]);

  const [rows, setRows] = useState([
    { id: 1, name: "두께", value: "thick", inputValue: 0 },
    { id: 2, name: "폭", value: "width", inputValue: 0 },
    { id: 3, name: "길이", value: "length", inputValue: 0 },
    { id: 4, name: "단중", value: "roll", inputValue: 0 },
  ]);

  const [resultSize, setResultSize] = useState([]);
  const [resultFlag, setResultFlag] = useState(false);

  const resultColumns = [
    {
      field: "processCD",
      headerName: "공정",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "value",
      headerName: "가능한 공장",
      sortable: false,
      width: 150,
      headerAlign: "center",
      type: "number",
    },
  ];

  const testClick = () => {
    const requestSize = {
      thick: rows[0].inputValue,
      width: rows[1].inputValue,
      length: rows[2].inputValue,
      roll: rows[3].inputValue,
    };

    SizeStandardApi.getSizeDesign(requestSize, (data) => {
      const resData = data.response;

      const resultData = resData.map((item, index) => {
        const newItem = { ...item, id: index + 1 };
        if (item.processCD === "10") {
          const value = item.firmPsFacTpList.join(", ");
          return { ...newItem, processCD: "제강", value: value };
        } else if (item.processCD === "20") {
          const value = item.firmPsFacTpList.join(", ");
          return { ...newItem, processCD: "열연", value: value };
        } else if (item.processCD === "30") {
          const value = item.firmPsFacTpList.join(", ");
          return { ...newItem, processCD: "열연정정", value: value };
        } else if (item.processCD === "40") {
          const value = item.firmPsFacTpList.join(", ");
          return { ...newItem, processCD: "냉간압연", value: value };
        } else if (item.processCD === "50") {
          const value = item.firmPsFacTpList.join(", ");
          return { ...newItem, processCD: "1차소둔", value: value };
        } else if (item.processCD === "60") {
          const value = item.firmPsFacTpList.join(", ");
          return { ...newItem, processCD: "2차소둔", value: value };
        } else if (item.processCD === "70") {
          const value = item.firmPsFacTpList.join(", ");
          return { ...newItem, processCD: "도금", value: value };
        } else if (item.processCD === "80") {
          const value = item.firmPsFacTpList.join(", ");
          return { ...newItem, processCD: "정정", value: value };
        }

        return newItem;
      });

      setResultSize(resultData);
    });

    setResultFlag(true);
  };

  const handleCellEditCommit = (params) => {
    const updatedList = rows.map((item) =>
      item.id === params.id ? params : item
    );
    setRows(updatedList);
  };

  const clearResult = () => {
    setResultSize([]);
    setResultFlag(false);
    setRows([
      { id: 1, name: "두께", value: "thick", inputValue: 0 },
      { id: 2, name: "폭", value: "width", inputValue: 0 },
      { id: 3, name: "길이", value: "length", inputValue: 0 },
      { id: 4, name: "단중", value: "roll", inputValue: 0 },
    ]);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%" }}
      maxWidth="xl"
    >
      <DialogTitle>
        <Grid item xs={12}>
          <Typography variant="h5">사이즈 기준 임시 설계</Typography>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            height: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                size="small"
                type="submit"
                variant="contained"
                onClick={clearResult}
                style={{
                  backgroundColor: "#BE2E22",
                  width: "80%",
                  marginRight: "15px",
                }}
              >
                초기화
              </Button>
            </div>
            <div>
              <Button
                size="small"
                type="submit"
                variant="contained"
                onClick={testClick}
                style={{
                  backgroundColor: "#E29E21",
                  width: "50%",
                  marginRight: "15px",
                  marginLeft: "0px",
                }}
              >
                설계
              </Button>
            </div>
          </div>
          <div
            style={{
              height: 300,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <div>
              <Card
                elevation={3}
                style={{
                  flexBasis: "85",
                  marginRight: "16px ",
                  padding: "10px",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",

                    "& .custom-data-grid .MuiDataGrid-columnsContainer, & .custom-data-grid .MuiDataGrid-cell":
                      {
                        borderBottom: "1px solid rgba(225, 234, 239, 1)",
                        borderRight: "1px solid rgba(225, 234, 239, 1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    "& .custom-data-grid .MuiDataGrid-columnHeader": {
                      cursor: "pointer",
                      borderBottom: "1px solid rgba(225, 234, 239, 1)",
                      borderRight: "1px solid rgba(225, 234, 239, 1)",
                    },
                    "& .custom-data-grid .MuiDataGrid-columnHeader--filledGroup  .MuiDataGrid-columnHeaderTitleContainer":
                      {
                        borderBottomStyle: "none",
                      },

                    "& .custom-data-grid .MuiDataGrid-root": {
                      paddingBottom: "0px",
                    },
                    "& .custom-data-grid .MuiDataGrid-columnHeadersInner": {
                      backgroundColor: "#F5F9FF",
                    },
                  }}
                >
                  <DataGrid
                    className="custom-data-grid"
                    columns={columns}
                    rows={rows}
                    disableRowSelectionOnClick
                    rowHeight={31}
                    disableColumnFilter
                    disableColumnMenu
                    hideFooterPagination={true}
                    hideFooter={true}
                    processRowUpdate={(newVal) => {
                      handleCellEditCommit(newVal);
                      return newVal;
                    }}
                  />
                </Box>
              </Card>
            </div>
            <div>
              {resultFlag ? (
                <div
                  style={{
                    height: 300,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    elevation={3}
                    style={{
                      flexBasis: "85",
                      marginRight: "16px ",
                      padding: "10px",
                      height: "109%",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",

                        "& .custom-data-grid .MuiDataGrid-columnsContainer, & .custom-data-grid .MuiDataGrid-cell":
                          {
                            borderBottom: "1px solid rgba(225, 234, 239, 1)",
                            borderRight: "1px solid rgba(225, 234, 239, 1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        "& .custom-data-grid .MuiDataGrid-columnHeader": {
                          cursor: "pointer",
                          borderBottom: "1px solid rgba(225, 234, 239, 1)",
                          borderRight: "1px solid rgba(225, 234, 239, 1)",
                        },
                        "& .custom-data-grid .MuiDataGrid-columnHeader--filledGroup  .MuiDataGrid-columnHeaderTitleContainer":
                          {
                            borderBottomStyle: "none",
                          },

                        "& .custom-data-grid .MuiDataGrid-root": {
                          paddingBottom: "0px",
                        },
                        "& .custom-data-grid .MuiDataGrid-columnHeadersInner": {
                          backgroundColor: "#F5F9FF",
                        },
                      }}
                    >
                      <DataGrid
                        className="custom-data-grid"
                        columns={resultColumns}
                        rows={resultSize}
                        disableRowSelectionOnClick
                        rowHeight={31}
                        disableColumnFilter
                        disableColumnMenu
                        hideFooterPagination={true}
                        hideFooter={true}
                        processRowUpdate={(newVal) => {
                          handleCellEditCommit(newVal);
                          return newVal;
                        }}
                      />
                    </Box>
                  </Card>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default SizeDesignModal;
