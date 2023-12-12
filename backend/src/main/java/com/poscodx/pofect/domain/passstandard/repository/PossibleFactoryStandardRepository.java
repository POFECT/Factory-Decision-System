package com.poscodx.pofect.domain.passstandard.repository;

import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;
import com.poscodx.pofect.domain.passstandard.entity.PossibleFactoryStandard;
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

    @Query(value=
            "SELECT " +
            " pfs.feasible_routing_group AS firmPsFacTp " +
            "FROM " +
            "    possible_factory_standard pfs " +
            "WHERE " +
            "    pfs.process_cd = :processCD AND pfs.bti_posb_ps_fac_tp = :btiPosbPsFacTp"
            ,nativeQuery = true)
    String getPossibleToConfirm(String processCD, String btiPosbPsFacTp);
}