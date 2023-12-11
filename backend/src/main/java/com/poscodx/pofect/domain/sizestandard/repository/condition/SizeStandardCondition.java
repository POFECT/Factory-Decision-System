package com.poscodx.pofect.domain.sizestandard.repository.condition;

import com.poscodx.pofect.common.querydsl.DefaultCondition;
import com.querydsl.core.types.dsl.BooleanExpression;

import java.util.List;

import static com.poscodx.pofect.domain.sizestandard.entity.QFactorySizeStandard.factorySizeStandard;
public class SizeStandardCondition extends DefaultCondition {

    public static BooleanExpression inProcessCd(List<String> codes) {
        if(codes == null || codes.isEmpty()) {
            return null;
        }

        return factorySizeStandard.processCd.in(codes);
    }
}
