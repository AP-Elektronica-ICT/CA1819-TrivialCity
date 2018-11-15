using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Risk_REST.Models;
using Risk.REST.Services.BusinessLayerClasses;

namespace Risk_REST.Controllers
{
    
    [Authorize]
    [EnableCors("CorsPolicy")]
    [Route("api/player")]
    public class PlayerController : Controller
    {

        IConfiguration _configuration;

        public PlayerController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // GET api/player
        [HttpGet]
        public IEnumerable<Player> Get()
        {
            BusinessLayer businessLayer = new BusinessLayer(_configuration);
            return businessLayer.getPlayer(0);
        }

        // GET api/player/5
        [HttpGet("{id}", Name = "getPlayer")]
        public IEnumerable<Player> Get(int id)
        {
            BusinessLayer businessLayer = new BusinessLayer(_configuration);
            return businessLayer.getPlayer(id);
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
