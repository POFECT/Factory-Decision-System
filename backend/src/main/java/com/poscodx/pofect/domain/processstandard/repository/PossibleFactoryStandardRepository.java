package com.poscodx.pofect.domain.processstandard.repository;

import com.poscodx.pofect.domain.processstandard.entity.PossibleFactoryStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PossibleFactoryStandardRepository extends JpaRepository<PossibleFactoryStandard, Long> {
    @Query(value="SELECT" +
            " pfs.bti_posb_ps_fac_tp AS btiPosbPsFacTp," +
            " pfs.process_cd AS processCd," +
            " pfs.feasible_routing_group AS feasibleRoutingGroup " +
            "FROM" +
            " possible_factory_standard pfs" +
            " GROUP BY" +
            "    pfs.bti_posb_ps_fac_tp, pfs.process_cd, pfs.feasible_routing_group " +
            "ORDER BY " +
            "bti_posb_ps_fac_tp",nativeQuery = true)
    List<Object[]> getGridData();
}