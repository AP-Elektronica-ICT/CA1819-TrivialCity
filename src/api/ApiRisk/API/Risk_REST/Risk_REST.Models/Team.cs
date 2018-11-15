using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Risk_REST.Models
{
    public class Team
    {
        private long mTeamId;
        private string mTeamColor;
        private int mTeamTotalOccupiedAreas;

        public Team(long mTeamId, string mTeamColor, int mTeamTotalOccupiedAreas)
        {
            this.mTeamId = mTeamId;
            this.mTeamColor = mTeamColor;
            this.mTeamTotalOccupiedAreas = mTeamTotalOccupiedAreas;
        }

        public long MTeamId { get => mTeamId; set => mTeamId = value; }
        public string MTeamColor { get => mTeamColor; set => mTeamColor = value; }
        public int MTeamTotalOccupiedAreas { get => mTeamTotalOccupiedAreas; set => mTeamTotalOccupiedAreas = value; }
    }
}
