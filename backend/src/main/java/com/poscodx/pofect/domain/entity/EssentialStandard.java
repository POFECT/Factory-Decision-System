package com.poscodx.pofect.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
// 필수재 기준 (FC070)
public class EssentialStandard extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "SEQ", length = 22)
    @NotNull
    private String seq;  // 3.일련번호

    @Column(name = "PROCESS_CD", length = 2)
    private String processCd;  // 4.박판공정계획공정구분

    @Column(name = "PPL_MMAT_CANC_APP_DT")
    private LocalDateTime PPL_MMAT_CANC_APP_DT;  // 5.공정계획필수재해지적용일자

    @Column(name = "PPL_BAS_PSGNO_TP", length = 1)
    private String pplBasPsgnoTp;  // 6.공정계획기준가등록구분

    @Column(name = "BTI_POSB_PS_FAC_TP", length = 2)
    private String btiPosbPsFacTp;  // 7.박판가능통과공장구분

    @Column(name = "CON_CALC_OPXA01", length = 20)
    private String conCalcOpxa01;  // 8.계산식연산자명1

    @Column(name = "ORD_PDT_ITP_CD_N", length = 2)
    private String ordPdtItpCdN;  // 9.주문품종코드

    @Column(name = "CON_CALC_OPXA02", length = 20)
    private String conCalcOpxa02;  // 10.계산식연산자명2

    @Column(name = "ORD_PDT_ITDS_CD_N", length = 4)
    private String ordPdtItdsCdN;  // 11.주문품명코드

    @Column(name = "CON_CALC_OPXA03", length = 20)
    private String conCalcOpxa03;  // 12.계산식연산자명3

    @Column(name = "CUSTOMER_NUMBER", length = 5)
    private String customerNumber;  // 13.고객사코드

    @Column(name = "CON_CALC_OPXA04", length = 20)
    private String conCalcOpxa04;  // 14.계산식연산자명4

    @Column(name = "ORDER_USAGE_CD_N", length = 6)
    private String orderUsageCdN;  // 15.주문용도지정코드

    @Column(name = "CON_CALC_OPXA05", length = 20)
    private String conCalcOpxa05;  // 16.계산식연산자명5

    @Column(name = "ORDER_THICK_MIN")
    private Double orderThickMin;  // 17.제품주문두께1

    @Column(name = "ORDER_THICK_MAX")
    private Double orderThickMax;  // 18.제품주문두께2

    @Column(name = "CON_CALC_OPXA06", length = 20)
    private String conCalcOpxa06;  // 19.계산식연산자명6

    @Column(name = "ORDER_WIDTH_MIN")
    private Double ORDER_WIDTH_MIN;  // 20.제품주문폭1

    @Column(name = "ORDER_WIDTH_MAX")
    private Double orderWidthMax;  // 21.제품주문폭2

    @Column(name = "CON_CALC_OPXA07", length = 20)
    private String conCalcOpxa07;  // 22.계산식연산자명7

    @Column(name = "SPECIFICATION_CD_N", length = 30)
    private String specificationCdN;  // 23.제품규격약호

    @Column(name = "CON_CALC_OPXA08", length = 20)
    private String conCalcOpxa08;  // 24.계산식연산자명8

    @Column(name = "SAL_CUS_LOC_L_CLS_TP", length = 1)
    private String salCusLocLClsTp;  // 25.판매고객사지역대분류구분

    @Column(name = "CON_CALC_OPXA09", length = 20)
    private String conCalcOpxa09;  // 26.계산식연산자명9

    @Column(name = "SM_STEEL_GRD_N", length = 14)
    private String smSteelGrdN;  // 27.출강목표번호

    @Column(name = "CON_CALC_OPXA10", length = 20)
    private String conCalcOpxa10;  // 28.계산식연산자명10

    @Column(name = "POST_TREATMENT_METHOD_CD_N", length = 3)
    private String postTreatmentMethodCdN;  // 29.주문제품후처리방법지정코드

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 30.박판공정계획사용자ID

}
