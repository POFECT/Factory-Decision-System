package com.poscodx.pofect.domain.passstandard.repository;

import com.poscodx.pofect.domain.passstandard.entity.ConfirmFactoryStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConfirmFactoryStandardRepository extends JpaRepository<ConfirmFactoryStandard, Long> {
    @Query(value="SELECT " +
            "cd_expl, process_cd, firm_ps_fac_tp  " +
            "FROM " +
            " confirm_factory_standard " +
            "GROUP BY " +
            " firm_ps_fac_tp,process_cd,cd_expl " +
            "ORDER BY " +
            "firm_ps_fac_tp",nativeQuery = true)
    List<Object[]> getGridData();
}
