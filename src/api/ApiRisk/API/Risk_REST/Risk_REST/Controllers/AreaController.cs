using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        public void Post([FromBody]string value)
        {
        }

        // PUT api/area/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/area/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
