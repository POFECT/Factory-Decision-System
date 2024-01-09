package com.poscodx.pofect.domain.log.document;

import lombok.*;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import java.util.ArrayList;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@EnableMongoAuditing
@Getter
@Setter
public class ConfirmData {

    private String code;

    private ArrayList<CapacityData> capacityData;

}
