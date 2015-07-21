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
	
	"menu":"菜单",
	"operating_end":"操作结束",
	"game_save":"保存进度",
	"game_read":"读取进度",
	"return_top":"回主页面",
	"confirm":"确认",
	"dialog_select_generals":"请选择武将！",
	"dialog_no_money":"金钱不够！",
	"dialog_error_hire_more":"一次只能录用一个在野武将！",
	"dialog_move_generals_confirm":"要移动到{0}吗？",
	"dialog_move_generals_error":"无法移动到此城市！",
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
	
	"monarch":"君主",
	"general":"一般",
	"nothing":"无",
	"seignior":"势力",
	"prefecture":"太守",
	"generals":"武将",
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
	"intelligence":"谍报",
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
	
	"null":"无",
	"single_combat_ask":"敌将{0}敢与我大战三百回合吗？",
	"single_combat_answer_ok":"那就让你做我的刀下鬼吧！",
	"single_combat_answer_no":"你还不配和我交手!",
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
	"explanation_yx":"万能型部队，万能型部队，万能型部队，万能型部队，万能型部队，万能型部队，万能型部队"
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
Language.skillNameData = {
	"group_1":"桃园情谊!"
};
Language.groupSkillTalkData = [
	"痛快，一起上!",
	"开始攻击!",
	"看我的!",
	"哈哈，我来了!"
];