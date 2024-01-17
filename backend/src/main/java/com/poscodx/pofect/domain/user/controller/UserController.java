package com.poscodx.pofect.domain.user.controller;

import com.poscodx.pofect.common.dto.ResponseDto;
import com.poscodx.pofect.domain.user.dto.MailSendResult;
import com.poscodx.pofect.domain.user.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Api(value = "USER API", tags = {"유저"})
@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/mail")
    public ResponseEntity<ResponseDto> sendMail(HttpServletRequest request) {
        //MailSendResult result = userService.sendMailService("chlwlsdud258@gmail.com", "사이즈", "수정",request);
        //return new ResponseEntity<>(new ResponseDto(result), HttpStatus.OK);
        return null;

    }

}
