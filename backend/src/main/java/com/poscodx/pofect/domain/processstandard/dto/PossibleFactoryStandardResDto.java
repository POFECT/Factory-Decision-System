package com.poscodx.pofect.domain.processstandard.dto;

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
    @Size(max = 2)
    private String processCd; //3. 박판공정계획공정구분

    @NotBlank
    @Size(max = 2)
    private String btiPosbPsFacTp; // 4.박판가능통과공장구분

    @Size(max = 30)
    private String feasibleRoutingGroup; // 5.공정계획작업가능통과공정코드

    private LocalDateTime lastUpdateDate;  // 최종수정일자

//    public static PossibleFactoryStandardResDto toDto(PossibleFactoryStandard possibleFactoryStandard) {
//        return PossibleFactoryStandardResDto.builder()
//                .id(possibleFactoryStandard.getId())
//                .gcsCompCode(possibleFactoryStandard.getGcsCompCode())
//                .btiPosbPsFacTp(possibleFactoryStandard.getBtiPosbPsFacTp())
//                .feasibleRoutingGroup(possibleFactoryStandard.getFeasibleRoutingGroup())
//                .processCd(possibleFactoryStandard.getProcessCd())
//                .lastUpdateDate(possibleFactoryStandard.getLastUpdateDate())
//                .build();
//    }

    public static PossibleFactoryStandardResDto toDto(Object[] possibleFactoryStandard) {
        return PossibleFactoryStandardResDto.builder()
                .btiPosbPsFacTp(possibleFactoryStandard[0].toString())
                .processCd(possibleFactoryStandard[1].toString())
                .feasibleRoutingGroup(possibleFactoryStandard[2].toString())
                .build();
    }

}
