package com.poscodx.pofect.domain.processstandard.service;

import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;
import com.poscodx.pofect.domain.processstandard.entity.ProcessStandard;

import java.util.List;

public interface ProcessStandardService {

    List<ProcessStandardDto> getList();

    String getByOrdPdtItdsCdN(String ordPdtItdsCdN);

    List<ProcessStandardDto> getProcessByItemList(String ordPdtItpCdN);

    void updateProcessList(List<ProcessStandardDto> updateList);

    ProcessStandard insert(ProcessStandardDto insertList);

    void deleteProcessList(List<Long> idsToDelete);
}
