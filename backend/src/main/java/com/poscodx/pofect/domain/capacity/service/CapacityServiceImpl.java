package com.poscodx.pofect.domain.capacity.service;

import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.common.exception.ErrorCode;
import com.poscodx.pofect.domain.capacity.dto.CapacityInfoDto;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto;
import com.poscodx.pofect.domain.capacity.repository.CapacityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CapacityServiceImpl implements CapacityService {

    private final CapacityRepository capacityRepository;

    @Override
    public List<CapacityInfoDto> getList() {

        return capacityRepository.findAll().stream()
                .map(CapacityInfoDto::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CombinedCapacityDto> getCapacityList() {


        List<CombinedCapacityDto> list = capacityRepository.findCombinedCapacity();
        return capacityRepository.findCombinedCapacity();
    }
//
//    @Override
//    public List<GrantCapacityDto> getStandardList() {
//
//        return grantCapacityRepository.findOne().stream()
//                .map(GrantCapacityDto::toDto)
//                .collect(Collectors.toList());
//    }

//    @Override
//    public GrantCapacityDto getById(Long id) {
//        return GrantCapacityDto.toDto(grantCapacityRepository.findById(id)
//                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND)));
//    }

    @Transactional
    @Override
    public void insert(String week) {
        // 데이터 삽입하기 전 중복 체크
        if (capacityRepository.existsByOrdRcpTapWekCd(week)) {
            // 이미 week 데이터가 존재하면 예외
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        // 중복이 없으면 insert
        capacityRepository.insertIntoCapacityInfo(week);

    }
}
