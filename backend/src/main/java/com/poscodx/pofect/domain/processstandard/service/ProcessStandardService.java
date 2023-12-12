package com.poscodx.pofect.domain.processstandard.service;

import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;

import java.util.List;

public interface ProcessStandardService {

    List<ProcessStandardDto> getList();

    String getByOrdPdtItdsCdN(String ordPdtItdsCdN);


//    GrantCapacityDto getById(Long id);
}
