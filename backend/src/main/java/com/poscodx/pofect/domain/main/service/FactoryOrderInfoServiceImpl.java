package com.poscodx.pofect.domain.main.service;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.repository.FactoryOrderInfoRepository;
import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FactoryOrderInfoServiceImpl implements FactoryOrderInfoService{

    private final FactoryOrderInfoRepository factoryOrderInfoRepository;

    @Override
    public List<FactoryOrderInfoResDto> getList() {
        return factoryOrderInfoRepository.findAll().stream()
                .map(FactoryOrderInfoResDto::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public FactoryOrderInfoResDto getById(Long id) {
        return FactoryOrderInfoResDto.toDto(factoryOrderInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND)));
//        return FactoryOrderInfoResDto.toDto(result);
    }
}
