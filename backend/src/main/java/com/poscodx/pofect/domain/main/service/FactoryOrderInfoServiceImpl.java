package com.poscodx.pofect.domain.main.service;

//import com.poscodx.pofect.domain.lot.dto.LotResDto;
import com.poscodx.pofect.domain.capacity.dto.CapacityInfoDto;
import com.poscodx.pofect.domain.capacity.service.CapacityService;
import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardBtiPosReqDto;
import com.poscodx.pofect.domain.essentialstandard.service.EssentialStandardService;
import com.poscodx.pofect.domain.log.document.CapacityData;
import com.poscodx.pofect.domain.log.document.ConfirmData;
import com.poscodx.pofect.domain.log.document.LogDoc;
import com.poscodx.pofect.domain.log.document.PossibleData;
import com.poscodx.pofect.domain.log.service.LogService;
import com.poscodx.pofect.domain.lot.dto.LotSearchDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.dto.app.appResDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.poscodx.pofect.domain.main.repository.FactoryOrderInfoRepository;
import com.poscodx.pofect.common.exception.CustomException;
import com.poscodx.pofect.common.exception.ErrorCode;
import com.poscodx.pofect.domain.passstandard.controller.ConfirmFactoryStandardController;
import com.poscodx.pofect.domain.passstandard.dto.ConfirmFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;
import com.poscodx.pofect.domain.passstandard.service.ConfirmFactoryStandardService;
import com.poscodx.pofect.domain.passstandard.service.PossibleFactoryStandardService;
import com.poscodx.pofect.domain.processstandard.service.ProcessStandardService;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardSetDto;
import com.poscodx.pofect.domain.sizestandard.repository.SizeStandardRepository;
import lombok.RequiredArgsConstructor;
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
    private final CapacityService capacityService;
    private final ConfirmFactoryStandardService confirmFactoryStandardService;
    private final ConfirmFactoryStandardController confirmFactoryStandardController;
    private final LogService logService;
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
        /** 로그 생성 */
        for (Long id : reqDto.getIds()) {
            FactoryOrderInfo order = factoryOrderInfoRepository.findById(id)
                    .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

            LogDoc logDoc = LogDoc.builder()
                    .orderId(order.getId())
                    .flag(reqDto.getValue())
                    .build();

            logService.insertLog(logDoc);
        }

        return factoryOrderInfoRepository.updateFlag(reqDto);
    }

    @Transactional(readOnly = true)
    @Override
    public List<com.poscodx.pofect.domain.lot.dto.LotResDto> findLotAll(LotSearchDto searchDto) {
        return factoryOrderInfoRepository.findLotAll(searchDto).stream().map(com.poscodx.pofect.domain.lot.dto.LotResDto::fromDtoToDto)
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

        // 재설계인지 판단 - 로그 데이터
        String etc = "";
        String logFlag = "";
        if("A".equals(order.getFaConfirmFlag())) etc = "최초 설계";
        else etc = "재설계";

        /** 경유공정 설계 */
        String passResult = processStandardService.getByOrdPdtItdsCdN(order.getOrdPdtItdsCdN());

        // 경유공정 설계 결과 저장
        order.changePosbPassFacProcess(passResult);

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

            // 전체 공정의 공장 리스트 - ProcessCdAsc FirmPsFacTpAsc
            List<ConfirmFactoryStandardResDto> factoryList = confirmFactoryStandardService.getFactoryList();

            /** 필수재 설계 */
            List<EssentialStandardBtiPosReqDto> e = essentialStandardService.applyEssentialStandard(getById(order.getId()), processList);
            List<PossibleToConfirmResDto> essentialResult = possibleFactoryStandardService.possibleToConfirm(e);

            // 필수재 설계 결과 저장
            StringBuilder essentialStr = new StringBuilder();
            for (ConfirmFactoryStandardResDto list: factoryList) {
                String processCd = list.getProcessCd();
                String factory = list.getFirmPsFacTp();

                boolean exist = false;
                for (PossibleToConfirmResDto es : essentialResult) {
                    if(es.getProcessCD().equals(processCd)) {
                        exist = true;
                        List<String> factories = es.getFirmPsFacTpList();
                        if (factories != null && factories.contains(factory)) {
                            essentialStr.append(1);
                        } else essentialStr.append(0);
                    }
                }
                if(!exist) essentialStr.append(0);
            }
            order.changePosbPassFacEs(essentialStr.toString());

            /** 사이즈 기준 설계 */
            List<SizeStandardSetDto> sizeResult = setSizeStandard(order.getId(), processList);

            // 사이즈 설계 결과 저장
            StringBuilder sizeStr = new StringBuilder();
            for (ConfirmFactoryStandardResDto list: factoryList) {
                String processCd = list.getProcessCd();
                String factory = list.getFirmPsFacTp();

                boolean exist = false;
                for (SizeStandardSetDto size : sizeResult) {
                    if(size.getProcessCD().equals(processCd)) {
                        exist = true;
                        List<String> factories = size.getFirmPsFacTpList();
                        if (!factories.isEmpty() && factories.contains(factory)) {
                            sizeStr.append(1);
                        } else sizeStr.append(0);
                    }
                }
                if(!exist) sizeStr.append(0);
            }
            order.changePosbPassFacSize(sizeStr.toString());

//            System.out.println("@@@!size");
//            System.out.println(sizeResult);
//            for(SizeStandardSetDto s: sizeResult) {
//                System.out.print(s.getProcessCD()+" : ");
//                for(String g : s.getFirmPsFacTpList()) {
//                    System.out.print(g+",");
//                }
//                System.out.println();
//            }

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
//                    if(j == 20) {
//                        size.getFirmPsFacTpList().add("3");
//                    }

                    // 필수재 X, 사이즈 X -> FF
                    if((essential == null || essential.getFirmPsFacTpList() == null)
                            && (size == null || size.getFirmPsFacTpList().isEmpty())) {
                        possibleCode.append("FF");
                        continue;
                    }
                    // 필수재 X, 사이즈 O -> FP
                    if(essential == null || essential.getFirmPsFacTpList() == null) {
                        possibleCode.append("FP");
                        continue;
                    }
                    // 필수재 O, 사이즈 X -> PF
                    if(size == null || size.getFirmPsFacTpList().isEmpty()) {
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
            if(possibleCode.toString().contains("F") || possibleCode.toString().contains("P") || possibleCode.toString().contains("C")) {
                order.changeFlag("C");
                logFlag = "C";
            }
            // 설계 성공 - FLAG : B
            else {
                order.changeFlag("B");
                logFlag = "B";
            }


            /** 로그 데이터 insert */
            // 경유 공정 못탈 때
            if("00000000".equals(passResult)) {
                PossibleData possibleData = PossibleData.builder()
                        .passResult(passResult)
                        .build();

                LogDoc logDoc = LogDoc.builder()
                        .orderId(order.getId())
                        .flag(logFlag)
                        .possibleData(possibleData)
                        .etc(etc)
                        .build();

                logService.insertLog(logDoc);
            }
            else {
                PossibleData possibleData = PossibleData.builder()
                        .passResult(passResult)
                        .essentialResult(essentialStr.toString())
                        .sizeResult(sizeStr.toString())
                        .code(possibleCode.toString())
                        .build();

                LogDoc logDoc = LogDoc.builder()
                        .orderId(order.getId())
                        .flag(logFlag)
                        .possibleData(possibleData)
                        .etc(etc)
                        .build();

                logService.insertLog(logDoc);
            }
        }

        return (!"C".equals(order.getFaConfirmFlag()));
    }


    @Transactional
    @Override
    public Boolean confirmFactory(Long id) {
        FactoryOrderInfo order = factoryOrderInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        /** 로그 데이터 */
        List<CapacityData> logList = new ArrayList<>();
        String etc = "";
        if("D".equals(order.getFaConfirmFlag())) etc = "최초 설계";
        else etc = "재설계";

        String possibleCode = order.getPosbPassFacCdN();
        StringBuilder confirmCode = new StringBuilder();

        /** 공장확정 이력이 있다면 기존 이력 삭제하고 재설계 */
        if(order.getCfirmPassOpCd() != null) {
            for(int i = 0, j = 10; i < order.getCfirmPassOpCd().length(); i++, j+=10) {
                char c = order.getCfirmPassOpCd().charAt(i);
                if(c == ' ') continue;

                FactoryOrderInfoReqDto.updateFactoryDto reqDto = new FactoryOrderInfoReqDto.updateFactoryDto();
                reqDto.setProcessCd(Integer.toString(j));
                reqDto.setPrevFactory(Character.toString(c));
                reqDto.setWeek(order.getOrdThwTapWekCd());
                reqDto.setOrderQty(order.getOrderLineQty());

                // 기존 공장 투입량 감소
                capacityService.minusProcessQty(reqDto);
            }
        }

        /** 가통코드 16자리 - 2자리씩 끊어서 공정 구분 */
        for(int i = 0, j = 10; i < 16; i+=2, j+=10) {
            String process = possibleCode.substring(i,i+2);

            // 해당 공정 타지 않을 경우
            if("  ".equals(process)) {
                confirmCode.append(" ");
            }
            else {
                // 공정번호, 출강주로 공장들의 능력 데이터 받아옴
                List<CapacityInfoDto.FactoryCapacityDto> factoryCapacity =
                        capacityService.getFactoryCapacityList(Integer.toString(j), order.getOrdThwTapWekCd());

                // 리스트 돌면서 잔여량 가장 큰 공장의 index 구하기
                int maxIdx = 0;
                long max = Integer.MIN_VALUE;

                for (int k = 0; k < factoryCapacity.size(); k++) {
                    CapacityInfoDto.FactoryCapacityDto fac = factoryCapacity.get(k);
                    long remain = fac.getFaAdjustmentWgt()-fac.getProgressQty();

                    if(remain > max) {
                        max = remain;
                        maxIdx = k;
                    }
                }

                // 잔여량 max인 공장의 투입량 갱신
                Long factoryId = factoryCapacity.get(maxIdx).getId();
                capacityService.plusQty(factoryId, order.getOrderLineQty());

                // 잔여량 max인 공장의 공장번호 확통코드에 등록
                confirmCode.append(factoryCapacity.get(maxIdx).getFirmPsFacTp());

                // 로그 데이터 - 공장 상세 설계 내역
                CapacityData capacityData = CapacityData.builder()
                        .processCd(factoryCapacity.get(maxIdx).getProcessCd())
                        .factory(factoryCapacity.get(maxIdx).getFactoryName())
                        .capacityQty(factoryCapacity.get(maxIdx).getFaAdjustmentWgt()
                                -(factoryCapacity.get(maxIdx).getProgressQty()+order.getOrderLineQty()))
                        .build();

                logList.add(capacityData);
            }
        }

        // 설계 성공 - FLAG : E
        order.changeFlag("E");

        // 확통코드 업데이트
        order.changeCfirmPassOpCd(confirmCode.toString());

        // 로깅
        ConfirmData confirmData = ConfirmData.builder()
                .code(confirmCode.toString())
                .capacityData(logList)
                .build();

        LogDoc logDoc = LogDoc.builder()
                .orderId(id)
                .orderHeadLineNo(order.getOrderHeadLineNo())
                .flag("E")
                .etc(etc)
                .orderLineQty(order.getOrderLineQty())
                .confirmData(confirmData)
                .build();

        logService.insertLog(logDoc);

        return ("E".equals(order.getFaConfirmFlag()));
    }

    @Transactional
    @Override
    public void updateFactory(FactoryOrderInfoReqDto.updateFactoryDto reqDto) {
        FactoryOrderInfo order = factoryOrderInfoRepository.findById(reqDto.getOrderId())
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        reqDto.setWeek(order.getOrdThwTapWekCd());
        reqDto.setOrderQty(order.getOrderLineQty());

        // 기존 공장 투입량 업데이트
        capacityService.minusProcessQty(reqDto);

        // 변경할 공장 투입량 업데이트
        capacityService.plusProcessQty(reqDto);

        // 주문의 확통코드 업데이트
        StringBuilder cfirmCode = new StringBuilder();
        cfirmCode.append(order.getCfirmPassOpCd());
        cfirmCode.setCharAt((Integer.parseInt(reqDto.getProcessCd())/10)-1, reqDto.getNextFactory().charAt(0));
        order.changeCfirmPassOpCd(cfirmCode.toString());

        /** 로깅 - 공장 상세 설계 내역 */
        // 확통코드, 출강주로 공정, 공장, 능력치 리스트 데이터 받아옴
        List<CapacityData> capacityList = capacityService.getByCfirmcodeAndWeek(cfirmCode.toString(), order.getOrdThwTapWekCd());

        ConfirmData confirmData = ConfirmData.builder()
                .code(cfirmCode.toString())
                .capacityData(capacityList)
                .build();

        LogDoc logDoc = LogDoc.builder()
                .orderId(order.getId())
                .orderHeadLineNo(order.getOrderHeadLineNo())
                .flag("E")
                .etc("공장 변경")
                .confirmData(confirmData)
                .orderLineQty(order.getOrderLineQty())
                .build();

        logService.insertLog(logDoc);
    }


    // 없어질 예정 - 사이즈 기준 설계
    @Transactional(readOnly = true)
    public List<SizeStandardSetDto> setSizeStandard(Long id, List<String> processCodeList) {

        FactoryOrderInfoResDto dto
                = getById(id);

        Double hrProdThkAim = dto.getOrderThick();
        Double hrProdWthAim = dto.getOrderWidth();
        String orderLength = dto.getOrderLength();
        Double hrRollUnitWgtMax = dto.getHrRollUnitWgtMax();

        // 공정 리스트 가져옴
        Map<String, List<SizeStandardResDto>> result =
                sizeStandardRepository.findByProcessCdIn(processCodeList)
                        .stream()
                        .map(SizeStandardResDto::toDto)
                        .collect(Collectors.groupingBy(SizeStandardResDto::getProcessCd));

        return getSizeStandardSetDtos(result, hrProdThkAim, hrProdWthAim, orderLength, hrRollUnitWgtMax);
    }

    private static List<SizeStandardSetDto> getSizeStandardSetDtos(Map<String, List<SizeStandardResDto>> result, Double hrProdThkAim, Double hrProdWthAim, String orderLength, Double hrRollUnitWgtMax) {
        List<SizeStandardSetDto> sizeStandardSetDtoList = new ArrayList<>();

        for (String process : result.keySet()) {
            SizeStandardSetDto setDto = SizeStandardSetDto.builder()
                    .processCD(process)
                    .firmPsFacTpList(new ArrayList<>())
                    .build();

            for (SizeStandardResDto sizeStandardResDto : result.get(process)) {
                List<Boolean> booleanList = new ArrayList<>();

                if(!(sizeStandardResDto.getOrderThickMax() == 0 && sizeStandardResDto.getOrderThickMin() == 0)){
                    if (sizeStandardResDto.getOrderThickMax() >= hrProdThkAim
                            && sizeStandardResDto.getOrderThickMin() <= hrProdThkAim) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                } else {
                    booleanList.add(true);
                }

                if(!(sizeStandardResDto.getOrderWidthMax() == 0 && sizeStandardResDto.getOrderWidthMin() == 0)){
                    if (sizeStandardResDto.getOrderWidthMax() >= hrProdWthAim
                            && sizeStandardResDto.getOrderWidthMin() <= hrProdWthAim) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                } else {
                    booleanList.add(true);
                }

                if (!orderLength.equals("C")) {
                    if (!(sizeStandardResDto.getOrderLengthMax() == 0 && sizeStandardResDto.getOrderLengthMin() == 0)) {
                        if (sizeStandardResDto.getOrderLengthMax() >= Double.parseDouble(orderLength)
                                && sizeStandardResDto.getOrderLengthMin() <= Double.parseDouble(orderLength)) {
                            booleanList.add(true);
                        } else {
                            booleanList.add(false);
                        }
                    } else {
                        booleanList.add(true);
                    }
                } else {
                    booleanList.add(true);
                }

                if (!(sizeStandardResDto.getHrRollUnitWgtMax2() == 0 && sizeStandardResDto.getHrRollUnitWgtMax1() == 0)) {
                    if (sizeStandardResDto.getHrRollUnitWgtMax2() >= hrRollUnitWgtMax
                            && sizeStandardResDto.getHrRollUnitWgtMax1() <= hrRollUnitWgtMax) {
                        booleanList.add(true);
                    } else {
                        booleanList.add(false);
                    }
                } else {
                    booleanList.add(true);
                }

                if (!booleanList.contains(false)) {
                    setDto.getFirmPsFacTpList().add(sizeStandardResDto.getFirmPsFacTp());
                }
            }
            sizeStandardSetDtoList.add(setDto);

        }
        return sizeStandardSetDtoList;
    }

    //Mobile API
    @Override
    public FactoryOrderInfoResDto getOrderListByOrdNo(String orderHeadLineNo) {
        return FactoryOrderInfoResDto.toDto(factoryOrderInfoRepository.findByOrderHeadLineNo(orderHeadLineNo));

    }

    //Mobile API
    @Override
    public List<appResDto> getOrderCntByMD() {
        return factoryOrderInfoRepository.getRecentOrders();
    }


}
