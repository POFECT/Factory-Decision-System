package com.poscodx.pofect.domain.log.service;

import com.poscodx.pofect.domain.log.document.LogDoc;

import java.util.List;

public interface LogService {
    List<LogDoc> getList();

    LogDoc insertPossible(LogDoc logDoc);

    public LogDoc insertTest();
}
