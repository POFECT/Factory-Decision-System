package com.poscodx.pofect.domain.sizestandard.service;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoServiceImpl;
import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;
import com.poscodx.pofect.domain.processstandard.service.ProcessStandardService;
import com.poscodx.pofect.domain.sizestandard.dto.*;
import com.poscodx.pofect.domain.sizestandard.entity.FactorySizeStandard;
import com.poscodx.pofect.domain.sizestandard.repository.SizeStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SizeStandardServiceImpl implements SizeStandardService {
    private final SizeStandardRepository repository;
    private final FactoryOrderInfoService factoryOrderInfoService;


    @Override
    @Transactional(readOnly = true)
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
                        sizeStandardResDto.setRowSpan(RowSpan.builder().processCd(count).build());
                    }
                }
            }
        }

        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SizeStandardSetDto> setSizeStandard(Long id, List<String> processCodeList) {

        FactoryOrderInfoResDto dto
                = factoryOrderInfoService.getById(id);

        Double hrProdThkAim = dto.getOrderThick();
        Double hrProdWthAim = dto.getOrderWidth();
        String orderLength = dto.getOrderLength();
        Double hrRollUnitWgtMax = dto.getHrRollUnitWgtMax();
        // 공정 리스트 가져옴
        Map<String, List<SizeStandardResDto>> result =
                repository.findByProcessCdIn(processCodeList)
                        .stream()
                        .map(SizeStandardResDto::toDto)
                        .collect(Collectors.groupingBy(SizeStandardResDto::getProcessCd));

        return getSizeStandardSetDtos(result, hrProdThkAim, hrProdWthAim, orderLength, hrRollUnitWgtMax);
    }

    @Override
    @Transactional
    public void updateSizeStandard(List<SizeStandardReqDto> dtoList) {
        List<FactorySizeStandard> sizeStandardList = repository.findAll();

        for (FactorySizeStandard factorySizeStandard : sizeStandardList) {
            for (SizeStandardReqDto dto : dtoList) {
                if(dto.getId().equals(factorySizeStandard.getId())){
                    if(dto.getOrderThickMin() != null && !factorySizeStandard.getOrderThickMin().equals(dto.getOrderThickMin())){
                        System.out.println(dto.getOrderThickMin());
                        factorySizeStandard.updateOrderThickMin(dto.getOrderThickMin());
                    }
                    if(dto.getOrderThickMax() != null && !factorySizeStandard.getOrderThickMax().equals(dto.getOrderThickMax())){
                        factorySizeStandard.updateOrderThickMax(dto.getOrderThickMax());
                    }

                    if(dto.getOrderWidthMin() != null && !factorySizeStandard.getOrderWidthMin().equals(dto.getOrderWidthMin())){
                        factorySizeStandard.updateOrderWidthMin(dto.getOrderWidthMin());
                    }
                    if(dto.getOrderWidthMax() != null && !factorySizeStandard.getOrderWidthMax().equals(dto.getOrderWidthMax())){
                        factorySizeStandard.updateOrderWidthMax(dto.getOrderWidthMax());
                    }

                    if(dto.getOrderLengthMin() != null && !factorySizeStandard.getOrderLengthMin().equals(dto.getOrderLengthMin())){
                        factorySizeStandard.updateOrderLengthMin(dto.getOrderLengthMin());
                    }
                    if(dto.getOrderLengthMax() != null && !factorySizeStandard.getOrderLengthMax().equals(dto.getOrderLengthMax())){
                        factorySizeStandard.updateOrderLengthMax(dto.getOrderLengthMax());
                    }

                    if(dto.getHrRollUnitWgtMax1() != null && !factorySizeStandard.getHrRollUnitWgtMax1().equals(dto.getHrRollUnitWgtMax1())){
                        factorySizeStandard.updateHrRollUnitWgtMax1(dto.getHrRollUnitWgtMax1());
                    }
                    if(dto.getHrRollUnitWgtMax2() != null && !factorySizeStandard.getHrRollUnitWgtMax2().equals(dto.getHrRollUnitWgtMax2())){
                        factorySizeStandard.updateHrRollUnitWgtMax2(dto.getHrRollUnitWgtMax2());
                    }
                    break;
                }
            }
        }

    }

    @Override
    public List<SizeStandardSetDto> designSizeStandard(SizeDesignReqDto dto) {

        Map<String, List<SizeStandardResDto>> result =
                repository.findAll()
                        .stream()
                        .map(SizeStandardResDto::toDto)
                        .collect(Collectors.groupingBy(SizeStandardResDto::getProcessCd));

        Double hrProdThkAim = dto.getThick();
        Double hrProdWthAim = dto.getWidth();
        String orderLength = String.valueOf(dto.getLength());
        Double hrRollUnitWgtMax = dto.getRoll();

        return getSizeStandardSetDtos(result, hrProdThkAim, hrProdWthAim, orderLength, hrRollUnitWgtMax).stream()
                .sorted(Comparator.comparing(SizeStandardSetDto::getProcessCD)).toList();
    }

    private static List<SizeStandardSetDto> getSizeStandardSetDtos(Map<String, List<SizeStandardResDto>> result, Double hrProdThkAim, Double hrProdWthAim, String orderLength, Double hrRollUnitWgtMax) {
        List<SizeStandardSetDto> sizeStandardSetDtoList = new ArrayList<>();

        for (String process : result.keySet()) {
            SizeStandardSetDto setDto = SizeStandardSetDto.builder()
                    .processCD(process)
                    .firmPsFacTpList(new ArrayList<>())
                    .build();

            for (SizeStandardResDto sizeStandardResDto : result.get(process)) {
                List<Boolean> booleanList = new ArrayList<>();

                if(!(sizeStandardResDto.getOrderThickMax() == 0 && sizeStandardResDto.getOrderThickMin() == 0)){
                    if (sizeStandardResDto.getOrderThickMax() >= hrProdThkAim
                            && sizeStandardResDto.getOrderThickMin() <= hrProdThkAim) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                } else {
                    booleanList.add(true);
                }

                if(!(sizeStandardResDto.getOrderWidthMax() == 0 && sizeStandardResDto.getOrderWidthMin() == 0)){
                    if (sizeStandardResDto.getOrderWidthMax() >= hrProdWthAim
                            && sizeStandardResDto.getOrderWidthMin() <= hrProdWthAim) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                } else {
                    booleanList.add(true);
                }

                if (!orderLength.equals("C")) {
                    if (!(sizeStandardResDto.getOrderLengthMax() == 0 && sizeStandardResDto.getOrderLengthMin() == 0)) {
                        if (sizeStandardResDto.getOrderLengthMax() >= Double.parseDouble(orderLength)
                                && sizeStandardResDto.getOrderLengthMin() <= Double.parseDouble(orderLength)) {
                            booleanList.add(true);
                        } else {
                            booleanList.add(false);
                        }
                    } else {
                        booleanList.add(true);
                    }
                } else {
                    booleanList.add(true);
                }

                if (!(sizeStandardResDto.getHrRollUnitWgtMax2() == 0 && sizeStandardResDto.getHrRollUnitWgtMax1() == 0)) {
                    if (sizeStandardResDto.getHrRollUnitWgtMax2() >= hrRollUnitWgtMax
                            && sizeStandardResDto.getHrRollUnitWgtMax1() <= hrRollUnitWgtMax) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                } else {
                    booleanList.add(true);
                }

                if (!booleanList.contains(false)) {
                    setDto.getFirmPsFacTpList().add(sizeStandardResDto.getFirmPsFacTp());
                }
            }
            sizeStandardSetDtoList.add(setDto);

        }
        return sizeStandardSetDtoList;
    }

}
