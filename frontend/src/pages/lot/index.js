"use strict";
import { useCallback, useRef, useState, useMemo, StrictMode, useEffect } from "react";

import "react-datasheet-grid/dist/style.css";
import { DataGrid, GridCell, useGridApiContext } from "@mui/x-data-grid";
import { Button, Grid, Typography, FormControl, OutlinedInput } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Select from "@mui/material/Select";
import SizeStandardApi from "/src/api/SizeStandardApi";
import SelectColumn from 'react-select';
import makeAnimated from 'react-select/animated';
import Card from "@mui/material/Card";
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
    const [isChecked, setIsChecked] = useState(false);
    const [rowList, setRowList] = useState([
        {
            id: 1,
            강종: "A123123",
            rowSpan: { 강종: "2" },
            구분: "투입대기",
            a9701: 11,


        },
        {
            id: 2,
            강종: "A123123",
            구분: "기투입",
            a9701: 30,

        },
        {
            id: 3,
            강종: "A15703",
            rowSpan: { 강종: "2" },
            구분: "투입대기",
            a1270대기: 500,


        },
        {
            id: 4,
            강종: "A15703",
            구분: "기투입",
            a15703: 10,

        },
        {
            id: 5,
            강종: "A4567",
            rowSpan: { 강종: "2" },
            구분: "투입대기",
            a1270대기: 500,


        },
        {
            id: 6,
            강종: "A4567",
            구분: "기투입",
            a15703: 10,

        },
        {
            id: 7,
            강종: "A6545",
            rowSpan: { 강종: "2" },
            구분: "투입대기",
            a1270대기: 500,


        },
        {
            id: 8,
            강종: "A6545",
            구분: "기투입",
            a15703: 10,

        },
        {
            id: 9,
            강종: "A25456",
            rowSpan: { 강종: "2" },
            구분: "투입대기",
            a1270대기: 500,


        },
        {
            id: 10,
            강종: "A25456",
            구분: "기투입",
            a15703: 10,

        },
        {
            id: 11,
            강종: "A43125",
            rowSpan: { 강종: "2" },
            구분: "투입대기",
            a1270대기: 500,


        },
        {
            id: 12,
            강종: "A43125",
            구분: "기투입",
            a15703: 10,

        },
        {
            id: 13,
            강종: "A15703",
            rowSpan: { 강종: "2" },
            구분: "투입대기",
            a1270대기: 500,


        },
        {
            id: 14,
            강종: "A15703",
            구분: "기투입",
            a15703: 10,

        },
    ]);
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
        { field: "강종", headerName: "강종", width: 150 },
        { field: "구분", headerName: "구분", width: 150, sortable: false },
        { field: "a9701", headerName: "1", width: 80, sortable: false },
        { field: "a9702", headerName: "2", width: 80, sortable: false },
        { field: "a9703", headerName: "3", width: 80, sortable: false },
        { field: "a970대기", headerName: "대기", width: 80, sortable: false },
        { field: "a12701", headerName: "1", width: 80, sortable: false },
        { field: "a12702", headerName: "2", width: 80, sortable: false },
        { field: "a12703", headerName: "3", width: 80, sortable: false },
        { field: "a1270대기", headerName: "대기", width: 80, sortable: false },
        { field: "a15701", headerName: "1", width: 80, sortable: false },
        { field: "a15702", headerName: "2", width: 80, sortable: false },
        { field: "a15703", headerName: "3", width: 80, sortable: false },
        { field: "a1570대기", headerName: "대기", width: 80, sortable: false },
        { field: "a15700", headerName: "1", width: 80, sortable: false },
        { field: "a157001", headerName: "2", width: 80, sortable: false },
        { field: "a157002", headerName: "3", width: 80, sortable: false },
        { field: "a15700대기", headerName: "대기", width: 80, sortable: false },
        { field: "합계", headerName: "1", width: 80, sortable: false },
        { field: "합계2", headerName: "2", width: 80, sortable: false },
        { field: "합계3", headerName: "3", width: 80, sortable: false },
        { field: "합계대기", headerName: "대기", width: 80, sortable: false },
    ];

    const columnGroupingModel = [
        {
            groupId: "970",
            children: [{ field: "a9701" }, { field: "a9702" }, { field: "a9703" }, { field: "a970대기" }],
        },
        {
            groupId: "1270",
            children: [{ field: "a12701" }, { field: "a12702" }, { field: "a12703" }, { field: "a1270대기" }],
        },
        {
            groupId: "1570",
            children: [{ field: "a15701" }, { field: "a15702" }, { field: "a15703" }, { field: "a1570대기" }],
        },
        {
            groupId: "1570~",
            children: [{ field: "a15700" }, { field: "a157001" }, { field: "a157002" }, { field: "a15700대기" }],
        },
        {
            groupId: "합계량",
            children: [{ field: "합계" }, { field: "합계2" }, { field: "합계3" }, { field: "합계대기" }],
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
                        <InputLabel id="label1" style={{ paddingTop: 13, marginBottom: 100 }}>
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ paddingRight: 10 }}>진도</div>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label style={{ fontSize: '16px', paddingLeft: 5 }}>
                        기투입 포함
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 30, paddingRight: 10 }}>
                        강종별</div>
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


                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingBlock: "15px"
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 30, paddingRight: 10 }}>품종</div>
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

            <Card style={{ height: 600 }}>
                <DataGrid
                    experimentalFeatures={{ columnGrouping: true }}
                    disableRowSelectionOnClick
                    rows={rowList}
                    columns={columns}
                    onCellClick={(e) => {
                        console.log(e);
                    }}
                    columnGroupingModel={columnGroupingModel}
                    slots={{
                        cell: MyCell,
                    }}
                />
            </Card>

        </div>
    );
};

export default Lot;