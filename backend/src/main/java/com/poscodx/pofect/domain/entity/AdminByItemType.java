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
// 품종별 담당자 관리 (FC110)
public class AdminByItemType extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "WORKS_CODE", length = 1)
    @NotNull
    private String worksCode;

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "SEQ", length = 22)
    @NotNull
    private String seq;  // 3.일련번호

    @Column(name = "ITEM_TYPE_GROUP_NAME", length = 30)
    private String itemTypeGroupName;  // 4.품종그룹명

    @Column(name = "PPL_MMAT_CNG_INVP_ID", length = 8)
    private String pplMmatCngInvpId;  // 5.공정계획필수재변경검토자ID

    @Column(name = "PPL_MMAT_CNG_INVP_NM", length = 50)
    private String pplMmatCngInvpNm;  // 6.공정계획필수재변경검토자명

    @Column(name = "PPL_MMAT_CNG_INVP_E_MAIL_ADDR", length = 50)
    private String pplMmatCngInvpEMailAddr;  // 7.공정계획필수재변경검토자E_Mail주소

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 8.박판공정계획사용자ID

}
