using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Razor;

namespace FamilyTree.Web
{
    public class FeatureLocationExpander : IViewLocationExpander
    {
        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context,
            IEnumerable<string> viewLocations)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            if (viewLocations == null)
                throw new ArgumentNullException(nameof(viewLocations));

            if (!(context.ActionContext.ActionDescriptor is ControllerActionDescriptor controllerActionDescriptor))
                throw new NullReferenceException("ControllerActionDescriptor cannot be null.");

            var featureName = controllerActionDescriptor.Properties["feature"] as string;

            foreach (var viewLocation in viewLocations)
                yield return viewLocation.Replace("{2}", featureName);
        }

        public void PopulateValues(ViewLocationExpanderContext context)
        {
        }
    }
}