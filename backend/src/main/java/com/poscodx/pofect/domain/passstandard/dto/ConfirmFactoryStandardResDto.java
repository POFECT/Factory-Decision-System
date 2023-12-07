package com.poscodx.pofect.domain.passstandard.dto;

import com.poscodx.pofect.domain.passstandard.entity.ConfirmFactoryStandard;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmFactoryStandardResDto {

    @NotBlank
    private Long id;

//    @NotBlank
//    @Size(max = 2)
//    private String gcsCompCode;  // 1.연결결산법인구분

//    @NotBlank
//    @Size(max = 1)
//    private String millCd;  // 2.공정계획박판Mill구분

    @NotBlank
    @Size(max = 2)
    private String processCd; //3. 박판공정계획공정구분

    @NotBlank
    @Size(max = 2)
    private String firmPsFacTp;  // 4.확정통과공장구분

    @Size(max = 680)
    private String cdExpl;  // 5.코드설명

//    @Size(max = 8)
//    private String userId;  // 6.박판공정계획사용자ID

    private LocalDateTime lastUpdateDate;  // 최종수정일자

    public static ConfirmFactoryStandardResDto toDto(ConfirmFactoryStandard confirmFactoryStandard){
        return ConfirmFactoryStandardResDto.builder()
                .id(confirmFactoryStandard.getId())
                .firmPsFacTp(confirmFactoryStandard.getFirmPsFacTp())
                .cdExpl(confirmFactoryStandard.getCdExpl())
                .processCd(confirmFactoryStandard.getProcessCd())
                .lastUpdateDate(confirmFactoryStandard.getLastUpdateDate())
                .build();
    }

//    public static ConfirmFactoryStandardResDto toDto(Object[] confirmFactoryStandard) {
//    return ConfirmFactoryStandardResDto.builder()
//            .cdExpl(confirmFactoryStandard[0].toString())
//            .processCd(confirmFactoryStandard[1].toString())
//            .firmPsFacTp(confirmFactoryStandard[2].toString())
//            .build();
//    }
}
