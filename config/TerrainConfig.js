//strategy:[火，风，水，地]
var TerrainConfig = [
{id:0,name:"平原",strategy:[1,1,0,0],sortValue:0},
{id:1,name:"草原",strategy:[1,1,0,0],sortValue:1},
{id:2,name:"森林",strategy:[1,0,0,0],sortValue:2},
{id:3,name:"荒地",strategy:[0,1,0,1],sortValue:3},
{id:4,name:"山地",strategy:[0,1,0,1],sortValue:4},
{id:5,name:"雪原",strategy:[0,1,1,0],sortValue:5},
{id:6,name:"桥梁",strategy:[1,1,1,0],sortValue:6},
{id:7,name:"浅滩",strategy:[0,1,1,0],sortValue:7},
{id:8,name:"沼泽",strategy:[0,1,1,0],sortValue:8},
{id:9,name:"大河",strategy:[0,1,1,0],sortValue:9},
{id:10,name:"城内",strategy:[1,0,0,0],sortValue:10},
{id:11,name:"民居",strategy:[1,0,0,0],sortValue:11},
{id:12,name:"城池",strategy:[1,0,0,0],comment:"可以恢复",sortValue:12},
{id:13,name:"关隘",strategy:[1,0,0,0],comment:"可以恢复",sortValue:13},
{id:14,name:"鹿砦",strategy:[1,0,0,0],comment:"可以恢复",sortValue:14},
{id:15,name:"村庄",strategy:[1,0,0,0],comment:"可以恢复",sortValue:15},
{id:16,name:"兵营",strategy:[1,0,0,0],comment:"可以恢复",sortValue:16},
{id:17,name:"岩山",strategy:[0,0,0,0],comment:"禁止移动",sortValue:17},
{id:18,name:"池塘",strategy:[0,0,0,0],comment:"禁止移动",sortValue:18},
{id:19,name:"小河",strategy:[0,0,0,0],comment:"禁止移动",sortValue:19},
{id:20,name:"栅栏",strategy:[0,0,0,0],comment:"禁止移动",sortValue:20},
{id:21,name:"城墙",strategy:[0,0,0,0],comment:"禁止移动",sortValue:21},
{id:22,name:"水池",strategy:[0,0,0,0],comment:"禁止移动",sortValue:22},
{id:23,name:"火",strategy:[0,0,0,0],comment:"禁止移动",sortValue:23},
{id:24,name:"船",strategy:[0,0,0,0],comment:"禁止移动",sortValue:24}
];
/*
0:"平原",1:"草原",2:"森林",3:"荒地",4:"山地",5:"雪原",6:"桥梁",7:"浅滩",8:"沼泽",9:"大河",10:"城内",11:"民居",12:"城池",13:"关隘",14:"鹿砦",15:"村庄",16:"兵营"
terrain:[
{id:1,value:100,moveCost:1},{id:1,value:100,moveCost:1},{id:2,value:80,moveCost:2},{id:3,value:100,moveCost:1},
{id:4,value:100,moveCost:1},{id:5,value:100,moveCost:1},{id:6,value:100,moveCost:1},{id:7,value:100,moveCost:1},
{id:8,value:100,moveCost:1},{id:9,value:100,moveCost:1},{id:10,value:100,moveCost:1},{id:11,value:100,moveCost:1},
{id:12,value:120,moveCost:1},{id:13,value:120,moveCost:1},{id:14,value:110,moveCost:1},{id:15,value:110,moveCost:1},{id:16,value:110,moveCost:1}],

君主
0:"平原",1:"草原",2:"森林",3:"荒地",4:"山地",5:"雪原",6:"桥梁",7:"浅滩",8:"沼泽",9:"大河",10:"城内",11:"民居",12:"城池",13:"关隘",14:"鹿砦",15:"村庄",16:"兵营"
terrain:[
{id:1,value:110,moveCost:1},{id:2,value:90,moveCost:2},{id:3,value:90,moveCost:2},{id:4,value:80,moveCost:3},
{id:5,value:100,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:90,moveCost:2},{id:8,value:80,moveCost:3},
{id:9,value:90,moveCost:2},{id:11,value:100,moveCost:3},
{id:12,value:120,moveCost:1},{id:13,value:120,moveCost:1},{id:14,value:110,moveCost:2},{id:15,value:110,moveCost:2},{id:16,value:110,moveCost:2}],

★ 发挥效果120％
○ 发挥效果100％
× 发挥效果80％
◎ 发挥效果110％
△ 发挥效果90％
-- 无法行走
地形	君主	步兵	弓兵	骑兵	弓骑	炮车	武道	贼兵	策士	风水	道士	骑策	舞孃
	平原
	○	○	○	◎	○	○	○	○	○	○	○	○	○
	草原
	◎	○	○	◎	◎	○	○	○	○	○	○	◎	○
	树林
	△	○	○	△	△	△	○	◎	○	○	◎	△	○
	荒地
	△	○	○	△	△	△	○	◎	△	△	◎	△	△
	山地
	×	○	○	×	×	×	△	◎	×	×	◎	×	△
	岩山	--	--	--	--	--	--	--	--	--	--	--	--	--
	山崖	--	--	--	--	--	--	--	--	--	--	--	--	--
	雪原
	○	○	○	○	○	○	△	×	△	○	△	○	△
	桥梁
	◎	○	○	◎	◎	◎	○	○	○	○	○	◎	○
	浅滩
	△	○	○	△	△	×	○	×	○	○	△	△	◎
	沼泽
	×	○	○	×	×	×	○	×	△	△	×	×	◎
	池塘	--	--	--	--	--	--	--	--	--	--	--	--	--
	小河	--	--	--	--	--	--	--	--	--	--	--	--	--
	大河
	△	○	○	×	×	○	◎	×	×	○	×	×	◎
	栅栏	--	--	--	--	--	--	--	--	--	--	--	--	--
	城墙	--	--	--	--	--	--	--	--	--	--	--	--	--
	城内
	○	◎	◎	○	○	◎	○	○	○	○	○	○	○
	城门	--	--	--	--	--	--	--	--	--	--	--	--	--
	城池
	★	★	★	★	★	★	★	★	★	★	★	★	★
	关隘
	★	★	★	★	★	★	★	★	★	★	★	★	★
	鹿砦
	★	★	★	★	★	★	★	★	★	★	★	★	★
	村庄
	◎	◎	◎	◎	◎	◎	◎	◎	◎	◎	◎	◎	◎
	兵营
	◎	◎	◎	◎	◎	◎	◎	◎	◎	◎	◎	◎	◎
	民居
	○	◎	◎	△	△	○	◎	◎	◎	◎	◎	△	◎
	
地形	君主	步兵	弓兵	骑兵	弓骑	炮车	武道	贼兵	策士	风水	道士	骑策	舞孃
	平原
	1	1	1	1	1	1	1	1	1	1	1	1	1
	草原
	1	1	1	1	1	1	1	1	1	1	1	1	1
	树林
	2	1	1	2	2	1	1	1	1	1	1	2	1
	荒地
	2	1	1	2	2	1	1	1	1	1	1	2	1
	山地
	3	2	2	3	3	2	2	1	2	2	2	3	2
	岩山	--	--	--	--	--	--	--	--	--	--	--	--	--
	山崖	--	--	--	--	--	--	--	--	--	--	--	--	--
	雪原
	2	1	1	2	2	1	1	1	1	1	1	2	1
	桥梁
	1	1	1	1	1	1	1	1	1	1	1	1	1
	浅滩
	2	2	2	2	2	2	1	2	2	2	2	2	1
	沼泽
	3	2	2	3	3	2	2	2	2	2	2	3	1
	池塘	--	--	--	--	--	--	--	--	--	--	--	--	--
	小河	--	--	--	--	--	--	--	--	--	--	--	--	--
	大河
	2	1	1	2	2	1	1	2	2	2	2	2	1
	栅栏	--	--	--	--	--	--	--	--	--	--	--	--	--
	城墙	--	--	--	--	--	--	--	--	--	--	--	--	--
	城内
	1	1	1	1	1	1	1	1	1	1	1	1	1
	城门	--	--	--	--	--	--	--	--	--	--	--	--	--
	城池
	1	1	1	1	1	1	1	1	1	1	1	1	1
	关隘
	1	1	1	1	1	1	1	1	1	1	1	1	1
	鹿砦
	2	1	1	2	2	1	1	1	1	1	1	2	1
	村庄
	2	1	1	2	2	1	1	1	1	1	1	2	1
	兵营
	2	1	1	2	2	1	1	1	1	1	1	2	1
	民居
	3	2	2	3	3	2	2	2	2	2	2	3	2
*/