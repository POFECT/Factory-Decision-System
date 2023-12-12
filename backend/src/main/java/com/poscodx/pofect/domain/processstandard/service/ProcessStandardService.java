package com.poscodx.pofect.domain.processstandard.service;

import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;

import java.util.List;

public interface ProcessStandardService {

    List<ProcessStandardDto> getList();

    String getByOrdPdtItdsCdN(String ordPdtItdsCdN);

    List<ProcessStandardDto> getProcessByItemList(String ordPdtItpCdN);


//    GrantCapacityDto getById(Long id);
}
