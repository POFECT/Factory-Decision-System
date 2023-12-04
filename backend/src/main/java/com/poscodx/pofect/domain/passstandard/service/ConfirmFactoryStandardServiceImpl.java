package com.poscodx.pofect.domain.passstandard.service;

import com.poscodx.pofect.domain.passstandard.dto.ConfirmFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.repository.ConfirmFactoryStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConfirmFactoryStandardServiceImpl implements ConfirmFactoryStandardService {

    private final ConfirmFactoryStandardRepository confirmFactoryStandardRepository;
    @Override
    public List<ConfirmFactoryStandardResDto> getList() {
        return confirmFactoryStandardRepository.findAll().stream()
                .map(ConfirmFactoryStandardResDto::toDto)
                .collect(Collectors.toList());
    }
}
