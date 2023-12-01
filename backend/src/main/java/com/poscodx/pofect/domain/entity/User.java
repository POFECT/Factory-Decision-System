package com.poscodx.pofect.domain.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@SuperBuilder
@Getter
@AllArgsConstructor
@NoArgsConstructor
// 회원 정보
public class User extends BaseEntity {

    @Column(name = "USER_ID", length = 8)
    @NotNull
    private String userId;  // 1.직번

    @Column(name = "E_MAIL_ADDR", length = 50)
    @NotNull
    private String eMailAddr;  // 2.이메일

    @Column(name = "USER_NAME", length = 5)
    @NotNull
    private String userName;  // 3.이름

    @Column(name = "PASSWORD", length = 200)
    @NotNull
    private String password;  // 4.비밀번호

    @Column(name = "AUTHOR", length = 1)
    @NotNull
    private String author;  // 5.권한

    @Column(name = "JOIN_DATE")
    private LocalDateTime joinDate;  // 6.입사일

    @Column(name = "DEPART", length = 20)
    private String depart;  // 7.부서


}
