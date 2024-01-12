package com.poscodx.pofect.domain.processstandard.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.common.exception.CustomException;
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
@RequestMapping("/process-standard")
@RestController
@RequiredArgsConstructor
public class ProcessStandardController {

    private final ProcessStandardService processStandardService;

    @GetMapping("")
    @ApiOperation(value = "경유 공정 리스트 조회", notes = "전체 경유 공정 데이터 조회")
    public ResponseEntity<ResponseDto> getProcessList() {
        List<ProcessStandardDto> rs = processStandardService.getList();
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    @GetMapping("{ordPdtItdsCdN}")
    @ApiOperation(value = "경유 공정 by itemDetail", notes = "경유 공정 by itemDetail")
    public ResponseEntity<ResponseDto> getProcessByItemDetail(@PathVariable String ordPdtItdsCdN) {
        String rs = processStandardService.getByOrdPdtItdsCdN(ordPdtItdsCdN);
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    @GetMapping("/item/{ordPdtItpCdN}")
    @ApiOperation(value = "경유 공정 품종 필터링 ", notes = "품종으로 품명 여러개 select")
    public ResponseEntity<ResponseDto> getProcessByItem(@PathVariable String ordPdtItpCdN) {
        List<ProcessStandardDto> rs = processStandardService.getProcessByItemList(ordPdtItpCdN);
        return new ResponseEntity<>(new ResponseDto(rs), HttpStatus.OK);
    }

    //  Update
    @PatchMapping("/update")
    @ApiOperation(value = "공유공정 update", notes = "공유공정 update")
    public ResponseEntity<ResponseDto> updateProcessList(@RequestBody List<ProcessStandardDto> updateList) {
        processStandardService.updateProcessList(updateList);
        return new ResponseEntity<>(new ResponseDto(updateList), HttpStatus.OK);
    }

    // Insert
    @PostMapping("")
    @ApiOperation(value = "공유공정 insert", notes = "공유공정 insert")
    public ResponseEntity<ResponseDto> insertProcessList(@RequestBody ProcessStandardDto insertList) {
        try {
            processStandardService.insert(insertList);
            System.out.println("********insertList = " + insertList);
            return new ResponseEntity<>(new ResponseDto(insertList), HttpStatus.OK);
        } catch (CustomException e) {
            System.out.println("error ***** insertList = " + insertList);
            return new ResponseEntity<>(new ResponseDto("Failed to create capacity data: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    // Delete
    @DeleteMapping("/delete")
    @ApiOperation(value = "경유 공정 삭제", notes = "선택한 공정 데이터 삭제")
    public ResponseEntity<ResponseDto> deleteProcessList(@RequestBody List<Long> idsToDelete) {
        try {
            processStandardService.deleteProcessList(idsToDelete);
            return new ResponseEntity<>(new ResponseDto("Process standard data deleted successfully."), HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(new ResponseDto("Failed to delete process standard data: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
