package com.poscodx.pofect.domain.capacity.service;

import com.poscodx.pofect.domain.capacity.dto.GrantCapacityDto;
import com.poscodx.pofect.domain.capacity.entity.GrantCapacity;

import java.util.List;

public interface CapacityService {

    List<GrantCapacityDto> getList();



    GrantCapacityDto getById(Long id);
}
