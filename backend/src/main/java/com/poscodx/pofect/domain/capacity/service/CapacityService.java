package com.poscodx.pofect.domain.capacity.service;

import com.poscodx.pofect.domain.capacity.dto.CapacityInfoDto;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityRowSpanDto;
import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;
import com.poscodx.pofect.domain.log.document.CapacityData;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;

import java.util.List;

public interface CapacityService {

    List<CapacityInfoDto> getList();

    List<CombinedCapacityDto> getCapacityList();

    List<CombinedCapacityDto> findCombinedCapacityByWeek(String week);


    // rowspan 추가
    List<CombinedCapacityDto> calculateRowSpan(List<CombinedCapacityDto> capacityData);

    void insert(CapacityInfoDto.InsertCapacityDto insertDto);

    List<CombinedCapacityRowSpanDto> getCombinedCapacityWithRowSpan(String week);

    //update
    void updateFaAdjustmentWgt(List<CapacityInfoDto> updateList);

    List<CapacityInfoDto.FactoryCapacityDto> getFactoryCapacityList(String processCode, String week);

    void plusQty(Long id, Integer qty);

    void minusQty(Long id, Integer qty);

    CapacityInfoDto findFactoryByOption(String processCd, String prevFactory, String week);

    void minusProcessQty(FactoryOrderInfoReqDto.updateFactoryDto dto);

    void plusProcessQty(FactoryOrderInfoReqDto.updateFactoryDto dto);

    List<String> checkWeekCapacityList(List<String> weekList);

    List<CapacityData> getByCfirmcodeAndWeek(String confirmCode, String week);
}
