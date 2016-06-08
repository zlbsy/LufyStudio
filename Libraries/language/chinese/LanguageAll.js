Language.get = function(key){
	return Language.dataSimple[key] || Language.data[key] || key;
};
Language.getItem = function(key){
	return Language.itemData[key] || key;
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
Language.getSkill = function(key){
	return Language.skillData[key] || key;
};
Language.groupSkillTalk = function(){
	var index = Math.random() * Language.groupSkillTalkData.length >>> 0;
	return Language.groupSkillTalkData[index];
};
Language.data = {
	"size_1":"微",
	"size_2":"小",
	"size_3":"中",
	"size_4":"大",
	"size_5":"巨",
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
	"status_Burn":"燃烧",
	
	"can_not_move":"现在无法移动!",
	"use_strategy_terrain_error":"{0}无法在此地形下使用!",
	"use_strategy_belong_error":"不可对{0}使用!",
	
	"quantity_of_month":"({0}个月)",
	"exp":"经验",
	"treat":"治疗",
	"troops_plus":"兵力+{0}",
	"StrategyEffectType.1":"攻击",
	"StrategyEffectType.2":"状态变化",
	"StrategyEffectType.3":"能力变化",
	"StrategyEffectType.4":"觉醒",
	"StrategyEffectType.5":"治疗",
	
	"bout":"回合",
	"bout_label":"第{0}回合",
	"battle_title":"{0}之战",
	
	"reputation":"称号",
	"reputation_tiger":"五虎上将",
	"reputation_sbsr":"士别三日",
	
	"event_1":"桃园结义",
	"event_2":"反董卓联盟",
	"event_3":"迁都长安",
	"event_4":"连环计",
	"event_5":"报仇雪恨",
	"event_6":"三让徐州",
	"event_7":"白门楼",
	"event_8":"煮酒论英雄",
	"event_9":"官渡之战",
	"event_10":"乌巢急袭",
	"event_11":"三顾茅庐(一)",
	"event_12":"三顾茅庐(二)",
	"event_13":"三顾茅庐(三)",
	"event_14":"刘表之死",
	"event_15":"舌战群儒",
	"event_16":"苦肉计",
	"event_17":"赤壁之战",
	"event_18":"刮目相看",
	"event_19":"西凉锦马超",
	"event_20":"失荆州",
	"event_21":"七擒孟获",
	"event_22":"出师表",
	"event_23":"蜀灭亡",
	"event_24":"五虎上将",
	"event_25":"结局:蛮族入侵",
	"event_26":"结局:远征蛮族",
	"event_27":"结局:昏君",
	"event_28":"结局:贤君",
	
	"prompt":"提示",
	"single_combat_error":"怒击和诈败不可同时使用!",
	"skip_drama":"跳过剧情",
	"return":"返回",
	"execute":"执行",
	"go":"进行",
	"who_can_do":"派谁去?",
	"tab_equipment":"装备",
	"tab_skill":"技能",
	"tab_arms":"兵种",
	"tab_lineups":"阵型",
	"tab_status":"状态",
	"tab_properties":"属性",
	
	"terrain_0":"平原",
	"terrain_1":"草原",
	"terrain_2":"森林",
	"terrain_3":"荒地",
	"terrain_4":"山地",
	"terrain_5":"雪原",
	"terrain_6":"桥梁",
	"terrain_7":"浅滩",
	"terrain_8":"沼泽",
	"terrain_9":"大河",
	"terrain_10":"城内",
	"terrain_11":"民居",
	"terrain_12":"城池",
	"terrain_13":"关隘",
	"terrain_14":"鹿砦",
	"terrain_15":"村庄",
	"terrain_16":"兵营",
	"terrain_17":"岩山",
	"terrain_18":"池塘",
	"terrain_19":"小河",
	"terrain_20":"栅栏",
	"terrain_21":"城墙",
	"terrain_22":"水池",
	"terrain_23":"火",
	"terrain_24":"船",
	"terrain_comment_heal":"可以恢复",
	"terrain_comment_nomove":"禁止移动",
	"distribution_troops":"分配兵力",
	"can_use_troops":"可用兵力",
	
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
	
	"big_map":"大地图",
	"create":"作成",
	"can_select_generals":"可选武将",
	"update_character":"武将编辑",
	"create_seignior":"势力作成",
	"update_seignior":"势力编辑",
	"event_preparing_error":"事件数据正在准备中，请期待下个版本！",
	"event_lock_error":"此事件未被解锁，必须在游戏中触发事件才能解锁！",
	"auto_talk_not_debut":"最近在酒馆好像有特殊的人出没，到酒馆去访问一下说不定会发现不错的人才哦!",
	"auto_talk_equipment":"据说这座城的某个地方埋着稀有的装备《{0}》，但是想找到恐怕没那么容易!",
	"auto_talk_no_generals":"这座城里目前好像没什么人才啊!",
	"save_record_error":"无法覆盖该存档，请使用其它存档！",
	"create_seignior_no_character_error":"已经没有可选的武将了！",
	"create_seignior_delete_error":"<font size='22' color='#FFFFFF'>要删除君主 <font color='#FF0000'>{0}</font> 吗？</font>",
	"create_city_delete_error":"<font size='22' color='#FFFFFF'>要删除城池 <font color='#FF0000'>{0}</font> 吗？</font>",
	"create_city_prefecture_error":"君主所在的城池，太守必须是君主自己！",
	"create_seignior_city_error":"请添加城池！",
	"create_seignior_character_error":"请将所选君主添加到任何一座城池中！",
	"create_character_name_error":"请输入姓名！",
	"create_character_ability_error":"请设定武将能力属性！",
	"create_character_arm_error":"请设定武将兵种属性！",
	"strategy_weather_error":"无法在此天气使用！",
	"strategy_troops_error":"已经没有可用的预备兵力了！",
	"strategy_mp_error":"MP不足！",
	"ctrl_Chaos_error":"混乱中!",
	"stunt":"特技",
	"menu":"菜单",
	"max":"最大",
	"se_volume":"音效大小",
	"bgm_volume":"音乐大小",
	"game_speed":"游戏速度",
	"speed_normal":"正常",
	"speed_fast":"快速",
	"battleField":"战况",
	"relationship":"关系",
	"attacker":"攻击方",
	"weather":"天气",
	"preview":"预览图",
	"operating_end":"操作结束",
	"recruit_many_soldiers":"要招募多少士兵？",
	"city_of_troops":"{0} 兵力 : {1}人",
	"number_of_people":"{0}人",
	"proportion_of_people":"{0}/{1}人",
	"expedition_troops":"花费金钱:{0}\n招募{1}人",
	"army_retreat_confirm":"确定全军撤离战场吗？",
	"auto_save":"(自动存档)",
	"game_save":"保存进度",
	"game_read":"读取进度",
	"army_retreat":"全军撤退",
	"end_bout":"回合结束",
	"battle_save_record":"战场保存",
	"return_top":"回主页面",
	"hurt_preview":"伤:{0}\n命:{1}%",
	"dialog_select_generals":"请选择武将！",
	"dialog_no_captived_error":"没有被俘虏的武将！",
	"dialog_character_troops_error":"{0}没有分配士兵!",
	"dialog_prefecture_nodef_error":"<font size='22' color='#FFFFFF'>防守战太守<font color='#FF0000'>{0}</font>必须出战!</font>",
	"dialog_no_money":"金钱不够！",
	"dialog_error_hire_more":"一次只能录用一个在野武将！",
	"dialog_transport_select_confirm":"要向{0}输送物资吗？",
	"dialog_transport_select_error":"不可向其他势力城池输送物资！",
	"dialog_move_generals_confirm":"要移动到{0}吗？",
	"dialog_move_generals_error":"无法移动到此城池！",
	"dialog_spy_generals_confirm":"要对{0}进行谍报吗？",
	"dialog_spy_generals_error":"无法对己方城池进行谍报！",
	"dialog_expedition_select_error":"无法攻击此城池！",
	"dialog_expedition_stop_battle_error":"该势力与我军停战中，无法攻击此城池！",
	"dialog_persuade_belong_error":"无法劝降己方城池的武将！",
	"dialog_persuade_select_city_toast":"请选择目标武将所在城池！",
	"dialog_common_select_city_toast":"请选择目标城池！",
	"dialog_select_city_neighbor_error":"只能选择相邻城池！",
	"dialog_select_city_common_error":"不可选择此城池！",
	"dialog_persuade_spy_error":"无法获取此城池的武将信息,请先对城池进行谍报！",
	"dialog_expedition_select_confirm":"要对{0}发动攻击吗？",
	"dialog_expedition_select_leader":"请选择主将！",
	"dialog_select_leader_error":"只能选一个主将！",
	"dialog_select_onlyone_error":"只能选一个武将！",
	"select_leader":"选择主将",
	"select_monarch":"选择继承武将",
	"leader":"主将",
	"number_of_generals":"武将人数",
	"dialog_remove_equipment_confirm":"<font size='22' color='#FFFFFF'>要解除装备 <font color='#FF0000'>{0}</font> 吗？</font>",
	"dialog_select_seignior_confirm":"选择{0}吗？",
	"dialog_training_confirm":"训练哪个兵种？",
	"dialog_city_level_error":"该城池已经无法升级。",
	"dialog_proficiency_max_error":"已经达到训练的极限了。",
	"dialog_prize_nomoney_error":"金钱不够，褒奖一次需要{0}金钱!",
	"dialog_prize_success_message":"武将{0}的忠诚度提升了{1}!",
	"dialog_recruit_success_message":"愿效犬马之劳!",
	"dialog_recruit_fail_message":"少废话!忠臣不事二主!",
	"dialog_release_message":"武将{0}被释放了!",
	"dialog_behead_message":"武将{0}被斩首了!",
	"dialog_tribe_invasion_self_message":"{0}被外族入侵，城池遭到破坏，资源损失严重!",
	"dialog_tribe_invasion_message":"{0}的{1}遭到了{2}的掠夺,损失惨重!",
	"prize":"褒奖",
	"name":"姓名",
	"age":"年龄",
	"distribute":"分配",
	"distribute_point":"可分配点数: {0}",
	"proficiency":"熟练度",
	"magicAttack":"法攻",
	"magicDefense":"法防",
	"speed":"速度",
	"dodge":"躲闪",
	"strategy":"谋略",
	"refresh":"刷新",
	"change_face":"头像变更",
	"change_monarch":"选择君主",
	"monarch_die":"{0}病逝了，{1}成了新君主！",
	"gender_male":"男",
	"gender_female":"女",
	"terrain":"地形",
	"release":"释放",
	"recruit":"招降",
	"behead":"斩首",
	"persuade":"劝降",
	"persuade_character":"劝降武将",
	"expedition_ready_food":"{0}/{1} ({2}天)",
	"battle_win":"战斗胜利",
	"battle_fail":"战斗失败",
	"consecutive_wins":"连胜次数:{0}",
	"continue_challenge_question":"已经连胜了{0}场，要继续挑战吗？",
	
	"recruit_success":"愿效犬马之力!",
	"recruit_fail":"少废话!忠臣不事二主!",
	"captive_dialog_msg":"俘虏了敌将{0}!",
	"recruit_fail_dialog_msg":"敌将{0}拒绝加入我军!",
	"rescue_self_captive_dialog_msg":"被敌军俘虏的将领也被救回来了!",
	"retreat_city_dialog_msg":"{0}被{1}军占领了，撤往哪里？",
	"lose_city_dialog_msg":"{0}被{1}军占领了!",
	"surrender_dialog_msg":"{0}投降了敌军!",
	"beheaded_dialog_msg":"{0}被敌军斩首了!",
	"released_dialog_msg":"{0}被敌军释放了!",
	"captived_dialog_msg":"{0}被敌军俘虏了!",
	"shimono_dialog_msg":"{0}下野了!",
	"rescue_enemy_captive_dialog_msg":"我军俘虏的敌将也被救回去了!",
	"to_attack_seignior_city":"{0}的{1}向{2}的{3}发起进攻了!",
	"to_attack_null_city":"{0}的{1}向{2}发起进攻了!",
	"win_attack_and_occupy_null":"{0}攻占了{1}!",
	"win_attack_and_occupy_enemy":"{0}攻占了{1}军的{2}!",
	"win_attack_and_occupy_self":"我军在{0}击退了{1}军的进攻!",
	"fail_attack_and_occupy_enemy":"{0}攻占{1}军的{2}失败了!",
	"fail_attack_and_occupy_self":"我军的{0}被{1}军攻占了!",
	"seignor_die_other":"{0}势力灭亡了！！",
	"seignor_die_self":"{0}势力灭亡了！游戏结束了！",
	"jobai_tavern_message":"{0}的{1}在招贤纳士!",
	"jobai_internal_message":"{0}的{1}在发展内政!",
	"jobai_enlish_message":"{0}的{1}在招兵买马!",
	"jobai_rescue_confirm_message":"{0}的{1}想用金钱{2}赎回{3}，是否答应？",
	
	"seigniorProcess":"<font size='22' color='#FFFFFF'><font color='#FF0000'>{0}</font>势力行动中</font>",
	"exploreBusinessSuccess":"{0}在市场进行探索,发现了[{1}]!",
	"exploreBusinessMoney":"{0}在市场进行探索,发现金钱{1}。",
	"exploreBusinessFail":"{0}在市场进行探索,但是没有任何发现。",
	"exploreAgricultureSuccess":"{0}在农地进行探索,发现了[{1}]!",
	"exploreAgricultureFood":"{0}在农地进行探索,征缴到了粮食{1}。",
	"exploreAgricultureFail":"{0}在农地进行探索,但是没有任何发现。",
	"accessSuccessMessage":"{0}进行访问,发现了人才[{1}]!",
	"accessFailMessage":"{0}进行访问,但是没有发现人才!",
	"stopBattleSuccessMessage":"{0}执行停战协议的任务成功了!",
	"stopBattleFailMessage":"{0}执行停战协议的任务失败了!",
	"redeemSuccessMessage":"{0}执行赎回俘虏的任务成功了!",
	"redeemReturnMessage":"{0}回到了{1}!",
	"redeemFailMessage":"{0}赎回俘虏失败了!",
	"levelUpCityMessage":"{0}升级成为了{1}!",
	"spySuccessMessage":"{0}在{1}的谍报任务成功了。",
	"spyFailMessage":"{0}在{1}的谍报任务失败了。",
	"hireSuccessMessage":"{0}成功说服了{1}，{2}加入我军!",
	"hireFailMessage":"{0}录用失败了。",
	"hireRefuseMessage":"{0}拒绝了{1}的邀请，录用失败了。",
	"persuadeRefuseMessage":"{0}拒绝了{1}的邀请，劝降失败了。",
	"persuadeSuccessMessage":"{0}成功说服了{1}，{2}加入我军!",
	
	"rain":"雨",
	"cloud":"雾",
	"snow":"雪",
	"sunny":"晴",

	"label_equip":"装备",
	"label_use":"使用",
	"label_sale":"出售",
	
	"born":"出生",
	"life":"寿命",
	"personalLoyalty":"义气",
	"disposition":"性格",
	"ambition":"野心",
	"compatibility":"相性",
	
	"belong":"所属",
	"identity":"身份",
	"status":"状态",
	"effect":"效果",
	
	"force":"武力",
	"command":"统率",
	"intelligence":"智力",
	"agility":"敏捷",
	"luck":"运气",
	"sc_angry":"怒气",
	
	"standby":"待命",
	"singleCombat":"单挑",
	"attack":"攻击",
	"spirit":"策略",
	"defense":"防御",
	"breakout":"爆发",
	"morale":"士气",
	"movePower":"移动力",
	"physicalFitness":"体力",
	"all_seignior":"全势力一览",
	"city_list":"城池一览",
	"create_seignior_list":"自设势力一览",
	"create_character_list":"自设武将一览",
	"monarch":"君主",
	"general":"一般",
	"nothing":"无",
	"seignior":"势力",
	"seignior_lv":"势力等级",
	"generals_lv":"武将等级",
	"seignior_color":"势力颜色",
	"prefecture":"太守",
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
	"generals_hire":"登用执行",
	"move_start":"移动开始",
	"arm_properties":"备战属性",
	"basic_properties":"基本属性",
	"ability_properties":"能力属性",
	"expedition_resources":"备战军资",
	"appoint_prefecture":"任命太守",
	"cutover":"切换",
	"spy":"谍报",
	"appoint":"委任",
	"remove_appoint":"解除委任",
	"transport":"输送物资",
	"transport_job":"输送",
	"diplomacy":"外交",
	"diplomacy_redeem":"外交",
	"diplomacy_stop_battle":"外交",
	"access":"访问",
	"hire":"登用",
	"explore":"探索",
	"explore_agriculture":"探索",
	"explore_business":"探索",
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
	"feat":"功绩",
	"levelUpCity":"升级城池",
	"levelUp":"升级",
	"market":"市场",
	"official":"官府",
	"barrack":"兵营",
	"farmland":"农地",
	"institute":"太学院",
	"tavern":"酒馆",
	"citygate":"城门",
	"redeem":"赎回俘虏",
	"stop_battle":"停战协议",
	"stop_battleing":"停战中",
	"hostility":"敌对",
	"diplomacy_message":"带多少金钱？",
	"select_seignior":"选择势力",
	//"ransom":"赎金",
	"attack_range":"攻击范围",
	"attack_effect":"攻击效果",
	"final_record":"最终战绩",
	"stamp_list":"宝物图鉴",
	"event_list":"事件一览",
	"idle":"空闲",
	"move":"移动",
	"end":"结束",
	
	"current":"当前",
	"city_title":"{0}年{1}月  {2}  ({3})",
	
	
	"null":"无",
	"confirm":"确认",
	"ask_single_combat_confirm":"是否接受与敌将单挑？\n敌 {0} 武力:{1} HP:{2}\n我 {3} 武力:{4} HP:{5}",
	"single_combat_ask":"敌将{0}敢与我大战三百回合吗？",
	"single_combat_answer_ok":"那就让你做我的刀下鬼吧！",
	"single_combat_answer_no":"你还不配和我交手!",
	
	"leader_change_talk":"糟糕!因为主将撤退，军队一盘散沙，能力都下降了。那就由我暂代主将来指挥战斗吧！",
	"bout_end_confirm":"结束本回合吗？",
	"gameover":"游戏结束",
	"skill_explanation":"【{0}】{1}(发动率:{2}％)",
	"building":"建築物",
	"buy_food":"买进粮食",
	"sell_food":"卖出粮食",
	"buy_food_message":"买进多少粮食？",
	"sell_food_message":"卖出多少粮食？",
	"use_money":"消耗金钱:{0}/{1}",
	"get_money":"获得金钱:{0}",
	"forum":"交流/意见",
	"goto_execute_message":"结束战略部署\n确定吗？",
	"expedition_attack_quantity_message":"攻城战最多只能{0}人出战！",
	"expedition_defense_quantity_message":"防守战最多只能{0}人出战！",
	"riot_message":"{0}的百姓发生暴动了!",
	"no_food_talk":"糟糕！没有兵粮了，士兵的战斗力开始下降了。",
	"purchase_confirm_native_message":"<font size='21' color='#FFFFFF'>开通<font color='#FF0000'>{0}</font>功能需要花费<font color='#FF0000'>{1}</font>，要开通此功能吗?</font>",
	"purchase_confirm_web_message":"<font size='21' color='#FFFFFF'>当前版本无法使用<font color='#FF0000'>{0}</font>功能，请下载<font color='#FF0000'>手机安装版本</font>!</font>",
	"child_growup":"<font size='22' color='#FFFFFF'><font color='#FF0000'> {0} </font>成年了，随<font color='#FF0000'> {1} </font>加入我军！</font>"
};
Language.itemData = {
	"item_name_1":"草药",
	"item_name_2":"麻沸散",
	"item_name_3":"金创药",
	"item_name_4":"人参",
	"item_name_5":"灵芝草",
	"item_name_6":"募兵符",
	"item_name_7":"募兵令",
	"item_name_8":"征兵符",
	"item_name_9":"征兵令",
	"item_name_10":"强征兵令",
	"item_name_11":"招兵符",
	"item_name_12":"招兵令",
	"item_name_13":"招军符",
	"item_name_14":"招军令",
	"item_name_15":"强招兵令",
	"item_name_16":"方天画戟",
	"item_name_17":"丈八蛇矛",
	"item_name_18":"青龙偃月刀",
	"item_name_19":"虎头湛金枪",
	"item_name_20":"龙胆亮银枪",
	"item_name_21":"万石弓",
	"item_name_22":"雌雄双剑",
	"item_name_23":"七宝刀",
	"item_name_24":"青釭剑",
	"item_name_25":"倚天剑",
	"item_name_26":"落日弓",
	"item_name_27":"双铁戟",
	"item_name_28":"古锭刀",
	"item_name_29":"青铜鞭",
	"item_name_30":"涯角枪",
	"item_name_31":"流星锤",
	"item_name_32":"钩镰枪",
	"item_name_33":"三尖两刃刀",
	"item_name_34":"铁蒺藜骨朵",
	"item_name_35":"眉尖刀",
	"item_name_36":"龙舌弓",
	"item_name_37":"铁戟",
	"item_name_38":"大斧",
	"item_name_39":"飞锤",
	"item_name_40":"铁鞭",
	"item_name_41":"铁锤",
	"item_name_42":"铁刀",
	"item_name_43":"铁枪",
	"item_name_44":"兵法二十四篇",
	"item_name_45":"孙子兵法",
	"item_name_46":"孟徳新书",
	"item_name_47":"遁甲天书",
	"item_name_48":"太平要术",
	"item_name_49":"六韬",
	"item_name_50":"三略",
	"item_name_51":"春秋",
	"item_name_52":"左传",
	"item_name_53":"战国策",
	"item_name_54":"汉书",
	"item_name_55":"红羽扇",
	"item_name_56":"蓝羽扇",
	"item_name_57":"七星剑",
	"item_name_58":"圣者宝剑",
	"item_name_59":"圣拂尘",
	"item_name_60":"暗拂尘",
	"item_name_61":"乌金甲",
	"item_name_62":"黄金铠",
	"item_name_63":"白银铠",
	"item_name_64":"龙鳞铠",
	"item_name_65":"连环铠",
	"item_name_66":"锁子甲",
	"item_name_67":"柳叶甲",
	"item_name_68":"玲珑铠",
	"item_name_69":"青铜铠",
	"item_name_70":"铁铠",
	"item_name_71":"赤兔",
	"item_name_72":"乌骓",
	"item_name_73":"的卢",
	"item_name_74":"汗血宝马",
	"item_name_75":"绝影",
	"item_name_76":"爪黄飞电",
	"item_name_77":"照夜玉狮子",
	"item_name_78":"黄骠马",
	"item_name_79":"大宛马",
	"item_name_80":"白马",
	"item_name_81":"凤翅紫金冠",
	"item_name_82":"黄金盔",
	"item_name_83":"夜明盔",
	"item_name_84":"将军盔",
	"item_name_85":"通天冠",
	"item_name_86":"五梁冠",
	"item_name_87":"铜盔",
	"item_name_88":"铁盔",
	"item_name_89":"皮盔",
	"item_name_90":"头巾",
};
Language.characterData = {"character_1":"曹操","character_2":"周瑜","character_3":"赵云","character_4":"关羽","character_5":"张辽","character_6":"邓艾","character_7":"姜维","character_8":"孙坚","character_9":"陆逊","character_10":"诸葛亮","character_11":"羊祜","character_12":"徐晃","character_13":"吕蒙","character_14":"夏侯敦","character_15":"徐盛","character_16":"司马懿","character_17":"孙权","character_18":"吕布","character_19":"张飞","character_20":"徐庶","character_21":"刘备","character_22":"甘宁","character_23":"郝昭","character_24":"孙策","character_25":"陈泰","character_26":"陆抗","character_27":"高顺","character_28":"张郃","character_29":"张嶷","character_30":"李典","character_31":"于禁","character_32":"张任","character_33":"许褚","character_34":"郭淮","character_35":"曹丕","character_36":"马云鹭","character_37":"孙尚香","character_38":"杜预","character_39":"袁绍","character_40":"吴懿","character_41":"夏侯渊","character_42":"庞德","character_43":"马超","character_44":"丁奉","character_45":"贾诩","character_46":"满宠","character_47":"司马师","character_48":"傅佥","character_49":"李严","character_50":"孙桓","character_51":"王濬","character_52":"司马昭","character_53":"朱桓","character_54":"诸葛瞻","character_55":"韩浩","character_56":"审配","character_57":"陈登","character_58":"魏延","character_59":"田豫","character_60":"法正","character_61":"马忠(蜀)","character_62":"王平","character_63":"太史慈","character_64":"邓芝","character_65":"夏侯霸","character_66":"张角","character_67":"廖化","character_68":"贾逵","character_69":"王基","character_70":"司马炎","character_71":"张宝","character_72":"程普","character_73":"张翼","character_74":"典韦","character_75":"公孙瓒","character_76":"陈宫","character_77":"周仓","character_78":"刘晔","character_79":"曹真","character_80":"韩当","character_81":"周泰","character_82":"鲁肃","character_83":"文聘","character_84":"诸葛诞","character_85":"孙登","character_86":"钟会","character_87":"皇甫嵩","character_88":"杨阜","character_89":"关平","character_90":"文鸯","character_91":"全琮","character_92":"朱拠","character_93":"程昱","character_94":"乐进","character_95":"韩遂","character_96":"霍峻","character_97":"费耀","character_98":"高览","character_99":"李恢","character_100":"孙瑜","character_101":"张承","character_102":"麴义","character_103":"曹昂","character_104":"朱然","character_105":"夏侯尚","character_106":"霍弋","character_107":"孙韶","character_108":"向宠","character_109":"吾彦","character_110":"鲍信","character_111":"黄忠","character_112":"蒯良","character_113":"王浑","character_114":"陶璜","character_115":"黄崇","character_116":"荀攸","character_117":"步陟","character_118":"胡烈","character_119":"严颜","character_120":"沈莹","character_121":"马隆","character_122":"邓忠","character_123":"黄盖","character_124":"曹仁","character_125":"骆统","character_126":"胡遵","character_127":"诸葛尚","character_128":"张燕","character_129":"曹彰","character_130":"杨仪","character_131":"文钦","character_132":"毋丘俭","character_133":"董厥","character_134":"张悌","character_135":"阎柔","character_136":"贺齐","character_137":"公孙康","character_138":"陈到","character_139":"黄月英","character_140":"张特","character_141":"臧霸","character_142":"庞统","character_143":"王双","character_144":"公孙度","character_145":"朱治","character_146":"颜良","character_147":"吕岱","character_148":"郭嘉","character_149":"陈武","character_150":"马谡","character_151":"陆景","character_152":"蒋济","character_153":"张苞","character_154":"关兴","character_155":"州泰","character_156":"吕范","character_157":"刘劭","character_158":"罗憲","character_159":"杨肇","character_160":"马腾","character_161":"朱异","character_162":"司马望","character_163":"凌操","character_164":"雷铜","character_165":"曹休","character_166":"孙礼","character_167":"陆凯","character_168":"潘璋","character_169":"卢植","character_170":"黄权","character_171":"曹洪","character_172":"吴班","character_173":"孟达","character_174":"苏飞","character_175":"关索","character_176":"王经","character_177":"孙异","character_178":"祖茂","character_179":"沮授","character_180":"田畴","character_181":"鄂焕","character_182":"徐质","character_183":"夏侯玄","character_184":"赵统","character_185":"华雄","character_186":"蔡瑁","character_187":"公孙范","character_188":"蒋钦","character_189":"凌统","character_190":"牵弘","character_191":"周旨","character_192":"辛毗","character_193":"高沛","character_194":"张颖","character_195":"诸葛恪","character_196":"张梁","character_197":"张绣","character_198":"石苞","character_199":"严兴","character_200":"李通","character_201":"夏侯恩","character_202":"马岱","character_203":"邹靖","character_204":"眭固","character_205":"文丑","character_206":"王凌","character_207":"阚泽","character_208":"冯习","character_209":"杨济","character_210":"高干","character_211":"司马孚","character_212":"雍凯","character_213":"泠苞","character_214":"贾范","character_215":"王颀","character_216":"董袭","character_217":"张既","character_218":"诸葛瑾","character_219":"王昶","character_220":"司马攸","character_221":"纪灵","character_222":"张动","character_223":"蒯越","character_224":"程银","character_225":"高柔","character_226":"刘封","character_227":"陈表","character_228":"曹叡","character_229":"公孙渊","character_230":"鲁淑","character_231":"朱儁","character_232":"公孙续","character_233":"朵思大王","character_234":"虞汜","character_235":"留平","character_236":"唐彬","character_237":"张扬","character_238":"胡奋","character_239":"张遵","character_240":"孙休","character_241":"祝融","character_242":"费袆","character_243":"曹冲","character_244":"方悦","character_245":"周昕","character_246":"乐琳","character_247":"徐荣","character_248":"宋谦","character_249":"马忠","character_250":"杨稷","character_251":"袁遗","character_252":"俞涉","character_253":"公孙越","character_254":"吕虔","character_255":"何桢","character_256":"杨怀","character_257":"卞喜","character_258":"马休","character_259":"胡质","character_260":"程武","character_261":"孙峻","character_262":"步闡","character_263":"刘睿","character_264":"张尚","character_265":"董卓","character_266":"虞翻","character_267":"刘辟","character_268":"张松","character_269":"全纪","character_270":"孙震","character_271":"钟繇","character_272":"韩德","character_273":"桥瑁","character_274":"田楷","character_275":"孙仲","character_276":"侯成","character_277":"张允","character_278":"丁封","character_279":"李丰(蜀)","character_280":"赵广","character_281":"李球","character_282":"王戎","character_283":"孙歆","character_284":"蔡贡","character_285":"郭图","character_286":"严纲","character_287":"乐就","character_288":"吴兰","character_289":"高翔","character_290":"文虎","character_291":"诸葛靓","character_292":"龚都","character_293":"曹纯","character_294":"沮鵠","character_295":"申耽","character_296":"吕凯","character_297":"钟離斐","character_298":"荀愷","character_299":"雷薄","character_300":"沙摩柯","character_301":"朱灵","character_302":"杨任","character_303":"留赞","character_304":"蒋琬","character_305":"张南","character_306":"秦朗","character_307":"梁绪","character_308":"李儒","character_309":"李肃","character_310":"管亥","character_311":"毛玠","character_312":"夏侯威","character_313":"于诠","character_314":"伍延","character_315":"王匡","character_316":"华歆","character_317":"袁熙","character_318":"马良","character_319":"魏邈","character_320":"庞羲","character_321":"杨秋","character_322":"胡济","character_323":"庞会","character_324":"陈俊","character_325":"周鲂","character_326":"张球","character_327":"王伉","character_328":"张邈","character_329":"董和","character_330":"刑道荣","character_331":"戴陵","character_332":"关统","character_333":"严白虎","character_334":"许贡","character_335":"陈兰","character_336":"孟获","character_337":"杨欣","character_338":"邹丹","character_339":"曹性","character_340":"张虎","character_341":"留略","character_342":"贾充","character_343":"胡渊","character_344":"丁原","character_345":"关靖","character_346":"陈震","character_347":"邓茂","character_348":"董承","character_349":"刘璝","character_350":"陈矫","character_351":"马铁","character_352":"吾粲","character_353":"张休","character_354":"孟宗","character_355":"李歆","character_356":"孙静","character_357":"蒋义渠","character_358":"糜竺","character_359":"陈应","character_360":"太史享","character_361":"荀勗","character_362":"成宜","character_363":"王甫","character_364":"木鹿大王","character_365":"邓贤","character_366":"蒋班","character_367":"刘焉","character_368":"宋憲","character_369":"阎圃","character_370":"杨修","character_371":"袁尚","character_372":"牛金","character_373":"周浚","character_374":"黄祖","character_375":"袁术","character_376":"单经","character_377":"典满","character_378":"傅彤","character_379":"李辅","character_380":"貂蝉","character_381":"张济","character_382":"赵弘","character_383":"贾华","character_384":"巩志","character_385":"鲍隆","character_386":"董允","character_387":"尹赏","character_388":"笮融","character_389":"兀突骨","character_390":"毕轨","character_391":"滕胤","character_392":"陶濬","character_393":"王修","character_394":"申仪","character_395":"桓范","character_396":"崔琰","character_397":"谢旌","character_398":"董荼那","character_399":"王威","character_400":"裴元绍","character_401":"张卫","character_402":"伦直","character_403":"丘建","character_404":"程远志","character_405":"张英","character_406":"魏続","character_407":"樊建","character_408":"刘岱","character_409":"王門","character_410":"胡车儿","character_411":"王肃","character_412":"唐咨","character_413":"全端","character_414":"陈骞","character_415":"陈琳","character_416":"辛评","character_417":"潘睿","character_418":"阎宇","character_419":"华佗","character_420":"李堪","character_421":"魏攸","character_422":"樊稠","character_423":"梁兴","character_424":"郭攸之","character_425":"夏侯惠","character_426":"盛曼","character_427":"孙冀","character_428":"高升","character_429":"马玩","character_430":"焦彝","character_431":"刘繇","character_432":"夏侯德","character_433":"朱褒","character_434":"夏侯和","character_435":"田章","character_436":"孙秀","character_437":"陈横","character_438":"田丰","character_439":"王累","character_440":"胡班","character_441":"王韬","character_442":"许仪","character_443":"句安","character_444":"田续","character_445":"丘本","character_446":"刘表","character_447":"胡轸","character_448":"杨丑","character_449":"赵累","character_450":"步协","character_451":"陶谦","character_452":"董昭","character_453":"张鲁","character_454":"孙乾","character_455":"杨昂","character_456":"侯选","character_457":"谭雄","character_458":"王惇","character_459":"淳于琼","character_460":"阿会喃","character_461":"伊籍","character_462":"孙诩","character_463":"曹植","character_464":"孙亮","character_465":"李傕","character_466":"张紘","character_467":"武安国","character_468":"苏由","character_469":"许靖","character_470":"陈纪","character_471":"张缉","character_472":"毋丘秀","character_473":"蒋舒","character_474":"吕威璜","character_475":"徐邈","character_476":"忙牙长","character_477":"金环三结","character_478":"杨祚","character_479":"吴纲","character_480":"裴秀","character_481":"王朗","character_482":"糜芳","character_483":"全懌","character_484":"刘虞","character_485":"郭汜","character_486":"韩忠","character_487":"李异","character_488":"高定","character_489":"卑衍","character_490":"顾谭","character_491":"杨奉","character_492":"荀彧","character_493":"刘贤","character_494":"王买","character_495":"孔融","character_496":"戏志才","character_497":"潘凤","character_498":"薛莹","character_499":"刘琦","character_500":"张华","character_501":"金旋","character_502":"关彝","character_503":"陈珪","character_504":"袁谭","character_505":"带来洞主","character_506":"穆顺","character_507":"吕翔","character_508":"濮阳兴","character_509":"张昭","character_510":"王祥","character_511":"楼玄","character_512":"韩暹","character_513":"吕旷","character_514":"荀谌","character_515":"张横","character_516":"孟优","character_517":"曹豹","character_518":"陈式","character_519":"逢纪","character_520":"向朗","character_521":"阎象","character_522":"司马朗","character_523":"公孙恭","character_524":"甄氏","character_525":"孙匡","character_526":"辛敞","character_527":"刘丞","character_528":"大乔","character_529":"严政","character_530":"薛综","character_531":"何曾","character_532":"李丰","character_533":"蒋斌","character_534":"党均","character_535":"王粲","character_536":"傅士仁","character_537":"孙朗","character_538":"车胄","character_539":"王含","character_540":"刘循","character_541":"诸葛绪","character_542":"张布","character_543":"王允","character_544":"刘巴","character_545":"袁燿","character_546":"韩嵩","character_547":"何仪","character_548":"小乔","character_549":"何宴","character_550":"简雍","character_551":"秦宓","character_552":"尹默","character_553":"郑冲","character_554":"钟毓","character_555":"程秉","character_556":"顾雍","character_557":"韦昭","character_558":"吴巨","character_559":"张肃","character_560":"傅巽","character_561":"马遵","character_562":"孔伷","character_563":"韩胤","character_564":"张温","character_565":"邵悌","character_566":"董旻","character_567":"陆绩","character_568":"诸葛均","character_569":"施朔","character_570":"胡冲","character_571":"陈群","character_572":"滕脩","character_573":"刘琮","character_574":"曹爽","character_575":"杨弘","character_576":"牛辅","character_577":"王业","character_578":"王忠","character_579":"王沈","character_580":"许攸","character_581":"丁谧","character_582":"蒋显","character_583":"吴质","character_584":"曹宇","character_585":"谯周","character_586":"丁仪","character_587":"董朝","character_588":"马均","character_589":"蒋干","character_590":"李胜","character_591":"郤正","character_592":"孙述","character_593":"曹羲","character_594":"赵范","character_595":"袁胤","character_596":"邓良","character_597":"孙皓","character_598":"张绍","character_599":"蔡中","character_600":"蔡和","character_601":"曹熊","character_602":"韩馥","character_603":"张节","character_604":"何进","character_605":"刘度","character_606":"曹芳","character_607":"杨柏","character_608":"尹大目","character_609":"夏侯楙","character_610":"何植","character_611":"曹奂","character_612":"全尚","character_613":"杨松","character_614":"曹训","character_615":"韩玄","character_616":"刘璋","character_617":"马邈","character_618":"黄皓","character_619":"岑昏","character_620":"刘禅","character_621":"乌丸大王","character_622":"乌丸骑兵","character_623":"乌丸骑兵1","character_624":"乌丸弩兵","character_625":"乌丸弩兵1","character_626":"乌丸步兵","character_627":"乌丸步兵1","character_628":"乌丸弓骑","character_629":"乌丸医生","character_630":"乌丸医生1","character_631":"山越大王","character_632":"山越骑兵","character_633":"山越骑兵1","character_634":"山越弩兵","character_635":"山越弩兵1","character_636":"山越步兵","character_637":"山越步兵1","character_638":"山越弓骑","character_639":"山越医生","character_640":"山越医生1","character_641":"匈奴大王","character_642":"匈奴骑兵","character_643":"匈奴骑兵1","character_644":"匈奴弩兵","character_645":"匈奴弩兵1","character_646":"匈奴步兵","character_647":"匈奴步兵1","character_648":"匈奴弓骑","character_649":"匈奴医生","character_650":"匈奴医生1","character_651":"氐大王","character_652":"氐骑兵","character_653":"氐骑兵1","character_654":"氐弩兵","character_655":"氐弩兵1","character_656":"氐步兵","character_657":"氐步兵1","character_658":"氐弓骑","character_659":"氐医生","character_660":"氐医生1","character_661":"羌大王","character_662":"羌骑兵","character_663":"羌骑兵1","character_664":"羌弩兵","character_665":"羌弩兵1","character_666":"羌步兵","character_667":"羌步兵1","character_668":"羌弓骑","character_669":"羌医生","character_670":"羌医生1","character_671":"箭塔1","character_672":"箭塔2","character_673":"箭塔3","character_674":"箭塔4","character_675":"箭塔5","character_676":"箭塔6","character_677":"炮台1","character_678":"炮台2","character_679":"炮台3","character_680":"炮台4","character_681":"炮台5","character_682":"炮台6"};
Language.cityData = {
	"city_1":"西凉",
	"city_2":"天水",
	"city_3":"武都",
	"city_4":"安定",
	"city_5":"梓橦",
	"city_6":"成都",
	"city_7":"江洲",
	"city_8":"建宁",
	"city_9":"云南",
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
	"city_52":"匈奴",
	"city_53":"西城"
};
Language.soldierData = {
	"name_jj":"君主",
	"name_qbb":"步兵",
	"name_gb":"弓兵",
	"name_qqb":"骑兵",
	"name_gqb":"弓骑兵",
	"name_qpc":"炮车",
	"name_whj":"武术家",
	"name_zb":"贼兵",
	"name_cs":"策士",
	"name_fsis":"风水士",
	"name_ds":"道士",
	"name_qcs":"骑马策士",
	"name_wun":"女兵",
	"name_xlqb":"西凉骑兵",
	"name_hjz":"黄巾贼",
	"name_hd":"海盗",
	"name_xxs":"驯熊师",
	"name_xhs":"驯虎师",
	"name_dd":"都督",
	"name_zss":"咒术士",
	"name_qlq":"青龙骑兵",
	"name_bhq":"白虎步兵",
	"name_xwn":"玄武弩兵",
	"name_zqn":"朱雀弩骑",
	"explanation_jj":"均衡发展的万能型部队。在攻击、策略两方面都相当活跃。",
	"explanation_qbb":"防御力优秀的部队。对付弓兵类时，以强大的攻击力为傲；但是攻击骑兵类的部队时，表现一般。",
	"explanation_gb":"擅长远距攻击的部队。对骑兵类的攻击效果极高，但相反地对步兵类的防御效果极弱，这点还请留意。",
	"explanation_qqb":"移动力与攻击力优异的部队。对步兵类的防御力很强，但是对弓箭、炮车的抵抗力较弱。",
	"explanation_gqb":"移动力出色的远距攻击部队。所有远距攻击部队对付骑兵类时，具有值得夸耀的强大攻击力。",
	"explanation_qpc":"射程无与伦比的远距攻击部队。用心锻炼的话，将来会有相当强的战力。",
	"explanation_whj":"爆发力出色的部队。成功率高的防御和两段攻击是其魅力所在，也可以施展策略。",
	"explanation_zb":"攻击力强大、士气高昂的部队。在山地、荒地可以发挥其真正的本领。对付敌军时，致命一击可期。",
	"explanation_cs":"施展攻击类策略的文官部队。擅长火类、水类、地类的策略。",
	"explanation_fsis":"施展恢复类策略的文官部队。是作战时不可缺少的后方支援部队。",
	"explanation_ds":"施展妨碍类策略的文官部队。可运用诡异的策略削减敌人的战力。",
	"explanation_qcs":"施展攻击类策略的文官部队，擅长火类、风类的策略，以移动力与骑兵类相同而自豪。",
	"explanation_wun":"就能力而言，可说是武术家的女性翻版。可恢复周遭我军部队的异常状态。",
	"explanation_xlqb":"攻击力、防御力均出众的部队。说它是武官类最强的部队，一点也不为过。缺点是对策略较无抵抗力。",
	"explanation_hjz":"以武力揭竿而起的太平道信徒。由于头裹黄巾，人称黄巾军。",
	"explanation_hd":"可在水上地形发挥强大战力的部队。不在敌人有利的地形作战，是其作战的要诀。",
	"explanation_xxs":"率领攻击力强大的熊作战的部队。每次攻击还具有令敌人麻痹的附加效果。对弓箭和策略的抵抗力差。",
	"explanation_xhs":"率领爆发力出众的虎作战的部队。每次攻击还具有令敌人中毒的附加效果。对弓箭和策略的抵抗力差。",
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
Language.skillData = {
	"group_1":"父子同心!",
	"group_2":"桃园情谊!",
	"group_3":"让你尝尝河北名将<颜良文丑>的厉害。",
	"group_4":"虎痴恶来!",
	"group_5":"将门虎子，承我父志！",
	"group_6":"虎痴何在？",
	"group_7":"冰释前嫌!",
	"group_8":"珠联璧合!",
	
	"s_1":"雷霆怒击",
	"se_1":"连续攻击三次。",
	"s_2":"真龙之气",
	"se_2":"将受到的伤害减少为0。",
	"s_3":"隔山打牛",
	"se_3":"使攻击波及到目标敌人相邻的敌军。",
	"s_4":"天下无双",
	"se_4":"重击敌军两次，并且使得目标敌人相邻的敌军防御力降低。",
	"s_5":"愈战愈勇",
	"se_5":"在攻击结束时提升自身攻击力。",
	"s_6":"愈战愈坚",
	"se_6":"在攻击结束时提升自身防御力。",
	"s_7":"鼓舞",
	"se_7":"在回合开始时提升自身以及周围友军的士气。",
	"s_8":"苍龙苏醒",
	"se_8":"在攻击时使敌人降低一种能力，且自身及周围友军不会陷入任何不良状态。",
	"s_9":"幻影",
	"se_9":"给对方2倍攻击，且使对方陷入昏迷状态。",
	"s_10":"嗜血",
	"se_10":"给在物理攻击对方时将敌军兵力转换为己方兵力。",
	"s_11":"神算",
	"se_11":"法术攻击时必暴击，全队法术伤害减半。",
	"s_12":"火神",
	"se_12":"使用火系策略伤害加倍，且令对方进入燃烧状态。",
	"s_13":"医神",
	"se_13":"回合开始时对自身及相邻友军进行治疗。",
	"s_14":"反间计",
	"se_14":"在法术攻击对方时将敌军兵力转换为己方兵力。",
	"s_15":"识破",
	"se_15":"令自身及相邻的友军受到的法术伤害减半。",
	"s_16":"连珠",
	"se_16":"法术连击。",
	"s_17":"连环计",
	"se_17":"法术攻击时不断蔓延到其他相邻的敌军。",
	"s_18":"鬼策",
	"se_18":"1.5倍法术暴击，且降低敌军能力。",
	"s_19":"鬼谋",
	"se_19":"1.5倍法术暴击，且令敌军陷入不良状态。",
	"s_20":"逆嗜血",
	"se_20":"反击时将敌军兵力转化为自身兵力。",
	"s_21":"反弹",
	"se_21":"被攻击时令敌军也受到一定程度伤害。",
	"s_22":"血路",
	"se_22":"降低自身及周围被俘虏概率。",
	"s_23":"十面埋伏",
	"se_23":"在使用法术攻击敌军时，如果攻击目标的周围有友军存在，可以借助友军的力量提高法术伤害，友军越多，加成越多。",
	"s_24":"决胜",
	"se_24":"在使用法术攻击敌军时2倍暴击，且不消化MP。",
	"s_25":"摆尾",
	"se_25":"使用法术攻击时附带穿透效果。",
	"s_26":"毒箭",
	"se_26":"在使用弓箭类兵种攻击时令敌军中毒。",
	"s_27":"毒计",
	"se_27":"在使用法术攻击时令敌军中毒。",
	"s_28":"灵敏",
	"se_28":"攻击结束时提升自身爆发力。",
	"s_29":"猛攻",
	"se_29":"回合开始时提升自身及周围友军的攻击力。",
	"s_30":"坚固",
	"se_30":"回合开始时提升自身及周围友军的防御力。",
	"s_31":"暗行",
	"se_31":"无视地形和敌军阻挡进行移动。",
	"s_32":"劫营",
	"se_32":"从敌人背后或侧面攻击时攻击有加成，不包括斜角攻击。",
	"s_33":"乱射",
	"se_33":"使用弓箭类兵种攻击时,使攻击波及到目标敌人相邻的敌军。",
	"s_34":"破弩",
	"se_34":"无视弓兵类兵种的克制效果。",
	"s_35":"破步",
	"se_35":"无视步兵类兵种的克制效果。",
	"s_36":"破骑",
	"se_36":"无视骑兵类兵种的克制效果。",
	"s_37":"破兵",
	"se_37":"无视物理攻击类兵种的克制效果。",
	"s_38":"仁者",
	"se_38":"回合开始时为己方随机一人征集一些兵力。",
	"s_39":"陷阵营",
	"se_39":"相邻敌军大于1时攻击有加成，且相邻敌军越多攻击加成越多。",
	"s_40":"强行",
	"se_40":"移动力增加。",
	"s_41":"小霸王",
	"se_41":"对武力低于自己的敌军，进行1.5倍暴击，且令其攻击力降低。",
	"s_42":"逆击",
	"se_42":"反击两次。",
	"s_43":"大喝",
	"se_43":"1.5倍暴击，大喝的强大气势令敌军无法反击。",
	"s_44":"冲锋",
	"se_44":"1.5倍暴击，附带穿透效。",
	"s_45":"节粮",
	"se_45":"粮食消耗减半。",
	"s_46":"商业",
	"se_46":"内政商业加成。",
	"s_47":"技术",
	"se_47":"内政技术加成。",
	"s_48":"农业",
	"se_48":"内政农业加成。",
	"s_49":"征兵",
	"se_49":"内政征兵加成。",
	"s_50":"肉搏",
	"se_50":"反击时附带穿透效果。",
	"s_51":"死战",
	"se_51":"士兵越少攻击越高。",
	"s_52":"顺势",
	"se_52":"致命一击发动时可将攻击伤害提高一倍。",
	"s_53":"忍耐",
	"se_53":"士兵越少防御越高。",
	"s_54":"倾国",
	"se_54":"使用女兵兵种时,受到攻击时将伤害减半,而其倾国的美色也让敌军无法动弹。",
	"s_55":"倾城",
	"se_55":"使用女兵兵种时,受到攻击时将伤害减半。",
	"s_56":"巾帼",
	"se_56":"巾帼不让须眉,每次攻击必定双击,但第二击力量减弱。",
	"s_57":"偷天换日",
	"se_57":"使用近战兵种时,将受到的攻击伤害转为MP伤害,如果MP为零，则有一定概率将伤害转换为MP。",
	"s_58":"羁绊",
	"se_58":"附带定身效果。",
	"s_59":"士气",
	"se_59":"增强士气。",
	"s_60":"防御",
	"se_60":"增强防御。",
	"s_61":"爆发力",
	"se_61":"增强爆发力。",
	"s_62":"攻击",
	"se_62":"增强攻击。",
	"s_63":"精神",
	"se_63":"增强精神。",
	"s_64":"厚皮",
	"se_64":"增大兵力。",
	"s_65":"斗转星移",
	"se_65":"在反击时借用对方的能力来攻击对方。",
	"s_66":"熟路",
	"se_66":"所有地形消耗1点移动力。",
	"s_67":"反客为主",
	"se_67":"反击时给予敌军主动攻击的伤害值。",
	"s_68":"治安",
	"se_68":"内政治安加成。",
	"s_69":"飞刀",
	"se_69":"近战兵种攻击范围增强。",
	"s_70":"辅佐",
	"se_70":"回合开始时,为自身及周围所有相邻部队提升一种能力。",
};
Language.groupSkillTalkData = [
	"痛快，一起上!",
	"开始攻击!",
	"看我的!",
	"哈哈，我来了!"
];