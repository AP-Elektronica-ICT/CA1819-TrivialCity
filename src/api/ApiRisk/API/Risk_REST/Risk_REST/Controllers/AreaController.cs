using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Risk_REST.DataLayerClasses;
using Risk_REST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Risk_REST.Controllers
{
    [Route("api/area")]
    public class AreaController : Controller
    {

        IConfiguration _configuration;

        public AreaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // GET api/area
        [HttpGet]
        public IEnumerable<Area> Get()
        {
            DataLayer dataLayer = new DataLayer(_configuration);
            return dataLayer.getArea(0);
        }

        // GET api/area/5
        [HttpGet("{id}", Name = "getArea")]
        public IEnumerable<Area> Get(int id)
        {
            DataLayer dataLayer = new DataLayer(_configuration);
            return dataLayer.getArea(id);
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
