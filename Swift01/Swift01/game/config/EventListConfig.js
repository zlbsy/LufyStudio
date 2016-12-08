var EventListConfig = [
{
	id:1,
	name:"桃园结义",
	condition:{
		from:{year:184,month:1},
		to:{year:184,month:2},
		seignior:604,
		generals:[
			{id:21,seignior:0},
			{id:4,seignior:0},
			{id:19,seignior:0}
		],
		citys:[
			{id:45,seignior:604}
		]
	},
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:2,
	name:"反董卓联盟",
	condition:{
		from:{year:190,month:3},
		to:{year:190,month:3},
		seignior:0,
		generals:[
			{id:265,seignior:265},
		],
		citys:[
		]
	},
	script:"Data/Event/{0}/fdzlm.txt",
	result:[
		{type:"stopBattle", seigniors:[160,602,451,39,375,1,453,237,8,495,562,446,484,367,408,21,75,144], month:7}
	]
},
{
	id:3,
	name:"迁都长安",
	condition:{
		from:{year:190,month:10},
		to:{year:190,month:12},
		seignior:0,
		generals:[
			{id:265,seignior:265,cityId:22},
		],
		citys:[
			{id:12,seignior:265},
			{id:22,seignior:265}
		]
	},
	script:"Data/Event/{0}/qdca.txt",
	result:[
		{type:"moveGeneralsToCity", generals:[], from:22, to:12},//洛阳武将全部移往长安
		{type:"generalsStopInCity", generals:[265], cityId:12,months:12},//董卓强制待在长安1年
		{type:"moveCityResources", from:22, to:12},//洛阳资源全部移往长安
		{type:"changeCitySeignior", cityId:22, seignior:0},//洛阳变成无势力状态
		{type:"changeCityResources", cityId:22, food:0, money:0, business:10000, agriculture:10000, technology:5000, police:50, city_defense:1000, troops:0}//洛阳资源变更
	]
},
{
	id:4,
	name:"连环计",
	condition:{
		from:{year:191,month:6},
		to:{year:191,month:9},
		noSeignior:265,
		generals:[
			{id:237,seignior:237},
			{id:18,seignior:265},
			{id:265,seignior:265},
			{id:543,seignior:265},
			{id:465,seignior:265},
		],
		citys:[
			{id:12,seignior:265}
		]
	},
	script:"Data/Event/{0}/lhj.txt",
	result:[
		{type:"generalsDie", generals:[543]},//王允死亡
		{type:"moveGeneralsToSeignior", generals:[18,380], to:237, loyalty:90},//吕布貂蝉移动到张扬手下
		{type:"monarchDie", monarch:265, newMonarch:[465]}//董卓死亡，由李郭继承
	]
},
{
	id:5,
	name:"报仇雪恨",
	condition:{
		from:{year:193,month:9},
		to:{year:193,month:10},
		seignior:[1,21,451],
		generals:[
			{id:1,seignior:1},//曹操未灭亡
			{id:18,seignior:18},//吕布未灭亡
			{id:21,seignior:21,cityId:[43,38,40,33,34,26,29,30,39,41]},//刘备未灭亡,并且在距离徐州附近的城池
			{id:451,seignior:451},//陶谦未灭亡
		],
		citys:[
			{id:36,seignior:451},//下坯属陶谦
			{id:35,seignior:[0,451]},//小沛属陶谦或者无势力
		]
	},
	script:"Data/Event/{0}/bcxh.txt",
	result:[
		{type:"moveGeneralsToCity", generals:[], from:35, to:36},//小沛武将全部移往下坯
		{type:"changeCitySeignior", cityId:35, seignior:21},//小沛势力变为刘备
		{type:"moveGeneralsToCity", generals:[4,19,21], to:35},//刘关张移往小沛
		{type:"changeCityResources", cityId:35, food:10000, money:2000, business:3000, agriculture:3000, technology:2000, police:90, city_defense:1000, troops:1100},//洛阳资源变更
		{type:"stopBattle", seigniors:[21,451], month:12}//刘备和陶谦停战1年
	]
},
{
	id:6,
	name:"三让徐州",
	condition:{
		from:{year:194,month:4},
		to:{year:194,month:4},
		noSeignior:451,
		generals:[
			{id:451,seignior:451},//陶谦未灭亡
			{id:21,seignior:21},//刘备未灭亡
		],
		citys:[
			{id:36,seignior:451},//下坯属陶谦
			{id:35,seignior:21},//小沛刘备
		]
	},
	script:"Data/Event/{0}/srxz.txt",
	result:[
		{type:"seigniorToSeignior", from:451, to:21},//陶谦城池归属刘备
		{type:"moveGeneralsToCity", generals:[4], to:36},//关羽移往下坯
		{type:"changePrefecture",cityId:36,prefecture:4},
		{type:"generalsDie", generals:[451]},//陶谦死亡
	]
},
{
	id:7,
	name:"白门楼",
	condition:{
		from:{year:197,month:1},
		to:{year:199,month:12},
		seignior:[1,21],
		generals:[
			{id:1,seignior:1},//曹操未灭亡
			{id:21,seignior:21},//刘备未灭亡
			{id:18,seignior:0,captive:1},//吕布为曹操俘虏
		],
		citys:[
		],
		stopBattle:[
			[1,21],//曹操刘备属停战状态
		]
	},
	script:"Data/Event/{0}/bml.txt",
	result:[
		{type:"captiveDie",captives:[265]},//吕布死
	]
},
{
	id:8,
	name:"煮酒论英雄",
	condition:{
		from:{year:194,month:1},
		to:{year:206,month:12},
		seignior:1,
		generals:[
			{id:1,seignior:1},//曹操未灭亡
			{id:21,seignior:1},//刘备属曹操
		],
		citys:[
		]
	},
	script:"Data/Event/{0}/zjlyx.txt",
	result:[
	]
},
{
	id:9,
	name:"官渡之战",
	condition:{
		from:{year:200,month:3},
		to:{year:200,month:3},
		seignior:1,
		generals:[
			{id:1,seignior:1},//曹操未灭亡
			{id:39,seignior:39},//袁绍未灭亡
		],
		citys:[
		]
	},
	script:"Data/Event/{0}/gdzz.txt",
	result:[
	]
},
{
	id:10,
	name:"乌巢急袭",
	condition:{
		from:{year:200,month:10},
		to:{year:200,month:12},
		seignior:[1,39],
		generals:[
			{id:1,seignior:1},//曹操未灭亡
			{id:39,seignior:39},//袁绍未灭亡
			{id:580,seignior:39},//许攸属袁绍
		],
		citys:[
			{id:44,seignior:39},//南皮属袁绍
			{id:41,seignior:39},//邺属袁绍
			{id:43,seignior:39},//平原属袁绍
		]
	},
	script:"Data/Event/{0}/wcqx.txt",
	result:[
		{type:"moveGeneralsToCity", generals:[],from:41, to:44},//邺城武将移往南皮
		{type:"moveGeneralsToCity", generals:[],from:43, to:44},//平原武将移往南皮
		{type:"changeCitySeignior", cityId:41, seignior:1},//邺属曹操
		{type:"changeCitySeignior", cityId:43, seignior:1},//平原曹操
		{type:"moveGeneralsToSeignior", generals:[580], to:1, loyalty:90},//许攸移动到曹操手下
	]
},
{
	id:11,
	name:"一顾茅庐",
	condition:{
		from:{year:207,month:2},
		to:{year:207,month:2},
		seignior:21,
		generals:[
			{id:4,seignior:21},//关羽属刘备
			{id:19,seignior:21},//张飞属刘备
			{id:21,seignior:21},//刘备未灭亡
			{id:10,seignior:0},//诸葛亮在野
		],
		citys:[
			{id:25,seignior:21},//新野属刘备
		]
	},
	script:"Data/Event/{0}/sgml1.txt",
	result:[
		{type:"moveGeneralsToSeignior", generals:[20], to:1, loyalty:80},//徐庶移动到曹操手下
	]
},
{
	id:12,
	name:"二顾茅庐",
	condition:{
		from:{year:207,month:4},
		to:{year:207,month:4},
		seignior:21,
		generals:[
			{id:4,seignior:21},//关羽属刘备
			{id:19,seignior:21},//张飞属刘备
			{id:21,seignior:21},//刘备未灭亡
			{id:10,seignior:0},//诸葛亮在野
		],
		citys:[
			{id:25,seignior:21},//新野属刘备
		]
	},
	script:"Data/Event/{0}/sgml2.txt",
	result:[
	]
},
{
	id:13,
	name:"三顾茅庐",
	condition:{
		from:{year:207,month:6},
		to:{year:207,month:6},
		seignior:21,
		generals:[
			{id:4,seignior:21},//关羽属刘备
			{id:19,seignior:21},//张飞属刘备
			{id:21,seignior:21},//刘备未灭亡
			{id:10,seignior:0},//诸葛亮在野
		],
		citys:[
			{id:25,seignior:21},//新野属刘备
		]
	},
	script:"Data/Event/{0}/sgml3.txt",
	result:[
		{type:"changeSeignior", id:10, seignior:21, loyalty:100, city:25},
	]
},
{
	id:14,
	name:"刘表之死",
	condition:{
		from:{year:208,month:2},
		to:{year:208,month:3},
		seignior:[1, 21],
		generals:[
			{id:1,seignior:1},//曹操未灭亡
			{id:17,seignior:17},//孙权未灭亡
			{id:21,seignior:21},//刘备未灭亡
			{id:446,seignior:446},//刘表未灭亡
		],
		citys:[
			{id:15,seignior:446},//襄阳属刘表
			{id:27,seignior:446},//江夏属刘表
			{id:25,seignior:21},//新野属刘备
		]
	},
	script:"Data/Event/{0}/lbzs.txt",
	result:[
		{type:"moveGeneralsToCity", generals:[],from:27, to:15},//江夏武将移往襄阳
		{type:"moveCityResources", from:27, to:15},//江夏资源全部移往襄阳
		{type:"changeCitySeignior", cityId:27, seignior:21},//江夏属刘备
		{type:"moveCityResources", from:25, to:27, proportion:0.5},//新野部分资源全部移往江夏
		{type:"moveGeneralsToCity", generals:[],from:25, to:27},//新野武将移往江夏
		{type:"moveGeneralsToCity", generals:[],from:14, to:27, condition:{fromSeignior:21}},//宛武将移往江夏,条件：宛属刘备
		{type:"changeCitySeignior", cityId:14, seignior:1, condition:{seignior:21}},//宛属曹操,条件：宛属刘备
		{type:"moveGeneralsToCity", generals:[],from:26, to:27, condition:{fromSeignior:21}},//汝南武将移往江夏,条件：汝南属刘备
		{type:"changeCitySeignior", cityId:26, seignior:1, condition:{seignior:21}},//汝南属曹操,条件：汝南属刘备
		{type:"changeCitySeignior", cityId:25, seignior:1},//新野属曹操
		{type:"seigniorToSeignior", from:446, to:1},//刘表城池归属曹操
		{type:"generalsDie", generals:[446]},//刘表死亡
	]
},
{
	id:15,
	name:"舌战群儒",
	condition:{
		from:{year:208,month:4},
		to:{year:208,month:5},
		seignior:[17,21],
		generals:[
			{id:1,seignior:1},//曹操未灭亡
			{id:17,seignior:17},//孙权未灭亡
			{id:21,seignior:21},//刘备未灭亡
			{id:10,seignior:21},//诸葛亮属刘备
			{id:2,seignior:17},//周瑜属孙权
		],
		citys:[
		]
	},
	script:"Data/Event/{0}/szqr.txt",
	result:[
		{type:"stopBattle", seigniors:[17,21], month:12}
	]
},
{
	id:16,
	name:"苦肉の計",
	condition:{
		from:{year:208,month:7},
		to:{year:208,month:8},
		seignior:[17],
		generals:[
			{id:1,seignior:1},//曹操未灭亡
			{id:17,seignior:17},//孙权未灭亡
			{id:21,seignior:21},//刘备未灭亡
			{id:2,seignior:17},//周瑜属孙权
			{id:123,seignior:17},//黄盖属孙权
		],
		citys:[
		]
	},
	script:"Data/Event/{0}/krj.txt",
	result:[
	]
},
{
	id:17,
	name:"赤壁之战",
	condition:{
		from:{year:208,month:10},
		to:{year:208,month:12},
		seignior:[1,17,21],
		generals:[
			{id:1,seignior:1},//孙权未灭亡
			{id:17,seignior:17},//孙权未灭亡
			{id:21,seignior:21},//刘备未灭亡
			{id:10,seignior:21},//诸葛亮属刘备
			{id:2,seignior:17},//周瑜属孙权
		],
		citys:[
		]
	},
	script:"Data/Event/{0}/cbzz.txt",
	result:[
		{type:"seigniorToSeignior", from:501, to:21},//金旋城池归属刘备
		{type:"seigniorToSeignior", from:594, to:21},//赵范城池归属刘备
		{type:"seigniorToSeignior", from:605, to:21},//刘度城池归属刘备
		{type:"seigniorToSeignior", from:615, to:21},//韩玄城池归属刘备
		{type:"changeCitySeignior", cityId:16, seignior:21},//江陵属刘备
		{type:"changeCitySeignior", cityId:17, seignior:21},//武陵属刘备
		{type:"changeCitySeignior", cityId:20, seignior:21},//桂阳属刘备
		{type:"changeCitySeignior", cityId:19, seignior:21},//零陵属刘备
		{type:"changeCitySeignior", cityId:18, seignior:21},//长沙属刘备
		{type:"moveGeneralsToCity", generals:[4,89,77,358,482], to:16},//关羽关平周仓糜氏兄弟移往江陵
	]
},
{
	id:18,
	name:"士别三日",
	condition:{
		from:{year:207,month:1},
		to:{year:210,month:12},
		seignior:17,
		generals:[
			{id:13,seignior:17},
			{id:82,seignior:17}
		],
		citys:[
		]
	},
	script:"Data/Event/{0}/sbsr.txt",
	result:[{type:"reputation",generals:[13],reputation:2}],
},
{
	id:19,
	name:"西凉锦马超",
	condition:{
		from:{year:211,month:3},
		to:{year:211,month:4},
		seignior:[1,43],
		generals:[
			{id:1,seignior:1},
			{id:43,seignior:43}
		],
		citys:[
		]
	},
	script:"Data/Event/{0}/xljmc.txt",
	result:[],
},
{
	id:20,
	name:"失荆州",
	condition:{
		from:{year:219,month:6},
		to:{year:219,month:7},
		seignior:0,
		generals:[
			{id:17,seignior:17},//孙权未灭亡
			{id:13,seignior:17},//吕蒙属孙权
			{id:9,seignior:17},//陆逊属孙权
			{id:4,seignior:21,city:16},//关羽在江陵属刘备
			{id:21,seignior:21},//刘备未灭亡
			{id:89,seignior:21},//关平属刘备
			{id:77,seignior:21},//周仓属刘备
			{id:363,seignior:21},//王甫属刘备
			{id:482,seignior:21},//糜芳属刘备
			{id:536,seignior:21}//傅仕仁属刘备
		],
		citys:[
			{id:16,seignior:21},//江陵属刘备
			{id:17,seignior:21},//武陵属刘备
			{id:19,seignior:21},//零陵属刘备
		]
	},
	script:"Data/Event/{0}/sjz.txt",
	result:[
		{type:"moveGeneralsToSeignior", generals:[482,536], to:17},//糜芳傅仕仁移动到孙权手下
		{type:"moveGeneralsToCity", generals:[],from:16, to:6},//江陵武将移往成都
		{type:"moveGeneralsToCity", generals:[],from:17, to:6},//武陵武将移往成都
		{type:"moveGeneralsToCity", generals:[],from:19, to:6},//零陵武将移往成都
		{type:"generalsDie", generals:[4,89,77,363]},//关羽，关平，周仓，王甫死亡
		{type:"changeCitySeignior", cityId:16, seignior:17},//江陵属孙权
		{type:"changeCitySeignior", cityId:17, seignior:17},//武陵属孙权
		{type:"changeCitySeignior", cityId:19, seignior:17},//零陵属孙权
		{type:"moveGeneralsToCity", generals:[13,9], to:16},//吕蒙，陆逊移往江陵
		{type:"moveGeneralsToCity", generals:[482], to:17},//糜芳移往武陵
		{type:"moveGeneralsToCity", generals:[536], to:19},//傅仕仁移往零陵
	]
},
{
	id:21,
	name:"七擒孟获",
	condition:{
		from:{year:225,month:5},
		to:{year:225,month:6},
		seignior:620,
		generals:[
			{id:620,seignior:620},//刘禅未灭亡
			{id:336,seignior:336},//孟获未灭亡
			{id:10,seignior:620}//诸葛亮属刘禅
		],
		citys:[
			{id:6,seignior:620},//成都属刘禅
			{id:8,seignior:336},//建宁属孟获
			{id:9,seignior:336},//云南属孟获
		]
	},
	script:"Data/Event/{0}/qqmh.txt",
	result:[
		{type:"seigniorToSeignior", from:336, to:620},//孟获城池归属刘禅
	]
},
{
	id:22,
	name:"出师表",
	condition:{
		from:{year:228,month:1},
		to:{year:228,month:1},
		seignior:620,
		generals:[
			{id:620,seignior:620},//刘禅未灭亡
			{id:10,seignior:620}//诸葛亮属刘禅
		],
		citys:[
			{id:6,seignior:620},//成都属刘禅
		]
	},
	script:"Data/Event/{0}/csb.txt",
	result:[
	]
},
{
	id:23,
	name:"蜀灭亡",
	condition:{
		noSeignior:620,
		generals:[
			{id:611,seignior:611},//曹奂未灭亡
			{id:52,seignior:611},//司马昭属曹奂
			{id:6,seignior:611},//邓艾属曹奂
			{id:86,seignior:611},//钟会属曹奂
			{id:620,seignior:620},//刘禅未灭亡
			{id:54,seignior:620},//诸葛瞻属刘禅
			{id:7,seignior:620},//姜维属刘禅
		],
		citys:[
			{id:6,seignior:620},//成都属刘禅
		],
		cityCount:[
			{id:620,from:1,to:3},//刘禅城池个数小于等于3
		]
	},
	script:"Data/Event/{0}/smw.txt",
	result:[
		{type:"seigniorToSeignior", from:620, to:611},//刘禅城池归属曹奂
		{type:"generalsDie", generals:[6,86,54,7]},//邓艾,钟会,诸葛瞻,姜维死亡
	]
},
{
	id:24,
	name:"五虎上将",
	condition:{
		seignior:0,
		generals:[
		],
		feat_characters:1,
		generalsCount:{feat:5000,from:5,force:90,isSelect:true},
		citys:[
		]
	},
	script:"Data/Event/{0}/whsj.txt",
	result:[{type:"reputation",generals:[],reputation:1}]
},
{
	id:25,
	name:"结局:蛮族入侵,战乱四起,最终灭亡",
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:[3, 5],//五个或三个外族存在
		troopsVsTribe:{from:0, to:1.5}//兵力低于五个外族出兵总兵力的1.5倍
	},
	script:"Data/Event/{0}/mzrq.txt",
	result:[{type:"gameClear"}]
},
{
	id:26,
	name:"结局:远征蛮族,平定蛮族,蛮族年年进贡",
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:[2, 4],//二个或四个外族存在
		troopsVsTribe:{from:3, to:1000},//兵力大于外族兵力的3倍
		generalsCount:{basicPropertiesSum:360, from:20}//属性平均值超过90的武将大于20人
	},
	script:"Data/Event/{0}/yzmz.txt",
	result:[{type:"gameClear"}]
},
{
	id:27,
	name:"结局:昏君-灭亡",
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		behead:{from:20},//斩首武将超过20人
		police:{from:0,to:69}//平均治安小于70 TODO::这个应该是或的关系，需修正
	},
	script:"Data/Event/{0}/hj.txt",
	result:[{type:"gameClear"}]
},
{
	id:28,
	name:"结局:贤君",//平均治安90以上,天下太平
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:{from:0,to:5},
		police:{from:90,to:100}
	},
	script:"Data/Event/{0}/xj.txt",
	result:[{type:"gameClear"}]
},
{
	id:29,
	name:"结局:蛮族入侵-割地称臣",
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:[3, 5],
		troopsVsTribe:{from:1.5, to:3}
	},
	script:"Data/Event/{0}/xj.txt",
	result:[{type:"gameClear"}]
},
{
	id:30,
	name:"结局:远征蛮族-失败",
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:[2, 4],
		troopsVsTribe:{from:0, to:3},
		generalsCount:{basicPropertiesSum:360, to:19}
	},
	script:"Data/Event/{0}/xj.txt",
	result:[{type:"gameClear"}]
},
{
	id:31,
	name:"结局:贤君",//远征蛮族-失败
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:{from:0,to:5},
		police:{from:90,to:100}
	},
	script:"Data/Event/{0}/xj.txt",
	result:[{type:"gameClear"}]
},
{
	id:32,
	name:"结局:贤君",//贤君-商业大国
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:{from:0,to:5},
		police:{from:90,to:100}
	},
	script:"Data/Event/{0}/xj.txt",
	result:[{type:"gameClear"}]
},
{
	id:33,
	name:"结局:贤君",//贤君-商业大国
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:{from:0,to:5},
		police:{from:90,to:100}
	},
	script:"Data/Event/{0}/xj.txt",
	result:[{type:"gameClear"}]
},
{
	id:34,
	name:"结局:贤君",//贤君-文明大国
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:{from:0,to:5},
		police:{from:90,to:100}
	},
	script:"Data/Event/{0}/xj.txt",
	result:[{type:"gameClear"}]
},
{
	id:35,
	name:"结局:贤君",//汉室复兴-汉室延长
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:{from:0,to:5},
		police:{from:90,to:100}
	},
	script:"Data/Event/{0}/xj.txt",
	result:[{type:"gameClear"}]
},
{
	id:36,
	name:"结局:贤君",//汉室复兴-苟延残喘
	condition:{
		seignior:0,
		generals:[
		],
		citys:[
		],
		clear:1,
		tribe:{from:0,to:5},
		police:{from:90,to:100}
	},
	script:"Data/Event/{0}/xj.txt",
	result:[{type:"gameClear"}]
}
];
