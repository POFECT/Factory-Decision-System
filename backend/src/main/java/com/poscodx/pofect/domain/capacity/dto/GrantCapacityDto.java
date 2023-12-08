package com.poscodx.pofect.domain.capacity.dto;

import com.poscodx.pofect.domain.capacity.entity.GrantCapacity;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GrantCapacityDto {

    @NotBlank
    private Long id;

    @NotBlank
    @Size(max = 2)
    private String gcsCompCode;  // 1.연결결산법인구분

    @NotBlank
    @Size(max = 1)

    private String millCd; // 2.공정계획박판Mill구분

    @NotBlank
    @Size(max = 2)
    private String processCd; // 3.박판공정계획공정구분

    @NotBlank
    @Size(max = 1)
    private String firmPsFacTp; // 4.확정통과공장구분

    private Long planQty; // 5.계획량

    @Size(max = 8)
    private String userId; // 6.박판공정계획사용자ID

    private LocalDateTime lastUpdateDate;  // 최종수정일자

    public static GrantCapacityDto toDto(GrantCapacity grantCapacity){
        return GrantCapacityDto.builder()
                .id(grantCapacity.getId())
                .gcsCompCode(grantCapacity.getGcsCompCode())
                .millCd(grantCapacity.getMillCd())
                .processCd(grantCapacity.getProcessCd())
                .firmPsFacTp(grantCapacity.getFirmPsFacTp())
                .planQty(grantCapacity.getPlanQty())
                .userId(grantCapacity.getUserId())
                .build();
    }
}