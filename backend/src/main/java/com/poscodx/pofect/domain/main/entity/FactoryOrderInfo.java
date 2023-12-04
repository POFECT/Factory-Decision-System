package com.poscodx.pofect.domain.main.entity;

import com.poscodx.pofect.domain.etc.entity.BaseEntity;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
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
// 공장결정 대상 주문정보 (FW010)
public class FactoryOrderInfo extends BaseEntity {

    @Column(name = "GCS_COMP_CODE", length = 2)
    @NotNull
    private String gcsCompCode;  // 1.연결결산법인구분

    @Column(name = "MILL_CD", length = 1)
    @NotNull
    private String millCd;  // 2.공정계획박판Mill구분

    @Column(name = "ORDER_HEAD_LINE_NO", length = 13)
    @NotNull
    private String orderHeadLineNo;  // 3.OrderHeadLineNumber

    @Column(name = "CREATION_DATE")
    private LocalDateTime creationDate;  // 4.생성일자

    @Column(name = "OS_MAIN_STATUS_CD", length = 1)
    private String osMainStatusCd;  // 5.주문진도상태구분

    @Column(name = "FA_CONFIRM_FLAG", length = 1)
    private String faConfirmFlag;  // 6.공장결정확정구분

    @Column(name = "POSB_PASS_FAC_CD_N", length = 16)
    private String posbPassFacCdN;  // 7.가능통과공정코드

    @Column(name = "CFIRM_PASS_OP_CD", length = 8)
    private String cfirmPassOpCd;  // 8.확정통과공정코드

    @Column(name = "ORD_PDT_ITP_CD_N", length = 2)
    private String ordPdtItpCdN;  // 9.주문품종코드

    @Column(name = "ORD_PDT_ITDS_CD_N", length = 4)
    private String ordPdtItdsCdN;  // 10.주문품명코드

    @Column(name = "ADJUST_CONS_BKT_START_DTTM")
    private LocalDateTime adjustConsBktStartDttm;  // 11.주문ATP능력사용조정일

    @Column(name = "CUSTOMER_NUMBER", length = 5)
    private String customerNumber;  // 12.고객사코드

    @Column(name = "CUSTOMER_NAME", length = 360)
    private String customerName;  // 13.고객사명

    @Column(name = "ORD_THW_TAP_WEK_CD", length = 8)
    private String ordThwTapWekCd;  // 14.주문투입출강주코드

    @Column(name = "ORDER_TYPE", length = 2)
    private String orderType;  // 15.OrderType(수주구분)

    @Column(name = "ORDER_LINE_QTY")
    private Integer orderLineQty;  // 16.OrderLine 주문량

    @Column(name = "ORDER_THICK")
    private Double orderThick;  // 17.제품주문두께

    @Column(name = "ORDER_WIDTH")
    private Double orderWidth;  // 18.제품주문폭

    @Column(name = "ORDER_LENGTH", length = 5)
    private String orderLength;  // 19.주문길이

    @Column(name = "ORDER_USAGE_CD_N", length = 6)
    private String orderUsageCdN;  /// 20.주문용도지정코드

    @Column(name = "ORDER_EDGE_CODE", length = 1)
    private String orderEdgeCode;  // 21.제품주문Edge구분

    @Column(name = "STOCK_CODE", length = 1)
    private String stockCode;  // 22.제품재고판매구분

    @Column(name = "SALES_PERSON", length = 150)
    private String salesPerson;  // 23.제품경매영업담당자명

    @Column(name = "SALES_CODE_N", length = 3)
    private String salesCodeN;  // 24.판매특기구분

    @Column(name = "SAL_CUS_MAN_DBL_TP", length = 1)
    private String salCusManDblTp;  // 25.판매고객사대표산업구분

    @Column(name = "SAL_CUS_LOC_L_CLS_TP", length = 1)
    private String salCusLocLClsTp;  // 26.판매고객사지역대분류구분

