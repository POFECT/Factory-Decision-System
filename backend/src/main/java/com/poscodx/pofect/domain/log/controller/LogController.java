package com.poscodx.pofect.domain.log.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.log.entity.LogDoc;
import com.poscodx.pofect.domain.log.service.LogService;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
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

import javax.validation.Valid;
import java.util.List;

@Api(value = "Log API", tags = {"로그"})
@CrossOrigin("*")
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

}
