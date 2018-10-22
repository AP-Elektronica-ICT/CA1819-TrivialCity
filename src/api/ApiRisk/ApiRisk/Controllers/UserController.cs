using ApiRisk.fonts.Infrastructure;
using ApiRisk.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ApiRisk.Controllers
{
    public class UserController : ApiController
    {
        private AuthRepo _repo = null;

        public UserController()
        {
            _repo = new AuthRepo();
        }


        [System.Web.Http.AllowAnonymous]

        public async Task<IHttpActionResult> Register (UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _repo.Register(userModel);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }
            return Ok();

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _repo.Dispose();
            }
            base.Dispose(disposing);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if ( result == null )
            {
                return InternalServerError();
            }
            if (!result.Succeeded)
            {
            
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }
                if(ModelState.IsValid)
                {
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;

        }



    }
}