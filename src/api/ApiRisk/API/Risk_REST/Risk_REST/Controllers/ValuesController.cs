using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Mvc;
using Risk_REST.Services.Data;

namespace Risk_REST.Controllers
{
    [EnableCors("*", "*", "*")]
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly Risk_Antwerp_dbContext context;
        public ValuesController(Risk_Antwerp_dbContext _context)
        {
            context = _context;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            try
            {
                List<string> temp = new List<string>();
                var teams = context.Teams.ToList();
                foreach (var item in teams)
                    temp.Add(item.TeamId.ToString());
                return temp;//new string[] { "value1", "value2" };
            }
            catch(Exception e)
            {
                return new string[] { e.ToString() };
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
