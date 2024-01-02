package com.poscodx.pofect.domain.log.repository;

import com.poscodx.pofect.domain.log.entity.LogDoc;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends MongoRepository<LogDoc, String> {
}
