using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
//using System.Web.Http.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Risk_REST.Models;
using Risk_REST.Services.Data;

namespace Risk_REST.Controllers
{

    // [Authorize]
  // [EnableCors("CorsPolicy")]
    // [EnableCors("CorsPolicy")]
    //[EnableCors("*", "*", "*")]
    [Route("api/player")]
    public class PlayerController : Controller
    {

        private readonly Risk_AntwerpContext context;

        public PlayerController(Risk_AntwerpContext context)
        {
            this.context = context;
        }


        // GET api/player
        [HttpGet]
        public IActionResult GetAllPlayers()
        {
            var player = context.Players.ToList();

            return new OkObjectResult(player);

          /*  return Json(new
            {
                Message = "Hello from a private endpoint! You need to be authenticated to see this."
            });*/
        }

        // GET api/player/5
        [HttpGet("{id}", Name = "getPlayer")]
        public IActionResult GetPlayerById(int id)
        {
            var player = context.Players.SingleOrDefault(t => t.PlayerId == id);

            return new OkObjectResult(player);
        }

        // POST api/player
        [HttpPost]
        public IActionResult AddPlayer([FromBody] Players newPlayer)
        {
            Players player = new Players();
            player = newPlayer;

            context.Players.Add(player);
            context.SaveChanges();
            return new OkObjectResult(player);
        }

        // PUT api/player/5
        [HttpPut("{id}")]
        public IActionResult UpdatePlayer(int id, [FromBody] Players updatePlayer)
        {
            var player = context.Players.Find(updatePlayer.PlayerId);

            if (player == null)
            {
                return NotFound();
            }

            player.PlayerId = updatePlayer.PlayerId;

            if (updatePlayer.TeamId != null)
                player.TeamId = updatePlayer.TeamId;
            if (updatePlayer.AreaId != null)
                player.AreaId = updatePlayer.AreaId;
            if (updatePlayer.AuthId != null)
                player.AuthId = updatePlayer.AuthId;
            if (updatePlayer.PlayerUsername != null)
                player.PlayerUsername = updatePlayer.PlayerUsername;
            if (updatePlayer.PlayerEmail != null)
                player.PlayerEmail = updatePlayer.PlayerEmail;
            if (updatePlayer.PlayerTitle != null)
                player.PlayerTitle = updatePlayer.PlayerTitle;
            if (updatePlayer.PlayerLevel != null)
                player.PlayerLevel = updatePlayer.PlayerLevel;
            if (updatePlayer.PlayerExp != null)
                player.PlayerExp = updatePlayer.PlayerExp;
            if (updatePlayer.PlayerSilverCoins != null)
                player.PlayerSilverCoins = updatePlayer.PlayerSilverCoins;
            if (updatePlayer.PlayerTroops != null)
                player.PlayerTroops = updatePlayer.PlayerTroops;
            if (updatePlayer.PlayerReserveTroops != null)
                player.PlayerReserveTroops = updatePlayer.PlayerReserveTroops;
       
            context.Players.Update(player);
            context.SaveChanges();
            return new OkObjectResult(player);

        }

        // DELETE api/player/5
        [HttpDelete("{id}")]
        public IActionResult DeletePlayer(int id)
        {
            var player = context.Players.Find(id);

            if (player == null)
            {
                return NotFound();
            }

            context.Players.Remove(player);
            context.SaveChanges();
            return NoContent();
        }
    }
}
