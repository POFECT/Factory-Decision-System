package com.poscodx.pofect.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
// 공정 공장별 사이즈 기준 (FC040)
public class FactorySizeStandard extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "PROCESS_CD", length = 2)
    @NotNull
    private String processCd;  // 3.박판공정계획공정구분

    @Column(name = "FIRM_PS_FAC_TP", length = 1)
    @NotNull
    private String firmPsFacTp;  // 4.확정통과공장구분

    @Column(name = "ORDER_THICK_MIN")
    private Double orderThickMin;  // 5.제품주문두께1

    @Column(name = "ORDER_THICK_MAX")
    private Double orderThickMax;  // 6.제품주문두께2

    @Column(name = "ORDER_WIDTH_MIN")
    private Double orderWidthMin;  // 7.제품주문폭1

    @Column(name = "ORDER_WIDTH_MAX")
    private Double orderWidthMax;  // 8.제품주문폭2

    @Column(name = "ORDER_LENGTH_MIN", length = 5)
    private String orderLengthMin;  // 9.주문길이1

    @Column(name = "ORDER_LENGTH_MAX", length = 5)
    private String orderLengthMax;  // 10.주문길이2

    @Column(name = "HR_ROLL_UNIT_WGT_MAX1")
    private Double hrRollUnitWgtMax1;  // 11.열연공장압연가능재료상한중량1

    @Column(name = "HR_ROLL_UNIT_WGT_MAX2")
    private Double hrRollUnitWgtMax2;  // 12.열연공장압연가능재료상한중량2

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 13.박판공정계획사용자ID

}
