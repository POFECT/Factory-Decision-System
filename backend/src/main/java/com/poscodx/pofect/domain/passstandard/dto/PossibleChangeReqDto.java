package com.poscodx.pofect.domain.passstandard.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PossibleChangeReqDto {
    @NotBlank
    private String btiPosbPsFacTp;
    @NotBlank
    private String processCd;
    @NotBlank
    private String checkedList;
    @NotBlank
    private String checkedExpl;

}
