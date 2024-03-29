package com.poscodx.pofect.domain.sizestandard.service;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeDesignReqDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardReqDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardSetDto;
import com.poscodx.pofect.domain.sizestandard.entity.FactorySizeStandard;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface SizeStandardService {
    List<SizeStandardResDto> getList();
    List<SizeStandardSetDto> setSizeStandard(Long id, List<String> processList);

    void updateSizeStandard(List<SizeStandardReqDto> dto,HttpServletRequest request);

    List<SizeStandardSetDto> designSizeStandard(SizeDesignReqDto dto);


    void testRestTemplate(HttpServletRequest request) throws Exception;
}

