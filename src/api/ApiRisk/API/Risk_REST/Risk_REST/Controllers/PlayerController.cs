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

        private readonly RiskAntwerpRest_dbContext context;

        public PlayerController(RiskAntwerpRest_dbContext context)
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

            StatsChecker(player);

            return new OkObjectResult(player);
        }
        private void StatsChecker(Players player)
        {
            if (player.PlayerLevel < 5) { player.PlayerTitle = "Private"; }
            else if (player.PlayerLevel >= 50) { player.PlayerTitle = "Sergeant Major of the Army"; }
            else if (player.PlayerLevel >= 45) { player.PlayerTitle = "Command Sergeant Major"; }
            else if (player.PlayerLevel >= 40) { player.PlayerTitle = "Sergeant Major"; }
            else if (player.PlayerLevel >= 35) { player.PlayerTitle = "First Sergeant"; }
            else if (player.PlayerLevel >= 30) { player.PlayerTitle = "Master Sergeant"; }
            else if (player.PlayerLevel >= 25) { player.PlayerTitle = "Sergeant First Class"; }
            else if (player.PlayerLevel >= 20) { player.PlayerTitle = "Staff Sergeant"; }
            else if (player.PlayerLevel >= 15) { player.PlayerTitle = "Sergeant"; }
            else if (player.PlayerLevel >= 10) { player.PlayerTitle = "Corporal"; }
            else if (player.PlayerLevel >= 5) { player.PlayerTitle = "Private First Class"; }


            if (player.PlayerExp >= 1000)
            {
                player.PlayerLevel++;
                player.PlayerExp -= 1000;
                context.Players.Update(player);
                context.SaveChanges();
            }

            if (player.PlayerTroops > 25)
            {
                player.PlayerReserveTroops += player.PlayerTroops - 25;
                player.PlayerTroops = 25;
            }
        }

        [HttpGet("auth0", Name = "getPlayerAuth")]
        public List<Players> GetAuthId(string id)
        {
            IQueryable<Players> query = context.Players;

            
            query = query.Where(d => d.AuthId == id);
            
       
            return query.ToList();   
        }

        [HttpGet("{id}/team", Name = "getPlayerTeam")]
        public IActionResult GetPlayerTeamById(int id)
        {
            var player = context.Players.SingleOrDefault(t => t.PlayerId == id);

            return new OkObjectResult(player.TeamId);
        }

        // POST api/player
        [HttpPost]
        public IActionResult AddPlayer([FromBody] Players newPlayer)
        {
            try
            {
                Players player = new Players();
                player = newPlayer;

                context.Players.Add(player);
                context.SaveChanges();
                return new OkObjectResult(player);
            }
            catch(Exception exception)
            {
                return new OkObjectResult(new Players() { PlayerEmail = exception.InnerException.ToString() });
            }
        }

        // PUT api/player/5
        [HttpPut("{id}", Name = "putPlayer")]
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
