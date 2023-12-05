package com.poscodx.pofect.domain.dashboard.dto;

import lombok.*;

import javax.validation.constraints.Size;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashBoardInputStatusResDto {
    @Size(max = 2)
    private String ordPdtItpCdN;  // 10.주문품종코드

    private int count;
}
