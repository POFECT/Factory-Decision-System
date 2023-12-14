package com.poscodx.pofect.domain.lot.service;

import com.poscodx.pofect.domain.lot.dto.LotGroupDto;
import com.poscodx.pofect.domain.lot.dto.LotResDto;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import com.poscodx.pofect.domain.sizestandard.dto.RowSpan;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LotServiceImpl implements LotService{
    private final FactoryOrderInfoService factoryOrderInfoService;

    public List<LotGroupDto> findLotAll(){
        List<LotResDto> lotAll
                = factoryOrderInfoService.findLotAll();

        Map<String, Map<String, Map<Character, Map<String, Integer>>>> collect
                = lotAll.stream().collect(Collectors.groupingBy(LotResDto::getSmSteelGrdN,
                        Collectors.groupingBy(LotResDto::getFaConfirmFlag,
                                Collectors.groupingBy(LotResDto::getCfirmPassOpCd,
                                        Collectors.groupingBy(dataObject -> {
                                            double width = dataObject.getOrderWidth();
                                            String faConfirmFlag = dataObject.getFaConfirmFlag();
                                            if(Objects.equals(faConfirmFlag, "F")){
                                                if (width <= 970) {
                                                    return "width_970"+dataObject.getCfirmPassOpCd();
                                                } else if (width <= 1270) {
                                                    return "width_1270"+dataObject.getCfirmPassOpCd();
                                                } else if (width <= 1570) {
                                                    return "width_1570"+dataObject.getCfirmPassOpCd();
                                                } else {
                                                    return "width_over_1570"+dataObject.getCfirmPassOpCd();
                                                }
                                            } else {
                                                if (width <= 970) {
                                                    return "width_970_stand";
                                                } else if (width <= 1270) {
                                                    return "width_1270_stand";
                                                } else if (width <= 1570) {
                                                    return "width_1570_stand";
                                                } else {
                                                    return "width_over_1570_stand";
                                                }
                                            }

                                        }, Collectors.summingInt(LotResDto::getOrderLineQty))
                                )
                        )
                ));

        return getLotGroupDtos(collect);
    }

    private static List<LotGroupDto> getLotGroupDtos(Map<String, Map<String, Map<Character, Map<String, Integer>>>> collect) {
        List<LotGroupDto> resultList = new ArrayList<>();

        for (Map.Entry<String, Map<String, Map<Character, Map<String, Integer>>>> entry : collect.entrySet()) {
            String smSteelGrdN = entry.getKey();

            for (Map.Entry<String, Map<Character, Map<String, Integer>>> innerEntry : entry.getValue().entrySet()) {
                String faConfirmFlag = innerEntry.getKey();


                if (entry.getValue().entrySet().size() == 1){
                    if(!Objects.equals(faConfirmFlag, "E")) {
                        LotGroupDto addFlagEDto = LotGroupDto.builder()
                                .smSteelGrdN(smSteelGrdN)
                                .faConfirmFlag("E")
                                .build();

                        resultList.add(addFlagEDto);

                        LotGroupDto addDto = getLotGroupDto(innerEntry, smSteelGrdN, faConfirmFlag);
                        resultList.add(addDto);
                    }

                    if(!Objects.equals(faConfirmFlag, "F")) {
                        LotGroupDto addDto = getLotGroupDto(innerEntry, smSteelGrdN, faConfirmFlag);
                        resultList.add(addDto);

                        LotGroupDto addFlagFDto = LotGroupDto.builder()
                                .smSteelGrdN(smSteelGrdN)
                                .faConfirmFlag("F")
                                .build();

                        resultList.add(addFlagFDto);
                    }
                } else {
                    LotGroupDto addDto = getLotGroupDto(innerEntry, smSteelGrdN, faConfirmFlag);
                    resultList.add(addDto);
                }

            }
        }
        return resultList;
    }

    private static LotGroupDto getLotGroupDto(Map.Entry<String, Map<Character, Map<String, Integer>>> innerEntry, String smSteelGrdN, String faConfirmFlag) {
        Map<String, Integer> widthGroups = new HashMap<>();
        for (Map.Entry<Character, Map<String, Integer>> innerInnerEntry : innerEntry.getValue().entrySet()) {
            Map<String, Integer> widthMap = innerInnerEntry.getValue();
            for (Map.Entry<String, Integer> widthEntry : widthMap.entrySet()) {
                String widthKey = widthEntry.getKey();
                int value = widthEntry.getValue();

                widthGroups.put(widthKey, value);
            }
        }

        return new LotGroupDto(smSteelGrdN, faConfirmFlag, widthGroups);
    }
}
