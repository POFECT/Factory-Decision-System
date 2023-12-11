package com.poscodx.pofect.domain.capacity.service;

import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.common.exception.ErrorCode;
import com.poscodx.pofect.domain.capacity.dto.CapacityInfoDto;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityRowSpanDto;

import java.util.List;

public interface CapacityService {

    List<CapacityInfoDto> getList();

    List<CombinedCapacityDto> getCapacityList();

    List<CombinedCapacityDto> findCombinedCapacityByWeek(String week);

    int getRowCount(String processCd, List<CombinedCapacityDto> combinedCapacityList);

    void insert(String week);

    List<CombinedCapacityRowSpanDto> getCombinedCapacityWithRowSpan(String week);

    List<CapacityInfoDto.FactoryCapacityDto> getFactoryCapacityList(String processCode);
}
