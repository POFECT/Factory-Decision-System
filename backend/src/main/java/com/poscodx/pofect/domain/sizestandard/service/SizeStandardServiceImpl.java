package com.poscodx.pofect.domain.sizestandard.service;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoServiceImpl;
import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;
import com.poscodx.pofect.domain.processstandard.service.ProcessStandardService;
import com.poscodx.pofect.domain.sizestandard.dto.RowSpan;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
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
    public Map<String, List<String>> setSizeStandard(Long id, List<String> processCodeList) {

        FactoryOrderInfoResDto dto
                = factoryOrderInfoService.getById(id);

        // 공정 리스트 가져옴
        Map<String, List<SizeStandardResDto>> result =
                repository.findByProcessCdIn(processCodeList)
                        .stream()
                        .map(SizeStandardResDto::toDto)
                        .collect(Collectors.groupingBy(SizeStandardResDto::getProcessCd));

        // 결과 Map
        Map<String, List<String>> resultSizeStandard = new HashMap<>();
        Map<String, List<String>> resultProcess = new HashMap<>();

        for (String process : result.keySet()) {
            for (SizeStandardResDto sizeStandardResDto : result.get(process)) {

                // 두께
                processDimensionCondition(String.valueOf(sizeStandardResDto.getOrderThickMin()), String.valueOf(sizeStandardResDto.getOrderThickMax()),
                        dto.getHrProdThkAim(), "hrProdThkAim", sizeStandardResDto.getFirmPsFacTp(), resultProcess);

                // 폭
                processDimensionCondition(String.valueOf(sizeStandardResDto.getOrderWidthMin()), String.valueOf(sizeStandardResDto.getOrderWidthMax()),
                        dto.getHrProdWthAim(), "hrProdWthAim", sizeStandardResDto.getFirmPsFacTp(), resultProcess);

                // 길이
                if (!dto.getOrderLength().equals("C")) {
                    processDimensionCondition(sizeStandardResDto.getOrderLengthMin(), sizeStandardResDto.getOrderLengthMax(),
                            Double.parseDouble(dto.getOrderLength()), "orderLength", sizeStandardResDto.getFirmPsFacTp(), resultProcess);
                }

                // 단중
                processDimensionCondition(String.valueOf(sizeStandardResDto.getHrRollUnitWgtMax1()), String.valueOf(sizeStandardResDto.getHrRollUnitWgtMax2()),
                        dto.getHrRollUnitWgtMax(), "hrRollUnitWgtMax", sizeStandardResDto.getFirmPsFacTp(), resultProcess);


                for (String s : resultProcess.keySet()) {
                    System.out.println("key : "+s);

                    for (String string : resultProcess.get(s)) {
                        System.out.println("value : " + string);
                    }
                }

            }


//            for (SizeStandardResDto sizeStandardResDto : result.get(process)) {
//
//                if ("10".equals(sizeStandardResDto.getProcessCd())) {
//                    Set<String> process10 = new HashSet<>();
//
//                    processDimensionCondition(String.valueOf(sizeStandardResDto.getOrderThickMin()), String.valueOf(sizeStandardResDto.getOrderThickMax()),
//                            dto.getHrProdThkAim(), "hrProdThkAim", sizeStandardResDto.getFirmPsFacTp(), resultProcess);
//
//                    processDimensionCondition(String.valueOf(sizeStandardResDto.getOrderWidthMin()), String.valueOf(sizeStandardResDto.getOrderWidthMax()),
//                            dto.getHrProdWthAim(), "hrProdWthAim", sizeStandardResDto.getFirmPsFacTp(), resultProcess);
//
//                    if (!dto.getOrderLength().equals("C")) {
//                        processDimensionCondition(sizeStandardResDto.getOrderLengthMin(), sizeStandardResDto.getOrderLengthMax(),
//                                Double.parseDouble(dto.getOrderLength()), "orderLength", sizeStandardResDto.getFirmPsFacTp(), resultProcess);
//                    }
//
//                    processDimensionCondition(String.valueOf(sizeStandardResDto.getHrRollUnitWgtMax1()), String.valueOf(sizeStandardResDto.getHrRollUnitWgtMax2()),
//                            dto.getHrRollUnitWgtMax(), "hrRollUnitWgtMax", sizeStandardResDto.getFirmPsFacTp(), resultProcess);
//
//                    for (List<String> value : resultProcess.values()) {
//                        process10.addAll(value);
//                    }
//                    resultSizeStandard.put("10", process10);
//                }
//
//                if ("20".equals(sizeStandardResDto.getProcessCd())) {
//                    Set<String> process20 = new HashSet<>();
//
//                    processDimensionCondition(String.valueOf(sizeStandardResDto.getOrderThickMin()), String.valueOf(sizeStandardResDto.getOrderThickMax()),
//                            dto.getHrProdThkAim(), "hrProdThkAim", sizeStandardResDto.getFirmPsFacTp(), resultProcess);
//
//                    processDimensionCondition(String.valueOf(sizeStandardResDto.getOrderWidthMin()), String.valueOf(sizeStandardResDto.getOrderWidthMax()),
//                            dto.getHrProdWthAim(), "hrProdWthAim", sizeStandardResDto.getFirmPsFacTp(), resultProcess);
//
//                    if (!dto.getOrderLength().equals("C")) {
//                        processDimensionCondition(sizeStandardResDto.getOrderLengthMin(), sizeStandardResDto.getOrderLengthMax(),
//                                Double.parseDouble(dto.getOrderLength()), "orderLength", sizeStandardResDto.getFirmPsFacTp(), resultProcess);
//                    }
//
//                    processDimensionCondition(String.valueOf(sizeStandardResDto.getHrRollUnitWgtMax1()), String.valueOf(sizeStandardResDto.getHrRollUnitWgtMax2()),
//                            dto.getHrRollUnitWgtMax(), "hrRollUnitWgtMax", sizeStandardResDto.getFirmPsFacTp(), resultProcess);
//
//                    for (List<String> value : resultProcess.values()) {
//                        process20.addAll(value);
//                    }
//                    resultSizeStandard.put("20", process20);
//                }
//            }


        }


        return resultProcess;
//        Map<String, List<String>> resultSizeStandard = new HashMap<>();
//
//        for (String process : result.keySet()) {
//            // 제강
//            if(process.equals("10")) {
//                List<SizeStandardResDto> sizeStandardResDtoList = result.get(process);
//                for (SizeStandardResDto sizeStandardResDto : sizeStandardResDtoList) {
//                    // 두께
//                    Double hrProdThkAim = dto.getHrProdThkAim();
//
//                    // 폭
//                    Double hrProdWthAim = dto.getHrProdWthAim();
//
//                    //길이
//                    String orderLength = dto.getOrderLength();
//
//                    // 단중
//                    Double hrRollUnitWgtMax = dto.getHrRollUnitWgtMax();
//
//                    if(sizeStandardResDto.getOrderThickMax() >= hrProdThkAim && sizeStandardResDto.getOrderThickMin() <= hrProdThkAim){
//                        if(!resultSizeStandard.containsKey("hrProdThkAim")){
//                            List<String> firmPsFacTpList = new ArrayList<>();
//                            firmPsFacTpList.add(sizeStandardResDto.getFirmPsFacTp());
//                            resultSizeStandard.put("hrProdThkAim", firmPsFacTpList);
//                        } else {
//                            resultSizeStandard.get("hrProdThkAim").add(sizeStandardResDto.getFirmPsFacTp());
//                        }
//                    }
//
//                    if(sizeStandardResDto.getOrderWidthMax() >= hrProdWthAim && sizeStandardResDto.getOrderWidthMin() <= hrProdWthAim){
//                        if(!resultSizeStandard.containsKey("hrProdWthAim")){
//                            List<String> firmPsFacTpList = new ArrayList<>();
//                            firmPsFacTpList.add(sizeStandardResDto.getFirmPsFacTp());
//                            resultSizeStandard.put("hrProdWthAim", firmPsFacTpList);
//                        } else {
//                            resultSizeStandard.get("hrProdWthAim").add(sizeStandardResDto.getFirmPsFacTp());
//                        }
//                    }
//
//                    if(!dto.getOrderLength().equals("C")){
//                        if(Double.parseDouble(sizeStandardResDto.getOrderLengthMax()) >= Double.parseDouble(orderLength)
//                                && Double.parseDouble(sizeStandardResDto.getOrderLengthMin()) <= Double.parseDouble(orderLength)) {
//                            if(!resultSizeStandard.containsKey("orderLength")){
//                                List<String> firmPsFacTpList = new ArrayList<>();
//                                firmPsFacTpList.add(sizeStandardResDto.getFirmPsFacTp());
//                                resultSizeStandard.put("orderLength", firmPsFacTpList);
//                            } else {
//                                resultSizeStandard.get("orderLength").add(sizeStandardResDto.getFirmPsFacTp());
//                            }
//                        }
//                    }
//
//                    if(sizeStandardResDto.getHrRollUnitWgtMax1() >= hrRollUnitWgtMax && sizeStandardResDto.getHrRollUnitWgtMax2() <= hrRollUnitWgtMax){
//                        if(!resultSizeStandard.containsKey("hrRollUnitWgtMax")){
//                            List<String> firmPsFacTpList = new ArrayList<>();
//                            firmPsFacTpList.add(sizeStandardResDto.getFirmPsFacTp());
//                            resultSizeStandard.put("hrRollUnitWgtMax", firmPsFacTpList);
//                        } else {
//                            resultSizeStandard.get("hrRollUnitWgtMax").add(sizeStandardResDto.getFirmPsFacTp());
//                        }
//                    }
//
//                }
//            }
//        }

    }


    private void processDimensionCondition(String min, String max, double value, String key, String firmPsFacTp, Map<String, List<String>> resultProcess) {
        if (Double.parseDouble(min) <= value && value <= Double.parseDouble(max)) {
            resultProcess.computeIfAbsent(key, k -> new ArrayList<>()).add(firmPsFacTp);

        }
    }
}
