// pass-standard/pass-modal.js
import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    Grid,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button
} from "@mui/material";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button as MuiButton, // Rename Button to MuiButton to avoid conflict
} from '@mui/material';
import "react-datasheet-grid/dist/style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
//excel
import SizeStandardApi from 'src/api/SizeStandardApi';

function MyCell(props) {
    let style = {
        minWidth: props.width,
        maxWidth: props.width,
        minHeight: props.height,
        maxHeight: props.height === "auto" ? "none" : props.height,
        ...props.style,
        //중앙배열
        display: "flex",
        alignItems: "center",
        headerAlign: 'center',
        justifyContent: "center",
    };
    const apiRef = useGridApiContext();
    const row = apiRef.current.getRow(props.rowId);

    if (row && row.rowSpan && row.rowSpan[props.column.field]) {
        const span = row.rowSpan[props.column.field];
        style = {
            ...style,
            minHeight: props.height * span,
            maxHeight: props.height * span,
            backgroundColor: "gray",
            zIndex: 1,
        };
    }
    return <GridCell {...props} style={style} />;
}

const SizeDesignModal = ({ open, handleClose }) => {
    const [columns, setColumns] = useState([
        { field: "name", headerName: "", sortable: false, headerAlign: 'center' },
        { field: "inputValue", headerName: "입력창", sortable: false, width: 150, headerAlign: 'center', type: 'number', editable: true },
    ]);

    const [rows, setRows] = useState([
        { id: 1, name: "두께", value: "thick", inputValue: 0 },
        { id: 2, name: "폭", value: "width", inputValue: 0 },
        { id: 3, name: "길이", value: "length", inputValue: 0 },
        { id: 4, name: "단중", value: "roll",  inputValue: 0 }
    ]);

    const [resultSize, setResultSize] = useState([]);

    const testClick = () => {
        const requestSize = {
            thick: rows[0].inputValue,
            width: rows[1].inputValue,
            length: rows[2].inputValue,
            roll: rows[3].inputValue,
        }
        SizeStandardApi.getSizeDesign(requestSize, (data) => {
            setResultSize(data.response);
        })
        console.log(resultSize);

    }

    const handleCellEditCommit = (params) => {
        const updatedList = rows.map((item) =>
          item.id === params.id ? params : item
        );
        setRows(updatedList);
      };

    return (
        <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }} maxWidth="xl">
            <DialogTitle>
                <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                    <Typography variant="h5">사이즈 기준 임시 설계</Typography>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}>
                        <div>
                            <Button
                                size="small"
                                type="submit"
                                variant="contained"
                                onClick={testClick}
                                style={{ backgroundColor: "#E29E21", width: "50%", marginRight: "15px" }}
                            >
                                설계
                            </Button>
                        </div>
                    </div>
                    <div style={{ height: 300, display: "flex", justifyContent: "center", }}>
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
                                    }, "& .custom-data-grid .MuiDataGrid-columnHeadersInner": {
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
                                        handleCellEditCommit(newVal)
                                        return newVal;
                                      }}
                                />
                            </Box>
                        </Card>
                    </div>

                    {resultSize.size == undefined ? "" : <div style={{ height: 300, display: "flex", justifyContent: "center", }}>
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
                                    }, "& .custom-data-grid .MuiDataGrid-columnHeadersInner": {
                                        backgroundColor: "#F5F9FF",
                                    },
                                }}
                            >
                                
                            </Box>
                        </Card>
                    </div>}
                    
                </DialogContentText>

            </DialogContent>
        </Dialog>
    );
};

export default SizeDesignModal;