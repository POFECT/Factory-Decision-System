package com.poscodx.pofect.domain.capacity.repository;

import com.poscodx.pofect.domain.capacity.dto.GrantCapacityDto;
import com.poscodx.pofect.domain.capacity.entity.GrantCapacity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GrantCapacityRepository extends JpaRepository<GrantCapacity, Long> {

}
