package com.poscodx.pofect.domain.log.service;

import com.poscodx.pofect.domain.log.entity.LogDoc;
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
}
