package com.poscodx.pofect.domain.passstandard.service;

import com.poscodx.pofect.domain.passstandard.dto.PossibleFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.entity.PossibleFactoryStandard;
import com.poscodx.pofect.domain.passstandard.repository.PossibleFactoryStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    @Override
    public String getPosbCode(String processCd, String group) {
        Optional<PossibleFactoryStandard> result =
                possibleFactoryStandardRepository.findByProcessCdAndFeasibleRoutingGroup(processCd, group);

        if(result.isPresent()) {
            return result.get().getBtiPosbPsFacTp();
        }
        else return "0";
    }
}
