package com.poscodx.pofect.domain.sizestandard.service;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoServiceImpl;
import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;
import com.poscodx.pofect.domain.processstandard.service.ProcessStandardService;
import com.poscodx.pofect.domain.sizestandard.dto.RowSpan;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardSetDto;
import com.poscodx.pofect.domain.sizestandard.entity.FactorySizeStandard;
import com.poscodx.pofect.domain.sizestandard.repository.SizeStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SizeStandardServiceImpl implements SizeStandardService {
    private final SizeStandardRepository repository;
    private final FactoryOrderInfoService factoryOrderInfoService;

    @Override
    public List<SizeStandardResDto> getList() {

        List<SizeStandardResDto> dtoList = repository.findAll().stream().map(SizeStandardResDto::toDto)
                .sorted(Comparator.comparing(SizeStandardResDto::getProcessCd)).toList();

        Map<String, Long> processCdToFirstIdMap = dtoList.stream()
                .collect(Collectors.toMap(
                        SizeStandardResDto::getProcessCd,
                        SizeStandardResDto::getId,
                        (existing, replacement) -> existing
                ));

        List<Long> collect = processCdToFirstIdMap.values().stream()
                .toList();

        for (Long l : collect) {
            for (SizeStandardResDto sizeStandardResDto : dtoList) {
                if (Objects.equals(sizeStandardResDto.getId(), l)) {
                    int count = 0;
                    for (SizeStandardResDto standardResDto : dtoList) {
                        if (sizeStandardResDto.getProcessCd().equals(standardResDto.getProcessCd())) {
                            count++;
                        }
                        sizeStandardResDto.setRowSpan(new RowSpan(count));
                    }
                }
            }
        }

        return dtoList;
    }

    @Override
    public List<SizeStandardSetDto> setSizeStandard(Long id, List<String> processCodeList) {

        FactoryOrderInfoResDto dto
                = factoryOrderInfoService.getById(id);

        // 공정 리스트 가져옴
        Map<String, List<SizeStandardResDto>> result =
                repository.findByProcessCdIn(processCodeList)
                        .stream()
                        .map(SizeStandardResDto::toDto)
                        .collect(Collectors.groupingBy(SizeStandardResDto::getProcessCd));

        List<SizeStandardSetDto> sizeStandardSetDtoList = new ArrayList<>();

        for (String process : result.keySet()) {
            SizeStandardSetDto setDto = SizeStandardSetDto.builder()
                    .processCD(process)
                    .firmPsFacTpList(new ArrayList<>())
                    .build();

            for (SizeStandardResDto sizeStandardResDto : result.get(process)) {
                List<Boolean> booleanList = new ArrayList<>();

                Double hrProdThkAim = dto.getHrProdThkAim();
                Double hrProdWthAim = dto.getHrProdWthAim();
                String orderLength = dto.getOrderLength();
                Double hrRollUnitWgtMax = dto.getHrRollUnitWgtMax();

                if(!(sizeStandardResDto.getOrderThickMax() == 0 && sizeStandardResDto.getOrderThickMin() == 0)){
                    if (sizeStandardResDto.getOrderThickMax() >= hrProdThkAim
                            && sizeStandardResDto.getOrderThickMin() <= hrProdThkAim) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                }

                if(!(sizeStandardResDto.getOrderWidthMax() == 0 && sizeStandardResDto.getOrderWidthMin() == 0)){
                    if (sizeStandardResDto.getOrderWidthMax() >= hrProdWthAim
                            && sizeStandardResDto.getOrderWidthMin() <= hrProdWthAim) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                }

                if (!dto.getOrderLength().equals("C")) {
                    if (!(Objects.equals(sizeStandardResDto.getOrderLengthMax(), "0") && Objects.equals(sizeStandardResDto.getOrderLengthMin(), "0"))) {
                        if (Double.parseDouble(sizeStandardResDto.getOrderLengthMax()) >= Double.parseDouble(orderLength)
                                && Double.parseDouble(sizeStandardResDto.getOrderLengthMin()) <= Double.parseDouble(orderLength)) {
                            booleanList.add(true);
                        } else {
                            booleanList.add(false);
                        }
                    }
                }

                if (!(sizeStandardResDto.getHrRollUnitWgtMax2() == 0 && sizeStandardResDto.getHrRollUnitWgtMax1() == 0)) {
                    if (sizeStandardResDto.getHrRollUnitWgtMax2() >= hrRollUnitWgtMax
                            && sizeStandardResDto.getHrRollUnitWgtMax1() <= hrRollUnitWgtMax) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                }

                if (!booleanList.contains(false)) {
                    setDto.getFirmPsFacTpList().add(sizeStandardResDto.getFirmPsFacTp());
                }
            }
            sizeStandardSetDtoList.add(setDto);
        }

        return  sizeStandardSetDtoList;
    }

}
