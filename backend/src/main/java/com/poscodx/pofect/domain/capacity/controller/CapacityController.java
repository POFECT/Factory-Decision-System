package com.poscodx.pofect.domain.capacity.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.capacity.dto.GrantCapacityDto;
import com.poscodx.pofect.domain.capacity.service.CapacityService;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.repository.FactoryOrderInfoRepository;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Api(value = "Capacity API", tags = {"투입능력관리"})
@CrossOrigin("*")
@RequestMapping("/capacity")
@RestController
@RequiredArgsConstructor
public class CapacityController {

    private final CapacityService capacityService;
    private final FactoryOrderInfoService factoryOrderInfoService;

    @GetMapping("")
    @ApiOperation(value = "능력 리스트 조회", notes = "전체 능력 데이터 조회")
    public ResponseEntity<ResponseDto> getCapacityList() {
        List<GrantCapacityDto> rs = capacityService.getList();
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    @GetMapping("{id}")
    @ApiOperation(value = "능력 조회", notes = "ID로 능력 데이터 조회")
    public ResponseEntity<ResponseDto> getCapacityById(
            @PathVariable Long id) {
        GrantCapacityDto rs = capacityService.getById(id);
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    @GetMapping("/week")
    @ApiOperation(value = "출강주 조회", notes = "전체 주문 건 출강주 조회")
    public ResponseEntity<ResponseDto> getOrdWeekList() {
        List<FactoryOrderInfoResDto> rs = factoryOrderInfoService.getList();
        System.out.println("ResponseDto(rs) = " + new ResponseDto(rs));
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);


    }

}
