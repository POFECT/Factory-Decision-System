package com.poscodx.pofect.domain.lot.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LotGroupDto {
    private String smSteelGrdN;
    private String faConfirmFlag;
    private Character cfirmPassOpCd;
    private Map<String, Map<String, Integer>> widthGroups;
}
