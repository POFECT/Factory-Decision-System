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

import javax.validation.Valid;
import java.util.List;

@Api(value = "Main API", tags = {"공장결정Main / 에러주문 "})
@CrossOrigin("*")
@RequestMapping("/main")
@RestController
@RequiredArgsConstructor
public class MainController {

    private final FactoryOrderInfoService factoryOrderInfoService;

//    @GetMapping("/test")
//    @ApiOperation(value = "주문 데이터 리스트 조회", notes = "전체 주문 데이터를 조회한다.")
//    public ResponseEntity<ResponseDto> getOrderList() {
//        List<FactoryOrderInfoResDto> result = factoryOrderInfoService.getList();
//        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
//    }

    @GetMapping("")
    @ApiOperation(value = "주문 데이터 리스트 조회", notes = "조건에 맞는 주문 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getOrderListByOption(@Valid FactoryOrderInfoReqDto.orderDto dto) {
        List<FactoryOrderInfoResDto> result = factoryOrderInfoService.getOrderList(dto);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("/week")
    @ApiOperation(value = "출강주 조회", notes = "조건에 맞는 출강주 리스트를 조회한다.")
    public ResponseEntity<ResponseDto> getOrderWeekList(@Valid FactoryOrderInfoReqDto.SearchDto dto) {
        List<String> result = factoryOrderInfoService.getOrderWeeks(dto);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("{id}")
    @ApiOperation(value = "주문 데이터 조회", notes = "ID로 주문 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getOrderById(@PathVariable Long id) {
        FactoryOrderInfoResDto result = factoryOrderInfoService.getById(id);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @PatchMapping("/flag/update")
    @ApiOperation(value = "FA_CONFIRM_FLAG 수정", notes = "여러 주문의 FA_CONFIRM_FLAG를 원하는 값으로 수정한다.")
    public ResponseEntity<ResponseDto> updateConfirmFlag(@RequestBody FactoryOrderInfoReqDto.updateFlagDto reqDto) {
        Long cnt = factoryOrderInfoService.updateOrderFlag(reqDto);
        return new ResponseEntity<>(new ResponseDto(cnt), HttpStatus.OK);
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
