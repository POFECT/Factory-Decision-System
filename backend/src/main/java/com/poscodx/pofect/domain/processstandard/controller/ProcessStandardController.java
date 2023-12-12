package com.poscodx.pofect.domain.processstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;
import com.poscodx.pofect.domain.processstandard.service.ProcessStandardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "PassProcessStandard API", tags = {"경유공정기준"})
@CrossOrigin("*")
@RequestMapping("/pass-standard")
@RestController
@RequiredArgsConstructor
public class ProcessStandardController {

    private final ProcessStandardService processStandardService;

    @GetMapping("")
    @ApiOperation(value = "경유 공정 리스트 조회", notes = "전체 경유 공정 데이터 조회")
    public ResponseEntity<ResponseDto> getProcessList() {
        List<ProcessStandardDto> rs = processStandardService.getList();
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    @GetMapping("{ordPdtItdsCdN}")
    @ApiOperation(value = "경유 공정 by itemDetail", notes = "경유 공정 by itemDetail")
    public ResponseEntity<ResponseDto> getProcessByItemDetail(@PathVariable String ordPdtItdsCdN) {
        String rs = processStandardService.getByOrdPdtItdsCdN(ordPdtItdsCdN);
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }


}
