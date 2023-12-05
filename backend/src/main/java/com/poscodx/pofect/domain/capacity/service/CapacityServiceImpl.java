package com.poscodx.pofect.domain.capacity.service;

import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.common.exception.ErrorCode;
import com.poscodx.pofect.domain.capacity.dto.GrantCapacityDto;
import com.poscodx.pofect.domain.capacity.repository.GrantCapacityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CapacityServiceImpl implements CapacityService {

    private final GrantCapacityRepository grantCapacityRepository;
    @Override
    public List<GrantCapacityDto> getList() {

        return grantCapacityRepository.findAll().stream()
                .map(GrantCapacityDto::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public GrantCapacityDto getById(Long id) {
        return GrantCapacityDto.toDto(grantCapacityRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND)));
    }

}
