package com.poscodx.pofect.domain.passstandard.service;

import com.poscodx.pofect.domain.passstandard.dto.ConfirmFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.repository.ConfirmFactoryStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

}
