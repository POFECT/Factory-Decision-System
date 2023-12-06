package com.poscodx.pofect.domain.main.repository.querydsl;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;

import java.util.List;

public interface FactoryOrderInfoCustom {

    List<String> getWeeks(FactoryOrderInfoReqDto.SearchDto dto);
}
