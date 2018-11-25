using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using Risk_REST.Controllers;
using Risk_REST.Services.Data;
//using Risk_REST.Services.Data;
using System;
using Xania.AspNet.Simulator;
using Xunit;


namespace Risk_REST.UserTesting
{
    public class GetTests
    {
        /*   [Fact]
           public void Test1()
           {

           }*/
        /*  private DirectControllerAction _action;
          private readonly Risk_AntwerpContext context;

          [SetUp]
          public void SetUpTestAuth()
          {
              var controller = new PlayerController(context);
              _action = controller.Action();
          }*/
        private readonly Risk_AntwerpContext context;

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

    }
}
