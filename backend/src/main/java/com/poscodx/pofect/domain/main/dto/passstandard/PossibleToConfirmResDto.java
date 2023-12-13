package com.poscodx.pofect.domain.main.dto.passstandard;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PossibleToConfirmResDto {
    private String processCD;
    private List<String> firmPsFacTpList;
}
