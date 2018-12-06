﻿using Microsoft.AspNetCore.Mvc;
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

        private readonly Risk_AntwerpContext context;

        public AreaController(Risk_AntwerpContext context)
        {
            this.context = context;
        }


        // GET api/area
        [HttpGet]
        public IActionResult GetAllAreas()
        {
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

            if (updateArea.AreaOccupiedBy != null)
                area.AreaOccupiedBy = updateArea.AreaOccupiedBy;
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
