package com.poscodx.pofect.domain.etc.dto;

import com.poscodx.pofect.domain.etc.entity.BusinessCodeInfo;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
// 업무기준코드 정보 (GG010)
public class BusinessCodeInfoDto {

    @NotBlank
    private Long id;

    @Size(max = 50)
    @NotBlank
    private String cdTp;  // 1.코드유형명

    @Size(max = 680)
    @NotBlank
    private String cdNm;  // 2.코드명

    @Size(max = 30)
    private String crmMill;  // 3.판매고객사소재구입Mill명

    @NotBlank
    private Integer cdVInquirySeq;  // 4.코드값조회순서

    @Size(max = 200)
    private String cdTpExplain;  // 5.코드유형설명

    @Size(max = 680)
    private String cdExpl;  // 6.코드설명

    @Size(max = 8)
    private String userId;  // 7.박판공정계획사용자ID

    public static BusinessCodeInfoDto toDto(BusinessCodeInfo businessCodeInfo) {
        return BusinessCodeInfoDto.builder()
                .cdNm(businessCodeInfo.getCdNm())
                .build();
    }
}
