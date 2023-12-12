package com.poscodx.pofect.domain.passstandard.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
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
