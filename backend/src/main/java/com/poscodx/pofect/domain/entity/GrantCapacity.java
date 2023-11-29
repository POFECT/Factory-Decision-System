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
// 주문별 능력 부여 관리 (FC100)
public class GrantCapacity extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "WORKS_CODE", length = 1)
    @NotNull
    private String worksCode;  // 2.사소구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 3.공정계획박판Mill구분

    @Column(name = "FA_CAPACITY_FLAG", length = 1)
    @NotNull
    private String faCapacityFlag;  // 4.공장결정능력구분

    @Column(name = "CAPA_ITEM_SEQ")
    @NotNull
    private Integer capaItemSeq;  // 5.공정능력관리번호

    @Column(name = "SEQ", length = 22)
    @NotNull
    private String seq;  // 6.일련번호

    @Column(name = "ORD_PDT_ITP_CD_N", length = 2)
    private String ordPdtItpCdN;  // 7.주문품종코드

    @Column(name = "ORD_PDT_ITDS_CD_N", length = 4)
    private String ordPdtItdsCdN;  // 8.주문품명코드

    @Column(name = "PROCESS_CD", length = 2)
    private String processCd;  // 9.박판공정계획공정구분

    @Column(name = "FIRM_PS_FAC_TP", length = 1)
    private String firmPsFacTp;  // 10.확정통과공장구분

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 11.박판공정계획사용자ID

}
