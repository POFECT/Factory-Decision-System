package com.poscodx.pofect.domain.main.service;

import com.poscodx.pofect.domain.lot.dto.LotResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;

import java.util.List;
import java.util.Map;

public interface FactoryOrderInfoService {
    List<FactoryOrderInfoResDto> getList();

    List<FactoryOrderInfoResDto> getOrderList(FactoryOrderInfoReqDto.orderDto dto);

    FactoryOrderInfoResDto getById(Long id);

    FactoryOrderInfo insertOrder(FactoryOrderInfoReqDto factoryOrderInfoDto);

    Boolean deleteOrder(Long id);

    List<String> getOrderWeeks(FactoryOrderInfoReqDto.SearchDto dto);

    List<LotResDto> findLotAll();
    Long updateOrderFlag(FactoryOrderInfoReqDto.updateCodeDto reqDto);

    Long updateOrderStatus(FactoryOrderInfoReqDto.updateCodeDto reqDto);
}
