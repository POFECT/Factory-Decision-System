package com.poscodx.pofect.domain.lot.service;

import com.poscodx.pofect.domain.lot.dto.LotGroupDto;
import com.poscodx.pofect.domain.lot.dto.LotResDto;

import java.util.List;
import java.util.Map;

public interface LotService {
    Map<String, Map<String, Map<Character, Map<String, Integer>>>> findLotAll();


}
