## How to add an area to Risk Antwerp  

### Part 1  

1. Add a new Row in the dbo.Area table with the a new AreaId.  
2. Collect all the necessairy coördinates you need for your area (all borderpoint coördinates aswell as a center coördinate).  
3. Add these coördinates to the positions table in the database with the new AreaId.  

### Part 2  map.ts  

1. GET the positions and put them in polygonPositions Array.  
2. Add the polygon variable to the polygons Array as a leaflet.polygon  
3. Add the centermarker to the centerMarkers array as a leaflet.marker  


### Example  

//GET positions  
this.service.getAreaPositions(6 /*new areaId*/).subscribe(data=>{  
	this.areas[6 /*new areaId*/].positions = data;  
});  

this.polygonPositions[6 /*new areaId*/] = [  
							  //Example positions  
	                          [this.areas[6].positions[0].latitude, this.areas[6].positions[0].longitude],  
                              [this.areas[6].positions[1].latitude, this.areas[6].positions[1].longitude],  
                              [this.areas[6].positions[2].latitude, this.areas[6].positions[2].longitude],  
                              [this.areas[6].positions[3].latitude, this.areas[6].positions[3].longitude],  
                              [this.areas[6].positions[4].latitude, this.areas[6].positions[4].longitude],  
                              [this.areas[6].positions[5].latitude, this.areas[6].positions[5].longitude],  
                              [this.areas[6].positions[6].latitude, this.areas[6].positions[6].longitude],  
                              [this.areas[6].positions[7].latitude, this.areas[6].positions[7].longitude],  
                              [this.areas[6].positions[8].latitude, this.areas[6].positions[8].longitude],  
                              [this.areas[6].positions[9].latitude, this.areas[6].positions[9].longitude],  
                              [this.areas[6].positions[10].latitude, this.areas[6].positions[10].longitude],  
]  

this.polygons[6] = leaflet.polygon(this.polygonPositions[6], { color: this.colorSelector(this.areas[6].teamId), title: 6})  
this.centerMarkers[6] = leaflet.marker([this.areas[6].positions[11].latitude, this.areas[6].positions[11].longitude], {icon : this.centerMarkerOptions});  