package com.poscodx.pofect.domain.processstandard.entity;

import com.poscodx.pofect.domain.etc.entity.BaseEntity;
import com.poscodx.pofect.domain.processstandard.dto.ProcessStandardDto;
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
// 경유 공정 기준 (FC030)
public class ProcessStandard extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "ORD_PDT_ITDS_CD_N", length = 4)
    @NotNull
    private String ordPdtItdsCdN;  // 3.주문품명코드

    @Column(name = "AVAILABLE_PASS_FAC_CD_N1", length = 2)
    private String availablePassFacCdN1;  // 4.가능통과공장구분1

    @Column(name = "AVAILABLE_PASS_FAC_CD_N2", length = 2)
    private String availablePassFacCdN2;  // 5.가능통과공장구분2

    @Column(name = "AVAILABLE_PASS_FAC_CD_N3", length = 2)
    private String availablePassFacCdN3;  // 6.가능통과공장구분3

    @Column(name = "AVAILABLE_PASS_FAC_CD_N4", length = 2)
    private String availablePassFacCdN4;  // 7.가능통과공장구분4

    @Column(name = "AVAILABLE_PASS_FAC_CD_N5", length = 2)
    private String availablePassFacCdN5;  // 8.가능통과공장구분5

    @Column(name = "AVAILABLE_PASS_FAC_CD_N6", length = 2)
    private String availablePassFacCdN6;  // 9.가능통과공장구분6

    @Column(name = "AVAILABLE_PASS_FAC_CD_N7", length = 2)
    private String availablePassFacCdN7;  // 10.가능통과공장구분7

    @Column(name = "AVAILABLE_PASS_FAC_CD_N8", length = 2)
    private String availablePassFacCdN8;  // 11.가능통과공장구분8

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 12.박판공정계획사용자ID

    public static ProcessStandard toEntity(ProcessStandardDto dto) {
        return ProcessStandard.builder()
                .gcsCompCode(dto.getGcsCompCode())
                .millCd(dto.getMillCd())
                .ordPdtItdsCdN(dto.getOrdPdtItdsCdN())
                .availablePassFacCdN1(dto.getAvailablePassFacCdN1())
                .availablePassFacCdN2(dto.getAvailablePassFacCdN2())
                .availablePassFacCdN3(dto.getAvailablePassFacCdN3())
                .availablePassFacCdN4(dto.getAvailablePassFacCdN4())
                .availablePassFacCdN5(dto.getAvailablePassFacCdN5())
                .availablePassFacCdN6(dto.getAvailablePassFacCdN6())
                .availablePassFacCdN7(dto.getAvailablePassFacCdN7())
                .availablePassFacCdN8(dto.getAvailablePassFacCdN8())
                .userId(dto.getUserId())
                .build();
    }
}