package com.poscodx.pofect.domain.capacity.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.domain.capacity.dto.CapacityInfoDto;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto;
import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;
import com.poscodx.pofect.domain.capacity.service.CapacityService;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Capacity API", tags = {"투입능력관리"})
@RequestMapping("/capacity")
@RestController
@RequiredArgsConstructor
public class CapacityController {

    private final CapacityService capacityService;
    private final FactoryOrderInfoService factoryOrderInfoService;

    // 주문 별 능력 정보 (FW030)
    @GetMapping("")
    @ApiOperation(value = "능력 정보 조회", notes = "standard FW030")
    public ResponseEntity<ResponseDto> getList() {
        List<CapacityInfoDto> rs = capacityService.getList();
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    // JOIN
    // 주문 별 능력 정보 (FW030)
    // 주문별 능력 부여 관리 (FC100)
    @GetMapping("/byWeek")
    @ApiOperation(value = "출강주 별 능력 리스트 조회", notes = "전체 능력 데이터 조회")
    public ResponseEntity<ResponseDto> getCapacityList() {
        List<CombinedCapacityDto> rs = capacityService.getCapacityList();
        rs = capacityService.calculateRowSpan(rs);
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    //@@@
    // 출강주 별 능력 리스트 조회 (rowSpan 포함)
    @GetMapping("/combined-capacity-rowspan/{week}")
    @ApiOperation(value = "출강주 별 능력 리스트 조회 (rowSpan 포함)", notes = "출강주에 따른 능력 데이터 조회 (rowSpan 포함)")
    public ResponseEntity<ResponseDto> findCombinedCapacityByWeek(@PathVariable String week) {
        try {
            List<CombinedCapacityDto> rs = capacityService.findCombinedCapacityByWeek(week);
            rs = capacityService.calculateRowSpan(rs);
            return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(new ResponseDto("Failed to get combined capacity data with rowSpan: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    //출강주별 능력 insert
    @PostMapping("")
    @ApiOperation(value = "투입능력 insert", notes = "투입능력 insert")
    public ResponseEntity<ResponseDto> createCapacity(@RequestBody CapacityInfoDto.InsertCapacityDto insertDto) {
        try {
            capacityService.insert(insertDto);
            return new ResponseEntity<>(new ResponseDto("Capacity data created successfully"), HttpStatus.OK);
        } catch (CustomException e) {

            return new ResponseEntity<>(new ResponseDto("Failed to create capacity data: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    // 조정량 Update
    @PatchMapping("/update")
    @ApiOperation(value = "투입능력 update", notes = "투입능력 update")
    public ResponseEntity<ResponseDto> updateFaAdjustmentWgt(@RequestBody List<CapacityInfoDto> updateList) {
        capacityService.updateFaAdjustmentWgt(updateList);
        return new ResponseEntity<>(new ResponseDto(updateList), HttpStatus.OK);
    }

    @GetMapping("/factory/{id}/{week}")
    @ApiOperation(value = "해당 공정의 공장리스트, 능력 조회", notes = "해당 공정의 공장 리스트와 각각의 능력 정보를 조회한다.")
    public ResponseEntity<ResponseDto> getFactoryCapacity(@PathVariable(name = "id") String processCode, @PathVariable String week) {
        List<CapacityInfoDto.FactoryCapacityDto> result = capacityService.getFactoryCapacityList(processCode, week);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

    @GetMapping("/weeklist")
    @ApiOperation(value = "출강주 리스트의 능력 데이터 확인", notes = "출강주 리스트의 능력 데이터가 모두 있는지 확인한다.")
    public ResponseEntity<ResponseDto> checkWeekCapacity(@RequestParam List<String> weekList) {
        List<String> result = capacityService.checkWeekCapacityList(weekList);
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }


}
