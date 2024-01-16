package com.poscodx.pofect.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MailSendResult {
    private MailSendCode mailSendCode;
    private String result;

    public static MailSendResult of(MailSendCode resultCode, String result) {
        return MailSendResult.builder()
                .mailSendCode(resultCode)
                .result(result)
                .build();
    }
}
