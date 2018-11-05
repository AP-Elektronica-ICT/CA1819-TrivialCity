using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Risk_REST.Models
{
    public class Player
    {
        private long mPlayerId;
        private string mPlayerUsername;
        private string mPlayerEmail;
        private string mPlayerPassword;
        private string mPlayerTitle;
        private int mPlayerTroops;
        private int mPlayerReserveTroops;
        private int mPlayerLevel;
        private int mPlayerExp;
        private int mPlayerSilverCoins;

        public Player(long mPlayerId, string mPlayerUsername, string mPlayerEmail, string mPlayerPassword, string mPlayerTitle, int mPlayerTroops, int mPlayerReserveTroops, int mPlayerLevel, int mPlayerExp, int mPlayerSilverCoins)
        {
            this.mPlayerId = mPlayerId;
            this.mPlayerUsername = mPlayerUsername;
            this.mPlayerEmail = mPlayerEmail;
            this.mPlayerPassword = mPlayerPassword;
            this.mPlayerTitle = mPlayerTitle;
            this.mPlayerTroops = mPlayerTroops;
            this.mPlayerReserveTroops = mPlayerReserveTroops;
            this.mPlayerLevel = mPlayerLevel;
            this.mPlayerExp = mPlayerExp;
            this.mPlayerSilverCoins = mPlayerSilverCoins;
        }

        public long playerId { get => mPlayerId; set => mPlayerId = value; }
        public string playerUsername { get => mPlayerUsername; set => mPlayerUsername = value; }
        public string playerEmail { get => mPlayerEmail; set => mPlayerEmail = value; }
        public string playerPassword { get => mPlayerPassword; set => mPlayerPassword = value; }
        public string playerTitle { get => mPlayerTitle; set => mPlayerTitle = value; }
        public int playerTroops { get => mPlayerTroops; set => mPlayerTroops = value; }
        public int playerReserveTroops { get => mPlayerReserveTroops; set => mPlayerReserveTroops = value; }
        public int playerLevel { get => mPlayerLevel; set => mPlayerLevel = value; }
        public int playerExp { get => mPlayerExp; set => mPlayerExp = value; }
        public int playerSilverCoins { get => mPlayerSilverCoins; set => mPlayerSilverCoins = value; }
    }
}
