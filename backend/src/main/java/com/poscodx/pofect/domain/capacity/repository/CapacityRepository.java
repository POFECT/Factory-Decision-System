package com.poscodx.pofect.domain.capacity.repository;

import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto;
import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CapacityRepository extends JpaRepository<CapacityInfo, Long> {

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO capacity_info " +
            "(ord_rcp_tap_wek_cd, " +
            "gcs_comp_code, mill_cd, process_cd, firm_ps_fac_tp, progress_qty, fa_adjustment_wgt, " +
            "user_id, last_update_date) " +
            "SELECT :week, " +
            "gcs_comp_code, mill_cd, process_cd, firm_ps_fac_tp, 0, plan_qty, " +
            "user_id, last_update_date FROM grant_capacity",
            nativeQuery = true)
    void insertIntoCapacityInfo(@Param("week") String week);

    boolean existsByOrdRcpTapWekCd(String week);

    Optional<CapacityInfo> findByOrdRcpTapWekCd(String week);


    @Query("SELECT new com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto(" +
            "b.id, b.gcsCompCode, b.millCd, b.ordRcpTapWekCd, b.processCd, " +
            "b.firmPsFacTp, b.faAdjustmentWgt, b.progressQty, b.userId, a.planQty) " +
            "FROM GrantCapacity a, CapacityInfo b " +
            "WHERE a.firmPsFacTp = b.firmPsFacTp " +
            "AND a.processCd = b.processCd")
    List<CombinedCapacityDto> findCombinedCapacity();
}
