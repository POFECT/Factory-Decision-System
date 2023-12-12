package com.poscodx.pofect.domain.essentialstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardBtiPosReqDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardResDto;
import com.poscodx.pofect.domain.essentialstandard.service.EssentialStandardService;
import com.poscodx.pofect.domain.main.controller.MainController;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.passstandard.controller.PossibleFactoryStandardController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "EssentialStandard API", tags = {"필수재기준"})
@CrossOrigin("*")
@RequestMapping()
@RestController
@RequiredArgsConstructor
public class EssentialStandardController {
    private final EssentialStandardService essentialStandardService;
    private final MainController mainController;
   // private final PossibleFactoryStandardController possibleFactoryStandardController;
    @GetMapping("/essential-standard")
    @ApiOperation(value = "필수재 기준 조회", notes = "필수재 기준을 조회한다.")
    public ResponseEntity<ResponseDto> getEssentialStandardList() {
        List<EssentialStandardResDto> result = essentialStandardService.getList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("/apply-essential-standard")
    @ApiOperation(value = "필수재 기준 측정", notes = "필수재 기준을 측정한다.")
    public List<EssentialStandardBtiPosReqDto> applyEssentialStandard(@RequestParam List<String> processList,
                                                                      @RequestParam("id") Long id) {

        ResponseEntity<ResponseDto> responseEntity = mainController.getOrderById(id);
        FactoryOrderInfoResDto factoryInfo = (FactoryOrderInfoResDto) responseEntity.getBody().getResponse();
        List<EssentialStandardBtiPosReqDto> essentialStandardBtiPosReqDtoList = essentialStandardService.applyEssentialStandard(factoryInfo,processList);
//        possibleFactoryStandardController.getPossibleToConfirm(essentialStandardBtiPosReqDtoList);
        return essentialStandardBtiPosReqDtoList;
    }


}