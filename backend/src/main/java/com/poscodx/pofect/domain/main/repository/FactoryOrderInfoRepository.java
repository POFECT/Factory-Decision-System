package com.poscodx.pofect.domain.main.repository;

import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactoryOrderInfoRepository extends JpaRepository<FactoryOrderInfo, Long> {
}
