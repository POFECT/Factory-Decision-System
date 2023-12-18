package com.poscodx.pofect.domain.lot.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LotSearchDto {
    private String ordThwTapWekCd;
    private Boolean isChecked;
    private List<String> ordPdtItpCdNList;
    private List<String> smList;
}
