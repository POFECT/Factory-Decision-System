package com.poscodx.pofect.domain.main.service;

//import com.poscodx.pofect.domain.lot.dto.LotResDto;
import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.essentialstandard.controller.EssentialStandardController;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardBtiPosReqDto;
import com.poscodx.pofect.domain.essentialstandard.service.EssentialStandardService;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.poscodx.pofect.domain.main.repository.FactoryOrderInfoRepository;
import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.common.exception.ErrorCode;
import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;
import com.poscodx.pofect.domain.passstandard.service.PossibleFactoryStandardService;
import com.poscodx.pofect.domain.processstandard.service.ProcessStandardService;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardSetDto;
import com.poscodx.pofect.domain.sizestandard.repository.SizeStandardRepository;
import com.poscodx.pofect.domain.sizestandard.service.SizeStandardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FactoryOrderInfoServiceImpl implements FactoryOrderInfoService{

    private final FactoryOrderInfoRepository factoryOrderInfoRepository;
    private final ProcessStandardService processStandardService;
    private final PossibleFactoryStandardService possibleFactoryStandardService;
    private final EssentialStandardService essentialStandardService;
//    private final SizeStandardService sizeStandardService;

    // 없어질 예정
    private final SizeStandardRepository sizeStandardRepository;


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
    public List<FactoryOrderInfoResDto> getOrderList(FactoryOrderInfoReqDto.orderDto dto) {
        return factoryOrderInfoRepository.findAllByOption(dto).stream()
                .map(FactoryOrderInfoResDto::toDto)
                .collect(Collectors.toList());
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

    @Transactional
    @Override
    public Long updateOrderFlag(FactoryOrderInfoReqDto.updateCodeDto reqDto) {
        return factoryOrderInfoRepository.updateFlag(reqDto);
    }

    @Transactional(readOnly = true)
    @Override
    public List<com.poscodx.pofect.domain.lot.dto.LotResDto> findLotAll() {
        return factoryOrderInfoRepository.findLotAll().stream().map(com.poscodx.pofect.domain.lot.dto.LotResDto::fromDtoToDto)
                .toList();
    }
    @Transactional
    @Override
    public Long updateOrderStatus(FactoryOrderInfoReqDto.updateCodeDto reqDto) {
        return factoryOrderInfoRepository.updateStatus(reqDto);
    }

    @Transactional
    @Override
    public Boolean possibleFactory(Long id) {
        FactoryOrderInfo order = factoryOrderInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        /** 경유공정 설계 */
        String passResult = processStandardService.getByOrdPdtItdsCdN(order.getOrdPdtItdsCdN());
//        String passResult = "11011101";

        // 설계 에러 - FLAG update, 설계일시 update
        if("00000000".equals(passResult)) {
            order.changeFlag("C");  // FA_CONFIRM_FLAG update
            order.changePosbDate();  // POSB_PASS_FAC_UPDATE_DATE update
        }
        else {
            StringBuilder possibleCode = new StringBuilder();  // 가통 코드
            List<String> processList = new ArrayList<>();  // 가능한 경유 공정 ID 리스트

            for (int i = 0, j = 10 ; i < 8; i++, j += 10) {
                if(passResult.charAt(i) == '1') processList.add(Integer.toString(j));
            }

            /** 필수재 설계 */
            List<EssentialStandardBtiPosReqDto> e = essentialStandardService.applyEssentialStandard(getById(order.getId()), processList);
            List<PossibleToConfirmResDto> essentialResult = possibleFactoryStandardService.possibleToConfirm(e);
//            List<SizeStandardSetDto> essentialResult = new ArrayList<>();
//
//            // 10 - 80 필수재 더미 데이터
//            SizeStandardSetDto dto = new SizeStandardSetDto();
//            List<String> fac = new ArrayList<>();
//
//            dto.setProcessCD("10");
//            fac.add("1");
//            fac.add("2");
//            dto.setFirmPsFacTpList(fac);
//            essentialResult.add(dto);
//            fac = new ArrayList<>();
//            dto = new SizeStandardSetDto();
//
//            dto.setProcessCD("20");
//            fac.add("1");
//            fac.add("2");
//            fac.add("3");
//            dto.setFirmPsFacTpList(fac);
//            essentialResult.add(dto);
//            fac = new ArrayList<>();
//            dto = new SizeStandardSetDto();
//
//            dto.setProcessCD("40");
//            dto.setFirmPsFacTpList(fac);
//            essentialResult.add(dto);
//            fac = new ArrayList<>();
//            dto = new SizeStandardSetDto();
//
//            dto.setProcessCD("50");
//            fac.add("1");
//            fac.add("2");
//            dto.setFirmPsFacTpList(fac);
//            essentialResult.add(dto);
//            fac = new ArrayList<>();
//            dto = new SizeStandardSetDto();
//
//            dto.setProcessCD("60");
//            dto.setFirmPsFacTpList(fac);
//            essentialResult.add(dto);
//            fac = new ArrayList<>();
//            dto = new SizeStandardSetDto();
//
//            dto.setProcessCD("80");
//            fac.add("1");
//            dto.setFirmPsFacTpList(fac);
//            essentialResult.add(dto);

//            System.out.println("essential");
//            for(PossibleToConfirmResDto s: essentialResult) {
//                System.out.print(s.getProcessCD()+" : ");
//                if()
//                for(String g : s.getFirmPsFacTpList()) {
//                    System.out.print(g+",");
//                }
//                System.out.println();
//            }

            /** 사이즈 기준 설계 */
            List<SizeStandardSetDto> sizeResult = setSizeStandard(order.getId(), processList);

            System.out.println("size");
            for(SizeStandardSetDto s: sizeResult) {
                System.out.print(s.getProcessCD()+" : ");
                for(String g : s.getFirmPsFacTpList()) {
                    System.out.print(g+",");
                }
                System.out.println();
            }

            for (int i = 0, j = 10; i < 8; i++, j += 10) {
                // 해당 공정 필요 없을 때
                if(passResult.charAt(i) == '0') possibleCode.append("  ");
                    // 공정에 해당하면 필수재, 사이즈 기준 교집합 추출
                else {
                    // 공정에 해당하는 공장 리스트 불러오기
                    PossibleToConfirmResDto essential = null;
                    SizeStandardSetDto size = null;

                    for (PossibleToConfirmResDto d : essentialResult) {
                        if(d.getProcessCD().equals(Integer.toString(j))) {
                            essential = d;
                            break;
                        }
                    }
                    for (SizeStandardSetDto d : sizeResult) {
                        if(d.getProcessCD().equals(Integer.toString(j))) {
                            size = d;
                            break;
                        }
                    }

                    // PP 에러코드 실험
                    if(j == 20) {
                        size.getFirmPsFacTpList().add("3");
                    }

                    // 필수재 X, 사이즈 X -> FF
                    if(essential.getFirmPsFacTpList() == null && size.getFirmPsFacTpList().isEmpty()) {
                        possibleCode.append("FF");
                        continue;
                    }
                    // 필수재 X, 사이즈 O -> FP
                    if(essential.getFirmPsFacTpList() == null) {
                        possibleCode.append("FP");
                        continue;
                    }
                    // 필수재 O, 사이즈 X -> PF
                    if(size.getFirmPsFacTpList().isEmpty()) {
                        possibleCode.append("PF");
                        continue;
                    }

                    // Set에 필수재, 사이즈 기준의 전체 공장 리스트 put
                    Set<String> allFactory = new HashSet<>();
                    for(String f : essential.getFirmPsFacTpList()) allFactory.add(f);
                    for(String f : size.getFirmPsFacTpList()) allFactory.add(f);

                    // 교집합 List
                    List<String> same = new ArrayList<>();

                    for(String f : allFactory) {
                        if(essential.getFirmPsFacTpList().contains(f) && size.getFirmPsFacTpList().contains(f))
                            same.add(f);
                    }

                    // 교집합 없을 때 -> CC
                    if(same.isEmpty()) {
                        possibleCode.append("CC");
                        continue;
                    }

                    Collections.sort(same);
                    StringBuilder group = new StringBuilder();
                    for(String s : same) group.append(s);

                    // 교집합 리스트 -> 가통코드 조회
                    String code = possibleFactoryStandardService.getPosbCode(Integer.toString(j), group.toString());
                    // 교집합 O, Error -> PP
                    if("0".equals(code)) {
                        possibleCode.append("PP");
                    }
                    else possibleCode.append(code);

                }
            }

            System.out.println("가통결과!!!!!" + possibleCode);

            // 가통코드, 설계일시 업데이트
            order.changePosbPassFacCdN(possibleCode.toString());
            order.changePosbDate();  // POSB_PASS_FAC_UPDATE_DATE update

            // 에러코드 포함 - FLAG : C
            if(possibleCode.toString().contains("F") || possibleCode.toString().contains("P")) {
                order.changeFlag("C");
            }
            // 설계 성공 - FLAG : B
            else order.changeFlag("B");
        }

        return ("C".equals(order.getFaConfirmFlag()) ? false : true);
    }


    @Transactional
    @Override
    public Boolean confirmFactory(Long id) {
        FactoryOrderInfo order = factoryOrderInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        String possibleCode = order.getPosbPassFacCdN();

        for(int i = 0; i < 16; i+=2) {
            String process = possibleCode.substring(i,2);

        }

//        return ("C".equals(order.getFaConfirmFlag()) ? false : true);
        return false;
    }



    // 없어질 예정 - 사이즈 기준 설계
    @Transactional(readOnly = true)
    public List<SizeStandardSetDto> setSizeStandard(Long id, List<String> processCodeList) {

        FactoryOrderInfoResDto dto
                = getById(id);

        // 공정 리스트 가져옴
        Map<String, List<SizeStandardResDto>> result =
                sizeStandardRepository.findByProcessCdIn(processCodeList)
                        .stream()
                        .map(SizeStandardResDto::toDto)
                        .collect(Collectors.groupingBy(SizeStandardResDto::getProcessCd));

        List<SizeStandardSetDto> sizeStandardSetDtoList = new ArrayList<>();

        for (String process : result.keySet()) {
            SizeStandardSetDto setDto = SizeStandardSetDto.builder()
                    .processCD(process)
                    .firmPsFacTpList(new ArrayList<>())
                    .build();

            for (SizeStandardResDto sizeStandardResDto : result.get(process)) {
                List<Boolean> booleanList = new ArrayList<>();

                Double hrProdThkAim = dto.getHrProdThkAim();
                Double hrProdWthAim = dto.getHrProdWthAim();
                String orderLength = dto.getOrderLength();
                Double hrRollUnitWgtMax = dto.getHrRollUnitWgtMax();

                if(!(sizeStandardResDto.getOrderThickMax() == 0 && sizeStandardResDto.getOrderThickMin() == 0)){
                    if (sizeStandardResDto.getOrderThickMax() >= hrProdThkAim
                            && sizeStandardResDto.getOrderThickMin() <= hrProdThkAim) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                }

                if(!(sizeStandardResDto.getOrderWidthMax() == 0 && sizeStandardResDto.getOrderWidthMin() == 0)){
                    if (sizeStandardResDto.getOrderWidthMax() >= hrProdWthAim
                            && sizeStandardResDto.getOrderWidthMin() <= hrProdWthAim) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                }

                if (!dto.getOrderLength().equals("C")) {
                    if (!(Objects.equals(sizeStandardResDto.getOrderLengthMax(), "0") && Objects.equals(sizeStandardResDto.getOrderLengthMin(), "0"))) {
                        if (Double.parseDouble(sizeStandardResDto.getOrderLengthMax()) >= Double.parseDouble(orderLength)
                                && Double.parseDouble(sizeStandardResDto.getOrderLengthMin()) <= Double.parseDouble(orderLength)) {
                            booleanList.add(true);
                        } else {
                            booleanList.add(false);
                        }
                    }
                }

                if (!(sizeStandardResDto.getHrRollUnitWgtMax2() == 0 && sizeStandardResDto.getHrRollUnitWgtMax1() == 0)) {
                    if (sizeStandardResDto.getHrRollUnitWgtMax2() >= hrRollUnitWgtMax
                            && sizeStandardResDto.getHrRollUnitWgtMax1() <= hrRollUnitWgtMax) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                }

                if (!booleanList.contains(false)) {
                    setDto.getFirmPsFacTpList().add(sizeStandardResDto.getFirmPsFacTp());
                }
            }
            sizeStandardSetDtoList.add(setDto);
        }

        return  sizeStandardSetDtoList;
    }
}
