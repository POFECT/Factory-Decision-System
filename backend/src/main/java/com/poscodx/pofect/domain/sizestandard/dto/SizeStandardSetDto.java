package com.poscodx.pofect.domain.sizestandard.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SizeStandardSetDto {

    private String processCD;
    private List<String> firmPsFacTpList = new ArrayList<>();
}