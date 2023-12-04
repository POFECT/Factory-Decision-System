package com.poscodx.pofect.domain.dashboard.service;

import com.poscodx.pofect.domain.dashboard.dto.DashBoardInputStatusResDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DashBoardService {
    List<DashBoardInputStatusResDto> getInputStatusList();
}
