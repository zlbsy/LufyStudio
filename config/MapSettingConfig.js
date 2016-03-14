/*
"business":"商业",
	"agriculture":"农业",
	"technology":"技术",
	"police":"治安",
	"monety":"金钱",
	"food":"兵粮",
	"troops":"兵力",
渔阳－蓟
东平－濮阳
陇西－天水
丸都-襄平
穰县-宛
代县-蓟
临晋－长安
涿郡－蓟
颖川－许昌
淮阴－下邳
襄垣－晋阳
朝歌－洛阳
乐陵－南皮
弘农－洛阳
隆中－新野
秣陵－谯
东阿－濮阳
曲阿－吴
丹阳－谯
太原－晋阳
渔阳－蓟
任城－陈留
谯县－汝南
西河－晋阳
阳安－汝南
定陶－陈留
始新－会稽
西河－晋阳
广陵－下邳
上党－晋阳
界桥－南皮
琅玡－下邳
中牟－许昌
九江－柴桑
金城－西平
即墨－北海
巴西－梓橦
涪水关－成都
河间－南皮
白马－邺
章安－会稽
河东－洛阳
建安－会稽
令居－武都
绵竹－成都
酒泉－武威
常山－邺
汉津－襄阳
乌江－寿春
虎牢关－洛阳
南昌－柴桑
彭城－小沛
合肥－寿春
安德－平原
河南－洛阳

*/
var MapSetting = [
	{id:1,smap:1,position:{x:210,y:310},neighbor:[2,3],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:2,smap:1,position:{x:500,y:350},neighbor:[1,3,4],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:3,smap:1,position:{x:400,y:480},neighbor:[1,2,5,11,50],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:4,smap:1,position:{x:750,y:370},neighbor:[2,12,52],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:5,smap:1,position:{x:580,y:680},neighbor:[3,6,7,11,51],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:6,smap:1,position:{x:450,y:810},neighbor:[5,7,8],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:7,smap:1,position:{x:720,y:900},neighbor:[5,6,8,13,53],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:8,smap:1,position:{x:400,y:1100},neighbor:[6,7,9],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:9,smap:1,position:{x:240,y:1200},neighbor:[8,10],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:10,smap:1,position:{x:810,y:1300},neighbor:[9,21],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:11,smap:1,position:{x:830,y:580},neighbor:[3,5,12],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:12,smap:1,position:{x:1050,y:500},neighbor:[4,11,14,22],level:4,maxLevel:5,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:13,smap:1,position:{x:1080,y:870},neighbor:[7,17,53],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:14,smap:1,position:{x:1280,y:580},neighbor:[12,23,24,25],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:15,smap:1,position:{x:1330,y:760},neighbor:[16,25,53],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:16,smap:1,position:{x:1360,y:900},neighbor:[15,17,18,27,28],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:17,smap:1,position:{x:1300,y:1030},neighbor:[13,16,18,19],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:18,smap:1,position:{x:1520,y:1050},neighbor:[16,17,20,27,28],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:19,smap:1,position:{x:1350,y:1170},neighbor:[17,18,20],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:20,smap:1,position:{x:1600,y:1200},neighbor:[18,19,21],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:21,smap:1,position:{x:1750,y:1290},neighbor:[10,20,31],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:22,smap:1,position:{x:1400,y:450},neighbor:[12,14,23,24],level:3,maxLevel:5,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:23,smap:1,position:{x:1550,y:370},neighbor:[22,41,42],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:24,smap:1,position:{x:1570,y:500},neighbor:[14,22,26,39,41],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:25,smap:1,position:{x:1460,y:630},neighbor:[14,15,26],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:26,smap:1,position:{x:1630,y:750},neighbor:[24,25,33,34,38],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:27,smap:1,position:{x:1590,y:900},neighbor:[16,28,29],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:28,smap:1,position:{x:1730,y:1050},neighbor:[16,27,29],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:29,smap:1,position:{x:1880,y:1000},neighbor:[27,28,30,34],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:30,smap:1,position:{x:2050,y:970},neighbor:[29,31,34,36],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:31,smap:1,position:{x:2250,y:1070},neighbor:[21,30,32],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:32,smap:1,position:{x:2200,y:1230},neighbor:[31,49],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:33,smap:1,position:{x:1900,y:700},neighbor:[34,26,35,39],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:34,smap:1,position:{x:1950,y:840},neighbor:[26,29,30,33,35],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:35,smap:1,position:{x:2070,y:630},neighbor:[33,34,36,37,39,40],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:36,smap:1,position:{x:2220,y:740},neighbor:[34,35,37],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:37,smap:1,position:{x:2250,y:610},neighbor:[35,36,38],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:38,smap:1,position:{x:2150,y:480},neighbor:[37,43,44],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:39,smap:1,position:{x:1720,y:580},neighbor:[24,26,33,40],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:40,smap:1,position:{x:1870,y:550},neighbor:[35,39,41],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:41,smap:1,position:{x:1760,y:420},neighbor:[23,24,40,42,43],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:42,smap:1,position:{x:1500,y:180},neighbor:[23,41,45,52],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:43,smap:1,position:{x:1920,y:390},neighbor:[38,41,44],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:44,smap:1,position:{x:2000,y:260},neighbor:[38,43,44],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:45,smap:1,position:{x:1700,y:120},neighbor:[42,46],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:46,smap:1,position:{x:2040,y:130},neighbor:[44,45,47],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:47,smap:1,position:{x:2250,y:50},neighbor:[46,48],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:48,smap:1,position:{x:1950,y:0},neighbor:[47],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	
	{id:49,smap:1,position:{x:2000,y:1310},neighbor:[32],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:50,smap:1,position:{x:20,y:480},neighbor:[3],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:51,smap:1,position:{x:100,y:700},neighbor:[5],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:52,smap:1,position:{x:1100,y:250},neighbor:[4,42],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
	{id:53,smap:1,position:{x:1050,y:700},neighbor:[7,13,15],level:1,maxLevel:3,business:0,agriculture:0,technology:0,police:50, food : 1000, population : 40000,troops:0,generals:[],captives:[],out_of_offices:[],not_debut:[], city_defense : 1000},
];
MapSetting.sort(function(a,b){return a.position.y - b.position.y;});
var CityIconConfig = {width:150, height:130};
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