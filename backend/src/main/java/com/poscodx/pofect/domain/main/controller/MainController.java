package com.poscodx.pofect.domain.main.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
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
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "주문 데이터 생성", notes = "주문 데이터를 생성한다.")
    public ResponseEntity<ResponseDto> createOrder(@RequestBody FactoryOrderInfoReqDto factoryOrderInfoReqDto) {
        FactoryOrderInfo factoryOrderInfo = factoryOrderInfoService.insertOrder(factoryOrderInfoReqDto);

        if(factoryOrderInfo != null) {
            return new ResponseEntity<>(new ResponseDto(factoryOrderInfo), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("order create fail"), HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("{id}")
    @ApiOperation(value = "주문 데이터 삭제", notes = "주문 데이터를 삭제한다.")
    public ResponseEntity<ResponseDto> deleteOrder(@PathVariable Long id) {
        Boolean result = factoryOrderInfoService.deleteOrder(id);

        if(result) {
            return new ResponseEntity<>(new ResponseDto("success"), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("order delete fail"), HttpStatus.FORBIDDEN);
        }
    }


}
