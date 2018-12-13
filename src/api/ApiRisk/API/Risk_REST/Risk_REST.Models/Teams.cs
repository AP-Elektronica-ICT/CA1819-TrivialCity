using System;
using System.Collections.Generic;

namespace Risk_REST.Models
{
    public partial class Teams
    {
        public Teams()
        {
            Players = new HashSet<Players>();
        }

        public int TeamId { get; set; }
        public string TeamColor { get; set; }
        public int? TeamTotalOccupiedAreas { get; set; }

        public ICollection<Players> Players { get; set; }
    }
}
