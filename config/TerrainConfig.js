//strategy:[火，风，水，地]
var TerrainConfig = [
{id:1,name:"平原",strategy:[1,1,0,0],sortValue:1},
{id:2,name:"草原",strategy:[1,1,0,0],sortValue:2},
{id:3,name:"河水",strategy:[0,1,1,0],sortValue:3},
{id:4,name:"城内",strategy:[1,0,0,0],comment:"可以恢复",sortValue:4},
{id:5,name:"城墙",strategy:[0,0,0,0],comment:"禁止移动",sortValue:5}
];