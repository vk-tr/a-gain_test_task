using System.Linq;
using App.Components.GenericComponent.Dto;
using App.Components.GenericComponent.Interfaces;

namespace App.Components.GenericComponent.Extensions
{
    public static class ListResultExtension
    {
        public static RequestBodyDto<TEntity> ListResult<TEntity>(
            this RequestBodyDto<TEntity> requestBodyDto)
            where TEntity : IHaveId
        {
            requestBodyDto.PagingDto.RecordsCount = requestBodyDto.Body
                .Count();

            requestBodyDto.Body = requestBodyDto.Body
                .Filter(requestBodyDto.FilterDto)
                .Sort(requestBodyDto.SortDto)
                .Paging(requestBodyDto.PagingDto);

            return requestBodyDto;
        }
    }
}