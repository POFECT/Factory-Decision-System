package com.poscodx.pofect.domain.sizestandard.repository.querydsl;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.entity.FactorySizeStandard;

import java.util.List;

public interface SizeStandardCustom {
    List<FactorySizeStandard> getSizeStandard(List<String> processList);
}
