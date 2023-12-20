package com.poscodx.pofect.domain.capacity.repository;

import com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto;
import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

public interface CapacityRepository extends JpaRepository<CapacityInfo, Long> {

    // 출강주 insert
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

    @Query("SELECT new com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto(" +
            "b.id, b.gcsCompCode, b.millCd, b.ordRcpTapWekCd, b.processCd, " +
            "b.firmPsFacTp, b.faAdjustmentWgt, b.progressQty, b.userId, a.planQty, " +
            "(SELECT DISTINCT a.cdExpl FROM MainProcessCode a WHERE b.processCd = a.processCd) " +
            ") " +
            "FROM GrantCapacity a, CapacityInfo b " +
            "WHERE a.firmPsFacTp = b.firmPsFacTp " +
            "AND a.processCd = b.processCd AND b.ordRcpTapWekCd = '20230711'")
    List<CombinedCapacityDto> findCombinedCapacity();

    //    SELECT b.id, b.gcs_comp_code, b.mill_cd, b.ord_rcp_tap_wek_cd, b.process_cd,
//    b.firm_ps_fac_tp, b.fa_adjustment_wgt, b.progress_qty, b.user_id, a.plan_qty,
//            (select  distinct a.cd_expl from main_process_code a where b.process_cd = a.process_cd)
//    FrOM grant_capacity a, capacity_info b
//    WHERE a.firm_ps_fac_tp = b.firm_ps_fac_tp
//    AND a.process_cd = b.process_cd;
    // join
    @Query("SELECT new com.poscodx.pofect.domain.capacity.dto.CombinedCapacityDto(" +
            "b.id, b.gcsCompCode, b.millCd, b.ordRcpTapWekCd, b.processCd, " +
            "b.firmPsFacTp, b.faAdjustmentWgt, b.progressQty, b.userId, a.planQty, " +
            "(SELECT DISTINCT a.cdExpl FROM MainProcessCode a WHERE b.processCd = a.processCd) " +
            ") " +
            "FROM GrantCapacity a, CapacityInfo b " +
            "WHERE a.firmPsFacTp = b.firmPsFacTp " +
            "AND a.processCd = b.processCd " +
            "AND (:week IS NULL OR b.ordRcpTapWekCd = :week)")
    List<CombinedCapacityDto> findCombinedCapacityByWeek(@Param("week") String week);

    @Transactional
    @Modifying
    @Query("UPDATE CapacityInfo c SET c.faAdjustmentWgt = :faAdjustmentWgt WHERE c.id IN :ids AND c.ordRcpTapWekCd = :week")
    void updateFaAdjustmentWgt(@Param("ids") @NotBlank Long ids, @Param("faAdjustmentWgt") Long faAdjustmentWgt, @Param("week") String week);

    List<CapacityInfo> findAllByProcessCdOrderByFirmPsFacTpAsc(String processCode);

    List<CapacityInfo> findAllByProcessCdAndOrdRcpTapWekCdOrderByFirmPsFacTpAsc(String processCode, String week);

    Optional<CapacityInfo> findByProcessCdAndFirmPsFacTpAndAndOrdRcpTapWekCd(String processCd, String firmPsFacTp, String ordRcpTapWekCd);

    List<CapacityInfo> findAllByOrdRcpTapWekCd(String week);
}
