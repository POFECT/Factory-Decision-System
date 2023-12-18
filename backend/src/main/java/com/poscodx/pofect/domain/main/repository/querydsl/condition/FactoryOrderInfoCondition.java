package com.poscodx.pofect.domain.main.repository.querydsl.condition;


import com.poscodx.pofect.common.querydsl.DefaultCondition;
import com.querydsl.core.types.dsl.BooleanExpression;

import java.util.List;

import static com.poscodx.pofect.domain.main.entity.QFactoryOrderInfo.factoryOrderInfo;

public class FactoryOrderInfoCondition extends DefaultCondition {

    public static BooleanExpression eqOsMainStatusCd(String code) {
        // 인자가 없으면 체크 안함 (조건X)
        if(code == null) {
            return null;
        }
        return factoryOrderInfo.osMainStatusCd.eq(code);
    }

    public static BooleanExpression inFaConfirmFlag(List<String> codes) {
        if(codes == null || codes.isEmpty()) {
            return null;
        }
        return factoryOrderInfo.faConfirmFlag.in(codes);
    }

    public static BooleanExpression eqOrdPdtItpCdN(String code) {
        if(code == null) {
            return null;
        }
        return factoryOrderInfo.ordPdtItpCdN.eq(code);
    }

    public static BooleanExpression eqOrdThwTapWekCd(String week) {
        if(week == null) {
            return null;
        }
        return factoryOrderInfo.ordThwTapWekCd.eq(week);
    }

    public static BooleanExpression inOrdPdtItpCdN(List<String> codes) {
        if(codes == null || codes.isEmpty()) {
            return null;
        }
        return factoryOrderInfo.ordPdtItpCdN.in(codes);
    }


}
