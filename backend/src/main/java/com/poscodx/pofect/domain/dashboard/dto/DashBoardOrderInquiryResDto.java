package com.poscodx.pofect.domain.dashboard.dto;

import lombok.*;

import javax.validation.constraints.Size;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashBoardOrderInquiryResDto {
    @Size(max = 2)
    private String ordPdtItpCdN;  // 10.주문품종코드

    private int countA;
    private int countB;
    private int countC;
    private int countD;
    private int countE;
    private int countF;
}
