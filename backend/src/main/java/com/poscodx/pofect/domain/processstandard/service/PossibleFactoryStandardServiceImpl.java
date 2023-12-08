package com.poscodx.pofect.domain.processstandard.service;

import com.poscodx.pofect.domain.processstandard.dto.PossibleFactoryStandardResDto;
import com.poscodx.pofect.domain.processstandard.repository.PossibleFactoryStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PossibleFactoryStandardServiceImpl implements PossibleFactoryStandardService {

    private final PossibleFactoryStandardRepository possibleFactoryStandardRepository;
//    @Override
//    public List<PossibleFactoryStandardResDto> getList() {
//        return possibleFactoryStandardRepository.findAll().stream()
//                .map(PossibleFactoryStandardResDto::toDto)
//                .collect(Collectors.toList());
//    }

    @Override
    public List<PossibleFactoryStandardResDto> getGridData() {
        return possibleFactoryStandardRepository.getGridData().stream()
                .map(PossibleFactoryStandardResDto::toDto)
                .collect(Collectors.toList());
    }
}
