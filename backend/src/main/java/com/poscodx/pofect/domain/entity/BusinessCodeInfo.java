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
// 업무기준코드 정보 (GG010)
public class BusinessCodeInfo extends BaseEntity {

    @Column(name = "CD_TP", length = 50)
    @NotNull
    private String cdTp;  // 1.코드유형명

    @Column(name = "CD_NM", length = 680)
    @NotNull
    private String cdNm;  // 2.코드명

    @Column(name = "CRM_MILL", length = 30)
    private String crmMill;  // 3.판매고객사소재구입Mill명

    @Column(name = "CD_V_INQUIRY_SEQ")
    @NotNull
    private Integer CD_V_INQUIRY_SEQ;  // 4.코드값조회순서

    @Column(name = "CD_TP_EXPLAIN", length = 200)
    private String cdTpExplain;  // 5.코드유형설명

    @Column(name = "CD_EXPL", length = 680)
    private String cdExpl;  // 6.코드설명

    @Column(name = "CD_EXPL1", length = 680)
    private String cdExpl1;  // 7.코드설명1

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 8.박판공정계획사용자ID

    @Column(name = "CD_V_EXPLAIN", length = 200)
    private String cdVExplain;  // 10.코드값설명

}
