/*****
 * TODO::ver1.1官职系统，下个版本加入
 */
/*
* id:武将id
* name：备注武将名，使用language
* faceImg：头像
* minFace：小头像范围
* disposition : 0胆小，1冷静，2勇敢，3鲁莽
* skill：特技
* force：武力
* intelligence：智力
* command：统率
* agility：敏捷
* luck：运气
* compatibility : 相性 1-150
* personalLoyalty ： 义气 1-15
* childs : 子[id,id]
* father : 父id
* soldiers：初始可带兵种［{id:兵种ID,proficiency:熟练度,img:兵种形象ID}］(熟练度 : 精通S，熟练A，普通B，略懂C，不会D) 用兵符升级 D+1=C,C+2=B,B+3=A,A+4=S
* */
/*
var characterList = [
	{id:1,name:"刘备",faceImg:6,minFace:[0,23,151,151],disposition:0,skill:30,force:78,intelligence:76,command:72,agility:74,luck:100,compatibility:75,initTroops:100,initStrategy:20,personalLoyalty:10,
		soldiers:[{id:1,proficiency:500},{id:2,proficiency:100}],angryTalks:["angry_talk_1_0","angry_talk_1_1","angry_talk_1_2"],groupSkill:1},
	{id:2,name:"关羽",faceImg:7,minFace:[15,67,100,100],disposition:2,skill:3,force:96,intelligence:90,command:98,agility:68,luck:62,compatibility:75,initTroops:100,initStrategy:20,personalLoyalty:10,
		soldiers:[{id:2,proficiency:700,img:2},{id:1,proficiency:500,img:2},],groupSkill:1}
];*/
//刘备，关羽，张飞，赵云，马超，黄忠，魏延
//曹操，许褚，典卫，夏侯惇，夏侯渊，张辽，张郃
//孙权，孙策，甘宁，太史慈，周泰，程普，黄盖
//吕布，董卓，华雄，颜良，文丑，袁绍，公孙赞，曹彰
/*
 0品：125%
 1品：120%
 2品：115%
 3品：110%
 4品：105%
 5品：100%
 6品：95%
 7品：90%
 8品：85%
 9品：80%
 * */
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
];