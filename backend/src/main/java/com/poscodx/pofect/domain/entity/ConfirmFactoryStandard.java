package com.poscodx.pofect.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@SuperBuilder
@Getter
@AllArgsConstructor
@NoArgsConstructor
// 확정통과공장코드 기준 (FC010)
public class ConfirmFactoryStandard extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "PROCESS_CD", length = 2)
    @NotNull
    private String processCd;  // 3.박판공정계획공정구분

    @Column(name = "FIRM_PS_FAC_TP", length = 1)
    @NotNull
    private String firmPsFacTp;  // 4.확정통과공장구분

    @Column(name = "CD_EXPL", length = 680)
    private String cdExpl;  // 5.코드설명

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 6.박판공정계획사용자ID


}
