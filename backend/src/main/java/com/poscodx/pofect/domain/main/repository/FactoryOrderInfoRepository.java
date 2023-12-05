package com.poscodx.pofect.domain.main.repository;

import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FactoryOrderInfoRepository extends JpaRepository<FactoryOrderInfo, Long> {
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
}
