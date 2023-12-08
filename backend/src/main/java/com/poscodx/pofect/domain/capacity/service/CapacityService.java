package com.poscodx.pofect.domain.capacity.service;

import com.poscodx.pofect.domain.capacity.dto.CapacityInfoDto;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto;
import com.poscodx.pofect.domain.capacity.dto.GrantCapacityDto;
import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;

import java.util.List;

public interface CapacityService {

    List<CapacityInfoDto> getList();



    List<CombinedCapacityDto> getCapacityList();

//    GrantCapacityDto getById(Long id);

    void insert(String week);
}
