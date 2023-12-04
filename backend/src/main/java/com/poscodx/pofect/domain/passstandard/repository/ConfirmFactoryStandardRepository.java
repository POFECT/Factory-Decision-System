package com.poscodx.pofect.domain.passstandard.repository;

import com.poscodx.pofect.domain.passstandard.entity.ConfirmFactoryStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmFactoryStandardRepository extends JpaRepository<ConfirmFactoryStandard, Long> {
}
