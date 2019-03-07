using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System;
using System.Linq;

namespace FamilyTree.Web
{
    /// <summary>
    /// Adds a feature name in controller model to enable alternative folder structure
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

            // Getting the second token after "Features" namespace which is a class name
            return tokens
                .SkipWhile(t => !t.Equals("features", StringComparison.CurrentCultureIgnoreCase))
                .Skip(1)
                .Take(1)
                .FirstOrDefault();
        }
    }
}