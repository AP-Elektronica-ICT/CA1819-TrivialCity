using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Risk_REST.DataLayerClasses;
using Risk_REST.Models;
namespace Risk_REST.Controllers
{
    [Route("api/players")]
    public class PlayerController : Controller
    {

        IConfiguration _configuration;

        public PlayerController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // GET api/players
        [HttpGet]
        public IEnumerable<Player> Get()
        {
            DataLayer dataLayer = new DataLayer(_configuration);
            return dataLayer.getPlayer(0);
        }

        // GET api/players/5
        [HttpGet("{id}", Name = "getPlayers")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/players
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/players/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/players/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
