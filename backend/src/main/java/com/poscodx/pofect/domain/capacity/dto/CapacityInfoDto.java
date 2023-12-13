package com.poscodx.pofect.domain.capacity.dto;

import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CapacityInfoDto {
//Insert TBL

    public static class CombinedResDto {
        private String processCd;
        List<CombinedCapacityDto> list;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FactoryCapacityDto {
        private Long id;
        private String processCd;
        private String firmPsFacTp;
        private String factoryName;
        private Long faAdjustmentWgt;
        private Long progressQty;
    }


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

    public static CapacityInfoDto toDto(CapacityInfo capacityInfo){
        return CapacityInfoDto.builder()
                .id(capacityInfo.getId())
                .gcsCompCode(capacityInfo.getGcsCompCode())
                .millCd(capacityInfo.getMillCd())
                .ordRcpTapWekCd(capacityInfo.getOrdRcpTapWekCd())
                .processCd(capacityInfo.getProcessCd())
                .firmPsFacTp(capacityInfo.getFirmPsFacTp())
                .faAdjustmentWgt(capacityInfo.getFaAdjustmentWgt())
                .progressQty(capacityInfo.getProgressQty())
                .userId(capacityInfo.getUserId())
                .build();
    }
}
