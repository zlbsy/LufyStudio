Language.getDictionary = function(key){
	return Language.dictionaryData[key] || key;
};
Language.dictionaryData = {
	"business":"商业影响城池的金钱收入，武将的智力和敏捷越高，执行商业的效率也就越高。另外武将也可以通过商业提高自身的运气经验。执行商业有一定几率碰到商人，可以买一些道具。",
	"agriculture":"农业影响城池的粮食收入，武将的智力和武力越高，执行农业的效率也就越高。另外武将也可以通过农业提高自身的敏捷经验。经常执行农业可以有效避免蝗害。",
	"technology":"技术影响训练的强度，武将的智力和统率越高，执行技术的效率也就越高。另外武将也可以通过技术提高自身的智力经验。经常执行技术可以有效避免水灾。",
	"police":"治安影响城市的人口增长，武将的武力和敏捷越高，执行治安的效率也就越高。另外武将也可以通过治安提高自身的武力经验。",
	"city_defense":"城防越高，防守战时战场上的防御设施越多。",
	"repair":"修补能提高城防，武将的武力和统率越高，执行修补的效率也就越高。另外武将也可以通过修补提高自身的武力经验。",
	"spy":"谍报可以获取到敌方势力的城池信息。",
	"transport":"输送物资可以将城池内的资源移动到另一个城池。",
	"enlist":"武将的运气和统帅越高，招募的士兵就越多。另外人口在一定程度上也会影响招募士兵的多少。",
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
	"military":"军师计只有守城战的时候可以使用，且只能使用一次。",
	"soldiers_image":"普通的兵种是可以升级的，升级后的兵种在战场上使用时，形象周围会有光晕环绕。",
	"growing":"能力成長指的是兵种的能力成长。兵种的能力成长有攻击力，精神，防御力，爆发力，士气五种。这五种能力分别对应武将的武力，智力，统帅，敏捷，运气。兵种的能力随着势力等级的上升而提升，每级上升的值由兵种的成长特性（Ｓ→Ａ→Ｂ→Ｃ）和武将的能力来决定。下面的表是武将能力和兵种特性之间的关系。\nーーーーーーーーーーーーーーーーーーーー\n武将的基本属性・兵种特性	｜Ｓ｜A｜B｜C\n９０以上　　　　　　　　	｜4 ｜3 ｜3 ｜2\n７０以上８9以下　 　　　	｜3 ｜3 ｜2 ｜2\n５０以上６9以下 　　　　	｜3 ｜2 ｜2 ｜1\n４9以下　　　　　	　　　	｜2 ｜2 ｜1 ｜1\nーーーーーーーーーーーーーーーーーーーー\n势力等级为0时的能力为［关联的基本属性 / ２］。比如说计算攻击力的时候，［武将的武力 / ２］是势力等级为0时的数值。往后每升1级以後、按照上面的表来计算上升后的能力。所以，等级为P时能力的计算公式为：［关联的基本属性 / ２］＋［Ｐ×势力等级］。举例：兵种成长属性为S，武力为８８的武将，如果装备上武力+2的武器，那么武力就达到９０以上了，这样就能获得更高的能力成长了。",
	"breakthrough":"初级兵种的成长分为（Ｓ→Ａ→Ｂ→Ｃ），成长的数值固定为（4→3→2→1），而高级兵种是可以突破这个界限的，例如当一个武将的武力为98的时候，他的能力高出了S成长需要的90，初级兵种只能获得4的成长，而突破成长后的高级兵种，可以获得4+的成长，能力越高，成长也就越高。",
	"equipment_strengthen":"每个装备可以通过强化来增加属性或者特技，强化装备只能在装备之后进行，并且需要消耗强化石，没有强化石无法强化装备。",
	"strengthen_stone":"强化石可以用来强化装备，强化石有战、法、辅、佐四个种类，分别用来强化不同的属性，强化石分为黄、绿、蓝、紫、红五个等级。通过探索可以获得黄、绿强化石，执行商业，农业，技术等会有小几率获取蓝、紫强化石，比武大会获得冠军有一定概率获得最高级的红强化石。另外，成功挑战《历史战役》可以获得大量的蓝、紫、红强化石。",
	"historical_battle":"历史战役与游戏统一无关，打赢后可以获得一些的强化石，目前预计总共20~30个战役，本次更新6个战役，以后更新会陆续添加。另外关于历史战役的难度以及奖励都还处于尝试阶段，如果大家有意见不妨到《三国记手游》贴吧发帖告诉我，以后更新我会进行调整。",
	"game_endding":"游戏结局一共12种，各条件如下：\n"
	+"<蛮族入侵之灭亡>\n"
	+"1,五个或三个外族存在\n"
	+"2,总兵力低于五个外族总兵力的2倍\n"
	+"<蛮族入侵之割地>\n"
	+"1,五个或三个外族存在\n"
	+"2,总兵力高于五个外族总兵力的2倍且低于4倍\n"
	+"<远征蛮族之大胜>\n"
	+"1,二个或四个外族存在\n"
	+"2,总兵力高于五个外族总兵力的4倍\n"
	+"3,属性平均值超过90的武将超过20人\n"
	+"<远征蛮族之败归>\n"
	+"1,二个或四个外族存在\n"
	+"2,总兵力低于五个外族总兵力的4倍\n"
	+"3,属性平均值超过90的武将小于20人\n"
	+"<汉室复兴之延续>\n"
	+"1,君主姓刘且手下有刘姓武将，且刘姓武将忠诚全满\n"
	+"2,商业农业技术平均值超过最大值的50%,治安超过80\n"
	+"<汉室复兴之残喘>\n"
	+"1,君主姓刘且手下有刘姓武将，且刘姓武将忠诚全满\n"
	+"2,商业农业技术平均值低于最大值的50%,或者治安低于80\n"
	+"<昏君之灭亡>\n"
	+"1,没有等级最大防御力最大的城池\n"
	+"2,武力90以上的武将忠诚低于100\n"
	+"3,斩首武将超过20人或者平均治安小于70\n"
	+"<昏君之分裂>\n"
	+"1,至少有一个等级最大防御力最大的城池\n"
	+"2,武力90以上的武将忠诚低于100\n"
	+"3,斩首武将超过20人或者平均治安小于70\n"
	+"<商业大国>\n"
	+"1,斩首武将不超过20人\n"
	+"2,平均治安大于80\n"
	+"3,商业平均值超过最大值的80%\n"
	+"4,农业平均值超过最大值的80%\n"
	+"5,未集齐80%宝物\n"
	+"6,外族全灭\n"
	+"<文明大国>\n"
	+"1,斩首武将不超过20人\n"
	+"2,平均治安大于80\n"
	+"3,技术平均值超过最大值的80%\n"
	+"4,集齐80%宝物\n"
	+"5,外族全灭\n"
	+"<超级强国>\n"
	+"1,斩首武将不超过20人\n"
	+"2,平均治安大于80\n"
	+"3,商业平均值超过最大值的80%\n"
	+"4,农业平均值超过最大值的80%\n"
	+"5,技术平均值超过最大值的80%\n"
	+"6,集齐80%宝物\n"
	+"7,外族全灭\n"
	+"<西晋王朝>\n"
	+"未达成上述结局条件，自动进入西晋王朝结局\n",
};