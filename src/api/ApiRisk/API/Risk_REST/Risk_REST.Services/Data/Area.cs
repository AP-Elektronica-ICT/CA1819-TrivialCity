using System;
using System.Collections.Generic;

namespace Risk_REST.Services.Data
{
    public partial class Area
    {
        public Area()
        {
            Players = new HashSet<Players>();
        }

        public int AreaId { get; set; }
        public string AreaName { get; set; }
        public string AreaOccupiedBy { get; set; }
        public decimal? AreaLatitude { get; set; }
        public decimal? AreaLongitude { get; set; }

        public ICollection<Players> Players { get; set; }
    }
}
