package com.poscodx.pofect.domain.lot.service;

import com.poscodx.pofect.domain.lot.dto.LotGroupDto;
import com.poscodx.pofect.domain.lot.dto.LotResDto;
import com.poscodx.pofect.domain.main.service.FactoryOrderInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LotServiceImpl implements LotService{
    private final FactoryOrderInfoService factoryOrderInfoService;

    public Map<String, Map<String, Map<Character, Map<String, Integer>>>> findLotAll(){
        List<LotResDto> lotAll
                = factoryOrderInfoService.findLotAll();


        Map<String, Map<String, Map<Character, Map<String, Integer>>>> collect = lotAll.stream()
                .collect(Collectors.groupingBy(LotResDto::getSmSteelGrdN,
                        Collectors.groupingBy(LotResDto::getFaConfirmFlag,
                                Collectors.groupingBy(LotResDto::getCfirmPassOpCd,
                                        Collectors.groupingBy(dataObject -> {
                                            double width = dataObject.getOrderWidth();
                                            if (width <= 970) {
                                                return "width_970";
                                            } else if (width <= 1270) {
                                                return "width_1270";
                                            } else if (width <= 1570) {
                                                return "width_1570";
                                            } else {
                                                return "width_over_1570";
                                            }
                                        }, Collectors.summingInt(LotResDto::getOrderLineQty))
                                )
                        )
                ));



        return collect;
    }
}
