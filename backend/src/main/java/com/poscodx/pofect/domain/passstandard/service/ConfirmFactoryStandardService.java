package com.poscodx.pofect.domain.passstandard.service;

import com.poscodx.pofect.domain.passstandard.dto.ConfirmFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;

import java.util.List;
import java.util.Map;

public interface ConfirmFactoryStandardService {

    List<Map<String, Object>> getGridData();

    List<ConfirmFactoryStandardResDto> getFactories(String process);

    String getFactoryName(String processCd, String firmPsFacTp);

    List<ConfirmFactoryStandardResDto> getFactoryList();
}
