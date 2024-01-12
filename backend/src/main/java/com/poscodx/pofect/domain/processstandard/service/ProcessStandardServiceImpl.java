package com.poscodx.pofect.domain.processstandard.service;

import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;
import com.poscodx.pofect.domain.processstandard.entity.ProcessStandard;
import com.poscodx.pofect.domain.processstandard.repository.ProcessStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProcessStandardServiceImpl implements ProcessStandardService {

    private final ProcessStandardRepository processStandardRepository;

    @Override
    public List<ProcessStandardDto> getList() {
        return processStandardRepository.findAll(Sort.by(Sort.Direction.ASC, "ordPdtItdsCdN"))
                .stream()
                .map(ProcessStandardDto::toDto)
                .collect(Collectors.toList());
    }
    @Override
    public String getByOrdPdtItdsCdN(String ordPdtItdsCdN) {
        String processCdList = processStandardRepository.findByOrdPdtItdsCdN(ordPdtItdsCdN);

        // null일 경우 예외처리
        processCdList = (processCdList != null) ? processCdList : "00000000";

        ProcessStandardDto.ItemDetailDto itemDetailDto = new ProcessStandardDto.ItemDetailDto();
        itemDetailDto.setProcessCdList(processCdList);

        ProcessStandardDto.ItemDetailDto dto =
                ProcessStandardDto.ItemDetailDto.builder()
                        .processCdList(processCdList)
                        .build();

        return processCdList;
    }

    @Override
    public List<ProcessStandardDto> getProcessByItemList(String ordPdtItpCdN) {
        // "%"를 끝에 추가
        String modifiedOrdPdtItpCdN = ordPdtItpCdN + "%";

        List<ProcessStandard> processStandards = processStandardRepository.findByOrdPdtItdsCdNLike(modifiedOrdPdtItpCdN);

        return processStandards.stream()
                .map(ProcessStandardDto::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void updateProcessList(List<ProcessStandardDto> updateList) {
        for (ProcessStandardDto dto : updateList) {
            processStandardRepository.updateAvailablePassFacCdN(
                    dto.getId(),
                    dto.getAvailablePassFacCdN1(),
                    dto.getAvailablePassFacCdN2(),
                    dto.getAvailablePassFacCdN3(),
                    dto.getAvailablePassFacCdN4(),
                    dto.getAvailablePassFacCdN5(),
                    dto.getAvailablePassFacCdN6(),
                    dto.getAvailablePassFacCdN7(),
                    dto.getAvailablePassFacCdN8()
            );
        }
    }

    @Transactional
    @Override
    public ProcessStandard insert(ProcessStandardDto insertList) {
        System.out.println("!!!!!!!!!insertList = " + insertList);
//            if (processStandardRepository.existsByOrdPdtItdsCdN(dto.getOrdPdtItdsCdN())) {
//                throw new CustomException(ErrorCode.BAD_REQUEST);
//            }
            ProcessStandard processStandard = ProcessStandard.toEntity(insertList);
            System.out.println("processStandard = " + processStandard);
            return processStandardRepository.save(processStandard);
        }

    @Transactional
    @Override
    public void deleteProcessList(List<Long> idsToDelete) {
        // Assuming ProcessStandardRepository has a deleteByIdIn method
        processStandardRepository.deleteByIdIn(idsToDelete);
    }
}
