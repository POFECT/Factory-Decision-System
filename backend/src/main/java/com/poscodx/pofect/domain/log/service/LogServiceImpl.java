package com.poscodx.pofect.domain.log.service;

import com.poscodx.pofect.domain.log.document.LogDoc;
import com.poscodx.pofect.domain.log.repository.LogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LogServiceImpl implements LogService{
    private final LogRepository logRepository;

    @Override
    public List<LogDoc> getList() {
        return logRepository.findAll();
    }

    @Override
    public LogDoc insertLog(LogDoc logDoc) {
        return logRepository.save(logDoc);
    }

    @Override
    public List<LogDoc> getLogsById(Long id) {
        return logRepository.findAllByOrderIdOrderByFlagAscUpdateDateDesc(id);
    }

}

/*
{
  "etc": "정상설계10",
  "flag": "B",
  "ordPdtItdsCdN": "FFF",
  "ordThwTapWekCd": "20230711",
  "orderHeadLineNo": "0S1111",
  "orderLineQty": 15000,
  "possibleData": {"code": "06060606",
"passResult": "11111111",
"essentialResult": "11001100",
"sizeResult": "11000100"},
  "updateDate": "2024-01-03T11:36:51.561Z"
}

 */