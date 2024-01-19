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

    //App(week 기준)
    @Query("SELECT f.ordPdtItpCdN, COUNT(f.id) FROM FactoryOrderInfo f WHERE f.ordThwTapWekCd = :week GROUP BY f.ordPdtItpCdN")
    List<Object[]> getInputStatusApp(@Param("week") String week);

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

    //한주만 가져오기 버전
//    @Query(value="SELECT " +
//            "      SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 1, 1) = :firmFsFacTp THEN 1 ELSE 0 END) AS 제강, " +
//            "      SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 2, 1) = :firmFsFacTp THEN 1 ELSE 0 END) AS 열연," +
//            "      SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 3, 1) = :firmFsFacTp THEN 1 ELSE 0 END) AS 열연정정," +
//            "      SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 4, 1) = :firmFsFacTp THEN 1 ELSE 0 END) AS PCM," +
//            "      SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 5, 1) = :firmFsFacTp THEN 1 ELSE 0 END) AS CAL," +
//            "      SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 6, 1) = :firmFsFacTp THEN 1 ELSE 0 END) AS ACL," +
//            "      SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 7, 1) = :firmFsFacTp THEN 1 ELSE 0 END) AS EGL," +
//            "      SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 8, 1) = :firmFsFacTp THEN 1 ELSE 0 END) AS RCL" +
//            "      FROM factory_order_info FOI",nativeQuery = true)
    //전체 가져오기 버전
    @Query(value="SELECT" +
            "  FOI.ord_thw_tap_Wek_Cd," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 1, 1) = '1' THEN 1 ELSE 0 END) AS '1제강'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 1, 1) = '2' THEN 1 ELSE 0 END) AS '2제강'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 2, 1) = '1' THEN 1 ELSE 0 END) AS '1열연'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 2, 1) = '2' THEN 1 ELSE 0 END) AS '2열연'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 3, 1) = '1' THEN 1 ELSE 0 END) AS '1열연정정'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 3, 1) = '2' THEN 1 ELSE 0 END) AS '2열연정정'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 4, 1) = '1' THEN 1 ELSE 0 END) AS '1PCM'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 4, 1) = '2' THEN 1 ELSE 0 END) AS '2PCM'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 4, 1) = '3' THEN 1 ELSE 0 END) AS '3PCM'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 5, 1) = '1' THEN 1 ELSE 0 END) AS '1CAL'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 5, 1) = '2' THEN 1 ELSE 0 END) AS '2CAL'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 5, 1) = '3' THEN 1 ELSE 0 END) AS '3CAL'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 6, 1) = '1' THEN 1 ELSE 0 END) AS '1ACL'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 6, 1) = '3' THEN 1 ELSE 0 END) AS '3ACL'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 7, 1) = '2' THEN 1 ELSE 0 END) AS '2EGL'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 7, 1) = '3' THEN 1 ELSE 0 END) AS '3EGL'," +
            "  SUM(CASE WHEN SUBSTRING(FOI.cfirm_pass_op_cd, 8, 1) = '1' THEN 1 ELSE 0 END) AS '1RCL'" +
            "FROM" +
            "  factory_order_info FOI " +
            "GROUP BY" +
            "  ord_thw_tap_Wek_Cd",nativeQuery = true)
    List<Object[]> getCfrmOrderCount();


}
