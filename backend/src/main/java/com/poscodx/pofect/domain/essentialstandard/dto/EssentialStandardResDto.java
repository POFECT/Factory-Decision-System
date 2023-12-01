package com.poscodx.pofect.domain.essentialstandard.dto;


import com.poscodx.pofect.domain.entity.BaseEntity;
import com.poscodx.pofect.domain.essentialstandard.entity.EssentialStandard;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EssentialStandardResDto extends BaseEntity {
    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "PPL_MMAT_CNG_MGT_NO", length = 11)
    @NotNull
    private String pplMmatCngMgtNo;  // 3.공정계획필수재변경관리번호

    @Column(name = "SEQ", length = 22)
    @NotNull
    private String seq;  // 4.일련번호

    @Column(name = "PROCESS_CD", length = 2)
    private String processCd;  // 5.박판공정계획공정구분

    @Column(name = "PPL_MMAT_CANC_APP_DT")
    private LocalDateTime pplMmatCancAppDt;  // 6.공정계획필수재해지적용일자

    @Column(name = "PPL_BAS_PSGNO_TP", length = 1)
    private String pplBasPsgnoTp;  // 7.공정계획기준가등록구분

    @Column(name = "BTI_POSB_PS_FAC_TP", length = 2)
    private String btiPosbPsFacTp;  // 8.박판가능통과공장구분

    @Column(name = "CON_CALC_OPXA01", length = 20)
    private String conCalcOpxa01;  // 9.계산식연산자명1

    @Column(name = "ORD_PDT_ITP_CD_N", length = 2)
    private String ordPdtItpCdN;  // 10.주문품종코드

    @Column(name = "CON_CALC_OPXA02", length = 20)
    private String conCalcOpxa02;  // 11.계산식연산자명2

    @Column(name = "ORD_PDT_ITDS_CD_N", length = 4)
    private String ordPdtItdsCdN;  // 12.주문품명코드

    @Column(name = "CON_CALC_OPXA03", length = 20)
    private String conCalcOpxa03;  // 13.계산식연산자명3

    @Column(name = "CUSTOMER_NUMBER", length = 10)
    private String customerNumber;  // 14.고객사코드

    @Column(name = "CON_CALC_OPXA04", length = 20)
    private String conCalcOpxa04;  // 15.계산식연산자명4

    @Column(name = "ORDER_USAGE_CD_N", length = 6)
    private String orderUsageCdN;  // 16.주문용도지정코드

    @Column(name = "CON_CALC_OPXA05", length = 20)
    private String conCalcOpxa05;  // 17.계산식연산자명5

    @Column(name = "ORDER_THICK_MIN")
    private Double orderThickMin;  // 18.제품주문두께1

    @Column(name = "ORDER_THICK_MAX")
    private Double orderThickMax;  // 19.제품주문두께2

    @Column(name = "CON_CALC_OPXA06", length = 20)
    private String conCalcOpxa06;  // 20.계산식연산자명6

    @Column(name = "ORDER_WIDTH_MIN")
    private Double orderWidthMin;  // 21.제품주문폭1

    @Column(name = "ORDER_WIDTH_MAX")
    private Double orderWidthMax;  // 22.제품주문폭2

    @Column(name = "CON_CALC_OPXA07", length = 20)
    private String conCalcOpxa07;  // 23.계산식연산자명7

    @Column(name = "SPECIFICATION_CD_N", length = 30)
    private String specificationCdN;  // 24.제품규격약호

    @Column(name = "CON_CALC_OPXA08", length = 20)
    private String conCalcOpxa08;  // 25.계산식연산자명8

    @Column(name = "SAL_CUS_LOC_L_CLS_TP", length = 1)
    private String salCusLocLClsTp;  // 26.판매고객사지역대분류구분

    @Column(name = "CON_CALC_OPXA09", length = 20)
    private String conCalcOpxa09;  // 27.계산식연산자명9

    @Column(name = "SM_STEEL_GRD_N", length = 14)
    private String smSteelGrdN;  // 28.출강목표번호

    @Column(name = "CON_CALC_OPXA10", length = 20)
    private String conCalcOpxa10;  // 29.계산식연산자명10

    @Column(name = "POST_TREATMENT_METHOD_CD_N", length = 3)
    private String postTreatmentMethodCdN;  // 30.주문제품후처리방법지정코드

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 31.박판공정계획사용자ID

    @Column(name = "id")
    private Long id;

    @Column(name = "LAST_UPDATE_DATE")
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
