package com.poscodx.pofect.domain.main.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FactoryOrderInfoReqDto {

    @NotBlank
    @Size(max = 2)
    private String gcsCompCode;  // 1.연결결산법인구분

    @NotBlank
    @Size(max = 1)
    private String millCd;  // 2.공정계획박판Mill구분

    @NotBlank
    @Size(max = 13)
    private String orderHeadLineNo;  // 3.OrderHeadLineNumber

}
