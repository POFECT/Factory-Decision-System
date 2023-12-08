package com.poscodx.pofect.domain.sizestandard.repository;

import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.entity.FactorySizeStandard;
import com.poscodx.pofect.domain.sizestandard.repository.querydsl.SizeStandardCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeStandardRepository extends JpaRepository<FactorySizeStandard, Long>, SizeStandardCustom {
    List<FactorySizeStandard> findByProcessCdIn(List<String> processList);
}
