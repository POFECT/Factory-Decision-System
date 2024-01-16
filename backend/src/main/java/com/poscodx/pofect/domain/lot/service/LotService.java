package com.poscodx.pofect.domain.lot.service;

import com.poscodx.pofect.domain.lot.dto.LotGroupDto;
import com.poscodx.pofect.domain.lot.dto.LotSearchDto;

import java.util.List;

public interface LotService {
    List<LotGroupDto> findLotAll(LotSearchDto searchDto);

    List<String> findSmAll();


}
