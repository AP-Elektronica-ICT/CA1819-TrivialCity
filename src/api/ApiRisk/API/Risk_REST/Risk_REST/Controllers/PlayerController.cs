using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
//using System.Web.Http.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Risk_REST.Services.Data;

namespace Risk_REST.Controllers
{

  //   [Authorize]
  // [EnableCors("CorsPolicy")]
    // [EnableCors("CorsPolicy")]
    //[EnableCors("*", "*", "*")]
    [Route("api/player")]
    public class PlayerController : Controller
    {

        private readonly Risk_AntwerpContext context;

        public PlayerController(Risk_AntwerpContext context)
        {
            this.context = context;
        }


        // GET api/player
        [HttpGet]
        public IActionResult GetAllPlayers()
        {
            var player = context.Players.ToList();

            return new OkObjectResult(player);

          /*  return Json(new
            {
                Message = "Hello from a private endpoint! You need to be authenticated to see this."
            });*/
        }

        // GET api/player/5
        [HttpGet("{id}", Name = "getPlayer")]
        public IActionResult GetPlayerById(int id)
        {
            var player = context.Players.SingleOrDefault(t => t.PlayerId == id);

            return new OkObjectResult(player);
        }

        // POST api/player
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/player/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/player/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
