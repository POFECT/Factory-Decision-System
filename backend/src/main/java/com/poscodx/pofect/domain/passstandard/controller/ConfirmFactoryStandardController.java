package com.poscodx.pofect.domain.passstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.passstandard.dto.ConfirmFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.service.ConfirmFactoryStandardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "ConfirmStandard API", tags = {"가통확통기준 / 확통전체조회 "})
@CrossOrigin("*")
@RequestMapping("/factory-standard")
@RestController
@RequiredArgsConstructor
public class ConfirmFactoryStandardController {
    private final ConfirmFactoryStandardService confirmStandardService;
    @GetMapping("/getConfirmAll")
    @ApiOperation(value = "확정통과공장코드 리스트 조회", notes = "전체 확통기준 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getConfirmStandardList() {
        List<ConfirmFactoryStandardResDto> result = confirmStandardService.getList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }
    @GetMapping("/getConfirmCodes")
    @ApiOperation(value = "확정통과공장코드 Grid맞춤데이터 조회", notes = "전체 확통기준 데이터를 조회한다.")
    public List<Object[]> getGridData(){
        return confirmStandardService.getGridData();
    }
}
