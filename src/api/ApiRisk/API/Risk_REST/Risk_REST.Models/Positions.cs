using System;
using System.Collections.Generic;

namespace Risk_REST.Models
{
    public partial class Positions
    {
        public int PositionId { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public int? AreaId { get; set; }

        public Area Area { get; set; }
    }
}
