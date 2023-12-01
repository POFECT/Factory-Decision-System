package com.poscodx.pofect.domain.passstandard.dto;

import com.poscodx.pofect.domain.passstandard.entity.PossibleFactoryStandard;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PossibleFactoryStandardResDto {

    @NotBlank
    private Long id;

    @NotBlank
    @Size(max = 2)
    private String gcsCompCode;  // 1.연결결산법인구분

    @NotBlank
    @Size(max = 1)
    private String millCd;  // 2.공정계획박판Mill구분

    @NotBlank
    @Size(max = 2)
    private String processCd; //3. 박판공정계획공정구분

    @NotBlank
    @Size(max = 2)
    private String btiPosbPsFacTp; // 4.박판가능통과공장구분

    @Size(max = 30)
    private String feasibleRoutingGroup; // 5.공정계획작업가능통과공정코드

    @Size(max = 680)
    private String cdExpl;  // 6.코드설명

    @Size(max = 8)
    private String userId;  // 7.박판공정계획사용자ID

    private LocalDateTime lastUpdateDate;  // 최종수정일자

    public static PossibleFactoryStandardResDto toDto(PossibleFactoryStandard possibleFactoryStandard){
        return PossibleFactoryStandardResDto.builder()
                .id(possibleFactoryStandard.getId())
                .gcsCompCode(possibleFactoryStandard.getGcsCompCode())
                .millCd(possibleFactoryStandard.getMillCd())
                .btiPosbPsFacTp(possibleFactoryStandard.getBtiPosbPsFacTp())
                .feasibleRoutingGroup(possibleFactoryStandard.getFeasibleRoutingGroup())
                .cdExpl(possibleFactoryStandard.getCdExpl())
                .userId(possibleFactoryStandard.getUserId())
                .lastUpdateDate(possibleFactoryStandard.getLastUpdateDate())
                .build();
    }
}
