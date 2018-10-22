using ApiRisk.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ApiRisk.fonts.Infrastructure
{
    public class AuthRepo : IDisposable
    {

        private DataContext _ctx;
        private UserManager<IdentityUser> _userManager;

        public AuthRepo()
        {
            _ctx = new DataContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));
        }

        public async Task<IdentityResult> Register(UserModel model)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = model.userName

            };

            var result = await _userManager.CreateAsync(user, model.password);
            return result;
        }

        public async Task<IdentityUser> FindUser(string userName,string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);
            return user;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}