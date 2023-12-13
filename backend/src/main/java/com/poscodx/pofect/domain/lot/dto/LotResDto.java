package com.poscodx.pofect.domain.lot.dto;

import com.poscodx.pofect.domain.sizestandard.dto.RowSpan;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LotResDto {

    private String smSteelGrdN; // 14.주문투입출강주코드
    private String faConfirmFlag; // 6.공장결정확정구분
    private char cfirmPassOpCd;  // 8.확정통과공정코드
    private Double orderWidth;  // 18.제품주문폭
    private Integer orderLineQty;  // 16.OrderLine 주문량
    private RowSpan rowSpan;


    public static LotResDto fromDtoToDto(com.poscodx.pofect.domain.main.dto.lot.LotResDto dto) {
        return LotResDto.builder()
                .smSteelGrdN(dto.getSmSteelGrdN())
                .faConfirmFlag(dto.getFaConfirmFlag())
                .cfirmPassOpCd(dto.getCfirmPassOpCd())
                .orderWidth(dto.getOrderWidth())
                .orderLineQty(dto.getOrderLineQty())
                .build();
    }
}
