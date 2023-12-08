package com.poscodx.pofect.domain.processstandard.service;

import com.poscodx.pofect.domain.processstandard.dto.ConfirmFactoryStandardResDto;

import java.util.List;
import java.util.Map;

public interface ConfirmFactoryStandardService {

    List<Map<String, Object>> getGridData();

    List<ConfirmFactoryStandardResDto> getFactories(String process);
}
