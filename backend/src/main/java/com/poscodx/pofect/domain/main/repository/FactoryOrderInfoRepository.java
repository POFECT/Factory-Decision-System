package com.poscodx.pofect.domain.main.repository;

import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoResDto;
import com.poscodx.pofect.domain.main.dto.app.appResDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.poscodx.pofect.domain.main.repository.querydsl.FactoryOrderInfoCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    @Query(value = "SELECT " +
            "SUBSTRING(f.ORD_THW_TAP_WEK_CD, 1, 4) as ordThwTapYrCd, " +
            "SUBSTRING(f.ORD_THW_TAP_WEK_CD, LENGTH(f.ORD_THW_TAP_WEK_CD) - 3, 4) as ordThwTapMDCd, " +
            "COUNT(f.id) as ordCnt " +
            "FROM factory_order_info f " +
            "WHERE YEAR(CURRENT_DATE) = YEAR(STR_TO_DATE(f.ORD_THW_TAP_WEK_CD, '%Y%m%d')) " +
            "AND DATE_FORMAT(STR_TO_DATE(f.ORD_THW_TAP_WEK_CD, '%Y%m%d'), '%Y-%m') <= CURRENT_DATE " +
            "GROUP BY ordThwTapYrCd, ordThwTapMDCd " +
            "ORDER BY ordThwTapMDCd " +
            "limit 6"
            , nativeQuery = true)
    List<appResDto> getRecentOrders();

}
