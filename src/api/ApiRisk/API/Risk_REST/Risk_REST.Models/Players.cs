using System;
using System.Collections.Generic;

namespace Risk_REST.Models
{
    public partial class Players
    {
        public int PlayerId { get; set; }
        public string PlayerUsername { get; set; }
        public string PlayerEmail { get; set; }
        public string PlayerTitle { get; set; }
        public int? PlayerLevel { get; set; }
        public int? PlayerExp { get; set; }
        public int? PlayerSilverCoins { get; set; }
        public int? PlayerTroops { get; set; }
        public int? PlayerReserveTroops { get; set; }
        public string AuthId { get; set; }
        public int? AreaId { get; set; }
        public int? TeamId { get; set; }

        public Area Area { get; set; }
        public Teams Team { get; set; }
    }
}
