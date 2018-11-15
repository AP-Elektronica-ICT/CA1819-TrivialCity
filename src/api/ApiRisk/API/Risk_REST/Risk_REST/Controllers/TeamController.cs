using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Risk.REST.Services.BusinessLayerClasses;
using Risk_REST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Risk_REST.Controllers
{
    [Route("api/team")]
    public class TeamController : Controller
    {

        IConfiguration _configuration;

        public TeamController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // GET api/team
        [HttpGet]
        public IEnumerable<Team> Get()
        {
            BusinessLayer businessLayer = new BusinessLayer(_configuration);
            return businessLayer.getTeam(0);
        }

        // GET api/team/5
        [HttpGet("{id}", Name = "getTeam")]
        public IEnumerable<Team> Get(int id)
        {
            BusinessLayer businessLayer = new BusinessLayer(_configuration);
            return businessLayer.getTeam(id);
        }

        // POST api/team
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/team/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/team/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
