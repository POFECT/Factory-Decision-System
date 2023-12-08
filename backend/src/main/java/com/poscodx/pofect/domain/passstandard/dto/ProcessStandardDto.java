package com.poscodx.pofect.domain.passstandard.dto;

import com.poscodx.pofect.domain.passstandard.entity.ProcessStandard;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProcessStandardDto {

    @NotBlank
    private Long id;

    @NotBlank
    @Size(max = 2)
    private String gcsCompCode;  // 1.연결결산법인구분

    @NotBlank
    @Size(max = 1)
    private String millCd; // 2.공정계획박판Mill구분

    @NotBlank
    @Size(max = 4)
    private String ordPdtItdsCdN; // 3.주문품명코드


    @Size(max = 2)
    private String availablePassFacCdN1; // 4.가능통과공장구분1
    @Size(max = 2)
    private String availablePassFacCdN2; // 4.가능통과공장구분1
    @Size(max = 2)
    private String availablePassFacCdN3; // 4.가능통과공장구분1
    @Size(max = 2)
    private String availablePassFacCdN4; // 4.가능통과공장구분1
    @Size(max = 2)
    private String availablePassFacCdN5; // 4.가능통과공장구분1
    @Size(max = 2)
    private String availablePassFacCdN6; // 4.가능통과공장구분1
    @Size(max = 2)
    private String availablePassFacCdN7; // 4.가능통과공장구분1
    @Size(max = 2)
    private String availablePassFacCdN8; // 4.가능통과공장구분1

    @Size(max = 8)
    private String userId; // 12.박판공정계획사용자ID


    private LocalDateTime lastUpdateDate;  // 최종수정일자

    public static ProcessStandardDto toDto(ProcessStandard processStandard){
        return ProcessStandardDto.builder()
                .id(processStandard.getId())
                .gcsCompCode(processStandard.getGcsCompCode())
                .millCd(processStandard.getMillCd())
                .ordPdtItdsCdN(processStandard.getOrdPdtItdsCdN())
                .availablePassFacCdN1(processStandard.getAvailablePassFacCdN1())
                .availablePassFacCdN2(processStandard.getAvailablePassFacCdN2())
                .availablePassFacCdN3(processStandard.getAvailablePassFacCdN3())
                .availablePassFacCdN4(processStandard.getAvailablePassFacCdN4())
                .availablePassFacCdN5(processStandard.getAvailablePassFacCdN5())
                .availablePassFacCdN6(processStandard.getAvailablePassFacCdN6())
                .availablePassFacCdN7(processStandard.getAvailablePassFacCdN7())
                .availablePassFacCdN8(processStandard.getAvailablePassFacCdN8())
                .userId(processStandard.getUserId())
                .build();
    }
}