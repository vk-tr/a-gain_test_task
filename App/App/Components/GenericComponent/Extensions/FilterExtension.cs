using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using App.Components.GenericComponent.Dto;
using App.Components.GenericComponent.Helpers;

namespace App.Components.GenericComponent.Extensions
{
    public static class FilterExtension
    {
        public static IEnumerable<TEntity> Filter<TEntity>(
            this IEnumerable<TEntity> collection,
            FilterDto filterDto)
        {
            var collectionAsQuery = collection.AsQueryable();

            var filterNotNullExpr = filterDto.FilterExpr
                .Where(x => !string.IsNullOrEmpty(x.Value))
                .ToArray();

            return filterNotNullExpr
                .Select(filterExpr =>
                    DynamicExpressions.DynamicExpressions
                        .GetPredicate<TEntity>(
                            filterExpr.Property,
                            FilterOperatorJsConverter.Convert(filterExpr.Operator),
                            FilterTypeHelper.ChangeType(filterExpr.Value, filterExpr.Type)
                            ))
                .Aggregate(
                    collectionAsQuery,
                    (current, expression) => current.Where(expression));
        }
    }
}