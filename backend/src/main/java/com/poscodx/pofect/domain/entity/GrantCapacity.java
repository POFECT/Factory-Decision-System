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
// 주문별 능력 부여 관리 (FC100)
public class GrantCapacity extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "WORKS_CODE", length = 1)
    @NotNull
    private String worksCode;  // 2.사소구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 3.공정계획박판Mill구분

    @Column(name = "FA_CAPACITY_FLAG", length = 1)
    @NotNull
    private String faCapacityFlag;  // 4.공장결정능력구분

    @Column(name = "CAPA_ITEM_SEQ")
    @NotNull
    private Integer capaItemSeq;  // 5.공정능력관리번호

    @Column(name = "SEQ", length = 22)
    @NotNull
    private String seq;  // 6.일련번호

    @Column(name = "CON_CALC_OPXA1", length = 20)
    private String conCalcOpxa1;  // 7.계산식연산자명1

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_SLOC1")
    private Long qdBasItemQdMapAppSloc1;  // 8.품질설계기준항목QD_Mapping적용시작위치1

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_LEN1")
    private Long qdBasItemQdMapAppLen1;  // 9.품질설계기준항목QD_Mapping적용길이1

    @Column(name = "COLUMN_ID1", length = 50)
    private String columnId1;  // 10.6시그마통계시스템ColumnID1

    @Column(name = "DATA11", columnDefinition = "TEXT", length = 4000)
    private String data11;  // 11.Data11

    @Column(name = "DATA12", columnDefinition = "TEXT", length = 4000)
    private String data12;  // 12.Data12

    @Column(name = "CON_CALC_OPXA2", length = 20)
    private String conCalcOpxa2;  // 13.계산식연산자명2

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_SLOC2")
    private Long qdBasItemQdMapAppSloc2;  // 14.품질설계기준항목QD_Mapping적용시작위치2

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_LEN2")
    private Long qdBasItemQdMapAppLen2;  // 15.품질설계기준항목QD_Mapping적용길이2

    @Column(name = "COLUMN_ID2", length = 50)
    private String columnId2;  // 16.6시그마통계시스템ColumnID2

    @Column(name = "DATA21", columnDefinition = "TEXT", length = 4000)
    private String data21;  // 17.Data21

    @Column(name = "DATA22", columnDefinition = "TEXT", length = 4000)
    private String data22;  // 18.Data22

    @Column(name = "CON_CALC_OPXA3", length = 20)
    private String conCalcOpxa3;  // 19.계산식연산자명3

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_SLOC3")
    private Long qdBasItemQdMapAppSloc3;  // 20.품질설계기준항목QD_Mapping적용시작위치3

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_LEN3")
    private Long qdBasItemQdMapAppLen3;  // 21.품질설계기준항목QD_Mapping적용길이3

    @Column(name = "COLUMN_ID3", length = 50)
    private String columnId3;  // 22.6시그마통계시스템ColumnID3

    @Column(name = "DATA31", columnDefinition = "TEXT", length = 4000)
    private String data31;  // 23.Data31

    @Column(name = "DATA32", columnDefinition = "TEXT", length = 4000)
    private String data32;  // 24.Data32

    @Column(name = "CON_CALC_OPXA4", length = 20)
    private String conCalcOpxa4;  // 25.계산식연산자명4

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_SLOC4")
    private Long qdBasItemQdMapAppSloc4;  // 26.품질설계기준항목QD_Mapping적용시작위치4

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_LEN4")
    private Long qdBasItemQdMapAppLen4;  // 27.품질설계기준항목QD_Mapping적용길이4

    @Column(name = "COLUMN_ID4", length = 50)
    private String columnId4;  // 28.6시그마통계시스템ColumnID4

    @Column(name = "DATA41", columnDefinition = "TEXT", length = 4000)
    private String data41;  // 29.Data41

    @Column(name = "DATA42", columnDefinition = "TEXT", length = 4000)
    private String data42;  // 30.Data42

    @Column(name = "CON_CALC_OPXA5", length = 20)
    private String conCalcOpxa5;  // 31.계산식연산자명5

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_SLOC5")
    private Long qdBasItemQdMapAppSloc5;  // 32.품질설계기준항목QD_Mapping적용시작위치5

    @Column(name = "QD_BAS_ITEM_QD_MAP_APP_LEN5")
    private Long qdBasItemQdMapAppLen5;  // 33.품질설계기준항목QD_Mapping적용길이5

    @Column(name = "COLUMN_ID5", length = 50)
    private String columnId5;  // 34.6시그마통계시스템ColumnID5

    @Column(name = "DATA51", columnDefinition = "TEXT", length = 4000)
    private String data51;  // 35.Data51

    @Column(name = "DATA52", columnDefinition = "TEXT", length = 4000)
    private String data52;  // 36.Data52

    @Column(name = "CD_EXPL", length = 680)
    private String cdExpl;  // 37.코드설명

    @Column(name = "ITEM_THICK_GROUP_NAME", length = 50)
    private String itemThickGroupName;  // 38.두께그룹명

    @Column(name = "PROCESS_CD1", length = 2)
    private String processCd1;  // 39.박판공정계획공정구분1

    @Column(name = "FIRM_PS_FAC_TP1", length = 1)
    private String firmPsFacTp1;  // 40.확정통과공장구분1

    @Column(name = "PROCESS_CD2", length = 2)
    private String processCd2;  // 41.박판공정계획공정구분2

    @Column(name = "FIRM_PS_FAC_TP2", length = 1)
    private String firmPsFacTp2;  // 42.확정통과공장구분2

    @Column(name = "USER_ID", length = 8)
    private String userId;  // 43.박판공정계획사용자ID

}
