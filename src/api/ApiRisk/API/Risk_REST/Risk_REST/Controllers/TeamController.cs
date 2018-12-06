using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Risk_REST.Models;
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
        public IActionResult UpdateTeam(int id, [FromBody] Teams updateTeam )
        {
            var team = context.Teams.Find(updateTeam.TeamId);

            if (team == null)
            {
                return NotFound();
            }

            team.TeamId = updateTeam.TeamId;

            if (updateTeam.TeamColor != null)
                team.TeamColor = updateTeam.TeamColor;
            if (updateTeam.TeamTotalOccupiedAreas != null)
                team.TeamTotalOccupiedAreas = updateTeam.TeamTotalOccupiedAreas;
            if (updateTeam.Players != null)
                team.Players = updateTeam.Players;

            context.Teams.Update(team);
            context.SaveChanges();
            return new OkObjectResult(team);

        }

        // DELETE api/team/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
