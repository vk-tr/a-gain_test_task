using System;

namespace App.Components.GenericComponent.Helpers
{
    public static class FilterTypeHelper
    {
        public static object ChangeType(string value, string type)
        {
            switch (type)
            {
                case "date":
                {
                    return DateTime.Parse(value).Date;
                }
                default:
                {
                    return value;
                }
            }
        }
    }
}