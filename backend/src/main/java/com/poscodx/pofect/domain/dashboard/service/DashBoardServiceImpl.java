package com.poscodx.pofect.domain.dashboard.service;

import com.poscodx.pofect.domain.dashboard.dto.DashBoardInputStatusResDto;
import com.poscodx.pofect.domain.dashboard.dto.DashBoardOrderInquiryResDto;
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

    @Override
    public List<DashBoardOrderInquiryResDto> getOrderInquiry() {
        List<Object[]> result = factoryOrderInfoRepository.getOrderInquiry();
        List<DashBoardOrderInquiryResDto> dashBoardOrderInquiryResDtoList = new ArrayList<>();

        for (Object[] array : result) {
            DashBoardOrderInquiryResDto dto = new DashBoardOrderInquiryResDto();

                dto.setOrdPdtItpCdN((String) array[0]);
                dto.setCountA(Integer.parseInt(array[1].toString()));
                dto.setCountB(Integer.parseInt(array[2].toString()));
                dto.setCountC(Integer.parseInt(array[3].toString()));
                dto.setCountD(Integer.parseInt(array[4].toString()));
                dto.setCountE(Integer.parseInt(array[5].toString()));
                dto.setCountF(Integer.parseInt(array[6].toString()));
                dashBoardOrderInquiryResDtoList.add(dto);
        }
        return dashBoardOrderInquiryResDtoList;
    }

    @Override
    public List<DashBoardInputStatusResDto> getInputStatusListApp(String week) {
        List<Object[]> result = factoryOrderInfoRepository.getInputStatusApp(week);
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
        return dashBoardInputStatusResDtoList;    }
}
