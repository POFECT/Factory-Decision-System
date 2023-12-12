package com.poscodx.pofect.domain.lot.dto;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LotGroupDto {
    private String smSteelGrdN;
    private String faConfirmFlag;
    private Map<String, Integer> widthGroups;
}
