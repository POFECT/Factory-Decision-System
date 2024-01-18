package com.poscodx.pofect.domain.user.service;

import com.poscodx.pofect.domain.user.dto.MailSendCode;
import com.poscodx.pofect.domain.user.dto.MailSendResult;
import com.poscodx.pofect.domain.user.dto.MimeMessageDto;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    @Value(value = "${mail.password}")
    private String password;
    private static Queue<MimeMessageDto> mimeMessageQueue = new LinkedList<>();

    @Override
    public void mailSend(MimeMessage mimeMessage) throws MessagingException, TaskRejectedException {
        Transport.send(mimeMessage);
    }

    @Override
    public boolean hasNext() {
        return !mimeMessageQueue.isEmpty();
    }

    @Override
    public MimeMessageDto poll() {
        return mimeMessageQueue.poll();
    }

    public void addSendMailToList(MimeMessage mimeMessage,String toEmail) {
        mimeMessageQueue.add(
                MimeMessageDto.of(mimeMessage, toEmail)
        );
    }

    public MailSendResult sendMailService(String toEmail, String standardType, String type, String endpoint, HttpServletRequest request) {
        String mailResult = "Success";
        MailSendCode resultCode = MailSendCode.SUCCESS;

        try {
            Properties properties = this.getProperty(toEmail);
            MimeMessage mimeMessage = this.getMimeMessage(properties);
            MimeMessageHelper messageHelper = this.getMimeMessageHelper(mimeMessage);
            this.setMessageHelper(messageHelper, toEmail, standardType, type,endpoint, request);
            this.addSendMailToList(mimeMessage, toEmail);
//            this.mailSend(mimeMessage);

        } catch (Exception e) {
            mailResult = "Fail: " + e.getMessage();
            resultCode = MailSendCode.FAIL;
        }

        return MailSendResult.of(resultCode, mailResult);
    }

    private MimeMessageHelper getMimeMessageHelper(
            MimeMessage mimeMessage
    ) throws MessagingException {
        return new MimeMessageHelper(mimeMessage, true, "utf-8");
    }

    private Properties getProperty(String toEmail) {

        Properties properties = System.getProperties();
        if(toEmail.contains("@gmail")){
            properties.put("mail.smtp.host", "smtp.gmail.com");
        } else if (toEmail.contains("@naver")) {
            properties.put("mail.smtp.host", "smtp.naver.com");
        }
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.socketFactory.port", "465");
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");


        return properties;
    }
    private MimeMessage getMimeMessage(Properties properties) {
        String sender = "pofect2@gmail.com";

        Session session = Session.getInstance(properties,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(sender, password);
                    }
                });

        return new MimeMessage(session);
    }

    private void setMessageHelper(MimeMessageHelper messageHelper, String toEmail,
                                  String standardType, String type, String endpoint, HttpServletRequest request) throws IOException, MessagingException {
        String sender = "pofect2@gmail.com";
        String userName = "POFECT";
        String message = getFileContent("mailForm.html");
        String origin = request.getHeader("Origin");

        if (Objects.isNull(origin)) {
            origin = request.getRemoteAddr();
        }

        messageHelper.setFrom(new InternetAddress(sender, userName, "utf-8"));
        messageHelper.setTo(toEmail);
        messageHelper.setSubject("[POFECT] "+standardType+"이 "+ type +"되었습니다.");
        message = this.createInviteMailContent(origin, endpoint, standardType, type);
        messageHelper.setText(message, true);

        //이미지 첨부
        File file1 = new ClassPathResource("/static/images/poscodx-email-footer.png").getFile();
        FileSystemResource fsr1 = new FileSystemResource(file1);
        File file2 = new ClassPathResource("/static/images/poscodx-email-footer2.png").getFile();
        FileSystemResource fsr2 = new FileSystemResource(file2);
        messageHelper.addInline("poscodx-email-footer", fsr1);
        messageHelper.addInline("poscodx-email-footer2", fsr2);

    }

    private String createInviteMailContent(String origin, String endPoint, String standardType, String type) {

        String url = origin + "/" + endPoint;

        String message = getFileContent("mailForm.html");

        if (Objects.nonNull(message)) {
            message = message
                    .replace("{standardType}", standardType)
                    .replace("{type}", type)
                    .replace("{url}", url);
        } else {
            message = "none message";
        }

        return message;
    }

    private String getFileContent(String filename) {

        try (InputStream is = new ClassPathResource("templates/" + filename).getInputStream()) {

            String[] tmpFilenames = filename.split("\\.");

            File file = File.createTempFile(tmpFilenames[0], tmpFilenames[1]);
            FileUtils.copyInputStreamToFile(is, file);

            Path path = Paths.get(file.toURI());
            List<String> contents = Files.readAllLines(path);

            return String.join("\n", contents);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
