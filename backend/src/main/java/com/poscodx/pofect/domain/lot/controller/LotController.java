package com.poscodx.pofect.domain.lot.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.lot.service.LotService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

//        return new ResponseEntity<>(new ResponseDto());
        return null;
    }
}
