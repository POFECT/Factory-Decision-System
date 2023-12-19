package com.poscodx.pofect.domain.passstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.passstandard.dto.ConfirmFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;
import com.poscodx.pofect.domain.passstandard.service.ConfirmFactoryStandardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "ConfirmStandard API", tags = {"가통확통기준 / 확통전체조회 "})
@CrossOrigin("*")
@RequestMapping("/factory-standard")
@RestController
@RequiredArgsConstructor
public class ConfirmFactoryStandardController {
    private final ConfirmFactoryStandardService confirmFactoryStandardService;
//    @GetMapping("/getConfirmAll")
//    @ApiOperation(value = "확정통과공장코드 리스트 조회", notes = "전체 확통기준 데이터를 조회한다.")
//    public ResponseEntity<ResponseDto> getConfirmStandardList() {
//        List<ConfirmFactoryStandardResDto> result = confirmFactoryStandardService.getList();
//        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
//    }
    @GetMapping("/getConfirmCodes")
    @ApiOperation(value = "확정통과공장코드 Grid 맞춤데이터 조회", notes = "전체 확통기준 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getGridData(){
        List<Map<String, Object>> result = confirmFactoryStandardService.getGridData();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("/confirmfactory/{code}")
    @ApiOperation(value = "해당 공정의 공장 리스트 조회", notes = "공정 코드로 해당 공정의 전체 공장 리스트를 조회한다.")
    public ResponseEntity<ResponseDto> getFactoryData(@PathVariable(name = "code") String process){
        List<ConfirmFactoryStandardResDto> result = confirmFactoryStandardService.getFactories(process);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "전체 공정의 공장 리스트 조회", notes = "전체 공정마다 각각의 공장 리스트를 조회한다.")
    public ResponseEntity<ResponseDto> getFactoryList(){
        List<ConfirmFactoryStandardResDto> result = confirmFactoryStandardService.getFactoryList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

}
