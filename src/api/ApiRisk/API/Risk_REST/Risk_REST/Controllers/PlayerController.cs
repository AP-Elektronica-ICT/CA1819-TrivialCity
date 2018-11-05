using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Risk_REST.DataLayerClasses;
using Risk_REST.Models;
namespace Risk_REST.Controllers
{
    [Route("api/player")]
    [Authorize]
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
            DataLayer dataLayer = new DataLayer(_configuration);
            return dataLayer.getPlayer(0);
        }

        // GET api/player/5
        [HttpGet("{id}", Name = "getPlayer")]
        public IEnumerable<Player> Get(int id)
        {
            DataLayer dataLayer = new DataLayer(_configuration);
            return dataLayer.getPlayer(id);
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
