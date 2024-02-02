package com.poscodx.pofect.domain.user.service;

import com.poscodx.pofect.domain.user.dto.MimeMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
@RequiredArgsConstructor
public class SendMailBatch {

    private final UserService userService;

//    @Scheduled(fixedRate = 1000L)
    @Scheduled(cron = "0 0 0 * * *")
    public void sendMailSchedule() throws InterruptedException {
        String mailResult = "Success";

        while (userService.hasNext()) {
            MimeMessageDto mimeMessage = userService.poll();
            try {
                userService.mailSend(mimeMessage.getMimeMessage());
            } catch (MessagingException e ) {
                mailResult = "Fail: " + e.getMessage();
                System.out.println("mailResult : "+mailResult);
            }
            Thread.sleep(50);
        }
    }
}
