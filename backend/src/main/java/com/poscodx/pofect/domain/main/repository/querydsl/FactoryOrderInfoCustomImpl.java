package com.poscodx.pofect.domain.main.repository.querydsl;

import com.poscodx.pofect.common.querydsl.Querydsl4RepositorySupport;
import com.poscodx.pofect.domain.main.dto.FactoryOrderInfoReqDto;
import com.poscodx.pofect.domain.main.entity.FactoryOrderInfo;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAUpdateClause;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
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

    @Override
    public List<FactoryOrderInfo> findAllByOption(FactoryOrderInfoReqDto.orderDto dto) {
        BooleanBuilder option = integration(
                eqOrdPdtItpCdN(dto.getOrdPdtItpCdN()),
                eqOrdThwTapWekCd(dto.getOrdThwTapWekCd()),
                eqOsMainStatusCd(dto.getOsMainStatusCd()),
                inFaConfirmFlag(dto.getFaConfirmFlag())
        );

        return getFactoryOrderInfoJPAQuery(option).fetch();
    }

    @Modifying
    @Override
    public Long updateFlag(FactoryOrderInfoReqDto.updateCodeDto reqDto) {
        EntityManager em = getEntityManager();
//        JPAUpdateClause updateClause = new JPAUpdateClause(em, factoryOrderInfo);
//        updateClause.set(factoryOrderInfo.faConfirmFlag, reqDto.getFlag())
//                .where(factoryOrderInfo.id.in(reqDto.getIds()))
//                .execute();
//        long cnt = updateClause.execute();

        long cnt = queryFactory
                .update(factoryOrderInfo)
                .set(factoryOrderInfo.faConfirmFlag, reqDto.getValue())
                .where(factoryOrderInfo.id.in(reqDto.getIds()))
                .execute();
        em.flush();
        em.clear();

        return cnt;
    }

    @Modifying
    @Override
    public Long updateStatus(FactoryOrderInfoReqDto.updateCodeDto reqDto) {
        EntityManager em = getEntityManager();

        long cnt = queryFactory
                .update(factoryOrderInfo)
                .set(factoryOrderInfo.osMainStatusCd, reqDto.getValue())
                .where(factoryOrderInfo.id.in(reqDto.getIds()))
                .execute();
        em.flush();
        em.clear();

        return cnt;
    }

    /* 참고용 */
    private JPAQuery<FactoryOrderInfo> getFactoryOrderInfoJPAQuery(BooleanBuilder option) {
        return selectFrom(factoryOrderInfo)
                .where(option)
                .orderBy(factoryOrderInfo.id.asc());
    }
}
