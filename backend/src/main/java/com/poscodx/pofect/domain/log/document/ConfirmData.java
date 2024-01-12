package com.poscodx.pofect.domain.log.document;

import lombok.*;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@EnableMongoAuditing
@Getter
@Setter
public class ConfirmData {

    private String code;

    private List<CapacityData> capacityData;

}
