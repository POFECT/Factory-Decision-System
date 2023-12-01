package com.poscodx.pofect.domain.passstandard.repository;

import com.poscodx.pofect.domain.passstandard.entity.PossibleFactoryStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PossibleFactoryStandardRepository extends JpaRepository<PossibleFactoryStandard, Long> {
}
