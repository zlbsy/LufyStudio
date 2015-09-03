/*
"business":"商业",
	"agriculture":"农业",
	"technology":"技术",
	"police":"治安",
	"monety":"金钱",
	"food":"兵粮",
	"troops":"兵力",
	troops : [
				
			],
*/
var MapSetting = [
	{id:1,position:{x:210,y:310},neighbor:[2],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:2,position:{x:400,y:420},neighbor:[1,3,4,50],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:3,position:{x:600,y:480},neighbor:[2,5,11],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:4,position:{x:750,y:370},neighbor:[2,12,52],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:5,position:{x:580,y:680},neighbor:[3,6,7,11,51],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:6,position:{x:450,y:800},neighbor:[5,7,8,51],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:7,position:{x:720,y:900},neighbor:[5,6,8,13],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:8,position:{x:400,y:1100},neighbor:[6,7,9],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:9,position:{x:240,y:1200},neighbor:[8,10],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:10,position:{x:810,y:1300},neighbor:[9,21],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:11,position:{x:830,y:580},neighbor:[3,5,12],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:12,position:{x:1050,y:500},neighbor:[4,11,14,22],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:13,position:{x:1080,y:700},neighbor:[7,16,17],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:14,position:{x:1330,y:580},neighbor:[12,23,24,25],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:15,position:{x:1330,y:730},neighbor:[16,25],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:16,position:{x:1420,y:950},neighbor:[15,17,18,27,28],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:17,position:{x:1300,y:1030},neighbor:[13,16,28,29],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:18,position:{x:1520,y:1050},neighbor:[16,17,20,27,28],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:19,position:{x:1350,y:1170},neighbor:[17,18,20],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:20,position:{x:1600,y:1200},neighbor:[18,19,21],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:21,position:{x:1750,y:1300},neighbor:[10,20,49],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:22,position:{x:1400,y:450},neighbor:[12,14,23,24],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:23,position:{x:1530,y:380},neighbor:[22,41,42],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:24,position:{x:1570,y:500},neighbor:[14,22,26,33,39,41],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:25,position:{x:1430,y:650},neighbor:[14,15,26],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:26,position:{x:1630,y:750},neighbor:[24,25,33,34,38],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:27,position:{x:1550,y:900},neighbor:[16,28,29],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:28,position:{x:1730,y:1030},neighbor:[16,27,29],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:29,position:{x:1880,y:980},neighbor:[27,28,30,34],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:30,position:{x:2050,y:950},neighbor:[29,31,34,36],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:31,position:{x:2250,y:1100},neighbor:[30,32,49],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:32,position:{x:2200,y:1230},neighbor:[31],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:33,position:{x:1900,y:680},neighbor:[24,26,35,39],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:34,position:{x:1950,y:800},neighbor:[26,29,30,33,35],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:35,position:{x:2070,y:660},neighbor:[33,34,36,39,40],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:36,position:{x:2180,y:730},neighbor:[34,35,37,38],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:37,position:{x:2250,y:600},neighbor:[36,38],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:38,position:{x:2150,y:500},neighbor:[36,37,43,44],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:39,position:{x:1720,y:580},neighbor:[24,26,33,49],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:40,position:{x:1820,y:520},neighbor:[35,39,41],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:41,position:{x:1760,y:420},neighbor:[23,24,40,42,43],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:42,position:{x:1500,y:180},neighbor:[23,41,45,52],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:43,position:{x:1880,y:370},neighbor:[38,41,44],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:44,position:{x:1950,y:250},neighbor:[38,43,44],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:45,position:{x:1700,y:120},neighbor:[42,46],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:46,position:{x:2010,y:130},neighbor:[44,45,47,48],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:47,position:{x:2250,y:50},neighbor:[46,48],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:48,position:{x:1950,y:10},neighbor:[46,47],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:49,position:{x:2000,y:1300},neighbor:[21,31],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:50,position:{x:20,y:480},neighbor:[2],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:51,position:{x:100,y:700},neighbor:[5,6],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:52,position:{x:1100,y:250},neighbor:[4,42],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],out_of_offices:[],not_debut:[], city_defense : 1000},
];
MapSetting.sort(function(a,b){return a.position.y - b.position.y;});
/*
var government = [
	{id:1,name:"校尉",rating:1,type:0},
	{id:2,name:"中郎将",rating:2,type:0},
	{id:3,name:"骁骑将军",rating:3,type:0},
	{id:4,name:"前将军",rating:4,type:0},
	{id:5,name:"镇国将军",rating:5,type:0},
	{id:6,name:"大将军",rating:6,type:0},
	
	{id:7,name:"从事",rating:1,type:1},
	{id:8,name:"长史",rating:2,type:1},
	{id:9,name:"主簿",rating:3,type:1},
	{id:10,name:"尚书",rating:4,type:1},
	{id:11,name:"太常",rating:5,type:1},
	{id:12,name:"丞相",rating:6,type:1}
];*/