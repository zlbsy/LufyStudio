var MapSetting = [
	{id:1,smap:1,position:{x:330,y:420},neighbor:[2,3],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:2,smap:2,position:{x:600,y:450},neighbor:[1,3,4],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:3,smap:2,position:{x:500,y:520},neighbor:[1,2,5,11,50],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:4,smap:2,position:{x:750,y:400},neighbor:[2,12,52],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:5,smap:12,position:{x:580,y:630},neighbor:[3,6,7,11,51],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:6,smap:13,position:{x:450,y:750},neighbor:[5,7,8],maxLevel:5,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:7,smap:11,position:{x:650,y:800},neighbor:[5,6,8,13,53],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:8,smap:14,position:{x:400,y:1000},neighbor:[6,7,9],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:9,smap:15,position:{x:240,y:1100},neighbor:[8,10],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:10,smap:14,position:{x:780,y:1150},neighbor:[9,21],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:11,smap:13,position:{x:700,y:580},neighbor:[3,5,12],maxLevel:5,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:12,smap:10,position:{x:850,y:500},neighbor:[4,11,14,22],maxLevel:5,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:13,smap:15,position:{x:900,y:750},neighbor:[7,17,53],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:14,smap:7,position:{x:1020,y:580},neighbor:[12,22,24,25],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[2,3,4,24]},
	{id:15,smap:8,position:{x:1060,y:680},neighbor:[16,25,53],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:16,smap:6,position:{x:1110,y:780},neighbor:[15,17,18,27,28],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:17,smap:5,position:{x:1030,y:830},neighbor:[13,16,18,19],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:18,smap:4,position:{x:1150,y:870},neighbor:[16,17,19,20],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:19,smap:5,position:{x:1060,y:950},neighbor:[17,18,20],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:20,smap:4,position:{x:1160,y:980},neighbor:[18,19,21],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:21,smap:14,position:{x:1230,y:1100},neighbor:[10,20,31],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:22,smap:9,position:{x:1030,y:450},neighbor:[12,14,23,24],maxLevel:5,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[2,3,4,24]},
	{id:23,smap:7,position:{x:1120,y:390},neighbor:[22,41,42],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:24,smap:8,position:{x:1190,y:500},neighbor:[14,22,26,39,41],maxLevel:5,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[2,3,4,24]},
	{id:25,smap:4,position:{x:1150,y:630},neighbor:[14,15,26],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:26,smap:6,position:{x:1360,y:610},neighbor:[24,25,33,34,39],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[2,3,4,24]},
	{id:27,smap:16,position:{x:1280,y:700},neighbor:[16,28,29],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:28,smap:17,position:{x:1330,y:800},neighbor:[16,27,29],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:29,smap:18,position:{x:1410,y:750},neighbor:[27,28,30,34],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:30,smap:16,position:{x:1760,y:650},neighbor:[29,31,34],maxLevel:5,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:31,smap:17,position:{x:2050,y:680},neighbor:[21,30,32],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:32,smap:14,position:{x:2000,y:810},neighbor:[31,49],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:33,smap:5,position:{x:1480,y:520},neighbor:[34,26,35,39],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:34,smap:6,position:{x:1560,y:590},neighbor:[26,29,30,33,35,36],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:35,smap:4,position:{x:1670,y:520},neighbor:[33,34,36,37,40],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:36,smap:7,position:{x:1850,y:580},neighbor:[34,35,37],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:37,smap:8,position:{x:1790,y:490},neighbor:[35,36,38],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:38,smap:7,position:{x:1750,y:400},neighbor:[37,43,44],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:39,smap:7,position:{x:1290,y:510},neighbor:[24,26,33,40],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[2,3,4,24]},
	{id:40,smap:8,position:{x:1370,y:450},neighbor:[35,39,41],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:41,smap:6,position:{x:1230,y:360},neighbor:[23,24,40,42,43],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:42,smap:6,position:{x:1040,y:280},neighbor:[23,41,45,52],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:43,smap:5,position:{x:1440,y:360},neighbor:[38,41,44],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:44,smap:9,position:{x:1550,y:330},neighbor:[38,43,46],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:45,smap:7,position:{x:1350,y:220},neighbor:[42,46],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:46,smap:1,position:{x:1540,y:230},neighbor:[44,45,47],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:47,smap:3,position:{x:1750,y:150},neighbor:[46,48],maxLevel:4,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:48,smap:2,position:{x:1650,y:50},neighbor:[47],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[20,21,22,23]},
	{id:49,smap:12,position:{x:1800,y:1000},neighbor:[32],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[20,21,22,23]},
	{id:50,smap:3,position:{x:20,y:480},neighbor:[3],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[20,21,22,23]},
	{id:51,smap:12,position:{x:200,y:650},neighbor:[5],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[20,21,22,23]},
	{id:52,smap:12,position:{x:950,y:350},neighbor:[4,42],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000,employSoldiers:[20,21,22,23]},
	{id:53,smap:6,position:{x:800,y:650},neighbor:[7,13,15],maxLevel:3,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:54,smap:1,position:{x:-200,y:-200},neighbor:[],maxLevel:5,business:0,agriculture:0,technology:0,police:0, food : 0, population : 0,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
];
MapSetting.sort(function(a,b){return a.position.y - b.position.y;});
var CityIconConfig = {width:80, height:80};
var HistoryCityConfig = {cityId:54};