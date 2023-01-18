using DynamicExpressions;

namespace App.Components.GenericComponent.Helpers
{
    public static class FilterOperatorJsConverter
    {
        public static FilterOperator Convert(string jsOperator)
        {
            return jsOperator switch
            {
                "Equals" => FilterOperator.Equals,
                "Contains" => FilterOperator.Contains,
                _ => FilterOperator.Contains
            };
        }
    }
}