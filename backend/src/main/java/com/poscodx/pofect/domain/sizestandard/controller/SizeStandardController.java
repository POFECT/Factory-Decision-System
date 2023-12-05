package com.poscodx.pofect.domain.sizestandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.service.SizeStandardService;
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

@Api(value = "SizeStandard API", tags = {"공정 공장 별 사이즈 기준"})
@CrossOrigin("*")
@RequestMapping("/size-standard")
@RestController
@RequiredArgsConstructor
public class SizeStandardController {
    private final SizeStandardService sizeStandardService;

    @GetMapping("")
    @ApiOperation(value = "공정 공장 별 사이즈 기준 리스트 조회", notes = "전체 공정 공장 별 사이즈 기준 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getSizeStandardList() {
        List<SizeStandardResDto> sizeStandardResDtoList =
                sizeStandardService.getList();

        return new ResponseEntity<>(new ResponseDto(sizeStandardResDtoList), HttpStatus.OK);
    }
}
