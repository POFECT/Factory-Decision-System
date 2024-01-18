package com.poscodx.pofect.domain.sizestandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeDesignReqDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardReqDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardSetDto;
import com.poscodx.pofect.domain.sizestandard.entity.FactorySizeStandard;
import com.poscodx.pofect.domain.sizestandard.service.SizeStandardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Api(value = "SizeStandard API", tags = {"공정 공장 별 사이즈 기준"})
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

    @GetMapping("/design")
    @ApiOperation(value = "사이즈 기준 예비 설계", notes = "두께, 폭, 길이, 단중을 받아 사이즈 기준을 설계한다.")
    public ResponseEntity<ResponseDto> designSizeStandard(
            SizeDesignReqDto dto,
            HttpServletRequest request
        ) throws Exception {
//        sizeStandardService.testRestTemplate(request);
        List<SizeStandardSetDto> setDto = sizeStandardService.designSizeStandard(dto);
        return new ResponseEntity<>(new ResponseDto(setDto), HttpStatus.OK);
    }

    @PatchMapping("")
//    @ApiOperation(value = "OS_MAIN_STATUS_CD_N 수정", notes = "여러 주문의 OS_MAIN_STATUS_CD_N를 원하는 값으로 수정한다.")
    public ResponseEntity<ResponseDto> updateSizeStandard(@RequestBody List<SizeStandardReqDto> dtoList, HttpServletRequest request) {
        sizeStandardService.updateSizeStandard(dtoList,request);
        return new ResponseEntity<>(new ResponseDto(dtoList), HttpStatus.OK);
    }


}
