package com.poscodx.pofect.domain.main.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FactoryOrderInfoReqDto {

    /** 출강주 조회 request data */
    @Getter
    @Setter
    @AllArgsConstructor
    public static class SearchDto {
        private String osMainStatusCd;  // 주문진도상태구분
        private List<String> faConfirmFlag;  // 공장결정확정구분
    }

    /** 주문데이터 조회 request data */
    @Getter
    @Setter
    @AllArgsConstructor
    public static class orderDto {
        private String ordPdtItpCdN;  // 주문품종코드
        private String ordThwTapWekCd;  // 주문투입출강주코드
        private String osMainStatusCd;  // 주문진도상태구분
        private List<String> faConfirmFlag;  // 공장결정확정구분
    }

    /** FA_CONFIRM_FLAG, OS_MAIN_STATUS_CD_N 수정 request data */
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updateCodeDto {
        private String value;  // 변경할 값
        private List<Long> ids;  // FLAG를 변경할 주문 ID 리스트
    }

    /** 공장 변경 request data */
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updateFactoryDto {
        private Long orderId;  // 주문 PK
        private String processCd;  // 바꿀 공정
        private String prevFactory;  // 이전 공장
        private String nextFactory;  // 바꿀 공장
        private String week;  // 출강주
        private Integer orderQty;  // 해당 주문 투입량
    }

    @NotBlank
    @Size(max = 2)
    private String gcsCompCode;  // 1.연결결산법인구분

    @NotBlank
    @Size(max = 1)
    private String millCd;  // 2.공정계획박판Mill구분

    @NotBlank
    @Size(max = 13)
    private String orderHeadLineNo;  // 3.OrderHeadLineNumber

}
