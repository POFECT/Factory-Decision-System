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
}
