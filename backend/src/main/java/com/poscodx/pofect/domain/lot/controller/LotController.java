package com.poscodx.pofect.domain.lot.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.lot.dto.LotGroupDto;
import com.poscodx.pofect.domain.lot.service.LotService;
import com.poscodx.pofect.domain.lot.dto.LotResDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Api(value = "Lot API", tags = {"출강Lot"})
@CrossOrigin("*")
@RequestMapping("/lot")
@RestController
@RequiredArgsConstructor
public class LotController {
    private final LotService lotService;

    @GetMapping("")
    @ApiOperation(value = "출강Lot 전체 조회", notes = "출강Lot 전체 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getLotList(){
        Map<String, Map<String, Map<Character, Map<String, Integer>>>> lotAll = lotService.findLotAll();
//        return new ResponseEntity<>(new ResponseDto());
        System.out.println("size : " + lotAll.size());
        return new ResponseEntity<>(new ResponseDto(lotAll), HttpStatus.OK);
    }
}
