package com.poscodx.pofect.domain.sizestandard.repository;

import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.entity.FactorySizeStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeStandardRepository extends JpaRepository<FactorySizeStandard, Long> {
}
