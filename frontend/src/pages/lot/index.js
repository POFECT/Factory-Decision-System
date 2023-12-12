"use strict";
import {
    useCallback,
    useRef,
    useState,
    useMemo,
    StrictMode,
    useEffect,
} from "react";

import "react-datasheet-grid/dist/style.css";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import {
    Grid,
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput,
    Box,
    Card,
} from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SelectColumn from 'react-select';
import makeAnimated from 'react-select/animated';
import LotApi from "src/api/LotApi";
// import { Grid, Typography } from "@mui/material";

function MyCell(props) {
    let style = {
        minWidth: props.width,
        maxWidth: props.width,
        minHeight: props.height,
        maxHeight: props.height === "auto" ? "none" : props.height,
        ...props.style,
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
            color: "white",
            zIndex: 1,
        };
    }
    return <GridCell {...props} style={style} />;
}

const Lot = () => {
    const [lotData, setLotData] = useState([]);

    useEffect(() => {
        LotApi.getList((data) => {
            const resData = data.response;

            const resultData = resData.map((item, index) => {
                const newItem = { ...item, id: index + 1 };
                if (item && item.faConfirmFlag === "E"){
                    newItem = {...newItem, faConfirmFlag : "투입대기", rowSpan: {smSteelGrdN:2}}
                    if (item && item.widthGroups && item.widthGroups.width_970_stand){
                        newItem = {...newItem, width_970_stand:item.widthGroups.width_970_stand}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_1270_stand){
                        newItem = {...newItem, width_1270_stand:item.widthGroups.width_1270_stand}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_1570_stand){
                        newItem = {...newItem, width_1570_stand:item.widthGroups.width_1570_stand}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_over_15702_stand){
                        newItem = {...newItem, width_over_15702_stand:item.widthGroups.width_over_15702_stand}
                    }
                    return newItem;
                } else if (item && item.faConfirmFlag === "F") {
                    newItem = {...newItem, faConfirmFlag : "기투입"}
                    if (item && item.widthGroups && item.widthGroups.width_9701){
                        newItem = {...newItem, width_9701:item.widthGroups.width_9701}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_9702){
                        newItem = {...newItem, width_9702:item.widthGroups.width_9702}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_12701){
                        newItem = {...newItem, width_12701:item.widthGroups.width_12701}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_12702){
                        newItem = {...newItem, width_12702:item.widthGroups.width_12702}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_15701){
                        newItem = {...newItem, width_15701:item.widthGroups.width_15701}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_15702){
                        newItem = {...newItem, width_15702:item.widthGroups.width_15702}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_over_15701){
                        newItem = {...newItem, width_over_15701:item.widthGroups.width_over_15701}
                    }
                    if (item && item.widthGroups && item.widthGroups.width_over_15702){
                        newItem = {...newItem, width_over_15702:item.widthGroups.width_over_15702}
                    }
                }
                return { ...newItem} 
            });
            
            setLotData(resultData);
        });
    }, []);



    const [isChecked, setIsChecked] = useState(false);

    const buttonList = [

        {
            value: "22",
            label: "SLAB"
        },
        {
            value: "33",
            label: "HR"
        },
        {
            value: "44",
            label: "PO"
        },
        {
            value: "55",
            label: "FH"
        },
        {
            value: "66",
            label: "CR"
        },
        {
            value: "77",
            label: "BP"
        },
        {
            value: "88",
            label: "GI"
        },
        {
            value: "99",
            label: "CPM3/5"
        },
        {
            value: "1010",
            label: "PM1.5"
        },
        {
            value: "1111",
            label: "GA"
        },
        {
            value: "1212",
            label: "EG"
        },
        {
            value: "1313",
            label: "HG"
        },
        {
            value: "1414",
            label: "GO"
        },
        {
            value: "1515",
            label: "NO"
        },

        {
            value: "1616",
            label: "HGA"
        },
        {
            value: "1717",
            label: "H.PM3/5"
        },
        {
            value: "1818",
            label: "AlFe"
        },

    ];

    const testList = [

        {
            value: "777",
            label: "극저"
        },
        {
            value: "888",
            label: "중저탄"
        },
        {
            value: "999",
            label: "중고탄"
        },
    ];

    const columns = [
        { field: "smSteelGrdN", headerName: "강종", width: 150, headerAlign: "center" },
        { field: "faConfirmFlag", headerName: "구분", width: 150, sortable: false, headerAlign: "center" },
        { field: "width_9701", headerName: "1", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_9702", headerName: "2", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_970_stand", headerName: "대기", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_12701", headerName: "1", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_12702", headerName: "2", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_1270_stand", headerName: "대기", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_15701", headerName: "1", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_15702", headerName: "2", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_1570_stand", headerName: "대기", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_over_15701", headerName: "1", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_over_15702", headerName: "2", width: 80, sortable: false, headerAlign: "center" },
        { field: "width_over_15702_stand", headerName: "대기", width: 80, sortable: false, headerAlign: "center" },
        { field: "합계", headerName: "1", width: 80, sortable: false, headerAlign: "center" },
        { field: "합계2", headerName: "2", width: 80, sortable: false, headerAlign: "center" },
        { field: "합계대기", headerName: "대기", width: 80, sortable: false, headerAlign: "center" },
    ];

    const columnGroupingModel = [
        {
            groupId: "970",
            children: [{ field: "width_9701" }, { field: "width_9702" }, { field: "width_970_stand" }],
            headerAlign: "center"
        },
        {
            groupId: "1270",
            children: [{ field: "width_12701" }, { field: "width_12702" }, { field: "width_1270_stand" }],
            headerAlign: "center"
        },
        {
            groupId: "1570",
            children: [{ field: "width_15701" }, { field: "width_15702" }, { field: "width_1570_stand" }],
            headerAlign: "center"
        },
        {
            groupId: "1570~",
            children: [{ field: "width_over_15701" }, { field: "width_over_15702" }, { field: "width_over_15702_stand" }],
            headerAlign: "center"
        },
        {
            groupId: "합계량",
            children: [{ field: "합계" }, { field: "합계2" }, { field: "합계3" }, { field: "합계대기" }],
            headerAlign: "center"
        },
    ];
    

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: 380,
        }),
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div style={{ height: "600px", width: "100%" }}>
            <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                <Typography variant="h3">출강Lot</Typography>
            </Grid>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <div>
                    <FormControl
                        sx={{ m: 1 }}
                        style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            marginRight: 10,
                        }}
                    >
                        <InputLabel
                            id="label1"
                            style={{ paddingTop: 13, marginBottom: 100 }}
                        >
                            출강주
                        </InputLabel>
                        <Select
                            labelId="분류"
                            id="demo-multiple-name"
                            defaultValue="test"
                            input={<OutlinedInput label="구분" />}
                            onChange={(e) => {
                                console.log(e);
                            }}
                            style={{ height: 40, width: 150 }}
                        >
                            <MenuItem value="test">20231121</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Button size="small" type="submit" variant="contained">
                        조회
                    </Button>
                    <Button size="small" type="submit" variant="contained">
                        Excel
                    </Button>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ paddingRight: 10 }}>진도</div>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label style={{ fontSize: "16px", paddingLeft: 5 }}>
                        기투입 포함
                    </label>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: 30,
                            paddingRight: 10,
                        }}
                    >
                        강종별
                    </div>
                    <div>
                        <SelectColumn
                            styles={customStyles}
                            closeMenuOnSelect={false}
                            components={makeAnimated}
                            isMulti
                            options={testList}
                        />
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        paddingBlock: "15px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: 30,
                            paddingRight: 10,
                        }}
                    >
                        품종
                    </div>
                    <div>
                        <SelectColumn
                            styles={customStyles}
                            closeMenuOnSelect={false}
                            components={makeAnimated}
                            isMulti
                            options={buttonList}
                        />
                    </div>
                </div>
            </div>
            <Card>
                <Box
                    sx={{
                        height: 600,
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
                    }}
                >
                    <DataGrid
                        className="custom-data-grid"
                        experimentalFeatures={{ columnGrouping: true }}
                        disableRowSelectionOnClick
                        rows={lotData}
                        columns={columns}
                        onCellClick={(e) => {
                            console.log(e);
                        }}
                        columnGroupingModel={columnGroupingModel}
                        slots={{
                            cell: MyCell,
                        }}
                    />
                </Box>
            </Card>

        </div>
    );
};

export default Lot;
