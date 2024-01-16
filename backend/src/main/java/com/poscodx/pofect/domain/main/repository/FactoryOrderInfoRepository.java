package com.poscodx.pofect.domain.main.repository;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.app.appResDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.poscodx.pofect.domain.main.repository.querydsl.FactoryOrderInfoCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FactoryOrderInfoRepository extends JpaRepository<FactoryOrderInfo, Long>, FactoryOrderInfoCustom {
    @Query("SELECT f.ordPdtItpCdN, COUNT(f) FROM FactoryOrderInfo f GROUP BY f.ordPdtItpCdN")
    List<Object[]> getInputStatus();

    @Query(value = "SELECT ord_pdt_itp_cd_n, " +
            "SUM(CASE WHEN FA_CONFIRM_FLAG = 'A' THEN 1 ELSE 0 END) AS A, " +
            "SUM(CASE WHEN FA_CONFIRM_FLAG = 'B' THEN 1 ELSE 0 END) AS B, " +
            "SUM(CASE WHEN FA_CONFIRM_FLAG = 'C' THEN 1 ELSE 0 END) AS C, " +
            "SUM(CASE WHEN FA_CONFIRM_FLAG = 'D' THEN 1 ELSE 0 END) AS D, " +
            "SUM(CASE WHEN FA_CONFIRM_FLAG = 'E' THEN 1 ELSE 0 END) AS E, " +
            "SUM(CASE WHEN FA_CONFIRM_FLAG = 'F' THEN 1 ELSE 0 END) AS F " +
            "FROM factory_order_info " +
            "GROUP BY ord_pdt_itp_cd_n", nativeQuery = true)
    List<Object[]> getOrderInquiry();


    FactoryOrderInfo findByOrderHeadLineNo(String orderHeadLineNo);

    // 실수.... -> getOrd로 들고옴
    @Query(value = "SELECT f.ORD_THW_TAP_WEK_CD as ordThwTapYMDCd, COUNT(f.id) as ordCnt " +
            "FROM factory_order_info f " +
            "WHERE f.ORD_THW_TAP_WEK_CD >= DATE_SUB(LAST_DAY(now()), INTERVAL 6 MONTH) + INTERVAL 1 DAY " +
            "  AND f.ORD_THW_TAP_WEK_CD <= LAST_DAY(CURDATE()) " +
            "GROUP BY f.ORD_THW_TAP_WEK_CD " +
            "ORDER BY f.ORD_THW_TAP_WEK_CD DESC " +
            "LIMIT 5", nativeQuery = true)
    List<appResDto> getRecentOrders();

    @Query(value="select count(FOI.cfirm_pass_op_cd) from factory_order_info FOI " +
            "where substring(FOI.cfirm_pass_op_cd,:processCd,1)=:firmFsFacTp",nativeQuery = true)
    int getCfrmOrderCount(@Param("processCd") String processCd,@Param("firmFsFacTp") String firmFsFacTp);



}
