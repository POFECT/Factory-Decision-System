package com.poscodx.pofect.domain.sizestandard.repository.querydsl;


import com.poscodx.pofect.common.querydsl.Querydsl4RepositorySupport;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.poscodx.pofect.domain.sizestandard.dto.SizeStandardResDto;
import com.poscodx.pofect.domain.sizestandard.entity.FactorySizeStandard;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import static com.poscodx.pofect.domain.sizestandard.entity.QFactorySizeStandard.factorySizeStandard;
import static com.poscodx.pofect.common.querydsl.DefaultCondition.integration;
import static com.poscodx.pofect.domain.sizestandard.repository.condition.SizeStandardCondition.inProcessCd;


@Repository
public class SizeStandardCustomImpl extends Querydsl4RepositorySupport implements SizeStandardCustom {
    public SizeStandardCustomImpl() {
        super(FactorySizeStandard.class);
    }

    @Override
    public List<FactorySizeStandard> getSizeStandard(List<String> processList) {
        BooleanBuilder option = integration(
                inProcessCd(processList)
        );

        return selectFrom(factorySizeStandard)
                .where(option)
                .fetch();  //
    }
}
