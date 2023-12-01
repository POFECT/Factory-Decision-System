package com.poscodx.pofect.domain.capacity.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.capacity.dto.GrantCapacityDto;
import com.poscodx.pofect.domain.capacity.service.CapacityService;
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

    @GetMapping("")
    @ApiOperation(value = "능력 리스트 조회", notes = "전체 능력 데이터 조회")
    public ResponseEntity<ResponseDto> getCapacityList() {
        List<GrantCapacityDto> rs = capacityService.getList();
        System.out.println(rs);
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    @GetMapping("{id}")
    @ApiOperation(value = "능력 조회", notes = "ID로 능력 데이터 조회")
    public ResponseEntity<ResponseDto> getCapacityById(
            @PathVariable Long id) {
        GrantCapacityDto rs = capacityService.getById(id);
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }


}
