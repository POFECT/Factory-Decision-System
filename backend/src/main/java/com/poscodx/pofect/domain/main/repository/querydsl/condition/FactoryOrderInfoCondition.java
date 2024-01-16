package com.poscodx.pofect.domain.main.repository.querydsl.condition;


import com.poscodx.pofect.common.querydsl.DefaultCondition;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.StringExpression;

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

    public static BooleanExpression containPosbPassFacCdN(String errorCode) {
        if(errorCode == null || errorCode.isEmpty()) {
            return null;
        }
        return factoryOrderInfo.posbPassFacCdN.contains(errorCode);
    }


    public static BooleanExpression inSmSteelGrdN(List<String> codes){
        if(codes == null || codes.isEmpty()) {
            return null;
        }

        BooleanExpression smSteelGrdNList = null;

        for (String code : codes) {
            BooleanExpression codeCondition = null;

            if (code.equals("SM1")) {
                codeCondition = factoryOrderInfo.smSteelGrdN.substring(1, 4).loe("009");
                smSteelGrdNList = codeCondition;
            }

            if (code.equals("SM2")) {
                codeCondition = factoryOrderInfo.smSteelGrdN.substring(1, 4).gt("009")
                        .and(factoryOrderInfo.smSteelGrdN.substring(1, 4).lt("080"));
                if (smSteelGrdNList == null) {
                    smSteelGrdNList = codeCondition;
                } else {
                    smSteelGrdNList = smSteelGrdNList.or(codeCondition);
                }
            }

            if (code.equals("SM3")) {
                codeCondition = factoryOrderInfo.smSteelGrdN.substring(1, 4).goe("080");
                if (smSteelGrdNList == null) {
                    smSteelGrdNList = codeCondition;
                } else {
                    smSteelGrdNList = smSteelGrdNList.or(codeCondition);
                }
            }
        }

        return smSteelGrdNList;
    }

}
