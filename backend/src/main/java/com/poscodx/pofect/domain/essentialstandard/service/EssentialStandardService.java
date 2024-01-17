package com.poscodx.pofect.domain.essentialstandard.service;

import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardBtiPosReqDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardReqDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface EssentialStandardService {
    List<EssentialStandardResDto> getList();
    List<EssentialStandardBtiPosReqDto> applyEssentialStandard(FactoryOrderInfoResDto factoryOrderInfoResDto, List<String> porcessStandardList);
    EssentialStandardResDto addEssential(EssentialStandardReqDto essentialStandardReqDto, HttpServletRequest request);
}