package com.poscodx.pofect.domain.sizestandard.service;

import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardSetDto;

import java.util.List;

public interface SizeStandardService {
    List<SizeStandardResDto> getList();
    List<SizeStandardSetDto> setSizeStandard(Long id, List<String> processList);
}

