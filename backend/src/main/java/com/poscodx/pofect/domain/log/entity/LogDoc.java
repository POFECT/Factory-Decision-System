package com.poscodx.pofect.domain.log.entity;


import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "pofect_log")
@Getter
public class LogDoc {

    @Id
    private String _id;

    private String status;

    private String sizeResult;
}
