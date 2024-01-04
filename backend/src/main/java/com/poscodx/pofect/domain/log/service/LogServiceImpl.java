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
    public LogDoc insertPossible(LogDoc logDoc) {
        return logRepository.save(logDoc);
    }

    @Override
    public LogDoc insertTest() {
        LogDoc logDoc = LogDoc.builder()
                .etc("최초")
                .flag("C")
                .ordPdtItdsCdN("FDS")
                .orderLineQty(25000)
                .orderHeadLineNo("0S12345")
                .ordThwTapWekCd("20230711")
                .build();
        return logRepository.save(logDoc);
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