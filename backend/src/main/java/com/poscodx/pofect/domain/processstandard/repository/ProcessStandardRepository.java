package com.poscodx.pofect.domain.processstandard.repository;

import com.poscodx.pofect.domain.processstandard.entity.ProcessStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProcessStandardRepository extends JpaRepository<ProcessStandard, Long> {

    @Query("SELECT " +
            "  CONCAT(" +
            "    CASE WHEN p.availablePassFacCdN1 = '*' THEN '1' ELSE '0' END, " +
            "    CASE WHEN p.availablePassFacCdN2 = '*' THEN '1' ELSE '0' END, " +
            "    CASE WHEN p.availablePassFacCdN3 = '*' THEN '1' ELSE '0' END, " +
            "    CASE WHEN p.availablePassFacCdN4 = '*' THEN '1' ELSE '0' END, " +
            "    CASE WHEN p.availablePassFacCdN5 = '*' THEN '1' ELSE '0' END, " +
            "    CASE WHEN p.availablePassFacCdN6 = '*' THEN '1' ELSE '0' END, " +
            "    CASE WHEN p.availablePassFacCdN7 = '*' THEN '1' ELSE '0' END, " +
            "    CASE WHEN p.availablePassFacCdN8 = '*' THEN '1' ELSE '0' END" +
            "  ) " +
            "FROM ProcessStandard p " +
            "WHERE p.ordPdtItdsCdN = :ordPdtItdsCdN")
    String findByOrdPdtItdsCdN(@Param("ordPdtItdsCdN") String ordPdtItdsCdN);

}
