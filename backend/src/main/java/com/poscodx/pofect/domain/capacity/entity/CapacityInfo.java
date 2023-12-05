package com.poscodx.pofect.domain.capacity.entity;

import com.poscodx.pofect.domain.etc.entity.BaseEntity;
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
// 주문 별 능력 정보 (FW030)
public class CapacityInfo extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "ORD_RCP_TAP_WEK_CD", length = 8)
    @NotNull
    private String ordRcpTapWekCd;  // 3.주문투입출강주코드

    @Column(name = "PROCESS_CD", length = 2)
    @NotNull
    private String processCd;  // 4.박판공정계획공정구분

    @Column(name = "FIRM_PS_FAC_TP", length = 1)
    @NotNull
    private String firmPsFacTp;  // 5.확정통과공장구분

    @Column(name = "FA_ADJUSTMENT_WGT")
    private Long faAdjustmentWgt;  // 6.공장결정조정능력

    @Column(name = "PROGRESS_QTY")
    private Long progressQty;  // 7.주문진행량

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 8.박판공정계획사용자ID

}
