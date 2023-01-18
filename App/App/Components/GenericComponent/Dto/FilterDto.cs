using System;
using System.Collections.Generic;

namespace App.Components.GenericComponent.Dto
{
    public class FilterDto
    {
        public List<FilterExpr> FilterExpr { get; set; }
    }

    public class FilterExpr
    {
        public string Property { get; set; }

        public string Operator { get; set; }

        public string Value { get; set; }

        public string Type { get; set; }
    }
}