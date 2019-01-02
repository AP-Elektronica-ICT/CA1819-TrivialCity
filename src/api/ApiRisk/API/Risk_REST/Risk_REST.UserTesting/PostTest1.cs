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
    public class PostTest1
    {

        private Risk_Antwerp_dbContext context;

        [Fact]
        public void TestPostPlayer()
        {

            var controller = new PlayerController(new Risk_Antwerp_dbContext());
            controller.ModelState.AddModelError("", "dummy error");

            var actionResult = controller.AddPlayer(new Players());

            actionResult.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void TestPostArea()
        {

            var controller = new AreaController(new Risk_Antwerp_dbContext());
            controller.ModelState.AddModelError("", "dummy error");

            var actionResult = controller.AddArea(new Area());

            actionResult.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void TestPostTeam()
        {

            var controller = new TeamController(new Risk_Antwerp_dbContext());
            controller.ModelState.AddModelError("", "dummy error");

            var actionResult = controller.AddTeam(new Teams());

            actionResult.Should().BeOfType<OkObjectResult>();
        }

      /*  [Fact]
        public void TestPut()
        {

            var controller = new PlayerController(new Risk_AntwerpContext());
            controller.ModelState.AddModelError("", "dummy error");

            var actionResult = controller.UpdatePlayer(12 , new Players());

            actionResult.Should().BeOfType<OkObjectResult>();
        }*/


    }
}
