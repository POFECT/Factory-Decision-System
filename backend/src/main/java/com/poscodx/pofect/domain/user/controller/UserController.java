package com.poscodx.pofect.domain.user.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.config.Sha256;
import com.poscodx.pofect.domain.user.dto.MailSendResult;
import com.poscodx.pofect.domain.user.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;

@Slf4j
@Api(value = "USER API", tags = {"유저"})
@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
//    @Value(value = "${jasypt.key}")
//    private String key;

    @PostMapping("/mail")
    public ResponseEntity<ResponseDto> sendMail(HttpServletRequest request) throws NoSuchAlgorithmException {
        userService.sendMailService("chemi0313@gmail.com","사이즈기준","수정","/size-standard",request);
        return null;

    }

}
