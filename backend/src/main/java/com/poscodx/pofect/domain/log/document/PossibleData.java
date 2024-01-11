package com.poscodx.pofect.domain.log.document;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;

//@Document(collection = "pofect_log")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EnableMongoAuditing
@Getter
@Setter
public class PossibleData {

    private String code;

    @Field(name = "pass_result")
    private String passResult;

    @Field(name = "essential_result")
    private String essentialResult;

    @Field(name = "size_result")
    private String sizeResult;

}
