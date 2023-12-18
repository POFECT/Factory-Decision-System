package com.poscodx.pofect.domain.passstandard.service;

import com.poscodx.pofect.domain.passstandard.dto.ConfirmFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;
import com.poscodx.pofect.domain.passstandard.repository.ConfirmFactoryStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConfirmFactoryStandardServiceImpl implements ConfirmFactoryStandardService {

    private final ConfirmFactoryStandardRepository confirmFactoryStandardRepository;
//    @Override
//    public List<ConfirmFactoryStandardResDto> getList() {
//        return confirmFactoryStandardRepository.findAll().stream()
//                .map(ConfirmFactoryStandardResDto::toDto)
//                .collect(Collectors.toList());
//    }

    @Override
//    public List<ConfirmFactoryStandardResDto> getGridData() {
    public List<Map<String, Object>> getGridData() {
        return confirmFactoryStandardRepository.getGridData();

//        return confirmFactoryStandardRepository.getGridData().stream()
//                .map(ConfirmFactoryStandardResDto::toDto)
//                .collect(Collectors.toList());
    }

    @Override
    public List<ConfirmFactoryStandardResDto> getFactories(String process) {
        return confirmFactoryStandardRepository.findAllByProcessCdOrderByProcessCdAsc(process).stream()
                .map(ConfirmFactoryStandardResDto::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public String getFactoryName(String processCd, String firmPsFacTp) {
        return confirmFactoryStandardRepository.findAllByProcessCdAndFirmPsFacTp(processCd, firmPsFacTp).getCdExpl();
    }

    @Override
    public List<ConfirmFactoryStandardResDto> getFactoryList() {
        return confirmFactoryStandardRepository.findAllByOrderByProcessCdAscFirmPsFacTpAsc().stream()
                .map(ConfirmFactoryStandardResDto::toDto)
                .toList();

//        List<PossibleToConfirmResDto> result = new ArrayList<>();

//        // proecssCD, list 형태의 map에 데이터 저장
//        Map<String, ArrayList<String>> map = new HashMap<>();
//
//        for(ConfirmFactoryStandardResDto dto : list) {
//            ArrayList<String> arr = map.getOrDefault(dto.getProcessCd(), new ArrayList<>());
//            arr.add(dto.getFirmPsFacTp());
//
//            map.put(dto.getProcessCd(), arr);
//        }
//
//        // map -> DTO
//        for(String key: map.keySet()) {
//            PossibleToConfirmResDto dto = new PossibleToConfirmResDto(key, map.get(key));
//            result.add(dto);
//        }
//
//        return result;
    }

}
