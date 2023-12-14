package com.poscodx.pofect.domain.sizestandard.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SizeStandardReqDto {

    @NotNull
    private Long id;

    private String gcsCompCode; // 1.연결결산법인구분

    private String millCd; // 2.공정계획박판Mill구분

    private String processCd; // 3.박판공정계획공정구분

    private String firmPsFacTp; // 4.확정통과공장구분

    private Double orderThickMin;  // 5.제품주문두께1

    private Double orderThickMax;  // 6.제품주문두께2

    private Double orderWidthMin;  // 7.제품주문폭1

    private Double orderWidthMax;  // 8.제품주문폭2

    private String orderLengthMin;  // 9.주문길이1

    private String orderLengthMax;  // 10.주문길이2

    private Double hrRollUnitWgtMax1;  // 11.열연공장압연가능재료상한중량1

    private Double hrRollUnitWgtMax2;  // 12.열연공장압연가능재료상한중량2

    private String userId;  // 13.박판공정계획사용자ID

    private RowSpan rowSpan;

    private LocalDateTime lastUpdateDate;  // 최종수정일자


}
