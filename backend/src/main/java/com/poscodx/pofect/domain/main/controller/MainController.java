package com.poscodx.pofect.domain.main.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Main API", tags = {"공장결정Main / 에러주문 "})
@CrossOrigin("*")
@RequestMapping("/main")
@RestController
@RequiredArgsConstructor
public class MainController {

    private final FactoryOrderInfoService factoryOrderInfoService;

    @GetMapping("")
    @ApiOperation(value = "주문 데이터 리스트 조회", notes = "전체 주문 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getOrderList() {
        List<FactoryOrderInfoResDto> result = factoryOrderInfoService.getList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("{id}")
    @ApiOperation(value = "주문 데이터 조회", notes = "ID로 주문 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getOrderById(@PathVariable Long id) {
        FactoryOrderInfoResDto result = factoryOrderInfoService.getById(id);

        if(result != null) {
            return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("Fail"), HttpStatus.NOT_FOUND);
        }
    }
}
