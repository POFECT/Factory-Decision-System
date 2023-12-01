package com.poscodx.pofect.domain.essentialstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardResDto;
import com.poscodx.pofect.domain.essentialstandard.service.EssentialStandardService;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
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

@Api(value = "EssentialStandard API", tags = {"필수재기준"})
@CrossOrigin("*")
@RequestMapping()
@RestController
@RequiredArgsConstructor
public class EssentialStandardController {
    private final EssentialStandardService essentialStandardService;
    @GetMapping("/essential-standard")
    @ApiOperation(value = "필수재 기준 조회", notes = "필수재 기준을 조회한다.")
    public ResponseEntity<ResponseDto> getOrderList() {
        List<EssentialStandardResDto> result = essentialStandardService.getList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }
}
