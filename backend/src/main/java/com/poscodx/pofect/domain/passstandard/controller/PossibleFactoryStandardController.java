package com.poscodx.pofect.domain.passstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.repository.PossibleFactoryStandardRepository;
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
    private final PossibleFactoryStandardService possibleFactoryStandardService;
    private final PossibleFactoryStandardRepository possibleFactoryStandardRepository;
    @GetMapping("/getPossibleAll")
    @ApiOperation(value = "가능통과공장코드 리스트 조회", notes = "전체 가통기준 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getPossibleStandardList() {
        List<PossibleFactoryStandardResDto> result = possibleFactoryStandardService.getList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("/getPossibleCodes")
    @ApiOperation(value = "가능통과공장코드 Grid맞춤데이터 조회", notes = "전체 가통기준 데이터를 조회한다.")
    public List<Object[]> getGridData(){
        return possibleFactoryStandardRepository.getGridData();
    }
}
