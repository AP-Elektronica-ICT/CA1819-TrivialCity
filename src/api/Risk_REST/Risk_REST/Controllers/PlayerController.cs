using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
            String connectionString = _configuration.GetConnectionString("localDB");

            Player player1 = new Player(1, "Mathias", "matti@bla.com", "123456", "AntwerpBurger", 30, 200, 2, 30, 600);
            return new Player[] { player1 };
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
