## How to add an area to Risk Antwerp  

### Part 1  

1. Add a new Row in the dbo.Area table with the a new AreaId.  
2. Collect all the necessairy coördinates you need for your area (all borderpoint coördinates aswell as a center coördinate).  
3. Add these coördinates to the positions table in the database with the new AreaId.  

### Part 2  map.ts  

1. Adjust areaTotal to how many areas there are in the database
 
