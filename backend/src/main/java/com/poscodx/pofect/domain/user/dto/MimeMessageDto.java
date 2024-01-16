package com.poscodx.pofect.domain.user.dto;

import lombok.Builder;
import lombok.Data;

import javax.mail.internet.MimeMessage;

@Data
@Builder
public class MimeMessageDto {
    private MimeMessage mimeMessage;
    private String toEmail;

    public static MimeMessageDto of(MimeMessage mimeMessage, String toEmail) {
        return MimeMessageDto.builder()
                .mimeMessage(mimeMessage)
                .toEmail(toEmail)
                .build();
    }
}
