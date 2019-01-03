using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Risk_REST.Hubs
{
    public class NotificationHub : Hub
    {
      /*  public Task Send(string message)
        {
            return Clients.All.SendAsync("Send", message);//InvokeAsync("Send", message);
        }*/

        public Task Send(string message , int team)
        {
            if (team == 1)
                return Clients.Group("TeamBlue").SendAsync("Send", message);//InvokeAsync("Send", message);
            else if (team == 2)
                return Clients.Group("TeamRed").SendAsync("Send", message);
            else if (team == 3)
                return Clients.Group("TeamGreen").SendAsync("Send", message);
            else if (team == 4)
                return Clients.Group("TeamYellow").SendAsync("Send", message);
            else
                return null;
            
        }



        public async Task JoinTeam(string groupName)
        {
           await  Groups.AddAsync(Context.ConnectionId, groupName);

           await Clients.Group(groupName).SendAsync("JoinTeam", $"{Context.ConnectionId} has joined the group {groupName}.");
        }

      /*  public async Task LeaveTeam(string groupName)
        {
            await Groups.RemoveAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("LeaveTeam", $"{Context.ConnectionId} has left the group {groupName}.");
        }*/


    }
}
