package com.poscodx.pofect.domain.essentialstandard.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.poscodx.pofect.domain.etc.entity.BaseEntity;
import com.poscodx.pofect.domain.essentialstandard.entity.EssentialStandard;
import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EssentialStandardResDto  {
    @Size(max = 2)
    @NotBlank
    private String gcsCompCode;  // 1.연결결산법인구분

    @Size(max = 1)
    @NotBlank
    private String millCd;  // 2.공정계획박판Mill구분

    @Size(max = 11)
    @NotBlank
    private String pplMmatCngMgtNo;  // 3.공정계획필수재변경관리번호

    @Size(max = 22)
    @NotBlank
    private String seq;  // 4.일련번호

    @Size(max = 2)
    private String processCd;  // 5.박판공정계획공정구분

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime pplMmatCancAppDt;  // 6.공정계획필수재해지적용일자

    @Size(max = 1)
    private String pplBasPsgnoTp;  // 7.공정계획기준가등록구분

    @Size(max = 2)
    private String btiPosbPsFacTp;  // 8.박판가능통과공장구분

    @Size(max = 20)
    private String conCalcOpxa01;  // 9.계산식연산자명1

    @Size(max = 2)
    private String ordPdtItpCdN;  // 10.주문품종코드

    @Size(max = 20)
    private String conCalcOpxa02;  // 11.계산식연산자명2

    @Size(max = 4)
    private String ordPdtItdsCdN;  // 12.주문품명코드

    @Size(max = 20)
    private String conCalcOpxa03;  // 13.계산식연산자명3

    @Size(max = 10)
    private String customerNumber;  // 14.고객사코드

    @Size(max = 20)
    private String conCalcOpxa04;  // 15.계산식연산자명4

    @Size(max = 6)
    private String orderUsageCdN;  // 16.주문용도지정코드

    @Size(max = 20)
    private String conCalcOpxa05;  // 17.계산식연산자명5

    private Double orderThickMin;  // 18.제품주문두께1

    private Double orderThickMax;  // 19.제품주문두께2

    @Size(max = 20)
    private String conCalcOpxa06;  // 20.계산식연산자명6

    private Double orderWidthMin;  // 21.제품주문폭1

    private Double orderWidthMax;  // 22.제품주문폭2

    @Size(max = 20)
    private String conCalcOpxa07;  // 23.계산식연산자명7

    @Size(max = 30)
    private String specificationCdN;  // 24.제품규격약호

    @Size(max = 20)
    private String conCalcOpxa08;  // 25.계산식연산자명8

    @Size(max = 1)
    private String salCusLocLClsTp;  // 26.판매고객사지역대분류구분

    @Size(max = 20)
    private String conCalcOpxa09;  // 27.계산식연산자명9

    @Size(max = 14)
    private String smSteelGrdN;  // 28.출강목표번호

    @Size(max = 20)
    private String conCalcOpxa10;  // 29.계산식연산자명10

    @Size(max = 3)
    private String postTreatmentMethodCdN;  // 30.주문제품후처리방법지정코드

    @Size(max = 8)
    private String userId;  // 31.박판공정계획사용자ID

    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime lastUpdateDate;  // 최종수정일자

    public static EssentialStandardResDto toDto(EssentialStandard essentialStandard){
        return EssentialStandardResDto.builder()
                .gcsCompCode(essentialStandard.getGcsCompCode())
                .id(essentialStandard.getId())
                .lastUpdateDate(essentialStandard.getLastUpdateDate())
                .millCd(essentialStandard.getMillCd())
                .pplMmatCngMgtNo(essentialStandard.getPplMmatCngMgtNo())
                .seq(essentialStandard.getSeq())
                .processCd(essentialStandard.getProcessCd())
                .pplMmatCancAppDt(essentialStandard.getPplMmatCancAppDt())
                .pplBasPsgnoTp(essentialStandard.getPplBasPsgnoTp())
                .btiPosbPsFacTp(essentialStandard.getBtiPosbPsFacTp())
                .conCalcOpxa01(essentialStandard.getConCalcOpxa01())
                .ordPdtItpCdN(essentialStandard.getOrdPdtItpCdN())
                .conCalcOpxa02(essentialStandard.getConCalcOpxa02())
                .ordPdtItdsCdN(essentialStandard.getOrdPdtItdsCdN())
                .conCalcOpxa03(essentialStandard.getConCalcOpxa03())
                .customerNumber(essentialStandard.getCustomerNumber())
                .conCalcOpxa04(essentialStandard.getConCalcOpxa04())
                .orderUsageCdN(essentialStandard.getOrderUsageCdN())
                .conCalcOpxa05(essentialStandard.getConCalcOpxa05())
                .orderThickMin(essentialStandard.getOrderThickMin())
                .orderThickMax(essentialStandard.getOrderThickMax())
                .conCalcOpxa06(essentialStandard.getConCalcOpxa06())
                .orderWidthMin(essentialStandard.getOrderWidthMin())
                .orderWidthMax(essentialStandard.getOrderWidthMax())
                .conCalcOpxa07(essentialStandard.getConCalcOpxa07())
                .specificationCdN(essentialStandard.getSpecificationCdN())
                .conCalcOpxa08(essentialStandard.getConCalcOpxa08())
                .salCusLocLClsTp(essentialStandard.getSalCusLocLClsTp())
                .conCalcOpxa09(essentialStandard.getConCalcOpxa09())
                .smSteelGrdN(essentialStandard.getSmSteelGrdN())
                .conCalcOpxa10(essentialStandard.getConCalcOpxa10())
                .postTreatmentMethodCdN(essentialStandard.getPostTreatmentMethodCdN())
                .userId(essentialStandard.getUserId()).build();
    }
}