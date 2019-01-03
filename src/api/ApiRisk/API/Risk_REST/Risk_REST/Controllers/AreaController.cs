using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Risk_REST.Models;
using Risk_REST.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Risk_REST.Controllers
{
    [Route("api/area")]
    public class AreaController : Controller
    {

        private readonly Risk_Antwerp_dbContext context;

        public AreaController(Risk_Antwerp_dbContext context)
        {
            this.context = context;
        }


        // GET api/area
        [HttpGet]
        public IActionResult GetAllAreas()
        {
            //var area = context.Area.Include("Positions").ToList();
            var area = context.Area.ToList();
            return new OkObjectResult(area);
        }

        // GET api/area/5
        [HttpGet("{id}", Name = "getArea")]
        public IActionResult GetAreaById(int id)
        {
            var area = context.Area.SingleOrDefault(t => t.AreaId == id);

            return new OkObjectResult(area);
        }

        [HttpGet("{id}/positions", Name = "getAreaPositions")]
        public IActionResult GetAreaPositionsById(int id)
        {
            var area = context.Area
                .Where(m => m.AreaId == id)
                .Select(m => m.Positions).Single();

            if (area == null)
            {
                return NotFound();
            }

            return new OkObjectResult(area);
        }

        [HttpGet("{id}/players", Name = "getAreaPlayers")]
        public IActionResult GetAreaPlayersById(int id)
        {
            var area = context.Area
                .Where(m => m.AreaId == id)
                .Select(m => m.Players).Single();

            if(area == null)
            {
                return NotFound();
            }

            return new OkObjectResult(area);
        }

        [HttpGet("teamId", Name = "getTeamAreas")]
        public List<Area> GetTeamAreas(int id)
        {
            IQueryable<Area> query = context.Area;


            query = query.Where(d => d.TeamId == id);


            return query.ToList();
        }

        // POST api/area
        [HttpPost]
        public IActionResult AddArea([FromBody] Area newArea)
        {
            Area area = newArea;

            context.Area.Add(area);
            context.SaveChanges();
            return new OkObjectResult(area);
        }

        // PUT api/area/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Area updateArea)
        {
            var area = context.Area.Find(updateArea.AreaId);

            if (area == null)
            {
                return NotFound();
            }

            area.AreaId = updateArea.AreaId;

            if (updateArea.TeamId != null)
                area.TeamId = updateArea.TeamId;
            if (updateArea.AreaId != null)
                area.AreaId = updateArea.AreaId;
            if (updateArea.AreaName != null)
                area.AreaName = updateArea.AreaName;
            if (updateArea.DefendingTroops != null)
                area.DefendingTroops = updateArea.DefendingTroops;

            context.Area.Update(area);
            context.SaveChanges();
            return new OkObjectResult(area);
        }

        // DELETE api/area/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
