package com.poscodx.pofect.domain.etc.service;

import com.poscodx.pofect.domain.etc.dto.BusinessCodeInfoDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;

import java.util.List;

public interface BusinessCodeInfoService {

    List<BusinessCodeInfoDto> getCdNmList();
}
