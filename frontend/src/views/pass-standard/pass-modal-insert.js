import React, { useState } from 'react';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import PassStandardApi from "src/api/PassStandardApi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton, // Rename Button to MuiButton to avoid conflict
} from '@mui/material';

const InsertFormComponent = ({ open, onSave, handleClose, columns, codeNameList }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  //품명
  const [ordPdtItdsCdN, setordPdtItdsCdN] = useState('');
  //구분
  const [millCd, setmillCd] = useState('');
  //품종
  const [productType, setProductType] = useState('');


  const handleSave = () => {
    onSave({ ordPdtItdsCdN, selectedColumns, millCd, productType });


    setordPdtItdsCdN('');
    setSelectedColumns([]);
    setmillCd('');
    setProductType('');
  };

  const handleCancel = () => {
      handleClose();

    setordPdtItdsCdN('');
    setSelectedColumns([]);
    setmillCd('');
    setProductType('');
  };

  const handleCheckboxChange = (field) => {
    if (selectedColumns.includes(field)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== field));
    } else {
      setSelectedColumns([...selectedColumns, field])
    }
  };

  const handleProductTypeChange = (value) => {
    setProductType(value);
    setordPdtItdsCdN(`${value}`); // You can customize this as needed
  };


    return (
        <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }} maxWidth="xl">
            <div style={{ maxWidth: '720px' }}>
                <DialogTitle>
                    <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                        <Typography variant="h4">데이터 추가</Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div  style={{ marginLeft: 5 , marginRight:5}}>

                            <p style={{ color: '#0A5380', marginRight: 16, marginBottom: 40 }}>
                                구분과 품종 선택 후, 품명을 입력하세요:<br />
                            </p>


                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormControl style={{ width: '30%', marginBottom: 6 }}>
                                    <InputLabel id="label1">구분</InputLabel>
                                    <Select
                                        labelId="label1"
                                        label="구분"
                                        value={millCd}
                                        defaultValue="T"
                                        onChange={(e) => setmillCd(e.target.value)}
                                        style={{ height: 55 }}
                                    >
                                        <MenuItem value="T">포항</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl style={{ width: '30%', marginBottom: 6 }}>
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
                                    >
                                        {codeNameList.list.map((code, idx) => (
                                            <MenuItem key={idx} value={code.cdNm}>
                                                {code.cdNm}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl style={{ width: '30%', marginBottom: 6 }}>
                                    <TextField
                                        label="품명"
                                        labelColor="grey"
                                        variant="outlined"
                                        fullWidth
                                        value={ordPdtItdsCdN}
                                        onChange={(e) => setordPdtItdsCdN(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div  style={{ marginLeft: 5 , marginRight:5}}>

                        <h3 style={{ marginBottom: 20 }}></h3>
                            <br />
                            <p style={{ color: '#0A5380', marginRight: 16, marginBottom: 30 }}>
                                추가할 공정을 선택하세요:
                            </p>
                            <div style={{width :'112%'}}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, marginLeft: 10 }}>
                                {columns.map((column, index) => {
                                    if (column.field !== 'ordPdtItdsCdN') {
                                        if (index < columns.length / 2) {
                                            return (
                                                <FormControlLabel
                                                    key={column.field}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedColumns.includes(column.field)}
                                                            onChange={() => handleCheckboxChange(column.field)}
                                                            color="primary"
                                                        />
                                                    }
                                                    style={{ width: '40%'}}
                                                    label={column.headerName}
                                                />
                                            );
                                        }
                                    }
                                    return null;
                                })}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
                                {columns.map((column, index) => {
                                    if (column.field !== 'ordPdtItdsCdN') {
                                        // Display the second half in the second row
                                        if (index >= columns.length / 2) {
                                            return (
                                                <FormControlLabel
                                                    key={column.field}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedColumns.includes(column.field)}
                                                            onChange={() => handleCheckboxChange(column.field)}
                                                            color="primary"
                                                        />
                                                    }
                                                    label={column.headerName}
                                                    style={{ width: '40%' }}
                                                />
                                            );
                                        }
                                    }
                                    return null;
                                })}
                            </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 50 }}>
                            <Button onClick={handleSave} style={{ marginRight: 8 }}>
                                저장
                            </Button>
                            <Button onClick={handleCancel} color="primary">
                                취소
                            </Button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default InsertFormComponent;