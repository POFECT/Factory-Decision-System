package com.poscodx.pofect.domain.sizestandard.service;

import com.poscodx.pofect.domain.sizestandard.dto.RowSpan;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.repository.SizeStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SizeStandardServiceImpl implements SizeStandardService{
    private final SizeStandardRepository repository;

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
                if(sizeStandardResDto.getId() == l){
                    int count = 0;
                    for (SizeStandardResDto standardResDto : dtoList) {
                        if (sizeStandardResDto.getProcessCd().equals(standardResDto.getProcessCd())){
                            count++;
                        }
                        sizeStandardResDto.setRowSpan(new RowSpan(count));
                    }
                }
            }
        }

        return dtoList;
    }
}
