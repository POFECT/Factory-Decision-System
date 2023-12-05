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
    public ResponseEntity<ResponseDto> getCapacityList() {
        List<ProcessStandardDto> rs = processStandardService.getList();
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

//    @GetMapping("{id}")
//    @ApiOperation(value = "능력 조회", notes = "ID로 능력 데이터 조회")
//    public ResponseEntity<ResponseDto> getCapacityById(
//            @PathVariable Long id) {
//        GrantCapacityDto rs = capacityService.getById(id);
//        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
//    }
//
//    @GetMapping("/week")
//    @ApiOperation(value = "출강주 조회", notes = "전체 주문 건 출강주 조회")
//    public ResponseEntity<ResponseDto> getOrdWeekList() {
//        List<FactoryOrderInfoResDto> rs = factoryOrderInfoService.getList();
//        System.out.println("ResponseDto(rs) = " + new ResponseDto(rs));
//        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
//
//
//    }

}
