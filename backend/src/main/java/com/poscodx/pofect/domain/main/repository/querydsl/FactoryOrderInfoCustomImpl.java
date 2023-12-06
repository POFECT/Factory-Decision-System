package com.poscodx.pofect.domain.main.repository.querydsl;

import com.poscodx.pofect.common.querydsl.Querydsl4RepositorySupport;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.poscodx.pofect.domain.main.entity.QFactoryOrderInfo.factoryOrderInfo;
import static com.poscodx.pofect.domain.main.repository.querydsl.condition.FactoryOrderInfoCondition.*;

@Repository
public class FactoryOrderInfoCustomImpl extends Querydsl4RepositorySupport implements FactoryOrderInfoCustom {
    public FactoryOrderInfoCustomImpl() {
        super(FactoryOrderInfo.class);
    }

    @Override
    public List<String> getWeeks(FactoryOrderInfoReqDto.SearchDto dto) {
        BooleanBuilder option = integration(
                eqOsMainStatusCd(dto.getOsMainStatusCd()),
                inFaConfirmFlag(dto.getFaConfirmFlag())
        );

        return select(factoryOrderInfo.ordThwTapWekCd)
                .from(factoryOrderInfo)
                .where(option)
                .distinct()
                .orderBy(factoryOrderInfo.ordThwTapWekCd.asc())
                .fetch();  // List로 변환
    }

    /* 참고용 */
    private JPAQuery<FactoryOrderInfo> getFactoryOrderInfoJPAQuery(BooleanBuilder option) {
        return selectFrom(factoryOrderInfo)
                .where(option)
                .orderBy(factoryOrderInfo.id.asc());
    }
}
