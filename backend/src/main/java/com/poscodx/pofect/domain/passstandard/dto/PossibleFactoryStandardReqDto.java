package com.poscodx.pofect.domain.passstandard.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PossibleFactoryStandardReqDto {

    @NotBlank
    private Long id;




}
