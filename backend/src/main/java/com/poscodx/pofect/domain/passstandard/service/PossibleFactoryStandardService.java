package com.poscodx.pofect.domain.passstandard.service;

import com.poscodx.pofect.domain.passstandard.dto.PossibleFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.entity.PossibleFactoryStandard;

import java.util.List;

public interface PossibleFactoryStandardService {
    List<PossibleFactoryStandardResDto> getList();
}
