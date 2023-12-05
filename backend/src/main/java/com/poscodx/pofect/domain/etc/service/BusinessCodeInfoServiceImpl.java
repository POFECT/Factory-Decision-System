package com.poscodx.pofect.domain.etc.service;

import com.poscodx.pofect.domain.etc.dto.BusinessCodeInfoDto;
import com.poscodx.pofect.domain.etc.repository.BusinessCodeInfoRepository;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusinessCodeInfoServiceImpl implements BusinessCodeInfoService {

    private final BusinessCodeInfoRepository businessCodeInfoRepository;

    @Override
    public List<BusinessCodeInfoDto> getCdNmList() {
        return businessCodeInfoRepository.findAllByCdTp("ORD_PDT_ITP_CD")
                .stream()
                .map(BusinessCodeInfoDto::toDto)
                .collect(Collectors.toList());
    }
}
