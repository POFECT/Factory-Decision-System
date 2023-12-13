package com.poscodx.pofect.domain.sizestandard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RowSpan {

    private Integer processCd;
    private Integer smSteelGrdN;

}
