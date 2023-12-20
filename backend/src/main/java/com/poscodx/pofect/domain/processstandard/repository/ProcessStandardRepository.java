package com.poscodx.pofect.domain.processstandard.repository;

import com.poscodx.pofect.domain.processstandard.entity.ProcessStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotBlank;
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

    List<ProcessStandard> findByOrdPdtItdsCdNLike(String ordPdtItpCdN);

    @Transactional
    @Modifying
    @Query("UPDATE ProcessStandard p SET " +
            "p.availablePassFacCdN1 = NULLIF(:availablePassFacCdN1, ''), " +
            "p.availablePassFacCdN2 = NULLIF(:availablePassFacCdN2, ''), " +
            "p.availablePassFacCdN3 = NULLIF(:availablePassFacCdN3, ''), " +
            "p.availablePassFacCdN4 = NULLIF(:availablePassFacCdN4, ''), " +
            "p.availablePassFacCdN5 = NULLIF(:availablePassFacCdN5, ''), " +
            "p.availablePassFacCdN6 = NULLIF(:availablePassFacCdN6, ''), " +
            "p.availablePassFacCdN7 = NULLIF(:availablePassFacCdN7, ''), " +
            "p.availablePassFacCdN8 = NULLIF(:availablePassFacCdN8, '') " +
            "WHERE p.id IN :ids ")
    void updateAvailablePassFacCdN(
            @Param("ids") @NotBlank Long ids,
            @Param("availablePassFacCdN1") String availablePassFacCdN1,
            @Param("availablePassFacCdN2") String availablePassFacCdN2,
            @Param("availablePassFacCdN3") String availablePassFacCdN3,
            @Param("availablePassFacCdN4") String availablePassFacCdN4,
            @Param("availablePassFacCdN5") String availablePassFacCdN5,
            @Param("availablePassFacCdN6") String availablePassFacCdN6,
            @Param("availablePassFacCdN7") String availablePassFacCdN7,
            @Param("availablePassFacCdN8") String availablePassFacCdN8);
}