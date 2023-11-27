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
// 가능통과공장 에러 주문 정보 (FW020)
public class PossibleFactoryErrorInfo extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCD;  // 2.공정계획박판Mill구분

    @Column(name = "ORDER_HEAD_LINE_NO", length = 13)
    @NotNull
    private String orderHeadLineNo;  // 3.OrderHeadLineNumber

    @Column(name = "ERROR_FLAG", length = 1)
    private String errorFLAG;  // 4.Error여부

    @Column(name = "ORD_PDT_ITDS_CD_N", length = 4)
    private String ordPdtItdsCdN;  // 5.주문품명코드

    @Column(name = "ORD_RCP_TAP_WEK_CD", length = 8)
    private String ordRcpTapWekCd;  // 6.주문접수출강주코드

    @Column(name = "POSB_PASS_FAC_CD_N1", length = 16)
    private String posbPassFacCdN1;  // 7.가능통과공정코드1

    @Column(name = "POSB_PASS_FAC_CD_N2", length = 16)
    private String posbPassFacCdN2;  // 8.가능통과공정코드2

    @Column(name = "POSB_PASS_FAC_CD_N3", length = 16)
    private String posbPassFacCdN3;  // 9.가능통과공정코드3

    @Column(name = "ORDER_THICK")
    private Double orderThick;  // 10.제품주문두께

    @Column(name = "ORDER_WIDTH")
    private Double orderWidth;  // 11.제품주문폭

    @Column(name = "SPECIFICATION_CD_N", length = 30)
    private String specificationCdN;  // 12.제품규격약호

    @Column(name = "ERROR_TYPE", length = 3)
    private String errorType;  // 13.Error형태

    @Column(name = "ORDER_LENGTH", length = 5)
    private String orderLength;  // 14.주문길이

    @Column(name = "SM_STEEL_GRD_N", length = 14)
    private String smSteelGrdN;  // 15.출강목표번호

    @Column(name = "ORDER_TYPE", length = 2)
    private String orderType;  // 16.OrderType

    @Column(name = "HR_MFG_STD_NO_N", length = 12)
    private String hrMfgStdNoN;  // 17.열연제조표준번호

    @Column(name = "CR_MFG_STD_NO_N", length = 9)
    private String crMfgStdNoN;  // 18.냉연제조표준번호

    @Column(name = "SIS_MFG_STD_NO_N", length = 9)
    private String sisMfgStdNoN;  // 19.전강제조표준번호

    @Column(name = "SKINPASS_FLAG", length = 1)
    private String skinpassFlag;  // 20.제품SkinPass지정여부

    @Column(name = "HR_PROD_WTH_AIM1")
    private Double hrProdWthAim1;  // 21.품질설계열연목표폭1

    @Column(name = "HR_PROD_THK_AIM1")
    private Double hrProdThkAim1;  // 22.품질설계열연목표두께1

    @Column(name = "CR_SLIT_NO")
    private Integer crSlitNo;  // 23.품질설계냉연Slit조수구분

    @Column(name = "FA_USAGE_GROUP", length = 3)
    private String faUsageGroup;  // 24.박판공장결정용도그룹구분

    @Column(name = "ORDER_EDGE_CODE", length = 1)
    private String orderEdgeCode;  // 25.제품주문Edge구분

    @Column(name = "SALES_CODE_N", length = 3)
    private String salesCodeN;  // 26.판매특기구분

    @Column(name = "PROCESS_CD40", length = 2)
    private String processCd40;  // 27.박판공정계획공정구분40

    @Column(name = "PROCESS_CD50", length = 2)
    private String processCd50;  // 28.박판공정계획공정구분50

    @Column(name = "PROCESS_CD60", length = 2)
    private String processCd60;  // 29.박판공정계획공정구분60

    @Column(name = "PROCESS_CD70", length = 2)
    private String processCd70;  // 30.박판공정계획공정구분70

    @Column(name = "PROCESS_CD80", length = 2)
    private String processCd80;  // 31.박판공정계획공정구분80

    @Column(name = "DATA10", columnDefinition = "TEXT", length = 4000)
    private String data10;  // 32.Data10

    @Column(name = "DATA20", columnDefinition = "TEXT", length = 4000)
    private String data20;  // 33.Data20

    @Column(name = "DATA30", columnDefinition = "TEXT", length = 4000)
    private String data30;  // 34.Data30

    @Column(name = "DATA40", columnDefinition = "TEXT", length = 4000)
    private String data40;  // 35.Data40

    @Column(name = "DATA50", columnDefinition = "TEXT", length = 4000)
    private String data50;  // 36.Data50

    @Column(name = "DATA60", columnDefinition = "TEXT", length = 4000)
    private String data60;  // 37.Data60

    @Column(name = "DATA70", columnDefinition = "TEXT", length = 4000)
    private String data70;  // 38.Data70

    @Column(name = "DATA80", columnDefinition = "TEXT", length = 4000)
    private String data80;  // 39.Data80

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 40.박판공정계획사용자ID

    @Column(name = "CREATION_DATE")
    private LocalDateTime creationDate;  // 41.등록일자

    @Column(name = "RL_MAX_UWGT_MGT_TP_CD1", length = 3)
    private String rlMaxUwgtMgtTtCd1;  // 43.압연Max단중관리유형코드1

    @Column(name = "RL_MAX_UWGT_MGT_TP_CD2", length = 3)
    private String rlMaxUwgtMgtTtCd2;  // 44.압연Max단중관리유형코드2

    @Column(name = "RL_MAX_UWGT_MGT_TP_CD3", length = 3)
    private String rlMaxUwgtMgtTtCd3;  // 45.압연Max단중관리유형코드3

    @Column(name = "RL_MAX_UWGT_MGT_TP_CD4", length = 3)
    private String rlMaxUwgtMgtTtCd4;  // 46.압연Max단중관리유형코드4

    @Column(name = "HR_SP_COMPOSITE", length = 1)
    private String hrSpComposite;  // 47.품질설계열연SkinPass합성지정구분

    @Column(name = "F_PITM_MAT_CD", length = 3)
    private String fPitmMatCd;  // 48.판매품PlanningItem재질코드

    @Column(name = "HR_PROD_WTH_AIM7")
    private Double hrProdWthAim7;  // 49.품질설계열연목표폭7

    @Column(name = "HR_PROD_THK_AIM7")
    private Double hrProdThkAim7;  // 50.품질설계열연목표두께7

    @Column(name = "FA_USAGE_GROUP5", length = 3)
    private String faUsageGroup5;  // 51.박판공장결정용도그룹구분5

    @Column(name = "FA_USAGE_GROUP6", length = 3)
    private String faUsageGroup6;  // 52.박판공장결정용도그룹구분6

    @Column(name = "FA_USAGE_GROUP7", length = 3)
    private String faUsageGroup7;  // 53.박판공장결정용도그룹구분7

    @Column(name = "FA_USAGE_GROUP8", length = 3)
    private String faUsageGroup8;  // 54.박판공장결정용도그룹구분8

    @Column(name = "PPL_BTI_MMAT_OP_JDG_ID_CD", length = 16)
    private String pplBtiMmatOpJdgIdCd;  // 55.공정계획박판필수재공정판정식별코드

}
