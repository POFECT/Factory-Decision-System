package com.poscodx.pofect.domain.sizestandard.service;

import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.repository.SizeStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SizeStandardServiceImpl implements SizeStandardService{
    private final SizeStandardRepository repository;

    @Override
    public List<SizeStandardResDto> getList() {
        return repository.findAll().stream().map(SizeStandardResDto::toDto).toList();
    }
}
