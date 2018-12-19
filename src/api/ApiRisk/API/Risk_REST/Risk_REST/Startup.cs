using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Risk_REST.Auth;
using Risk_REST.Services.Data;
using Risk_REST.Services;

namespace Risk_REST
{
    public class Startup
    {
        
        public string domain = "https://inias.eu.auth0.com/";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(o => o.AddPolicy("myPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            }));

            services.AddMvc();
            services.AddDbContext<Risk_Antwerp_dbContext>(options => options.UseSqlServer(@"Server=risk-antwerp.database.windows.net,1433;Initial Catalog=Risk_Antwerp_db;Persist Security Info=False;User ID=Risk_Antwerp;Password=R1sk_4ntw3rp;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"));

            // 1. Add Authentication Services
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.Authority = domain;
                options.Audience = "https://AntwerpRisk/api";
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("read:app", policy => policy.Requirements.Add(new HasScopeRequirement("read:app", domain)));
            });

            /* services.AddCors(options =>
             {
                 options.AddPolicy("CorsPolicy",
                     builder => builder.AllowAnyOrigin()
                     //.WithOrigins("http://localhost:8080/", "http://localhost:8100/", "http://192.168.0.177/*" )
                     .AllowAnyMethod()
                     .AllowAnyHeader()
                     .AllowAnyOrigin()
                     .AllowCredentials());
                     //.WithHeaders("Access-Control-Allow-Methods", "*"));


             });*/

          


          //  services.AddCors();


            //services.AddCors();
           // services.AddMvc();
            //services.AddScoped<>


            // register the scope authorization handler
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

          

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseCors("myPolicy");

            //  app.UseCors(builder => builder.AllowAnyOrigin());
            //app.UseMvc();
            //    app.UseCors(Microsoft.AspNetCore.Cors.EnableCorsAttribute.);


            /*  app.UseCors(builder =>
              builder.WithOrigins("http://*")
             .AllowAnyHeader()
               );*/
            /*app.UseCors(options => options.WithOrigins("http://localhost:8100/")
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials()
                           .WithMethods("GET", "POST")
                           .WithHeaders("Access-Control-Allow-Methods", "*")

                       );*/
            // 2. Enable authentication middleware
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}

