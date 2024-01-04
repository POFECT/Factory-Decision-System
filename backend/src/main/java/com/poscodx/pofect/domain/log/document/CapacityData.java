package com.poscodx.pofect.domain.log.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pofect_log")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CapacityData {

    private String processCd;  // 공정 번호
    private String factory;  // 공장
    private Long capacityQty;  // 능력 사용량(조정량 faAdjustmentWgt-진행량 progressQty)

}
