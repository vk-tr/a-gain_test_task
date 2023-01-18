using System.Collections.Generic;
using System.Linq;
using App.Components.GenericComponent.Dto;
using App.Components.GenericComponent.Interfaces;

namespace App.Components.GenericComponent.Extensions
{
    public static class SortExtension
    {
        public static IEnumerable<TEntity> Sort<TEntity>(
            this IEnumerable<TEntity> collection,
            SortDto sortDto) where TEntity : IHaveId
        {
            if (string.IsNullOrEmpty(sortDto.Property)
                || string.IsNullOrEmpty(sortDto.Direction))
            {
                return collection
                    .OrderBy(x => x.Id);
            }

            var expression = DynamicExpressions
                .DynamicExpressions
                .GetPropertyGetter<TEntity>(sortDto.Property);

            var collectionAsQuery = collection
                .AsQueryable();

            if (sortDto.Direction == "asc")
            {
                if (sortDto.IsChangeDirection)
                {
                    sortDto.Direction = "desc";
                    return collectionAsQuery
                        .OrderByDescending(expression);
                }

                return collectionAsQuery
                    .OrderBy(expression);
            }

            if (sortDto.IsChangeDirection)
            {
                sortDto.Direction = "asc";
                return collectionAsQuery
                    .OrderBy(expression);
            }

            return collectionAsQuery
                .OrderByDescending(expression);
        }
    }
}