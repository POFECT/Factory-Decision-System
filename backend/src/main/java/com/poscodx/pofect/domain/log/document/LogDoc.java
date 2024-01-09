package com.poscodx.pofect.domain.log.document;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Document(collection = "pofect_log")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LogDoc {

    @Id
    private String _id;

    @Field(name = "USER_ID")
    private String userId;  // 사용자 ID

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @Field(name = "update_date")
    private LocalDateTime updateDate;  // 수정 날짜

    private String flag;  // 플래그

    @Field(name = "order_head_line_no")
    private String orderHeadLineNo;  // 주문번호

    @Field(name = "ord_pdt_itds_cd_n")
    private String ordPdtItdsCdN;  // 주문 품명

    @Field(name = "ord_thw_tap_wek_cd")
    private String ordThwTapWekCd;  // 주문 출강주

    @Field(name = "order_line_qty")
    private Integer orderLineQty;  // 주문 투입량

    private String etc;  // 비고

    @Field(name = "possible_data")
    private PossibleData possibleData;  // 가통 결과 데이터

    @Field(name = "confirm_data")
    private ConfirmData confirmData;  // 확통 결과 데이터

}
