package com.poscodx.pofect.domain.dashboard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.dashboard.dto.DashBoardInputStatusResDto;
import com.poscodx.pofect.domain.dashboard.dto.DashBoardOrderInquiryResDto;
import com.poscodx.pofect.domain.dashboard.service.DashBoardService;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardResDto;
import com.poscodx.pofect.domain.essentialstandard.service.EssentialStandardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Api(value = "DashBoard API", tags = {"대시보드"})
@RequestMapping()
@RestController
@RequiredArgsConstructor
public class DashBoardController {
    private final DashBoardService dashBoardService;
    @GetMapping("/input-status")
    @ApiOperation(value = "품종별 투입 현황 조회", notes = "품종별 투입 현황을 조회한다.")
    public ResponseEntity<ResponseDto> getInputStatusList() {
        List<DashBoardInputStatusResDto> result = dashBoardService.getInputStatusList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("/order-inquiry")
    @ApiOperation(value = "품종별 주문 조회", notes = "품종별 주문 상태를 조회한다.")
    public ResponseEntity<ResponseDto> getOrderInquiryList() {
        List<DashBoardOrderInquiryResDto> result = dashBoardService.getOrderInquiry();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }


    @GetMapping("/input-status/app/{week}")
    @ApiOperation(value = "품종별 투입 현황 조회 APP 출강주 기준", notes = "품종별 투입 현황을 조회한다. 출강주 기준")
    public ResponseEntity<ResponseDto> getInputStatusListApp(@PathVariable String week) {
        List<DashBoardInputStatusResDto> result = dashBoardService.getInputStatusListApp(week);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }
}
