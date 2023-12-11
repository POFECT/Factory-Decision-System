package com.poscodx.pofect.domain.essentialstandard.dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EssentialStandardBtiPosReqDto {
    private String processCD;
    private List<String> btiPosbPsFacTpList;
}