package com.poscodx.pofect.domain.passstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardBtiPosReqDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleChangeReqDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleChangeResultResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;
import com.poscodx.pofect.domain.passstandard.repository.PossibleFactoryStandardRepository;
import com.poscodx.pofect.domain.passstandard.service.PossibleFactoryStandardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.ILoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "PossibleStandard API", tags = {"가통확통기준 / 가통조회 "})
@CrossOrigin("*")
@RequestMapping("/factory-standard")
@RestController
@RequiredArgsConstructor
public class PossibleFactoryStandardController {
    private final PossibleFactoryStandardService possibleFactoryStandardService;

    @GetMapping("/getPossibleCodes")
    @ApiOperation(value = "가능통과공장코드 Grid 맞춤데이터 조회", notes = "전체 가통기준 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getGridData(){
        List<PossibleFactoryStandardResDto> result = possibleFactoryStandardService.getGridData();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @PostMapping("/possibleToConfirm")
    @ApiOperation(value="필수재에서 받은 가통코드를 확통 공장 번호 변환", notes="가통 코드 > 확통 공장 번호")
    public ResponseEntity<ResponseDto> getPossibleToConfirm(@RequestBody List<EssentialStandardBtiPosReqDto> essentialStandardBtiPosReqDtoList){
        List<PossibleToConfirmResDto> result = possibleFactoryStandardService.possibleToConfirm(essentialStandardBtiPosReqDtoList);

        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @PatchMapping("/updatePossibleFactory")
    @ApiOperation(value="가통기준 상세에서 코드 변환", notes="가통기준 상세에서 코드 변환하기")
    public ResponseEntity<ResponseDto> updatePossibleFactory(@RequestBody PossibleChangeReqDto checkedFactory) {
        PossibleChangeResultResDto result = possibleFactoryStandardService.updateFeasibleRoutingGroup(checkedFactory);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

}
