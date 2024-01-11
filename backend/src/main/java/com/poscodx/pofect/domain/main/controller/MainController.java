package com.poscodx.pofect.domain.main.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.dto.app.appResDto;
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
    public ResponseEntity<ResponseDto> updateConfirmFlag(@RequestBody FactoryOrderInfoReqDto.updateCodeDto reqDto) {
        Long cnt = factoryOrderInfoService.updateOrderFlag(reqDto);
        return new ResponseEntity<>(new ResponseDto(cnt), HttpStatus.OK);
    }

    @PatchMapping("/status/update")
    @ApiOperation(value = "OS_MAIN_STATUS_CD_N 수정", notes = "여러 주문의 OS_MAIN_STATUS_CD_N를 원하는 값으로 수정한다.")
    public ResponseEntity<ResponseDto> updateStatus(@RequestBody FactoryOrderInfoReqDto.updateCodeDto reqDto) {
        Long cnt = factoryOrderInfoService.updateOrderStatus(reqDto);
        return new ResponseEntity<>(new ResponseDto(cnt), HttpStatus.OK);
    }

    @PatchMapping("/possible")
    @ApiOperation(value = "가능 통과 공장 설계", notes = "여러 주문의 가능 통과 공장을 설계한다.")
    public ResponseEntity<ResponseDto> possibleDecision(@RequestBody List<Long> idList) {
        // 반환값 : 성공한 주문 개수, 실패한 주문 개수
        int successCnt = 0;
        int failCnt = 0;

        for (Long id : idList) {
            boolean success = factoryOrderInfoService.possibleFactory(id);
            if (success) successCnt++;
            else failCnt++;
        }

        FactoryOrderInfoResDto.possibleFactoryDto result = new FactoryOrderInfoResDto.possibleFactoryDto(successCnt, failCnt);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @PatchMapping("/confirm")
    @ApiOperation(value = "확정 통과 공장 설계", notes = "여러 주문의 확정 통과 공장을 설계한다.")
    public ResponseEntity<ResponseDto> confirmDecision(@RequestBody List<Long> idList) {
        // 반환값 : 성공한 주문 개수, 실패한 주문 개수
        int successCnt = 0;
        int failCnt = 0;

        for (Long id : idList) {
            boolean success = factoryOrderInfoService.confirmFactory(id);
            if (success) successCnt++;
            else failCnt++;
        }

        FactoryOrderInfoResDto.possibleFactoryDto result = new FactoryOrderInfoResDto.possibleFactoryDto(successCnt, failCnt);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @PatchMapping("/factory/update")
    @ApiOperation(value = "공장 변경", notes = "한 주문의 공장을 변경한다.")
    public ResponseEntity<ResponseDto> changeFactory(@RequestBody FactoryOrderInfoReqDto.updateFactoryDto dto) {
        factoryOrderInfoService.updateFactory(dto);

        return new ResponseEntity<>(new ResponseDto(), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "주문 데이터 생성", notes = "주문 데이터를 생성한다.")
    public ResponseEntity<ResponseDto> createOrder(@RequestBody FactoryOrderInfoReqDto factoryOrderInfoReqDto) {
        FactoryOrderInfo factoryOrderInfo = factoryOrderInfoService.insertOrder(factoryOrderInfoReqDto);

        if (factoryOrderInfo != null) {
            return new ResponseEntity<>(new ResponseDto(factoryOrderInfo), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto("order create fail"), HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("{id}")
    @ApiOperation(value = "주문 데이터 삭제", notes = "주문 데이터를 삭제한다.")
    public ResponseEntity<ResponseDto> deleteOrder(@PathVariable Long id) {
        Boolean result = factoryOrderInfoService.deleteOrder(id);

        if (result) {
            return new ResponseEntity<>(new ResponseDto("success"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto("order delete fail"), HttpStatus.FORBIDDEN);
        }
    }

    // Mobile API
    @GetMapping("/app/{orderHeadLineNo}")
    @ApiOperation(value = "주문 번호로 검색", notes = "주문 번호로 주문 데이터 조회")
    public ResponseEntity<ResponseDto> getOrderListByOrdNo(@PathVariable String orderHeadLineNo) {
        FactoryOrderInfoResDto rs = factoryOrderInfoService.getOrderListByOrdNo(orderHeadLineNo);
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    // Mobile API
    @GetMapping("/app/orderCntByMM")
    @ApiOperation(value = "출강달 별 주문 수", notes = "출강달로 주문 수 조회")
    public ResponseEntity<ResponseDto> getOrderCntByMD() {
        List<appResDto> rs = factoryOrderInfoService.getOrderCntByMD();
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }


}
