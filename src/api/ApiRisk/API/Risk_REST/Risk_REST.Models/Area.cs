using System;
using System.Collections.Generic;

namespace Risk_REST.Models
{
    public partial class Area
    {
        public Area()
        {
            Players = new HashSet<Players>();
            Positions = new HashSet<Positions>();
        }

        public int AreaId { get; set; }
        public string AreaName { get; set; }
        public string AreaOccupiedBy { get; set; }
        public int? DefendingTroops { get; set; }

        public ICollection<Players> Players { get; set; }
        public ICollection<Positions> Positions { get; set; }
    }
}
