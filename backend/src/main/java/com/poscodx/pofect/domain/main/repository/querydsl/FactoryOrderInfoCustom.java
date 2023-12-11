package com.poscodx.pofect.domain.main.repository.querydsl;


import com.poscodx.pofect.domain.main.dto.lot.LotResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;

import java.util.List;

public interface FactoryOrderInfoCustom {

    List<String> getWeeks(FactoryOrderInfoReqDto.SearchDto dto);

    List<FactoryOrderInfo> findAllByOption(FactoryOrderInfoReqDto.orderDto dto);

    Long updateFlag(FactoryOrderInfoReqDto.updateFlagDto reqDto);

    List<LotResDto>  findLotAll();
}
