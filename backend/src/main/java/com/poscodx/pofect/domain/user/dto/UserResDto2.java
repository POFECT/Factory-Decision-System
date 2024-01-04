package com.poscodx.pofect.domain.user.dto;

import lombok.*;

import java.time.LocalDateTime;

public interface UserResDto2 {
    String getUserId();

    String getEMailAddr();

    String getUserName();

    String getPassword();

    String getAuthor();

    LocalDateTime getJoinDate();

    String getDepart();

    LocalDateTime getProfileImage();
}
