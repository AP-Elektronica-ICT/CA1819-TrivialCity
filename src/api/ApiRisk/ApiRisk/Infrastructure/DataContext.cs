using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiRisk.fonts.Infrastructure
{
    public class DataContext:IdentityDbContext<IdentityUser>
    {
       public DataContext() : base("MyDbConn") { }
    }
}