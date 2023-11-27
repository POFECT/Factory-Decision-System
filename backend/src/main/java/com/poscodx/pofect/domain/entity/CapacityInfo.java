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
// 주문 별 능력 정보 (FW030)
public class CapacityInfo extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "ORDER_HEAD_LINE_NO", length = 13)
    @NotNull
    private String orderHeadLineNo;  // 3.OrderHeadLineNumber

    @Column(name = "FA_CAPACITY_FLAG", length = 1)
    @NotNull
    private String faCapacityFlag;  // 4.공장결정능력구분

    @Column(name = "CAPA_ITEM_SEQ")
    @NotNull
    private Integer capaItemSeq;  // 5.공정능력관리번호

    @Column(name = "ORD_THW_TAP_WEK_CD", length = 8)
    private String ordThwTapWekCd;  // 6.주문투입출강주코드

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 7.박판공정계획사용자ID

}
