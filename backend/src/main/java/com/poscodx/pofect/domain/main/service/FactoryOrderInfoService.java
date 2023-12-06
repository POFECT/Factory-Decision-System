package com.poscodx.pofect.domain.main.service;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;

import java.util.List;

public interface FactoryOrderInfoService {
    List<FactoryOrderInfoResDto> getList();

    FactoryOrderInfoResDto getById(Long id);

    FactoryOrderInfo insertOrder(FactoryOrderInfoReqDto factoryOrderInfoDto);

    Boolean deleteOrder(Long id);

    List<String> getOrderWeeks(FactoryOrderInfoReqDto.SearchDto dto);
}
