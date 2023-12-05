package com.poscodx.pofect.domain.dashboard.service;

import com.poscodx.pofect.domain.dashboard.dto.DashBoardInputStatusResDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.poscodx.pofect.domain.main.repository.FactoryOrderInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashBoardServiceImpl implements DashBoardService{
    private final FactoryOrderInfoRepository factoryOrderInfoRepository;

    @Override
    public List<DashBoardInputStatusResDto> getInputStatusList() {
        List<Object[]> result = factoryOrderInfoRepository.getInputStatus();
        List<DashBoardInputStatusResDto> dashBoardInputStatusResDtoList = new ArrayList<>();

        for (Object[] array : result) {
            DashBoardInputStatusResDto dto = new DashBoardInputStatusResDto();
            if (array.length > 0) {
                dto.setOrdPdtItpCdN((String) array[0]);
            }
            if (array.length > 1) {
                Long countValue = (Long) array[1];
                dto.setCount(countValue.intValue());
            }
            dashBoardInputStatusResDtoList.add(dto);
        }
        return dashBoardInputStatusResDtoList;
    }
}
