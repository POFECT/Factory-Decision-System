package com.poscodx.pofect.api.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class FactoryOrderInfo extends BaseEntity {

    @Column(length = 2, nullable = false)
    @NotBlank
//    @Size(max = 2)
    private String gcsCompCode;  // 연결결산법인구분

    @Column(length = 1, nullable = false)
    @NotBlank
//    @Size(max = 1)
    private String millCd;  // 공정계획 박판Mill 구분

    @Column(length = 13, nullable = false)
    @NotBlank
//    @Size(max = 13)
    private String orderHeadLineNo;  // OrderHeadLineNumber



}
