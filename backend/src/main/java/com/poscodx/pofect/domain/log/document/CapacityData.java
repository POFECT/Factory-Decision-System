package com.poscodx.pofect.domain.log.document;

import lombok.*;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@EnableMongoAuditing
@Getter
@Setter
public class CapacityData {

    private String processCd;  // 공정 번호
    private String factory;  // 공장 이름
    private Long capacityQty;  // 능력 사용량(조정량 faAdjustmentWgt-진행량 progressQty)

}
