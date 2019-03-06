using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace FamilyWiki.Web
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(o => o.Conventions.Add(new FeatureConvention()))
                    .AddRazorOptions(o =>
                    {
                        // {0} - Action Name
                        // {1} - Controller Name
                        // {2} - Feature Name
                        o.ViewLocationFormats.Clear();
                        o.ViewLocationFormats.Add("/Features/{2}/{1}/{0}.cshtml");
                        o.ViewLocationFormats.Add("/Features/{2}/{0}.cshtml");
                        o.ViewLocationFormats.Add("/Features/Shared/{0}.cshtml");
                        o.ViewLocationExpanders.Add(new FeatureLocationExpander());
                    });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}