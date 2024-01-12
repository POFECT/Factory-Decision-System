package com.poscodx.pofect.domain.log.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.log.document.LogDoc;
import com.poscodx.pofect.domain.log.service.LogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Log API", tags = {"로그"})
@RequestMapping("/log")
@RestController
@RequiredArgsConstructor
public class LogController {
    private final LogService logService;

    @GetMapping("")
    @ApiOperation(value = "로그 데이터 리스트 조회", notes = "전체 로그 데이터 리스트를 조회한다.")
    public ResponseEntity<ResponseDto> getLogList() {
        List<LogDoc> result = logService.getList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("{id}")
    @ApiOperation(value = "해당 주문의 로그 조회", notes = "주문 PK로 로그 데이터 리스트를 조회한다.")
    public ResponseEntity<ResponseDto> getLogListById(@PathVariable Long id) {
        List<LogDoc> result = logService.getLogsById(id);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @PostMapping("/insert/possible")
    @ApiOperation(value = "가통 로그 데이터 저장", notes = "가통 로그 데이터를 저장한다.")
    public ResponseEntity<ResponseDto> insertLogPossible(@RequestBody LogDoc logDoc) {
        LogDoc log = logService.insertLog(logDoc);

        if(log != null) {
            return new ResponseEntity<>(new ResponseDto(log), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("log create fail"), HttpStatus.FORBIDDEN);
        }
    }


}
