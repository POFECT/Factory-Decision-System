package com.poscodx.pofect.domain.sizestandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardSetDto;
import com.poscodx.pofect.domain.sizestandard.service.SizeStandardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    @ApiOperation(value = "사이즈 기준 설정", notes = "선택된 주문의 사이즈 기준을 설정한다.")
    public ResponseEntity<ResponseDto> setSizeStandard(
            @RequestParam List<String> processList,
            @PathVariable("id") Long id
    ) {

        List<SizeStandardSetDto> result = sizeStandardService.setSizeStandard(id, processList);

        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

}
