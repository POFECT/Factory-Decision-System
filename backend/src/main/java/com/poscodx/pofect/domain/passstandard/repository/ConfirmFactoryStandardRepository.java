package com.poscodx.pofect.domain.passstandard.repository;

import com.poscodx.pofect.domain.passstandard.entity.ConfirmFactoryStandard;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ConfirmFactoryStandardRepository extends JpaRepository<ConfirmFactoryStandard, Long> {
    @Query(value="SELECT " +
            "cd_expl as cdExpl, process_cd as processCd, firm_ps_fac_tp firmPsFacTp " +
            "FROM " +
            " confirm_factory_standard " +
            "GROUP BY " +
            " firm_ps_fac_tp,process_cd,cd_expl " +
            "ORDER BY " +
            "firm_ps_fac_tp",nativeQuery = true)
    List<Map<String, Object>> getGridData();
//    List<Object[]> getGridData();

    List<ConfirmFactoryStandard> findAllByProcessCdOrderByProcessCdAsc(String process);

    List<ConfirmFactoryStandard> findAllByOrderByProcessCdAscFirmPsFacTpAsc();

    FactoryName findAllByProcessCdAndFirmPsFacTp(String processCd, String firmPsFacTp);

    public interface FactoryName {
        String getCdExpl();
    }

}
