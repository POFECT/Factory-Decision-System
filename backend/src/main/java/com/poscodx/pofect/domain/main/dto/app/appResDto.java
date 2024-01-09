package com.poscodx.pofect.domain.main.dto.app;

/* App 출강달 별 ordCnt response dto */
// 집계함수 때문에 JPA에서.. convert error =>
// 1) JPQL 2) iterface 3) JPQL Constructor Expressions ?? 4) Object[]

public interface appResDto {
     String getOrdThwTapYMDCd();  // 출강 해당 년월일
     Long getOrdCnt();  // 주문 개수
}
