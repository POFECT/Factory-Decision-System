package com.poscodx.pofect.domain.user.service;

import com.poscodx.pofect.domain.user.dto.MailSendResult;
import com.poscodx.pofect.domain.user.dto.MimeMessageDto;
import org.springframework.core.task.TaskRejectedException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

public interface UserService {
    void mailSend(MimeMessage mimeMessage) throws MessagingException, TaskRejectedException;
    boolean hasNext();
    MimeMessageDto poll();
    MailSendResult sendMailService(String toEmail, String standardType, String type, HttpServletRequest request);
}
