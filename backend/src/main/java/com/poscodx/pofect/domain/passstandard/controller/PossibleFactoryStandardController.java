package com.poscodx.pofect.domain.passstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.service.PossibleFactoryStandardService;
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

@Api(value = "PossibleStandard API", tags = {"가통확통기준 / 가통조회 "})
@CrossOrigin("*")
@RequestMapping("/factory-standard")
@RestController
@RequiredArgsConstructor
public class PossibleFactoryStandardController {
    private final PossibleFactoryStandardService possibleStandardService;
    @GetMapping("")
    @ApiOperation(value = "주문 데이터 리스트 조회", notes = "전체 주문 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getOrderList() {
        List<PossibleFactoryStandardResDto> result = possibleStandardService.getList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

}
