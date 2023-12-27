package com.poscodx.pofect.domain.essentialstandard.service;

import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardBtiPosReqDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardReqDto;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardResDto;
import com.poscodx.pofect.domain.essentialstandard.entity.EssentialStandard;
import com.poscodx.pofect.domain.essentialstandard.repository.EssentialStandardRepository;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EssentialStandardServiceImpl implements EssentialStandardService {
    private final EssentialStandardRepository essentialStandardRepository;

    @Override
    public List<EssentialStandardResDto> getList() {
        return essentialStandardRepository.findAll().stream()
                .map(EssentialStandardResDto::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EssentialStandardBtiPosReqDto> applyEssentialStandard(FactoryOrderInfoResDto factoryOrderInfoResDto, List<String> porcessStandardList) {
        // 필수재 기준 전체 가져오기
        List<EssentialStandardResDto> getEssentialStandardList = getList();
        // 확정 공장 코드
        List<EssentialStandardBtiPosReqDto> essentialStandardBtiPosReqDtoList = new ArrayList<>();

        // 필터링 된 필수재 기준

        for (String processCD : porcessStandardList) {
            // 전체 필수재 기준에서 필터링 기준 저장
            List<EssentialStandardResDto> getFilterdEssentialStandardList = new ArrayList<>();
            for (EssentialStandardResDto essentialStandardResDto : getEssentialStandardList) {
                if (essentialStandardResDto.getProcessCd().equals(processCD)) {
                    // 필수재 기준이 같은 것들을 필터된 기준에 저장
                    getFilterdEssentialStandardList.add(essentialStandardResDto);
                }
            }
            // 필터링 된 기준에 따라서 조건에 부합하는지 테스트
            // 끝까지 다 부합한다면?? 여기다가 추가해서 factoryDecesion에 add 하기
            EssentialStandardBtiPosReqDto essentialStandardBtiPosReqDto = new EssentialStandardBtiPosReqDto();
            List<String> btiPosbPsFacTpList = new ArrayList<>();
            // 필터된 필수재 다 돌기
            for (int i = 0; i < getFilterdEssentialStandardList.size(); i++) {
                EssentialStandardResDto filterStandard = getFilterdEssentialStandardList.get(i);
                Boolean isChecked = true;
                // 해당 필수재마다 연산 통과 여부 확인
                // 총 10번의 연산
                for (int j = 0; j < 10; j++) {
                    // 여기서 기준 1번부터 10번까지 통과 여부 확인
                    if (j == 0) {
                        if (filterStandard.getConCalcOpxa01() == null) {
                        } else {
                            if (!filterStandard.getOrdPdtItpCdN().equals(factoryOrderInfoResDto.getOrdPdtItpCdN())) {
                                isChecked = false;
                                break;
                            }
                        }
//                        System.out.println("-------------------------01");
//                        System.out.println(filterStandard.getSeq());
                    }
                    // 테스트로 FZ OR null 패스 상태
                    if (j == 1) {
                        if (filterStandard.getConCalcOpxa02() == null) {
                        } else if (filterStandard.getConCalcOpxa02().equals("!=")) {
                            if (filterStandard.getOrdPdtItdsCdN().equals(factoryOrderInfoResDto.getOrdPdtItdsCdN())) {
                                System.out.println(filterStandard.getOrdPdtItdsCdN());
                                isChecked = false;
                                break;
                            }
                        } else if (filterStandard.getConCalcOpxa02().equals("=")) {
                            if (!filterStandard.getOrdPdtItdsCdN().equals(factoryOrderInfoResDto.getOrdPdtItdsCdN())) {
                                System.out.println(filterStandard.getSeq());
                                isChecked = false;
                                break;
                            }
                        }
//                        System.out.println("-------------------------02");
//                        System.out.println(filterStandard.getSeq());

                    }
                    if (j == 2) {
                        if (filterStandard.getConCalcOpxa03() == null) {
                        } else {
                            if (!filterStandard.getCustomerNumber().equals(factoryOrderInfoResDto.getCustomerNumber())) {
                                isChecked = false;
                                break;
                            }
                        }
//                        System.out.println("-------------------------03");
//                        System.out.println(filterStandard.getSeq());
//                        System.out.println(filterStandard.getCustomerNumber());
//                        System.out.println(factoryOrderInfoResDto.getCustomerNumber());

                    }
                    if (j == 3) {
                        if (filterStandard.getConCalcOpxa04() == null) {
                            System.out.println(filterStandard.getOrderUsageCdN());
                        } else {
                            // 여기서 = 이 들어오는데, 퍼센트 연산자가 앞에 있는지 뒤에 있는지 앞뒤 다 있는지 세번 비교해서 각각 다르게
                            // 앞 뒤 다 %가 있는 경우
                            if (filterStandard.getOrderUsageCdN().startsWith("%") && filterStandard.getOrderUsageCdN().endsWith("%")) {
                                System.out.println("여기 걸리고");
                                if (!filterStandard.getOrderUsageCdN().substring(1, filterStandard.getOrderUsageCdN().length() - 1).equals(factoryOrderInfoResDto.getOrderUsageCdN())) {
                                    System.out.println("여기 안걸리고");
                                    System.out.println(filterStandard.getOrderUsageCdN().substring(1, filterStandard.getOrderUsageCdN().length() - 1));
                                    System.out.println(factoryOrderInfoResDto.getOrderUsageCdN());
                                    isChecked = false;
                                    break;
                                }
                            }
                            // "%"로 시작하는 경우
                            // 맨뒤가 이걸로 끝나는지
                            else if (filterStandard.getOrderUsageCdN().startsWith("%")) {
                                if (!factoryOrderInfoResDto.getOrderUsageCdN().endsWith(filterStandard.getOrderUsageCdN().substring(1))) {
                                    isChecked = false;
                                    break;
                                }
                            }
                            // "%"로 끝나는 경우
                            // 맨앞이 이걸로 시작하는지
                            else if (filterStandard.getOrderUsageCdN().endsWith("%")) {
                                if (!factoryOrderInfoResDto.getOrderUsageCdN().startsWith(filterStandard.getOrderUsageCdN().substring(0, filterStandard.getOrderUsageCdN().length() - 1))) {
                                    isChecked = false;
                                    break;
                                }
                            }
                            // %가 없는 경우
                            // 완전히 일치하지 않으면
                            else {
                                if (!factoryOrderInfoResDto.getOrderUsageCdN().equals(filterStandard.getOrderUsageCdN())) {
                                    isChecked = false;
                                    break;
                                }
                            }
                        }
//                        System.out.println("-------------------------04");
//                        System.out.println(filterStandard.getSeq());
//                        System.out.println("연산자 : " + filterStandard.getConCalcOpxa04());
//                        System.out.println("부호 : " + filterStandard.getOrderUsageCdN());
                    }
                    if (j == 4) {
                            if (filterStandard.getConCalcOpxa05() == null) {
                            } else {
                               // value <= a < value
                                if(filterStandard.getConCalcOpxa05().equals("value <= a < value")){
                                    if(!(factoryOrderInfoResDto.getOrderThick() >= filterStandard.getOrderThickMin() && factoryOrderInfoResDto.getOrderThick() < filterStandard.getOrderThickMax())){
                                        isChecked = false;
                                        break;
                                    }
                                }
                                //  value <= a <= value
                                else if(filterStandard.getConCalcOpxa05().equals("value <= a <= value")){
                                    if(!(factoryOrderInfoResDto.getOrderThick() >= filterStandard.getOrderThickMin() && factoryOrderInfoResDto.getOrderThick() <= filterStandard.getOrderThickMax())){
                                        isChecked = false;
                                        break;
                                    }
                                }
                                // value < a < value
                                else if(filterStandard.getConCalcOpxa05().equals("value < a < value")){
                                    if(!(factoryOrderInfoResDto.getOrderThick() > filterStandard.getOrderThickMin() && factoryOrderInfoResDto.getOrderThick() < filterStandard.getOrderThickMax())){
                                        isChecked = false;
                                        break;
                                    }
                                }
                                // value < a <= value
                                else if(filterStandard.getConCalcOpxa05().equals("value < a <= value")){
                                    if(!(factoryOrderInfoResDto.getOrderThick() > filterStandard.getOrderThickMin() && factoryOrderInfoResDto.getOrderThick() <= filterStandard.getOrderThickMax())){
                                        isChecked = false;
                                        break;
                                    }
                                }
                            }
//                            System.out.println("-------------------------05");
//                            System.out.println(filterStandard.getSeq());
//                            System.out.println("연산자 : " + filterStandard.getConCalcOpxa05());
//                            System.out.println("최소값 : " + filterStandard.getOrderThickMin());
//                            System.out.println("비교값 : " + factoryOrderInfoResDto.getOrderThick());
//                            System.out.println("최대값 : " + filterStandard.getOrderThickMax());
                        }
                    if (j == 5) {
                        if (filterStandard.getConCalcOpxa06() == null) {
                        } else {
                            // value <= a < value
                            if(filterStandard.getConCalcOpxa06().equals("value <= a < value")){
                                if(!(factoryOrderInfoResDto.getOrderWidth() >= filterStandard.getOrderWidthMin() && factoryOrderInfoResDto.getOrderWidth() < filterStandard.getOrderWidthMax())){
                                    isChecked = false;
                                    break;
                                }
                            }
                            //  value <= a <= value
                            else if(filterStandard.getConCalcOpxa06().equals("value <= a <= value")){
                                if(!(factoryOrderInfoResDto.getOrderWidth() >= filterStandard.getOrderWidthMin() && factoryOrderInfoResDto.getOrderWidth() <= filterStandard.getOrderWidthMax())){
                                    isChecked = false;
                                    break;
                                }
                            }
                            // value < a < value
                            else if(filterStandard.getConCalcOpxa06().equals("value < a < value")){
                                if(!(factoryOrderInfoResDto.getOrderWidth() > filterStandard.getOrderWidthMin() && factoryOrderInfoResDto.getOrderWidth() < filterStandard.getOrderWidthMax())){
                                    isChecked = false;
                                    break;
                                }
                            }
                            // value < a <= value
                            else if(filterStandard.getConCalcOpxa06().equals("value < a <= value")){
                                if(!(factoryOrderInfoResDto.getOrderWidth() > filterStandard.getOrderWidthMin() && factoryOrderInfoResDto.getOrderWidth() <= filterStandard.getOrderWidthMax())){
                                    isChecked = false;
                                    break;
                                }
                            }

                            // value >= a
                            else if(filterStandard.getConCalcOpxa06().equals("value >= a")){
                                if(!(factoryOrderInfoResDto.getOrderWidth() <= filterStandard.getOrderWidthMin())){
                                    isChecked = false;
                                    break;
                                }
                            }
                            // value <= a
                            else if(filterStandard.getConCalcOpxa06().equals("value <= a")){
                                if(!(factoryOrderInfoResDto.getOrderWidth() >= filterStandard.getOrderWidthMin())){
                                    isChecked = false;
                                    break;
                                }
                            }
                            // value < a
                            else if(filterStandard.getConCalcOpxa06().equals("value < a")){
                                if(!(factoryOrderInfoResDto.getOrderWidth() > filterStandard.getOrderWidthMin())){
                                    isChecked = false;
                                    break;
                                }
                            }
                        }
//                        System.out.println("-------------------------06");
//                        System.out.println(filterStandard.getSeq());
//                        System.out.println("연산자 : " + filterStandard.getConCalcOpxa06());
//                        System.out.println("최소값 : " + filterStandard.getOrderWidthMin());
//                        System.out.println("비교값 : " + factoryOrderInfoResDto.getOrderWidth());
//                        System.out.println("최대값 : " + filterStandard.getOrderWidthMax());
                    }
                    if (j == 6) {
                        }
                    if (j == 7) {
                        }
                    if (j == 8) {
                        }
                    if (j == 9) {
                    }
                }
                if(isChecked){
                    System.out.println("공정 : "+processCD);
                    System.out.println("통과 코드 : " + filterStandard.getBtiPosbPsFacTp());
                    System.out.println("seq" + filterStandard.getSeq());
                    if (!btiPosbPsFacTpList.contains(filterStandard.getBtiPosbPsFacTp())) {
                        btiPosbPsFacTpList.add(filterStandard.getBtiPosbPsFacTp());
                    }
                }
            }
            // 그 값을 저장
            essentialStandardBtiPosReqDto.setProcessCD(processCD);
            essentialStandardBtiPosReqDto.setBtiPosbPsFacTpList(btiPosbPsFacTpList);
            btiPosbPsFacTpList = new ArrayList<>();
            essentialStandardBtiPosReqDtoList.add(essentialStandardBtiPosReqDto);
            for(EssentialStandardBtiPosReqDto e : essentialStandardBtiPosReqDtoList){
                if(e.getProcessCD().equals("10")){
                    e.setBtiPosbPsFacTpList(List.of("06"));
                }
            }
            }
            return essentialStandardBtiPosReqDtoList;
        }

    @Override
    public EssentialStandardResDto addEssential(EssentialStandardReqDto essentialStandardReqDto) {
        EssentialStandard essentialStandard = EssentialStandard.fromDto(essentialStandardReqDto);
        EssentialStandard savedEntity = essentialStandardRepository.save(essentialStandard);

        return EssentialStandardResDto.toDto(savedEntity);
    }
}
