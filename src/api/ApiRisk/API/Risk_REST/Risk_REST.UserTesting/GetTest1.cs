using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using Risk_REST.Controllers;
using Risk_REST.Models;
using Risk_REST.Services;
using Risk_REST.Services.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xania.AspNet.Simulator;
using Xunit;


namespace Risk_REST.UserTesting
{
    public class GetTests
    {
        private RiskAntwerpRest_dbContext context;

       

        [Fact]
        public  void  TestCorrectPlayer()
        {
            var c = new PlayerController(new RiskAntwerpRest_dbContext());

            var result =  c.GetPlayerById(2);
            
           var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
           var player = okResult.Value.Should().BeAssignableTo<Players>().Subject;

            player.PlayerId.Should().Be(2);

        }

        [Fact]
        public void TestCorrectTeam()
        {
            var c = new TeamController(new RiskAntwerpRest_dbContext());

            var result = c.GetTeamById(1);

            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var team = okResult.Value.Should().BeAssignableTo<Teams>().Subject;

            team.TeamId.Should().Be(1);

        }

        [Fact]
        public void TestCorrectArea()
        {
            var c = new AreaController(new RiskAntwerpRest_dbContext());

            var result = c.GetAreaById(3);

            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var area = okResult.Value.Should().BeAssignableTo<Area>().Subject;

            area.AreaId.Should().Be(3);

        }

        [Fact]
        public void  TestAllPlayers()
        {
           
            var controller = new PlayerController(new RiskAntwerpRest_dbContext());
           
            var actionResult =  controller.GetAllPlayers();
 
            actionResult.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void TestAllTeams()
        {

            var controller = new TeamController(new RiskAntwerpRest_dbContext());

            var actionResult = controller.GetAllTeams();

            actionResult.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void TestAllAreas()
        {

            var controller = new AreaController(new RiskAntwerpRest_dbContext());

            var actionResult = controller.GetAllAreas();

            actionResult.Should().BeOfType<OkObjectResult>();
        }

       

    }
}
