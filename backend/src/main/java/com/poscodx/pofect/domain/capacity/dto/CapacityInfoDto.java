package com.poscodx.pofect.domain.capacity.dto;

import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;
import com.poscodx.pofect.domain.capacity.entity.GrantCapacity;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CapacityInfoDto {

    @NotBlank
    private Long id;

    @NotBlank
    @Size(max = 2)
    private String gcsCompCode; // 1.연결결산법인구분

    @NotBlank
    @Size(max = 1)
    private String millCd; // 2.공정계획박판Mill구분

    @NotBlank
    @Size(max = 8)
    private String ordRcpTapWekCd; // 3.주문투입출강주코드

    @NotBlank
    @Size(max = 2)
    private String processCd; // 4.박판공정계획공정구분

    @NotBlank
    @Size(max = 1)
    private String firmPsFacTp;   // 5.확정통과공장구분

    private Long faAdjustmentWgt; // 6.공장결정조정능력

    private Long progressQty;  // 7.주문진행량

    @Size(max = 8)
    private String userId; // 8.박판공정계획사용자ID

    public static CapacityInfoDto toDto(CapacityInfo CapacityInfo){
        return CapacityInfoDto.builder()
                .id(CapacityInfo.getId())
                .gcsCompCode(CapacityInfo.getGcsCompCode())
                .millCd(CapacityInfo.getMillCd())
                .processCd(CapacityInfo.getProcessCd())
                .firmPsFacTp(CapacityInfo.getFirmPsFacTp())
                .progressQty(CapacityInfo.getProgressQty())
                .userId(CapacityInfo.getUserId())
                .build();
    }
}
