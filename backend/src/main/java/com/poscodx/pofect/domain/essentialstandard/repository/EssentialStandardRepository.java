package com.poscodx.pofect.domain.essentialstandard.repository;

import com.poscodx.pofect.domain.essentialstandard.entity.EssentialStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EssentialStandardRepository extends JpaRepository<EssentialStandard,Long> {
}
