Language.getDictionary = function(key){
	return Language.dictionaryData[key] || key;
};
Language.dictionaryData = {
	"business":"商业影响城池的金钱收入，武将的智力和敏捷越高，执行商业的效率也就越高。另外武将也可以通过商业提高自身的运气经验。",
	"agriculture":"农业影响城池的粮食收入，武将的智力和武力越高，执行农业的效率也就越高。另外武将也可以通过农业提高自身的敏捷经验。",
	"technology":"技术影响训练的强度，武将的智力和统率越高，执行技术的效率也就越高。另外武将也可以通过技术提高自身的智力经验。",
	"police":"治安影响城市的人口增长，武将的武力和敏捷越高，执行治安的效率也就越高。另外武将也可以通过治安提高自身的武力经验。",
	"city_defense":"城防越高，防守战时战场上的防御设施越多。",
	"repair":"修补能提高城防，武将的武力和统率越高，执行修补的效率也就越高。另外武将也可以通过修补提高自身的武力经验。",
	"spy":"谍报可以获取到敌方势力的城池信息。",
	"transport":"输送物资可以将城池内的资源移动到另一个城池。",
	"training":"训练可以提高兵种的熟练度，训练的上限是500，武将的综合能力越高，执行训练的效率也就越高。另外武将也可以通过训练提高自身的统率经验。",
	"population":"人口的在一定程度上会影响招募士兵的多少。",
	"explore":"通过探索可以搜集到散落在各个城池的装备。市场可以探索到马匹、头盔以及书籍，武将的智力、敏捷和运气越高，市场上探索的成功率就越高。农场可以探索到武器和铠甲，武将的智力、武力和运气越高，农场上探索的成功率就越高。",
	"generals_move":"武将移动指令可以让武将在两个城池之间移动。",
	"money":"每三个月收入一次金钱，城池的商业越高，收入的金钱也就越多。",
	"food":"每年7份收入一次粮食，城池的农业越高，收入的粮食也就越多。",
	"prefecture":"君主所在之外的城池都可以任命太守，太守每个月都会获得少量额外的功绩，且防守战必须出战。",
	"appoint":"委任分为重视内政、重视探索、重视军事和随机发展四种，委任后电脑会根据委任的内容自己发展。",
	"loyalty":"武将的忠诚度低的话，可能会被其他势力挖走，通过褒奖或者分配装备能够提高武将的忠诚度。",
	"exp":"在战场上可以得到经验，战斗结束后，经验会换算为功绩。",
	"feat":"功绩决定武将的等级，功绩可以通过做内政或者打仗来获得。",
	"generals_lv":"武将的等级会决定武将所带的兵力、MP以及能够使用的策略。",
	"seignior_lv":"势力等级等于我军所有武将的平均等级，势力等级决定了武将的攻击，防御，精神，爆发以及士气。",
	"life":"每个武将达到自己特定的寿命之后就会死亡，想要延长武将的寿命，可以装备「延寿符」。",
	"proficiency":"兵种的熟练度越高，武将使用该兵种的时候，攻击，防御，精神，爆发以及士气就会越高。熟练度到达500之前，可以通过训练来提升，500之后只能通过在战场上锻炼来提升。",
	"treat":"治疗不消耗预备兵力，但是只能治愈伤兵，如果没有伤兵的话，治疗就无效了。",
	"single_command_heal":"回复需要消耗预备兵力来回复兵力，如果没有足够的预备兵力，回复就无法使用了。",
	"wounded":"武将战场上受到攻击后，会产生一定量的伤兵，伤兵可以通过治疗来治愈，伤兵的多少可以通过武将的属性来查看。",
	"breakthrough":"武将战场上受到攻击后，会产生一定量的伤兵，伤兵可以通过治疗来治愈，伤兵的多少可以通过武将的属性来查看。",
};