    @Column(name = "PROD_STD_PACK_TOL_MIN")
    private Integer prodStdPackTolMin;  // 27.주문제품정포장하한중량

    @Column(name = "PROD_STD_PACK_TOL_MAX")
    private Integer prodStdPackTolMax;  // 28.주문제품정포장상한중량

    @Column(name = "SPECIFICATION_CD_N", length = 30)
    private String specificationCdN;  // 29.제품규격약호

    @Column(name = "SURFACE_FINISH_CD", length = 2)
    private String surfaceFinishCd;  // 30.제품표면마무리지정코드

    @Column(name = "POST_TREATMENT_METHOD_CD_N", length = 3)
    private String postTreatmentMethodCdN;  // 31.주문제품후처리방법지정코드

    @Column(name = "OILING_METHOD_CD", length = 2)
    private String oilingMethodCd;  // 32.제품도유방법지정코드

    @Column(name = "PLANNING_ITEM_CODE_N", length = 16)
    private String planningItemCodeN;  // 33.PlanningItem코드

    @Column(name = "SM_STEEL_GRD_N", length = 14)
    private String smSteelGrdN;  // 34.출강목표번호

    @Column(name = "MOLTEN_STEEL_CHAR_CD_N", length = 6)
    private String moltenSteelCharCdN;  // 35.품질설계용강특성코드

    @Column(name = "TS_AIM", length = 4)
    private String tsAim;  // 36.품질설계목표TS

    @Column(name = "UNIT_WEIGHT")
    private Double unitWeight;  // 37.제품칫수계산단중

    @Column(name = "HR_SP_COMPOSITE", length = 1)
    private String hrSpComposite;  // 38.품질설계열연SkinPass합성지정구분

    @Column(name = "SURFACE_GRD", length = 1)
    private String surfaceGrd;  // 39.품질설계표면등급구분

    @Column(name = "SHAPE_GRD", length = 1)
    private String shapeGrd;  // 40.품질설계형상등급구분

    @Column(name = "POSCO_PROD_GRD_N", length = 13)
    private String poscoProdGrdN;  // 41.제품사내보증번호

    @Column(name = "HR_PROD_THK_AIM")
    private Double hrProdThkAim;  // 42.품질설계열연목표두께

    @Column(name = "HR_PROD_WTH_AIM")
    private Double hrProdWthAim;  // 43.품질설계열연목표폭

    @Column(name = "HR_ROLL_UNIT_WGT_MAX")
    private Double hrRollUnitWgtMax;  // 44.열연공장압연가능재료상한중량

    @Column(name = "SM_2ND_RFN_CD", length = 3)
    private String sm2ndRfnCd;  // 45.품질설계제강2차정련코드

    @Column(name = "SKINPASS_FLAG", length = 1)
    private String skinpassFlag;  // 46.제품SkinPass지정여부

    @Column(name = "PACKING_TYPE", length = 5)
    private String packingType;  // 47.제품포장방법코드

    @Column(name = "FAC_ALLOC_WGT")
    private Integer facAllocWgt;  // 48.소내공장결정중량

    @Column(name = "FA_ALLOC_DATE")
    private LocalDateTime faAllocDate;  // 49.생산가능공장결정일자

    @Column(name = "ERROR_MESSAGE", length = 200)
    private String errorMessage;  // 50.ErrorMessage내용

    @Column(name = "MSGCODE", length = 5)
    private String msgcode;  // 51.박판공정계획Message코드


    public static FactoryOrderInfo toEntity(FactoryOrderInfoReqDto factoryOrderInfoReqDto) {
        return FactoryOrderInfo.builder()
                .gcsCompCode(factoryOrderInfoReqDto.getGcsCompCode())
                .millCd(factoryOrderInfoReqDto.getMillCd())
                .orderHeadLineNo(factoryOrderInfoReqDto.getOrderHeadLineNo())
                .build();
    }

}
