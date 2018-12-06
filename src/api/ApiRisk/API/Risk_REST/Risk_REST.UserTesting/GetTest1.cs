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
        private Risk_AntwerpContext context;

        [Fact]
        public void testMetdod1()
        {
            PlayerController c = new PlayerController(context);
            /* IActionResult player = c.GetPlayerById(1);
             // NUnit.Framework.Assert.AreEqual("1", player.PlayerId)
             // Xunit.Assert.IsType<ViewResult>(player);
             Xunit.Assert.Equal()*/
            IActionResult result = c.GetPlayerById(1);
            OkObjectResult viewResult = Xunit.Assert.IsType<OkObjectResult>(result);
            Players model = Xunit.Assert.IsType<Players>(viewResult);
            Xunit.Assert.Equal(1, model.PlayerId);
         
        }

        [Fact]
        public void testMethod2()
        {
            PlayerController c = new PlayerController(context);
          
            IActionResult result = c.GetPlayerById(1);

            Xunit.Assert.IsType<OkObjectResult>(result);

        }

        [Fact]
        public  void  testCorrectId()
        {
            var c = new PlayerController(new Risk_AntwerpContext());

            var result =  c.GetPlayerById(2);
            
           var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
           var player = okResult.Value.Should().BeAssignableTo<Players>().Subject;

            player.PlayerId.Should().Be(2);

        }

    }
}
