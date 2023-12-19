package com.poscodx.pofect.domain.sizestandard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class SizeDesignReqDto {
    private Double thick;
    private Double width;
    private Double length;
    private Double roll;
}
