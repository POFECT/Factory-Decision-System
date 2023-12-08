package com.poscodx.pofect.domain.passstandard.service;

import com.poscodx.pofect.domain.passstandard.dto.ProcessStandardDto;
import com.poscodx.pofect.domain.passstandard.repository.ProcessStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProcessStandardServiceImpl implements ProcessStandardService {

    private final ProcessStandardRepository processStandardRepository;
    @Override
    public List<ProcessStandardDto> getList() {

        return processStandardRepository.findAll().stream()
                .map(ProcessStandardDto::toDto)
                .collect(Collectors.toList());
    }
//
//    @Override
//    public GrantCapacityDto getById(Long id) {
//        return GrantCapacityDto.toDto(grantCapacityRepository.findById(id)
//                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND)));
//    }

}
