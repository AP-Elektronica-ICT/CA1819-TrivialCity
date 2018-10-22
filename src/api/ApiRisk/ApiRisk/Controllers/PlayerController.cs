using ApiRisk.DataLayerClasses;
using ApiRisk.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ApiRisk.Controllers
{
    [Route("api/players")]
    public class PlayerController : Controller
    {


        public PlayerController()
        {
            
        }


        // GET api/players
        [HttpGet]
        public IEnumerable<Player> Get()
        {
            DataLayer dataLayer = new DataLayer();
            return dataLayer.getPlayer(1);
        }

        // GET api/players/5
        [HttpGet("{id}")]
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