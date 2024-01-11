package com.poscodx.pofect.domain.log.service;

import com.poscodx.pofect.domain.log.document.LogDoc;

import java.util.List;

public interface LogService {
    List<LogDoc> getList();

    LogDoc insertLog(LogDoc logDoc);

    List<LogDoc> getLogsById(Long id);
}
