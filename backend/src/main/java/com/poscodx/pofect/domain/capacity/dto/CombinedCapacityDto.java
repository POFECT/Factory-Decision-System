package com.poscodx.pofect.domain.capacity.dto;

import com.poscodx.pofect.domain.sizestandard.dto.RowSpan;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CombinedCapacityDto {

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

    private Long planQty; // 9.계획량

    private String processName; // 10. 공정 이름

    private Long remainQty; // 11. 잔여량

    private RowSpanInfo rowSpan;
    // rowspan 정보 리스트

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RowSpanInfo {

        private int processName;


    }

    public CombinedCapacityDto(Long id, String gcsCompCode, String millCd, String ordRcpTapWekCd, String processCd, String firmPsFacTp, Long faAdjustmentWgt, Long progressQty, String userId, Long planQty, String processName) {
        this.id = id;
        this.gcsCompCode = gcsCompCode;
        this.millCd = millCd;
        this.ordRcpTapWekCd = ordRcpTapWekCd;
        this.processCd = processCd;
        this.firmPsFacTp = firmPsFacTp;
        this.faAdjustmentWgt = faAdjustmentWgt;
        this.progressQty = progressQty;
        this.userId = userId;
        this.planQty = planQty;
        this.processName = processName;
        this.remainQty = faAdjustmentWgt - progressQty;
    }
}

