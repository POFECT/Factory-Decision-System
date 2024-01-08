package com.poscodx.pofect.domain.etc.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.etc.dto.BusinessCodeInfoDto;
import com.poscodx.pofect.domain.etc.service.BusinessCodeInfoService;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "ETC API", tags = {"Main 공정코드 관리 / 품종별 담당자 관리 / 업무기준코드 정보"})
@RequestMapping("/etc")
@RestController
@RequiredArgsConstructor
public class EtcController {

    private final BusinessCodeInfoService businessCodeInfoService;

    @GetMapping("/business")
    @ApiOperation(value = "품종코드 리스트 조회", notes = "전체 품종코드 데이터를 조회한다.")
    public ResponseEntity<ResponseDto> getCodeNameList() {
        List<BusinessCodeInfoDto> result = businessCodeInfoService.getCdNmList();
        return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
    }

}
