package com.poscodx.pofect.domain.main.service;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;

import java.util.List;

public interface FactoryOrderInfoService {
    List<FactoryOrderInfoResDto> getList();

    FactoryOrderInfoResDto getById(Long id);
}
