package com.poscodx.pofect.domain.sizestandard.dto;

import lombok.*;
import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SizeStandardSetDto {

    private String processCD;
    private List<String> firmPsFacTpList;
}