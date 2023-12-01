package com.poscodx.pofect.domain.capacity.repository;

import com.poscodx.pofect.domain.capacity.entity.CapacityInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CapacityInfoRepository extends JpaRepository<CapacityInfo, Long> {
}
