import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import PassStandardApi from "src/api/PassStandardApi";

const InsertFormComponent = ({ onSave, onCancel, columns, codeNameList }) => {
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
    onCancel();

    setordPdtItdsCdN('');
    setSelectedColumns([]);
    setmillCd('');
    setProductType('');
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
    setordPdtItdsCdN(`${value}`); // You can customize this as needed
  };


  return (
    <div>
      <h3 style={{ marginBottom: 40 }}></h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl style={{ width: '30%', marginBottom: 16 }}>
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
        <FormControl style={{ width: '30%', marginBottom: 16 }}>
          <InputLabel id="label2" style={{ marginLeft: 0 }}>품종</InputLabel>
          <Select
            labelId="label2"
            label="품종"
            value={productType}
            defaultValue="ALL"
            onChange={(e) => handleProductTypeChange(e.target.value)}
            style={{ height: 55 }}
          >
            <MenuItem value="ALL">ALL</MenuItem>
            {codeNameList.list.map((code, idx) => (
              <MenuItem key={idx} value={code.cdNm}>
                {code.cdNm}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: '30%', marginBottom: 16 }}>
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

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, marginTop: 30 }}>
        {columns.map((column) => {
          if (column.field !== 'ordPdtItdsCdN') {
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
              />
            );
          }
          return null;
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 50 }}>
        <Button onClick={handleSave} style={{ marginRight: 8 }}>
          저장
        </Button>
        <Button onClick={handleCancel} color="primary">
          취소
        </Button>
      </div>
    </div>
  );
};

export default InsertFormComponent;
