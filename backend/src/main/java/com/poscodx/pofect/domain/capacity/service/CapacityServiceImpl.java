package com.poscodx.pofect.domain.capacity.service;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.common.exception.ErrorCode;
import com.poscodx.pofect.domain.capacity.dto.CapacityInfoDto;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto;
import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;
import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityRowSpanDto;
import com.poscodx.pofect.domain.capacity.repository.CapacityRepository;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.passstandard.service.ConfirmFactoryStandardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    // join data
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
    // rowspan 추가
    public List<CombinedCapacityDto> calculateRowSpan(List<CombinedCapacityDto> capacityData) {
        // 각 processCd 별로 firmPsFacTp가 가장 작은 값을 저장하는 맵
        Map<String, Integer> processCdCountMap = new HashMap<>();
        Map<String, Integer> processCdMinFacMap = new HashMap<>();

        for (CombinedCapacityDto dto : capacityData) {
            String processCd = dto.getProcessCd();
            // processCd가 맨 처음 나온 case
            if (!processCdCountMap.containsKey(processCd)) {
                processCdCountMap.put(processCd, 1);
            } else {
                int count = processCdCountMap.get(processCd);
                processCdCountMap.put(processCd, count + 1);
            }
            int count = processCdCountMap.get(processCd);

            // firmPsFacTp가 가장 작은 값
            if (dto.getFirmPsFacTp() != null) {
                int currentFirmPsFacTp = Integer.parseInt(dto.getFirmPsFacTp());
                Integer minFirmPsFacTp = processCdMinFacMap.get(processCd);
                if (minFirmPsFacTp == null || currentFirmPsFacTp < minFirmPsFacTp) {
                    processCdMinFacMap.put(processCd, currentFirmPsFacTp);
                }
            }

        }
        for (CombinedCapacityDto rowSpanDto : capacityData) {
            String processCd = rowSpanDto.getProcessCd();
            if (processCdMinFacMap.get(processCd) == Integer.parseInt(rowSpanDto.getFirmPsFacTp())) {
                // RowSpanInfo 객체 생성
                CombinedCapacityDto.RowSpanInfo rowSpanInfo = new CombinedCapacityDto.RowSpanInfo(processCdCountMap.get(processCd));
                if (rowSpanDto.getRowSpan() == null) {
                    rowSpanDto.setRowSpan(rowSpanInfo);
                }
            }
        }
        return capacityData;
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

    //update
    @Override
    public void updateFaAdjustmentWgt(List<CapacityInfoDto> updateList) {
        for (CapacityInfoDto dto : updateList) {
            capacityRepository.updateFaAdjustmentWgt(dto.getId(), dto.getFaAdjustmentWgt(), dto.getOrdRcpTapWekCd());
        }
    }


    @Override
    public List<CapacityInfoDto.FactoryCapacityDto> getFactoryCapacityList(String processCode, String week) {
        List<CapacityInfoDto.FactoryCapacityDto> result = new ArrayList<>();

        List<CapacityInfo> list = capacityRepository.findAllByProcessCdAndOrdRcpTapWekCdOrderByFirmPsFacTpAsc(processCode, week);
        
        for(CapacityInfo capacityInfo : list) {
            // 공장 이름 GET 후 매핑
            String factoryName = confirmFactoryStandardService.getFactoryName(capacityInfo.getProcessCd(), capacityInfo.getFirmPsFacTp());

            CapacityInfoDto.FactoryCapacityDto dto =
                    CapacityInfoDto.FactoryCapacityDto.builder()
                            .id(capacityInfo.getId())
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

    @Transactional
    @Override
    public void plusQty(Long id, Integer qty) {
        CapacityInfo capacityInfo = capacityRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        capacityInfo.updateProgressQty(capacityInfo.getProgressQty() + qty);
    }

    @Transactional
    @Override
    public void minusQty(Long id, Integer qty) {
        CapacityInfo capacityInfo = capacityRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        capacityInfo.updateProgressQty(capacityInfo.getProgressQty() - qty);
    }

    @Override
    public CapacityInfoDto findFactoryByOption(String processCd, String prevFactory, String week) {
        CapacityInfo capacityInfo = capacityRepository.findByProcessCdAndFirmPsFacTpAndAndOrdRcpTapWekCd(processCd, prevFactory, week)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        return CapacityInfoDto.toDto(capacityInfo);
    }

    @Transactional
    @Override
    public void minusProcessQty(FactoryOrderInfoReqDto.updateFactoryDto dto) {
        // 출강주, 공정, 공장 정보로 해당 데이터 찾기
        CapacityInfoDto capacityInfoDto = findFactoryByOption(dto.getProcessCd(), dto.getPrevFactory(), dto.getWeek());

        // 공장 PK, Qty로 process_qty 감소
        minusQty(capacityInfoDto.getId(), dto.getOrderQty());
    }

    @Transactional
    @Override
    public void plusProcessQty(FactoryOrderInfoReqDto.updateFactoryDto dto) {
        // 출강주, 공정, 공장 정보로 해당 데이터 찾기
        CapacityInfoDto capacityInfoDto = findFactoryByOption(dto.getProcessCd(), dto.getNextFactory(), dto.getWeek());

        // 공장 PK, Qty로 process_qty 증가
        plusQty(capacityInfoDto.getId(), dto.getOrderQty());
    }

    @Override
    public List<String> checkWeekCapacityList(List<String> weekList) {
        List<String> result = new ArrayList<>();

        for(String week: weekList) {
            List<CapacityInfo> list = capacityRepository.findAllByOrdRcpTapWekCd(week);
            if(list.isEmpty()) {
                result.add(week);
            }
        }

        return result;
    }


}