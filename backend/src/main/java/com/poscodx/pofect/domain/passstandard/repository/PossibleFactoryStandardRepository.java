package com.poscodx.pofect.domain.passstandard.repository;

import com.poscodx.pofect.domain.passstandard.dto.PossibleChangeReqDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;
import com.poscodx.pofect.domain.passstandard.entity.PossibleFactoryStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
    String getPossibleToConfirm(@Param("processCD") String processCD, @Param("btiPosbPsFacTp") String btiPosbPsFacTp);


    Optional<PossibleFactoryStandard> findByProcessCdAndFeasibleRoutingGroup(String processCd, String group);


    @Query(value="SELECT count(pfs.feasible_routing_group) " +
            "FROM possible_factory_standard pfs " +
            "WHERE pfs.process_cd = :processCd and pfs.bti_posb_ps_fac_tp = :btiPosbPsFacTp"
            ,nativeQuery = true)
    int checklistExist(@Param("btiPosbPsFacTp")String btiPosbPsFacTp,
                           @Param("processCd") String processCd);


    @Modifying
    @Query(value = "UPDATE possible_factory_standard pfs " +
            "SET pfs.feasible_routing_group = :checkedList," +
            " pfs.last_update_date= now() " +
            "WHERE pfs.process_cd = :processCd AND pfs.bti_posb_ps_fac_tp = :btiPosbPsFacTp"
            ,nativeQuery = true)
    void updateFeasibleRoutingGroup(
            @Param("btiPosbPsFacTp")String btiPosbPsFacTp,
            @Param("processCd") String processCd,
            @Param("checkedList") String checkedList);


    @Modifying
    @Query(value="DELETE FROM possible_factory_standard pfs " +
            "WHERE pfs.process_cd=:processCd and pfs.bti_posb_ps_fac_tp=:btiPosbPsFacTp"
            ,nativeQuery = true)
    int deleteFeasibleRoutingGroup(@Param("btiPosbPsFacTp")String btiPosbPsFacTp,
                                    @Param("processCd") String processCd);

    @Query(value="SELECT count(pfs.feasible_routing_group) " +
            "FROM possible_factory_standard pfs " +
            "WHERE pfs.process_cd=:processCd and pfs.feasible_routing_group = :checkedList"
            ,nativeQuery = true)
    int checkFeasibleRoutingGroupSame(
            @Param("processCd") String processCd,
            @Param("checkedList") String checkedList);

      @Modifying
      @Query(value="INSERT INTO possible_factory_standard " +
              "(gcs_comp_code, mill_cd, process_cd, bti_posb_ps_fac_tp, feasible_routing_group, " +
              " cd_expl, user_id, last_update_date) " +
              "VALUES ('01', 'T', :processCd, :btiPosbPsFacTp , :checkedList, :checkedExpl, 'SYSTEM', now())"
              , nativeQuery = true)
    int insertFeasibleRoutingGroup(
              @Param("btiPosbPsFacTp")String btiPosbPsFacTp,
              @Param("processCd") String processCd,
              @Param("checkedList") String checkedList,
              @Param("checkedExpl") String checkedExpl);
}