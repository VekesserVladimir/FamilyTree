using System;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore.Internal;

namespace FamilyWiki.Web
{
    /// <summary>
    /// Adds a feature name in controller model to allow alternative folder structure
    /// </summary>
    public class FeatureConvention : IControllerModelConvention
    {
        public void Apply(ControllerModel controller)
        {
            controller.Properties.Add("feature", GetFeatureName(controller.ControllerType));
        }

        private static string GetFeatureName(Type controllerType)
        {
            var tokens = controllerType.FullName.Split('.');
            if (tokens.All(t => t != "Features"))
            {
                return "";
            }
            var featureIndex = tokens.IndexOf("features", StringComparer.CurrentCultureIgnoreCase);
            return featureIndex < tokens.Length ? tokens[featureIndex + 2] : null;
        }
    }
}