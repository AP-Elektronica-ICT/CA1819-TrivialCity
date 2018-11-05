using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Risk_REST.Models
{
    public class Area
    {
        private long mAreaId;
        private string mAreaName;
        private string mAreaOcuppiedBy;

        public Area(long mAreaId, string mAreaName, string mAreaOcuppiedBy)
        {
            this.mAreaId = mAreaId;
            this.mAreaName = mAreaName;
            this.mAreaOcuppiedBy = mAreaOcuppiedBy;
        }

        public long areaId { get => mAreaId; set => mAreaId = value; }
        public string areaName { get => mAreaName; set => mAreaName = value; }
        public string areaOcuppiedBy { get => mAreaOcuppiedBy; set => mAreaOcuppiedBy = value; }
    }
}
