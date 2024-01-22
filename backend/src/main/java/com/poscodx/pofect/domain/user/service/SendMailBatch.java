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

    @Scheduled(fixedRate = 1000L)
    public void sendMailSchedule() throws InterruptedException {
        String mailResult = "Success";

        System.out.println("batch gogo");
        while (userService.hasNext()) {
            MimeMessageDto mimeMessage = userService.poll();
            System.out.println(mimeMessage.getMimeMessage());
            try {
                System.out.println("send1");
                userService.mailSend(mimeMessage.getMimeMessage());
                System.out.println("send2");
            } catch (MessagingException e ) {
                mailResult = "Fail: " + e.getMessage();
                System.out.println("fail : " + e.getMessage());
            }
            Thread.sleep(50);
        }
    }
}
