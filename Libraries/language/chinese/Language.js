function Language(){
	var self = this;
}
Language.get = function(key){
	return Language.data[key] || key;
};
Language.getCity = function(key){
	return Language.cityData[key] || key;
};
Language.getCharacter = function(key){
	return Language.characterData[key] || key;
};
Language.getSoldier = function(key){
	return Language.soldierData[key] || key;
};
Language.getSingleCombat = function(key){
	return Language.singleCombatData[key] || key;
};
Language.getAngryTalk = function(key){
	return Language.angryTalkData[key] || key;
};
Language.getDieTalk = function(key){
	return Language.dieTalkData[key] || key;
};
Language.getUnderArrestTalk = function(key){
	return Language.underArrestTalkData[key] || key;
};
Language.getSkillName = function(key){
	return Language.skillNameData[key] || key;
};
Language.groupSkillTalk = function(){
	var index = Math.random() * Language.groupSkillTalkData.length >>> 0;
	return Language.groupSkillTalkData[index];
};
Language.data = {
	"disposition":"性格",
	"disposition_0":"胆小",
	"disposition_1":"冷静",
	"disposition_2":"勇敢",
	"disposition_3":"鲁莽",
	
	"status_AttackAid_up":"攻击上升",
	"status_AttackAid_down":"攻击下降",
	"status_DefenseAid_up":"防御上升",
	"status_DefenseAid_down":"防御下降",
	"status_ApiritAid_up":"精神上升",
	"status_ApiritAid_down":"精神下降",
	"status_BreakoutAid_up":"暴发上升",
	"status_BreakoutAid_down":"暴发下降",
	"status_MoraleAid_up":"士气上升",
	"status_MoraleAid_down":"士气下降",
	"status_Poison":"毒",
	"status_Fixed":"定身",
	"status_Chaos":"混乱",
	"status_BanIncantation":"禁咒",
	
	"return":"返回",
	"execute":"执行",
	"who_can_do":"派谁去?",
	"tab_equipment":"装备",
	"tab_skill":"技能",
	"tab_arms":"兵种",
	"tab_lineups":"阵型",
	"tab_status":"状态",
	"tab_properties":"属性",
	
	"single_command_attack":"轻击",
	"single_command_double_attack":"连击",
	"single_command_big_attack":"重击",
	"single_command_defence":"防御",
	"single_command_dodge":"躲闪",
	"single_command_charge":"集气",
	"single_command_backstroke_attack":"诈败",
	"single_command_special_attack":"怒击",
	
	"action_end_error":"行动已结束！",
	"can_not_operating":"不可操作{0}",
	"belong_self":"我军",
	"belong_enemy":"敌军",
	"belong_friend":"友军",
	"belong_self_action":"我军行动",
	"belong_enemy_action":"敌军行动",
	"belong_friend_action":"友军行动",
	
	"strategy_weather_error":"无法在此天气使用!",
	"ctrl_Chaos_error":"混乱中!",
	
	"menu":"菜单",
	"operating_end":"操作结束",
	"game_save":"保存进度",
	"game_read":"读取进度",
	"return_top":"回主页面",
	"confirm":"确认",
	"dialog_select_generals":"请选择武将！",
	"dialog_character_troops_error":"{0}没有分配士兵!",
	"dialog_no_money":"金钱不够！",
	"dialog_error_hire_more":"一次只能录用一个在野武将！",
	"dialog_move_generals_confirm":"要移动到{0}吗？",
	"dialog_move_generals_error":"无法移动到此城池！",
	"dialog_spy_generals_confirm":"要对{0}进行谍报吗？",
	"dialog_spy_generals_error":"无法对此城池进行谍报！",
	"dialog_expedition_select_error":"无法攻击此城市！",
	"dialog_expedition_select_confirm":"要对{0}发动攻击吗？",
	"dialog_expedition_select_leader":"请选择主将！",
	"dialog_select_leader_error":"只能选一个主将！",
	"dialog_select_onlyone_error":"只能选一个武将！",
	"select_leader":"选择主将",
	"dialog_remove_equipment_confirm":"要解除装备{0}吗？",
	"dialog_select_seignior_confirm":"选择{0}吗？",
	"name":"姓名",
	"proficiency":"熟练度",
	"magicAttack":"法攻",
	"magicDefense":"法防",
	"speed":"速度",
	"dodge":"躲闪",
	"strategy":"谋略",
	
	"equipment_name_1":"木剑",
	"equipment_name_2":"布帽",
	"equipment_name_3":"布衣",
	
	"label_equip":"装备",
	"label_use":"使用",
	"label_sale":"出售",
	
	"belong":"所属",
	"identity":"身份",
	"city":"城池",
	"status":"状态",
	"effect":"效果",
	
	"force":"武力",
	"command":"统率",
	"intelligence":"智力",
	"agility":"敏捷",
	"luck":"运气",
	"sc_angry":"怒气",
	
	"attack":"攻击",
	"spirit":"策略",
	"defense":"防御",
	"breakout":"爆发",
	"morale":"士气",
	"movePower":"移动力",
	"physicalFitness":"体力",
	
	"monarch":"君主",
	"general":"一般",
	"nothing":"无",
	"seignior":"势力",
	"prefecture":"太守",
	"generals":"武将",
	"captive":"俘虏",
	"business":"商业",
	"agriculture":"农业",
	"technology":"技术",
	"police":"治安",
	"money":"金钱",
	"food":"兵粮",
	"troops":"兵力",
	"city_defense":"城防",
	"repair":"修补",
	"big_map":"大地图",
	"expedition":"出征",
	"arm_expedition":"预备兵力",
	"generals_list":"武将一览",
	"generals_move":"武将移动",
	"move_start":"移动开始",
	"arm_properties":"备战属性",
	"basic_properties":"基本属性",
	"ability_properties":"能力属性",
	"cutover":"切换",
	"spy":"谍报",
	"transport":"输送物资",
	"diplomacy":"外交",
	"access":"访问",
	"hire":"登用",
	"explore":"探索",
	"enlist":"招募",
	"arm_list":"军队一览",
	"arm_enlist":"招募军队",
	"arm_name":"军队名称",
	"training":"训练",
	"strengthen":"强化",
	"research":"研究",
	"population":"人口",
	"out_of_office":"在野",
	
	"loyalty":"忠诚度",
	
	"market":"市场",
	"official":"官府",
	"barrack":"兵营",
	"farmland":"农地",
	"institute":"太学院",
	"tavern":"酒馆",
	"citygate":"城门",
	
	"idle":"空闲",
	"move":"移动",
	"end":"结束",
	
	"city_title":"{0}年{1}月  {2}  ({3})",
	
	"skill_name_1":"雷霆怒击",
	"skill_name_2":"万众一心",
	"skill_name_3":"隔山打牛",
	"skill_name_4":"天下无双",
	"skill_name_5":"愈战愈勇",
	"skill_name_9":"嗜血",
	
	"null":"无",
	"single_combat_ask":"敌将{0}敢与我大战三百回合吗？",
	"single_combat_answer_ok":"那就让你做我的刀下鬼吧！",
	"single_combat_answer_no":"你还不配和我交手!",
	
	"leader_change_talk":"糟糕!因为主将撤退，军队一盘散沙，能力都下降了。那就由我暂代主将来指挥战斗吧！",
	"gameover":"游戏结束"
};
Language.characterData = {
	"character_1":"刘备",
	"character_2":"关羽",
	"character_3":"张飞",
	"character_4":"赵云",
	"character_5":"马超",
	"character_6":"黄忠",
	"character_7":"魏延",
	"character_8":"曹操",
	"character_9":"许褚",
	"character_10":"典卫",
	"character_11":"夏侯惇",
	"character_12":"夏侯渊",
	"character_13":"张辽",
	"character_14":"张郃",
	"character_15":"孙权",
	"character_16":"孙策",
	"character_17":"甘宁",
	"character_18":"太史慈",
	"character_19":"周泰",
	"character_20":"程普",
	"character_21":"黄盖",
	"character_22":"吕布",
	"character_23":"董卓",
	"character_24":"华雄",
	"character_25":"颜良",
	"character_26":"文丑",
	"character_27":"袁绍",
	"character_28":"公孙赞",
	"character_29":"曹彰"
};
Language.cityData = {
	"city_1":"西凉",
	"city_2":"天水",
	"city_3":"武都",
	"city_4":"安定",
	"city_5":"梓橦",
	"city_6":"成都",
	"city_7":"江洲",
	"city_8":"建宁",
	"city_9":"南蛮",
	"city_10":"交趾",
	"city_11":"汉中",
	"city_12":"长安",
	"city_13":"永安",
	"city_14":"宛",
	"city_15":"襄阳",
	"city_16":"江陵",
	"city_17":"武陵",
	"city_18":"长沙",
	"city_19":"零陵",
	"city_20":"桂阳",
	"city_21":"南海",
	"city_22":"洛阳",
	"city_23":"河内",
	"city_24":"许昌",
	"city_25":"新野",
	"city_26":"汝南",
	"city_27":"江夏",
	"city_28":"柴桑",
	"city_29":"庐江",
	"city_30":"建业",
	"city_31":"吴",
	"city_32":"会稽",
	"city_33":"谯",
	"city_34":"寿春",
	"city_35":"小沛",
	"city_36":"下邳",
	"city_37":"徐州",
	"city_38":"北海",
	"city_39":"陈留",
	"city_40":"濮阳",
	"city_41":"邺",
	"city_42":"晋阳",
	"city_43":"平原",
	"city_44":"南皮",
	"city_45":"蓟",
	"city_46":"北平",
	"city_47":"襄平",
	"city_48":"乌丸",
	"city_49":"山越",
	"city_50":"羌",
	"city_51":"氐",
	"city_52":"匈奴"
};
Language.soldierData = {
	"explanation_jj":"君主类兵种１。均衡发展的万能型部队。在攻击、策略两方面都相当活跃。",
	"explanation_zh":"君主类兵种２。可以攻击的范围更广，万能的趋向更为明显。",
	"explanation_jw":"君主类兵种３。较差的移动力也提升了，成为各方面都很有利的部队。",
	"explanation_qbb":"步兵类兵种１。防御力优秀的部队。对付弓兵类时，以强大的攻击力为傲；但是攻击骑兵类的部队时，表现一般。",
	"explanation_zbb":"步兵类兵种２。若能发挥其强大的防御力，可以使其成为我军部队的壁垒。对策略的抵抗力也强。",
	"explanation_jwb":"步兵类兵种３。移动力上升，可以抵御敌人的猛攻。是非常值得倚赖的部队。",
	"explanation_gb":"弓兵类兵种１。擅长远距攻击的部队。对骑兵类的攻击效果极高，但相反地对步兵类的防御效果极弱，这点还请留意。",
	"explanation_nb":"弓兵类兵种２。射程更广，更易于运用。并且可射出致命一箭。",
	"explanation_lnb":"弓兵类兵种３。只有百步穿杨的高手才能率领的部队。其射程之广可说超群卓绝。",
	"explanation_qqb":"骑兵类兵种１。移动力与攻击力优异的部队。对步兵类的防御力很强，但是对弓箭、炮车的抵抗力较弱。",
	"explanation_zqb":"骑兵类兵种２。发挥其高速的移动力，可以冲锋陷阵。不过必须留意不可孤军深入。",
	"explanation_qwd":"骑兵类兵种３。移动力已经进一步提升，务必让此兵种活跃于前线，冲垮阻挡的所有敌军！",
	"explanation_gqb":"弓骑兵类兵种１。移动力出色的远距攻击部队。所有远距攻击部队对付骑兵类时，具有值得夸耀的强大攻击力。",
	"explanation_nqb":"弓骑兵类兵种２。弓骑兵类比弓兵类的射程小，但是攻击力高，可给予敌军很大的伤害。",
	"explanation_lnqb":"弓骑兵类兵种３。移动力、射程都相对提升。与骑兵类配合时威力更大。",
	"explanation_qpc":"炮车类兵种１。射程无与伦比的远距攻击部队。用心锻炼的话，将来会有相当强的战力。",
	"explanation_zpc":"炮车类兵种２。攻击影响范围更大，可以给予更多敌军造成损伤。",
	"explanation_plc":"炮车类兵种３。移动力、射程均上升，擅长的远距攻击将使我方迈向胜利之路。",
	"explanation_whj":"武术家类兵种１。爆发力出色的部队。成功率高的防御和两段攻击是其魅力所在，也可以施展策略。",
	"explanation_qsi":"武术家类兵种２。可攻击的范围更广，更容易运用。可以凭借着敏捷的移动力，玩弄敌军于股掌之间。",
	"explanation_qse":"武术家类兵种３。拳圣是武艺已经登峰造极的人才能够获取的称号。其移动力也已经提升了。",
	"explanation_zb":"贼兵类兵种１。攻击力强大、士气高昂的部队。在山地、荒地可以发挥其真正的本领。对付敌军时，致命一击可期。",
	"explanation_yz":"贼兵类兵种２。贼兵类可以施展地类的策略，将敌人诱入对自己有利的地形，然后一网打尽！",
	"explanation_hj":"贼兵类兵种３。移动方面已提升。可以凭借出现率高的致命一击打垮敌人。",
	"explanation_cs":"策士类兵种１。施展攻击类策略的文官部队。擅长火类、水类、地类的策略。",
	"explanation_cm":"策士类兵种２。能够施展更加强力的攻击类策略，尤其擅长对付精神力低下的敌人。",
	"explanation_js":"策士类兵种３。究极的破坏力相当惊人！但是最怕被敌人绕到后方攻击。",
	"explanation_fsis":"风水士类兵种１。施展恢复类策略的文官部队。是作战时不可缺少的后方支援部队。",
	"explanation_fsus":"风水士类兵种２。移动力上升，可以支援更多的我军部队。",
	"explanation_xsus":"风水士类兵种３。移动力更加提升。陷入窘境时，可以驰援而来的可靠部队。",
	"explanation_ds":"道士类兵种１。施展妨碍类策略的文官部队。可运用诡异的策略削减敌人的战力。",
	"explanation_hss":"道士类兵种２。道士类的最大之优点在于拥有许多不受天候地形影响的策略。可说非常方便。",
	"explanation_yss":"道士类兵种３。移动力上升。可运用神出鬼没的策略，逼使敌人的精神状态陷入窘境。",
	"explanation_qcs":"骑马策士类兵种１。施展攻击类策略的文官部队，以移动力与骑兵类相同而自豪。",
	"explanation_qcm":"骑马策士类兵种２。擅长火类、风类的策略，只有骑马策士能够使用改变天气的策略。",
	"explanation_qjs":"骑马策士类兵种３。移动力更加快捷。可做为骑兵类、弓骑兵类的后援，大显身手。",
	"explanation_wun":"舞女类兵种１。就能力而言，可说是武术家的女性翻版。可恢复周遭我军部队的异常状态。",
	"explanation_wuj":"舞女类兵种２。攻击范围广阔，可施展的策略虽少，不过个个都非常好用。",
	"explanation_wunv":"舞女类兵种３。移动力上升。运用其敏捷的身手，便可纵横战场。",
	"explanation_xlqb":"攻击力、防御力均出众的部队。说它是武官类最强的部队，一点也不为过。缺点是对策略较无抵抗力。",
	"explanation_hjz":"以武力揭竿而起的太平道信徒。由于头裹黄巾，人称黄巾军。",
	"explanation_hd":"可在水上地形发挥强大战力的部队。不在敌人有利的地形作战，是其作战的要诀。",
	"explanation_xxs":"率领攻击力强大的熊作战的部队。每次攻击还具有令敌人麻痹的附加效果。对弓箭和策略的抵抗力差。",
	"explanation_xhs":"率领爆发力出众的虎作战的部队。突击时会导致两个敌军反击，这点还请留意。对弓箭和策略的抵抗力差。",
	"explanation_dd":"可在水上地形发挥战力的文官部队。攻击力也很高，如果轻视文官，是会吃大亏的。",
	"explanation_zss":"可以施展攻击、妨碍、恢复三类策略的文官部队。可说是文官类最强的。千万要留意！",
	"explanation_qlq":"青龙骑兵",
	"explanation_bhq":"白虎步兵",
	"explanation_xwn":"玄武弩兵",
	"explanation_zqn":"朱雀弩骑",
};
Language.singleCombatData = {
	"Debut0":"做我{0}的刀下鬼吧！",
	"Debut1":"让你见识一下{0}的厉害！",
	"Debut2":"听过{0}的大名吗！",
	"Debut3":"在下{0}讨教敌将高招！",
	"Back0":"好厉害，还是撤退吧！",
	"Back1":"三十六计走为上！",
	"Back2":"我认输了！",
	"Back3":"算你狠，我可不想死！",
	"Pursuit0":"休想逃跑！",
	"Pursuit1":"留下你的脑袋！",
	"Back_attack0":"你上当了！",
	"Back_attack1":"你太笨了！",
	"Back_attack2":"有勇无谋之辈！"
};
Language.angryTalkData = {
	"angry_talk_0_0":"啊啊啊啊啊啊啊……",
	"angry_talk_0_1":"哦哦哦哦哦哦哦……",
	"angry_talk_0_2":"呀呀呀呀呀呀呀……",
	"angry_talk_1_0":"这是万民的愤怒!",
	"angry_talk_1_1":"吃我双剑吧!",
	"angry_talk_1_2":"为了复兴汉室!"
};
Language.dieTalkData = {
	"die_talk_0_0":"啊啊啊啊啊啊啊……",
	"die_talk_0_1":"哦哦哦哦哦哦哦……",
	"die_talk_0_2":"呀呀呀呀呀呀呀……",
	"die_talk_1_0":"这是万民的愤怒!",
	"die_talk_1_1":"吃我双剑吧!",
	"die_talk_1_2":"为了复兴汉室!"
};
Language.underArrestTalkData = {
	"under_arrest_talk_0_0":"竟然被抓了，真是太丢人了!",
	"under_arrest_talk_0_1":"哎呀！放开我!",
	"under_arrest_talk_0_2":"糟糕了!"
};
Language.skillNameData = {
	"group_1":"桃园情谊!"
};
Language.groupSkillTalkData = [
	"痛快，一起上!",
	"开始攻击!",
	"看我的!",
	"哈哈，我来了!"
];