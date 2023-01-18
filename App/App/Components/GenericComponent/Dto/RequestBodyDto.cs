using System.Collections.Generic;

namespace App.Components.GenericComponent.Dto
{
    public class RequestBodyDto<TEntity>
    {
        public PagingDto PagingDto { get; set; }

        public SortDto SortDto { get; set; }

        public FilterDto FilterDto { get; set; }

        public IEnumerable<TEntity> Body { get; set; }
    }
}