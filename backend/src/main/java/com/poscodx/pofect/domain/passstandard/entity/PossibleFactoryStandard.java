package com.poscodx.pofect.domain.passstandard.entity;

import com.poscodx.pofect.domain.entity.BaseEntity;
import lombok.AllArgsConstructor;
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
// 가능통과공장코드 기준 (FC020)
public class PossibleFactoryStandard extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "PROCESS_CD", length = 2)
    @NotNull
    private String processCd;  // 3.박판공정계획공정구분

    @Column(name = "BTI_POSB_PS_FAC_TP", length = 2)
    @NotNull
    private String btiPosbPsFacTp;  // 4.박판가능통과공장구분

    @Column(name = "FEASIBLE_ROUTING_GROUP", length = 30)
    private String feasibleRoutingGroup;  // 5.공정계획작업가능통과공정코드

    @Column(name = "CD_EXPL", length = 680)
    private String cdExpl;  // 6.코드설명

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 7.박판공정계획사용자ID

}
