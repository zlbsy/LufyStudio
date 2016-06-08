var Job = {
	IDLE:"idle",
	MOVE:"move",
	REPAIR:"repair",
	AGRICULTURE:"agriculture",
	BUSINESS:"business",
	POLICE:"police",
	TECHNOLOGY:"technology",
	ENLIST:"enlist",
	HIRE:"hire",
	SPY:"spy",
	ACCESS:"access",
	EXPLORE_AGRICULTURE:"explore_agriculture",
	EXPLORE_BUSINESS:"explore_business",
	TRANSPORT : "transport_job",
	TRAINING : "training",
	DIPLOMACY_REDEEM:"diplomacy_redeem",
	DIPLOMACY_STOP_BATTLE:"diplomacy_stop_battle",
	LEVEL_UP:"levelUp",
	PERSUADE:"persuade",
	END:"end"
};
var JobPrice = {
	AGRICULTURE:200,
	BUSINESS:200,
	POLICE:200,
	TECHNOLOGY:200,
	REPAIR:200,
	SPY:300,
	LEVEL_UP:50000,
	TRAINING:200,
	ENLIST:500,//征兵价格
	PRIZE:200,//褒奖
};
var JobCoefficient = {
	NORMAL:90,
	REPAIR:0.2,
	AGRICULTURE:0.5,
	BUSINESS:0.5,
	POLICE:0.03,
	TECHNOLOGY:0.5,
	SPY:75,
	ENLIST:0.25,
	ACCESS:0.0024,
	EXPLORE_AGRICULTURE:75,
	EXPLORE_BUSINESS:75,
	DIPLOMACY:0.15,
	REDEEM:2,
	STOP_BATTLE:350,
	COMPATIBILITY:75,
	TRAINING:0.2
};
/*任务转功绩系数*/
var JobFeatCoefficient = {
	NORMAL:20,
	TRAINING:30,
	REPAIR:40,
	AGRICULTURE:100,
	BUSINESS:100,
	POLICE:6,
	TECHNOLOGY:100,
	ENLIST:100
};
var JobMax = {
	AGRICULTURE:[3000,4000,5000,6000,7000],
	BUSINESS:[3000,4000,5000,6000,7000],
	POLICE:[3000,4000,5000,6000,7000],
	TECHNOLOGY:[3000,4000,5000,6000,7000],
	REPAIR:[3000,4000,5000,6000,7000],
};

var AiEnlistFlag = {
	None:0,//爆满
	Must:1,//必须征兵
	Need:2,//需要征兵
	Battle:3,//战斗准备征兵
	MustResource:4,//物资极缺
	NeedResource:5,//物资短缺
	BattleResource:6,//战斗准备物资
	Free:7//充足
};
//收获月份
var HarvestMonths = {
	Food:[7],
	Money:[3,6,9,12]
};
var TribeAIProbability = 0.1;
var TribeFriendlyCharacters = [23, 43, 73, 141, 145, 317, 336, 351, 516];