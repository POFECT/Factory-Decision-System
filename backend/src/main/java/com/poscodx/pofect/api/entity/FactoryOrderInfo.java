package com.poscodx.pofect.api.entity;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity()
public class FactoryOrderInfo {

    @Id
    @Column(length = 2)
    @NotNull
    private String gcsCompCode;  // 연결결산법인구분

    @Column(length = 1)
    @NotNull
    private String millCd;  // 공정계획 박판Mill 구분

    @Column(length = 13)
    @NotNull
    private String orderHeadLineNo;  // OrderHeadLineNumber

}
