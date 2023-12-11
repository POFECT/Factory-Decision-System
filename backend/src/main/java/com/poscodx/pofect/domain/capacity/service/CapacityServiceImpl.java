package com.poscodx.pofect.domain.capacity.service;

import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.common.exception.ErrorCode;
import com.poscodx.pofect.domain.capacity.dto.CapacityInfoDto;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto;
import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityRowSpanDto;
import com.poscodx.pofect.domain.capacity.repository.CapacityRepository;
import com.poscodx.pofect.domain.passstandard.service.ConfirmFactoryStandardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CapacityServiceImpl implements CapacityService {

    private final CapacityRepository capacityRepository;
    private final ConfirmFactoryStandardService confirmFactoryStandardService;

    @Override
    public List<CapacityInfoDto> getList() {
        return capacityRepository.findAll().stream()
                .map(CapacityInfoDto::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CombinedCapacityDto> getCapacityList() {
        return capacityRepository.findCombinedCapacity();
    }

    @Override
    public List<CombinedCapacityDto> findCombinedCapacityByWeek(String week) {
        return capacityRepository.findCombinedCapacityByWeek(week);
    }


    // rowspan 추가
//    @Override
//    public List<CombinedCapacityRowSpanDto> addRowSpanValues(List<CombinedCapacityDto> combinedCapacityList) {
//        List<CombinedCapacityRowSpanDto> resultList = new ArrayList<>();
//        Map<String, Integer> processCdCountMap = new HashMap<>();
//
//        for (CombinedCapacityDto dto : combinedCapacityList) {
//            CombinedCapacityRowSpanDto rowSpanDto = new CombinedCapacityRowSpanDto();
//            BeanUtils.copyProperties(dto, rowSpanDto);
//            int rowCount = processCdCountMap.getOrDefault(dto.getProcessCd(), 0);
//
//            if (rowCount == 0) {
//                rowSpanDto.updateRowSpan(dto.getProcessCd(), rowCount);
//            }
//
//            processCdCountMap.put(dto.getProcessCd(), rowCount + 1);
//            resultList.add(rowSpanDto);
//        }
//
//        return resultList;
//    }

    @Override
    public int getRowCount(String processCd, List<CombinedCapacityDto> combinedCapacityList) {
        return (int) combinedCapacityList.stream()
                .filter(dto -> dto.getProcessCd().equals(processCd))
                .count();
    }

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

    @Override
    public List<CombinedCapacityRowSpanDto> getCombinedCapacityWithRowSpan(String week) {
        return null;
    }

    @Override
    public List<CapacityInfoDto.FactoryCapacityDto> getFactoryCapacityList(String processCode) {
        List<CapacityInfoDto.FactoryCapacityDto> result = new ArrayList<>();

        List<CapacityInfo> list = capacityRepository.findAllByProcessCdOrderByFirmPsFacTpAsc(processCode);

        for(CapacityInfo capacityInfo : list) {
            // 공장 이름 GET 후 매핑
            String factoryName = confirmFactoryStandardService.getFactoryName(capacityInfo.getProcessCd(), capacityInfo.getFirmPsFacTp());
            System.out.println(factoryName);

            CapacityInfoDto.FactoryCapacityDto dto =
                    CapacityInfoDto.FactoryCapacityDto.builder()
                            .processCd(capacityInfo.getProcessCd())
                            .firmPsFacTp(capacityInfo.getFirmPsFacTp())
                            .faAdjustmentWgt(capacityInfo.getFaAdjustmentWgt())
                            .progressQty(capacityInfo.getProgressQty())
                            .factoryName(factoryName)
                            .build();

            result.add(dto);
        }

        return result;
    }
}