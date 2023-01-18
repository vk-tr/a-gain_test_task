using System;
using System.Collections.Generic;
using System.Linq;
using App.Components.GenericComponent.Dto;
using App.Components.GenericComponent.Interfaces;

namespace App.Components.GenericComponent.Extensions
{
    public static class PagingExtension
    {
        public static IEnumerable<TEntity> Paging<TEntity>(
            this IEnumerable<TEntity> collection,
            PagingDto pagingDto) where TEntity : IHaveId
        {
            var allEntries = collection.Count();

            pagingDto.PagesCount = Convert.ToInt32(
                Math.Ceiling(
                    allEntries / (double)pagingDto.PageSize));

            if (pagingDto.PagesCount == 0 && allEntries > 0)
            {
                pagingDto.PagesCount = 1;
            }

            collection = collection
                .Skip((pagingDto.PageNum - 1) * pagingDto.PageSize);

            return collection
                .Take(pagingDto.PageSize);
        }
    }
}