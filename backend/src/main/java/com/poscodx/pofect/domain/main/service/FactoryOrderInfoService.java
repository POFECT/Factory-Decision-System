package com.poscodx.pofect.domain.main.service;

import com.poscodx.pofect.domain.lot.dto.LotResDto;
import com.poscodx.pofect.domain.lot.dto.LotSearchDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.dto.app.appResDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;

import java.util.List;

public interface FactoryOrderInfoService {
    List<FactoryOrderInfoResDto> getList();

    List<FactoryOrderInfoResDto> getOrderList(FactoryOrderInfoReqDto.orderDto dto);

    FactoryOrderInfoResDto getById(Long id);

    FactoryOrderInfo insertOrder(FactoryOrderInfoReqDto factoryOrderInfoDto);

    Boolean deleteOrder(Long id);

    List<String> getOrderWeeks(FactoryOrderInfoReqDto.SearchDto dto);

    List<LotResDto> findLotAll(LotSearchDto searchDto);

    Long updateOrderFlag(FactoryOrderInfoReqDto.updateCodeDto reqDto);

    Long updateOrderStatus(FactoryOrderInfoReqDto.updateCodeDto reqDto);

    Boolean possibleFactory(String userName, Long id);

    Boolean confirmFactory(String userName, Long id);

    void updateFactory(FactoryOrderInfoReqDto.updateFactoryDto reqDto);

    FactoryOrderInfoResDto getOrderListByOrdNo(String orderHeadLineNo);

    List<appResDto> getOrderCntByMD();

    List<String> getOrderListByErrorCode(String errorCode);

    List<Object[]> getCfrmOrderCount();
}
