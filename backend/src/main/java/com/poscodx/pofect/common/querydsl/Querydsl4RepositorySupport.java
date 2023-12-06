package com.poscodx.pofect.common.querydsl;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.querydsl.SimpleEntityPathResolver;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

import static com.querydsl.core.types.Order.ASC;
import static com.querydsl.core.types.Order.DESC;

@Repository
public abstract class Querydsl4RepositorySupport {

    private final Class domainClass;
    private Querydsl querydsl;
    private EntityManager entityManager;
    protected JPAQueryFactory queryFactory;
    private String qTypeVariable;

    // 도메인 class 받기
    public Querydsl4RepositorySupport(Class<?> domainClass) {
        Assert.notNull(domainClass, "Domain class must not be null");
        this.domainClass = domainClass;
    }

    // EntityManager 주입받기
    @Autowired
    public void setEntityManager(EntityManager entityManager) {
        Assert.notNull(entityManager, "EntityManager class must not be null");

        JpaEntityInformation entityInformation = JpaEntityInformationSupport.getEntityInformation(domainClass, entityManager);
        SimpleEntityPathResolver resolver = SimpleEntityPathResolver.INSTANCE;
        EntityPath path = resolver.createPath(entityInformation.getJavaType());
        this.entityManager = entityManager;
        this.querydsl = new Querydsl(entityManager, new PathBuilder<>(path.getType(), path.getMetadata()));
        this.queryFactory = new JPAQueryFactory(entityManager);
        this.qTypeVariable = String.valueOf(path.getRoot());
    }

    @PostConstruct
    public void validate() {
        Assert.notNull(entityManager, "EntityManager class must not be null");
        Assert.notNull(querydsl, "Querydsl class must not be null");
        Assert.notNull(queryFactory, "JPAQueryFactory class must not be null");
    }

    protected JPAQueryFactory getQueryFactory() {
        return queryFactory;
    }

    protected Querydsl getQuerydsl() {
        return querydsl;
    }

    protected EntityManager getEntityManager() {
        return entityManager;
    }

    protected <T> JPAQuery<T> select(Expression<T> expr) {
        return getQueryFactory().select(expr);
    }

    protected <DTO> JPAQuery<DTO> select(Class<DTO> returnType, Expression<?> ... exprs) {
        return this.select(Projections.constructor(returnType, exprs));

    }

    protected <T> JPAQuery<T> selectFrom(EntityPath<T> from) {
        return getQueryFactory().selectFrom(from);
    }

    private OrderSpecifier[] makeOrderSpecifiers(Sort sort, Class sortClass, String s) {
        List<OrderSpecifier> orders = new ArrayList<>();
        // Sort
        sort.stream().forEach(order -> {
            Order direction = order.isAscending() ? ASC : DESC;
            String prop = order.getProperty();
            PathBuilder orderByExpression = new PathBuilder(sortClass, s);
            orders.add(new OrderSpecifier(direction, orderByExpression.get(prop)));
        });
        return orders.stream().toArray(OrderSpecifier[]::new);
    }

    protected OrderSpecifier[] getOrderSpecifier(Sort sort) {
        return makeOrderSpecifiers(sort, domainClass, String.valueOf(qTypeVariable));
    }

    protected OrderSpecifier[] getOrderSpecifier(Sort sort, String variable) {
        return makeOrderSpecifiers(sort, domainClass, variable);
    }

    protected OrderSpecifier[] getOrderSpecifier(Sort sort, Class<?> sortClass, String variable) {
        return makeOrderSpecifiers(sort, sortClass, variable);
    }


}