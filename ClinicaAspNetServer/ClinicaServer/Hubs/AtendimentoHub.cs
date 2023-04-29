using Microsoft.AspNetCore.SignalR;
using MySqlX.XDevAPI;
using System.Configuration;

namespace ClinicaServer.Hubs
{
    public class AtendimentoHub : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        public AtendimentoHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyAtendimento Bot";
            _connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", _botUser, userConnection.User + " foi desconectado");
                SendConnectedUsers(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Groups(userConnection.Room)
                    .SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            Console.WriteLine("CHEGOU NOVO");
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            _connections[Context.ConnectionId] = userConnection;
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, userConnection.User + " foi conectado a " + userConnection.Room);
            //await Clients.All.SendAsync("ReceiveMessage", "Hey everyone");
            await SendConnectedUsers(userConnection.Room);
        }

        public Task SendConnectedUsers(string room)
        {
            var users = _connections.Values.Where(c => c.Room == room).Select(c => c.User);
            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

    }
}
