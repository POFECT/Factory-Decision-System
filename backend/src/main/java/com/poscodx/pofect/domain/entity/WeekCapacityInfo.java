package com.poscodx.pofect.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
// 주별 능력 정보 (FW031)
public class WeekCapacityInfo extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "FA_CAPACITY_FLAG", length = 1)
    @NotNull
    private String faCapacityFlag;  // 3.공장결정능력구분

    @Column(name = "CAPA_ITEM_SEQ")
    @NotNull
    private Integer capaItemSeq;  // 4.공정능력관리번호

    @Column(name = "ORD_RCP_TAP_WEK_CD", length = 8)
    @NotNull
    private String ordRcpTapWekCd;  // 5.주문접수출강주코드

    @Column(name = "PROGRESS_QTY")
    private Integer ProgressQty;  // 6.주문진행량

    @Column(name = "FA_ADJUSTMENT_WGT")
    private Integer faAdjustmentWgt;  // 7.공장결정조정능력

    @Column(name = "PLAN_CAPACITY_QTY")
    private Integer planCapacityQty;  // 8.공정능력배분량

    @Column(name = "ORD_THW_REM_CAPA_QT")
    private Integer ordThwRemCapaQt;  // 9.주문투입잔여능력량

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 10.박판공정계획사용자ID

}
