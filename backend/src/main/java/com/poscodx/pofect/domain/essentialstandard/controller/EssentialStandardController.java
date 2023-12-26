package com.poscodx.pofect.domain.essentialstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardBtiPosReqDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardReqDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardResDto;
import com.poscodx.pofect.domain.essentialstandard.service.EssentialStandardService;
import com.poscodx.pofect.domain.main.controller.MainController;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import com.poscodx.pofect.domain.passstandard.controller.PossibleFactoryStandardController;
import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;
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
    private final PossibleFactoryStandardController possibleFactoryStandardController;
    private final FactoryOrderInfoService factoryOrderInfoService;

    @GetMapping("/essential-standard")
    @ApiOperation(value = "필수재 기준 조회", notes = "필수재 기준을 조회한다.")
    public ResponseEntity<ResponseDto> getEssentialStandardList() {
        List<EssentialStandardResDto> result = essentialStandardService.getList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("/apply-essential-standard")
    @ApiOperation(value = "필수재 기준 측정", notes = "필수재 기준을 측정한다.")
    public ResponseEntity<ResponseDto> applyEssentialStandard(@RequestParam List<String> processList,
                                                                      @RequestParam("id") Long id) {
        FactoryOrderInfoResDto factoryInfo = factoryOrderInfoService.getById(id);

        ResponseEntity<ResponseDto> responseEntityResult = possibleFactoryStandardController.getPossibleToConfirm(essentialStandardService.applyEssentialStandard(factoryInfo,processList));
        List<PossibleToConfirmResDto> result = (List<PossibleToConfirmResDto>) responseEntityResult.getBody().getResponse();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @PostMapping("/essential-standard")
    @ApiOperation(value = "필수재 기준 추가", notes = "필수재 기준을 추가한다.")
    public ResponseEntity<ResponseDto> addEssential(@RequestBody EssentialStandardReqDto essentialStandardReqDto) {
        EssentialStandardResDto result = essentialStandardService.addEssential(essentialStandardReqDto);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }
}