package com.poscodx.pofect.domain.etc.repository;

import com.poscodx.pofect.domain.etc.dto.BusinessCodeInfoDto;
import com.poscodx.pofect.domain.etc.entity.BusinessCodeInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessCodeInfoRepository extends JpaRepository<BusinessCodeInfo, Long> {
    List<BusinessCodeInfo> findAllByCdTp(String codeType);
}
