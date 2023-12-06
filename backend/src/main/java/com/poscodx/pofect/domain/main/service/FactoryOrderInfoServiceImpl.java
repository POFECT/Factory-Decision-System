package com.poscodx.pofect.domain.main.service;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.poscodx.pofect.domain.main.repository.FactoryOrderInfoRepository;
import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FactoryOrderInfoServiceImpl implements FactoryOrderInfoService{

    private final FactoryOrderInfoRepository factoryOrderInfoRepository;

    @Override
    public List<FactoryOrderInfoResDto> getList() {
        return factoryOrderInfoRepository.findAll().stream()
                .map(FactoryOrderInfoResDto::toDto)
                .collect(Collectors.toList());

        /* 수동으로 Dto 변환 후 List에 담아서 리턴하는 방법 */
//        List<FactoryOrderInfoResDto> result = new ArrayList<>();
//        List<FactoryOrderInfo> list = factoryOrderInfoRepository.findAll();
//        for(FactoryOrderInfo f : list) {
//            result.add(FactoryOrderInfoResDto.toDto(f));
//        }
//        return result;

    }

    @Override
    public FactoryOrderInfoResDto getById(Long id) {
        return FactoryOrderInfoResDto.toDto(factoryOrderInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND)));
    }

    @Transactional
    @Override
    public FactoryOrderInfo insertOrder(FactoryOrderInfoReqDto factoryOrderInfoReqDto) {
        FactoryOrderInfo factoryOrderInfo = FactoryOrderInfo.toEntity(factoryOrderInfoReqDto);
        return factoryOrderInfoRepository.save(factoryOrderInfo);
    }

    @Transactional
    @Override
    public Boolean deleteOrder(Long id) {
        FactoryOrderInfo factoryOrderInfo = factoryOrderInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        factoryOrderInfoRepository.delete(factoryOrderInfo);
        return true;
    }

    @Override
    public List<String> getOrderWeeks(FactoryOrderInfoReqDto.SearchDto dto) {
        return factoryOrderInfoRepository.getWeeks(dto);
    }

}
