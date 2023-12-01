package com.poscodx.pofect.domain.essentialstandard.service;

import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardResDto;
import com.poscodx.pofect.domain.essentialstandard.repository.EssentialStandardRepository;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.repository.FactoryOrderInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EssentialStandardServiceImpl implements EssentialStandardService {
    private final EssentialStandardRepository essentialStandardRepository;

    @Override
    public List<EssentialStandardResDto> getList() {
        return essentialStandardRepository.findAll().stream()
                .map(EssentialStandardResDto::toDto)
                .collect(Collectors.toList());
    }
}
