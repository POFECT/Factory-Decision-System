package com.poscodx.pofect.domain.log.repository;

import com.poscodx.pofect.domain.log.document.LogDoc;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends MongoRepository<LogDoc, String> {

    List<LogDoc> findAllByOrderIdOrderByFlagAscUpdateDateDesc(Long id);

}
