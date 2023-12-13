package com.poscodx.pofect.domain.main.dto.standard;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SizeStandardSetDto {

    private String processCD;
    private List<String> firmPsFacTpList = new ArrayList<>();
}