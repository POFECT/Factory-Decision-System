package com.poscodx.pofect.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto {
    // 기본 반환방식 - response로 감싸기
    private Object response;
}