package com.poscodx.pofect.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
// 필수재 기준 (FC070)
public class EssentialStandard extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "SEQ", length = 22)
    @NotNull
    private String seq;  // 3.일련번호

    @Column(name = "PROCESS_CD", length = 2)
    private String processCd;  // 4.박판공정계획공정구분

    @Column(name = "BTI_POSB_PS_FAC_TP", length = 2)
    private String btiPosbPsFacTp;  // 5.박판가능통과공장구분

    @Column(name = "CON_CALC_OPXA01", length = 20)
    private String conCalcOpxa01;  // 6.계산식연산자명1

    @Column(name = "DATA011", columnDefinition = "TEXT", length = 4000)
    private String data011;  // 7.Data11

    @Column(name = "DATA012", columnDefinition = "TEXT", length = 4000)
    private String data012;  // 8.Data12

    @Column(name = "CON_CALC_OPXA02", length = 20)
    private String conCalcOpxa02;  // 9.계산식연산자명2

    @Column(name = "DATA021", columnDefinition = "TEXT", length = 4000)
    private String data021;  // 10.Data21

    @Column(name = "DATA022", columnDefinition = "TEXT", length = 4000)
    private String data022;  // 11.Data22

    @Column(name = "CON_CALC_OPXA03", length = 20)
    private String conCalcOpxa03;  // 12.계산식연산자명3

    @Column(name = "DATA031", columnDefinition = "TEXT", length = 4000)
    private String data031;  // 13.Data31

    @Column(name = "DATA032", columnDefinition = "TEXT", length = 4000)
    private String data032;  // 14.Data32

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 40.박판공정계획사용자ID

}
