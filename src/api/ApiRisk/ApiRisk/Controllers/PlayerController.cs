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
    [Microsoft.AspNetCore.Mvc.Route("api/players")]
    public class PlayerController : Controller
    {


        public PlayerController()
        {
            
        }


        // GET api/players
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IEnumerable<Player> Get()
        {
            DataLayer dataLayer = new DataLayer();
            return dataLayer.getPlayer(0);
        }

        // GET api/players/5
        [Microsoft.AspNetCore.Mvc.HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/players
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/players/5
        [Microsoft.AspNetCore.Mvc.HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/players/5
        [Microsoft.AspNetCore.Mvc.HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}