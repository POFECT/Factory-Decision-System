package com.poscodx.pofect.common.querydsl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;

public abstract class DefaultCondition {
    public static BooleanBuilder integration(BooleanExpression... expr) {
        BooleanBuilder builder = new BooleanBuilder();

        for (BooleanExpression expression : expr) {
            builder.and(expression);
        }
        return builder;
    }
}
