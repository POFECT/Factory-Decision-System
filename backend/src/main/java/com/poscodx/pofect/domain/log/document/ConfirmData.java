package com.poscodx.pofect.domain.log.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "pofect_log")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmData {

    private String code;

    private ArrayList<CapacityData> capacityData;

}
