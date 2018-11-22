using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Risk_REST.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Risk_REST.Controllers
{
    [Route("api/team")]
    public class TeamController : Controller
    {

        private readonly Risk_AntwerpContext context;

        public TeamController(Risk_AntwerpContext context)
        {
            this.context = context;
        }


        // GET api/team
        [HttpGet]
        public IActionResult GetAllTeams()
        {
            var team = context.Teams.ToList();

            return new OkObjectResult(team);
        }

        // GET api/team/5
        [HttpGet("{id}", Name = "getTeam")]
        public IActionResult GetTeamById(int id)
        {
            var team = context.Teams.SingleOrDefault(t => t.TeamId == id);

            return new OkObjectResult(team);
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
