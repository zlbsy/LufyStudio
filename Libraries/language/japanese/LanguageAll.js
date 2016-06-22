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
	"disposition_0":"小心",
	"disposition_1":"冷静",
	"disposition_2":"豪胆",
	"disposition_3":"猪突",
	
	"status_AttackAid_up":"攻撃力上昇",
	"status_AttackAid_down":"攻撃力下降",
	"status_DefenseAid_up":"防御上昇",
	"status_DefenseAid_down":"防御下降",
	"status_ApiritAid_up":"精神上昇",
	"status_ApiritAid_down":"精神下降",
	"status_BreakoutAid_up":"爆発上昇",
	"status_BreakoutAid_down":"爆発下降",
	"status_MoraleAid_up":"士气上昇",
	"status_MoraleAid_down":"士气下降",
	"status_Poison":"毒",
	"status_Fixed":"捕縛",
	"status_Chaos":"混乱",
	"status_BanIncantation":"禁呪",
	"status_Burn":"燃焼",
	
	"battle_generals_list":"武将一览",
	
	"can_not_move":"今は移動できません!",
	"use_strategy_terrain_error":"{0}はこの地形の上に使用できません!",
	"use_strategy_belong_error":"{0}に使用できません!",
	
	"quantity_of_month":"({0}ヶ月)",
	"exp":"経験",
	"treat":"治療",
	"troops_plus":"兵力+{0}",
	"StrategyEffectType.1":"攻撃",
	"StrategyEffectType.2":"状態変化",
	"StrategyEffectType.3":"能力変化",
	"StrategyEffectType.4":"覚醒",
	"StrategyEffectType.5":"治療",
	
	"bout":"回合",
	"bout_label":"{0}回合目",
	"battle_title":"{0}の戦",
	
	"reputation":"称号",
	"reputation_tiger":"五虎上将",
	"reputation_sbsr":"士别三日",
	
	"event_1":"桃園の誓い",
	"event_2":"反董卓連合",
	"event_3":"長安遷都",
	"event_4":"連環の計",
	"event_5":"徐州変遷",
	"event_6":"陶謙の跡継ぎ",
	"event_7":"白門楼",
	"event_8":"酒を煮て英雄を論じ",
	"event_9":"官渡の戦い",
	"event_10":"烏巣を襲う",
	"event_11":"三顧の礼(一)",
	"event_12":"三顧の礼(二)",
	"event_13":"三顧の礼(三)",
	"event_14":"劉表の死",
	"event_15":"群儒と舌戦",
	"event_16":"苦肉の計",
	"event_17":"赤壁の戦い",
	"event_18":"呉下の阿蒙",
	"event_19":"西涼の錦馬超",
	"event_20":"荊州攻防戦",
	"event_21":"南蛮征伐",
	"event_22":"出師の表",
	"event_23":"蜀滅亡",
	"event_24":"五虎将軍",
	"event_25":"結局:蛮族造反",
	"event_26":"結局:蛮族征伐",
	"event_27":"結局:昏君",
	"event_28":"結局:贤君",
	
	"prompt":"提示",
	"single_combat_error":"会心は詐欺と同時に使うことができません!",
	"skip_drama":"スキップ",
	"return":"戻る",
	"execute":"実行",
	"go":"進行",
	"who_can_do":"誰を派遣する?",
	"tab_equipment":"装備",
	"tab_skill":"技能",
	"tab_arms":"兵科",
	"tab_lineups":"陣形",
	"tab_status":"状態",
	"tab_properties":"属性",
	
	"terrain_0":"平地",
	"terrain_1":"草原",
	"terrain_2":"林",
	"terrain_3":"荒地",
	"terrain_4":"山地",
	"terrain_5":"雪原",
	"terrain_6":"橋",
	"terrain_7":"浅瀬",
	"terrain_8":"湿原",
	"terrain_9":"大河",
	"terrain_10":"城内",
	"terrain_11":"家屋",
	"terrain_12":"城",
	"terrain_13":"関",
	"terrain_14":"砦",
	"terrain_15":"村",
	"terrain_16":"兵舎",
	"terrain_17":"岩山",
	"terrain_18":"池",
	"terrain_19":"川",
	"terrain_20":"柵",
	"terrain_21":"城壁",
	"terrain_22":"池",
	"terrain_23":"火",
	"terrain_24":"船",
	"terrain_comment_heal":"回復可能",
	"terrain_comment_nomove":"移動禁止",
	"distribution_troops":"分配可能の兵力",
	"can_use_troops":"使用可能の兵力",
	
	"single_command_attack":"軽撃",
	"single_command_double_attack":"連撃",
	"single_command_big_attack":"重撃",
	"single_command_defence":"防御",
	"single_command_dodge":"回避",
	"single_command_charge":"集気",
	"single_command_backstroke_attack":"詐欺",
	"single_command_special_attack":"会心",
	
	"action_end_error":"もう行動済みです！",
	"can_not_operating":"操作不可:{0}",
	"belong_self":"自軍",
	"belong_enemy":"敵軍",
	"belong_friend":"友軍",
	"belong_self_action":"自軍行動",
	"belong_enemy_action":"敵軍行動",
	"belong_friend_action":"友軍行動",
	
	"big_map":"全地図",
	"create":"作成",
	"can_select_generals":"選択できる武将",
	"update_character":"武将編集",
	"create_seignior":"勢力作成",
	"update_seignior":"勢力編集",
	"event_preparing_error":"シナリオデータは準備中です、次のバージョンを待ってください！",
	"event_lock_error":"このシナリオはロックされています、ゲーム内にイベントが発生したら、解放します！",
	"auto_talk_not_debut":"最近は酒館に特殊の人材がいるみたいです、酒館に訪問してみてください、素晴らしい武将が発見するかもしれません!",
	"auto_talk_equipment":"この城のどこにレア装備の《{0}》がありますが、探すのが難しいだろう!",
	"auto_talk_no_generals":"今この城の中にいい人材がいないかもしれません!",
	"save_record_error":"このレコードを上書きできません、他のレコードを使ってください！",
	"create_seignior_no_character_error":"選択できる武将がいません！",
	"create_seignior_delete_error":"<font size='22' color='#FFFFFF'>君主 <font color='#FF0000'>{0}</font> を削除しますか？</font>",
	"create_city_delete_error":"<font size='22' color='#FFFFFF'><font color='#FF0000'>{0}</font> という城を削除しますか？</font>",
	"create_city_prefecture_error":"君主がいる城は、太守が君主にしなければなりません！",
	"create_seignior_city_error":"城を追加してください！",
	"create_seignior_character_error":"選んだ君主を任意の城に追加してください！",
	"create_character_name_error":"名前を入力してください！",
	"create_character_ability_error":"武将の能力属性を設定してください！",
	"create_character_arm_error":"兵科の属性を設定してください！",
	"strategy_weather_error":"天気のため、使えません！",
	"strategy_troops_error":"もう予備兵力がありません！",
	"strategy_mp_error":"MP不足！",
	"ctrl_Chaos_error":"混乱中!",
	"stunt":"特技",
	"menu":"メニュー",
	"max":"最大",
	"se_set":"音效",
	"bgm_set":"音楽",
	"enabled":"有効",
	"disabled":"無効",
	"game_speed":"ゲーム速度",
	"speed_normal":"普通",
	"speed_fast":"速い",
	"battleField":"戦況",
	"relationship":"関係",
	"attacker":"攻撃側",
	"weather":"天気",
	"preview":"プレビュー",
	"operating_end":"操作済み",
	"recruit_many_soldiers":"どのぐらいの兵士を募集しますか？",
	"city_of_troops":"{0} 兵力 : {1}人",
	"number_of_people":"{0}人",
	"proportion_of_people":"{0}/{1}人",
	"expedition_troops":"消費お金:{0}\n徵兵{1}人",
	"army_retreat_confirm":"全軍を撤退しますか？",
	"auto_save":"(自動保存)",
	"game_save":"進度保存",
	"game_read":"進度ロード",
	"army_retreat":"全军撤退",
	"end_bout":"回合終り",
	"battle_save_record":"戦場保存",
	"return_top":"トップに戻る",
	"hurt_preview":"傷:{0}\n命:{1}%",
	"dialog_select_generals":"武将を選んでください！",
	"dialog_no_captived_error":"捕獲された武将がいません！",
	"dialog_character_troops_error":"{0}に分配できる兵士がいません!",
	"dialog_prefecture_nodef_error":"<font size='22' color='#FFFFFF'>防守戦は太守<font color='#FF0000'>{0}</font>が出戦しなければなりません!</font>",
	"dialog_no_money":"金銭不足！",
	"dialog_error_hire_more":"在野武将は一回に一人しか登用できません！",
	"dialog_transport_select_confirm":"{0}に物資を輸送しますか？",
	"dialog_transport_select_error":"敵都市に物資を輸送することができません！",
	"dialog_move_generals_confirm":"{0}に移動しますか？",
	"dialog_move_generals_error":"この城に移動できません！",
	"dialog_spy_generals_confirm":"{0}に諜報を実施しますか？",
	"dialog_spy_generals_error":"味方の都市に諜報を実施することができません！",
	"dialog_expedition_select_error":"この城に攻撃できません！",
	"dialog_expedition_stop_battle_error":"この勢力は停戦中ですから、攻撃できません！",
	"dialog_persuade_belong_error":"味方武将を説得することができません！",
	"dialog_persuade_select_city_toast":"武将がいる城を選択してください！",
	"dialog_common_select_city_toast":"目標の城を選択してください！",
	"dialog_select_city_neighbor_error":"隣の城を選択してください！",
	"dialog_select_city_common_error":"この城が選択できません！",
	"dialog_persuade_spy_error":"武将情報を取得できません、まず諜報を実施してください！",
	"dialog_expedition_select_confirm":"{0}に攻撃しますか？",
	"dialog_expedition_select_leader":"主将を選んでください！",
	"dialog_select_leader_error":"主将が一人しか選択できません！",
	"dialog_select_onlyone_error":"武将が一人しか選択できません！",
	"select_leader":"主将選択",
	"select_monarch":"継承する武将",
	"leader":"主将",
	"number_of_generals":"武将人数",
	"dialog_remove_equipment_confirm":"<font size='22' color='#FFFFFF'>装備 <font color='#FF0000'>{0}</font> を外しますか？</font>",
	"dialog_select_seignior_confirm":"{0}を選択しますか？",
	"dialog_training_confirm":"どの兵科を訓練しますか？",
	"dialog_city_level_error":"この城がレベルアップできます。",
	"dialog_proficiency_max_error":"訓練の最大値になっています。",
	"dialog_prize_nomoney_error":"金銭不足です、褒賞が金銭{0}要ります!",
	"dialog_prize_success_message":"武将{0}の忠誠度が{1}アップしました!",
	"dialog_recruit_success_message":"晴天を見た思いです、嬉んで臣下となりましょう!!",
	"dialog_recruit_fail_message":"だれも、二人の主人に仕えることはできない！",
	"dialog_release_message":"武将{0}が釈放されました!",
	"dialog_behead_message":"武将{0}が斬首されました!",
	"dialog_tribe_invasion_self_message":"{0}が外族に入侵されて、大きな損失をくらった!",
	"dialog_tribe_invasion_message":"{0}の{1}が{2}に略奪されて、大きな損失をくらった!",
	"prize":"褒賞",
	"name":"名前",
	"age":"年齢",
	"distribute":"分配",
	"distribute_point":"分配可能の点数: {0}",
	"proficiency":"熟練度",
	"magicAttack":"法攻",
	"magicDefense":"法防",
	"speed":"速度",
	"dodge":"回避",
	"strategy":"謀略",
	"refresh":"リフレッシュ",
	"change_face":"顔画像変更",
	"change_monarch":"君主選択",
	"monarch_die":"{0}亡くなりました、{1}が新しい君主になりました！",
	"gender_male":"男",
	"gender_female":"女",
	"terrain":"地形",
	"release":"釈放",
	"recruit":"投降説得",
	"behead":"斬首",
	"persuade":"投降説得",
	"persuade_character":"武将の投降説得",
	"expedition_ready_food":"{0}/{1} ({2}日間)",
	"battle_win":"戦闘勝利",
	"battle_fail":"戦闘失敗",
	"consecutive_wins":"連勝回数:{0}",
	"continue_challenge_question":"{0}連勝しました，挑戦し続きますか？",
	
	"recruit_success":"晴天を見た思いです、嬉んで臣下となりましょう!",
	"recruit_fail":"だれも、二人の主人に仕えることはできない！",
	"captive_dialog_msg":"敵将{0}を捕獲しました!",
	"recruit_fail_dialog_msg":"敵将{0}が自軍に加入を拒否しました!",
	"rescue_self_captive_dialog_msg":"敵軍に捕獲された武将が救出しました!",
	"retreat_city_dialog_msg":"{0}が{1}軍に占領されました、どこに撤退しますか？",
	"lose_city_dialog_msg":"{0}が{1}軍に占領されました!",
	"surrender_dialog_msg":"{0}が敵軍に投降しました!",
	"beheaded_dialog_msg":"{0}が敵軍に斬首されました!",
	"released_dialog_msg":"{0}が敵軍に釈放されました!",
	"captived_dialog_msg":"{0}が敵軍に捕獲されました!",
	"shimono_dialog_msg":"{0}が下野しました!",
	"rescue_enemy_captive_dialog_msg":"捕獲した敵将も救出されました!",
	"to_attack_seignior_city":"{0}の{1}が{2}の{3}に攻め始めました!",
	"to_attack_null_city":"{0}の{1}が{2}に攻め始めました!",
	"win_attack_and_occupy_null":"{0}が{1}を陥落させました!",
	"win_attack_and_occupy_enemy":"{0}が{1}軍の{2}を陥落させました!",
	"win_attack_and_occupy_self":"{0}が{1}軍を撃退しました!",
	"fail_attack_and_occupy_enemy":"{0}が{1}軍の{2}の攻略が失败しました!",
	"fail_attack_and_occupy_self":"{0}が{1}軍に攻略されて、陥落しました!",
	"seignor_die_other":"势力の{0}が滅亡された！！",
	"seignor_die_self":"势力の{0}が滅亡された！ゲームオーバー！",
	"jobai_tavern_message":"{0}の{1}が人材を探索しています!",
	"jobai_internal_message":"{0}の{1}が内政を開発しています!",
	"jobai_enlish_message":"{0}の{1}が兵士を募集しています!",
	"jobai_rescue_confirm_message":"{0}の{1}が金銭{2}で捕虜の{3}の返還交渉をしたいです、よろしいですか？",
	
	"seigniorProcess":"<font size='22' color='#FFFFFF'><font color='#FF0000'>{0}</font>勢力進行中</font>",
	"exploreBusinessSuccess":"{0}が市場で探索して、[{1}]を発見しました!",
	"exploreBusinessMoney":"{0}が市場で探索して、金銭を{1}徴収しました。",
	"exploreBusinessFail":"{0}が市場での探索は、成果がありませんでした。",
	"exploreAgricultureSuccess":"{0}が農地で探索して、[{1}]を発見しました!",
	"exploreAgricultureFood":"{0}が農地で探索して、食糧を{1}徴収しました。",
	"exploreAgricultureFail":"{0}が農地での探索は、成果がありませんでした。",
	"accessSuccessMessage":"訪問中の{0}が、[{1}]という武将を発見しました!",
	"accessFailMessage":"{0}の訪問は、成果がありませんでした!",
	"stopBattleSuccessMessage":"{0}は停戦協議の任務が成功しました!",
	"stopBattleFailMessage":"{0}は停戦協議の任務が失敗しました!",
	"redeemSuccessMessage":"{0}は捕虜の返還交渉が成功しました!",
	"redeemReturnMessage":"{0}が{1}に帰還しました!",
	"redeemFailMessage":"{0}は捕虜の返還交渉が失敗しました!",
	"levelUpCityMessage":"{0}が{1}にレベルアップしました!",
	"spySuccessMessage":"{0}が{1}に諜報成功しました。",
	"spyFailMessage":"{0}が{1}に諜報失敗しました。",
	"hireSuccessMessage":"{0}は{1}が説得できて、{2}が仲間に入れた!",
	"hireFailMessage":"{0}登用失敗しました。",
	"hireFailTalk":"ちょっと、今出仕するつもりはないですが......",
	"hireSuccessTalk":"晴天を見た思いです、嬉んで臣下となりましょう!!",
	"hireRefuseMessage":"{0}は{1}の説得を拒否しました。",
	"persuadeRefuseMessage":"{0}は{1}の説得を拒否しました。",
	"persuadeSuccessMessage":"{0}は{1}が説得できて、{2}が仲間に入れた!",
	"dialogPersuadeMessage":"{0}が{1}軍に寝返ったようです。",
	
	"rain":"雨",
	"cloud":"雾",
	"snow":"雪",
	"sunny":"晴",

	"label_equip":"装備",
	"label_use":"使用",
	"label_sale":"売却",
	
	"born":"出生",
	"life":"寿命",
	"personalLoyalty":"義気",
	"disposition":"性格",
	"ambition":"野心",
	"compatibility":"相性",
	
	"belong":"所属",
	"identity":"身份",
	"status":"状態",
	"effect":"効果",
	
	"force":"武力",
	"command":"统率",
	"intelligence":"知力",
	"agility":"敏捷",
	"luck":"運気",
	"sc_angry":"怒气",
	
	"standby":"待命",
	"singleCombat":"一騎討ち",
	"attack":"攻撃",
	"spirit":"策略",
	"defense":"防御",
	"breakout":"爆発",
	"morale":"士气",
	"movePower":"移動力",
	"physicalFitness":"体力",
	"all_seignior":"全勢力一覧",
	"city_list":"都市一覧",
	"create_seignior_list":"自作勢力一覧",
	"create_character_list":"自作武将一覧",
	"monarch":"君主",
	"general":"一般",
	"nothing":"無し",
	"seignior":"勢力",
	"seignior_lv":"勢力レベル",
	"generals_lv":"武将レベル",
	"seignior_color":"勢力の色",
	"prefecture":"太守",
	"captive":"捕虜",
	"business":"商業",
	"agriculture":"農業",
	"technology":"技術",
	"police":"治安",
	"money":"金銭",
	"food":"兵粮",
	"troops":"兵力",
	"city_defense":"城防",
	"repair":"修補",
	"big_map":"全地図",
	"expedition":"出征",
	"arm_expedition":"予備兵",
	"generals_list":"武将一覧",
	"generals_move":"武将移動",
	"generals_hire":"登用実行",
	"move_start":"移動開始",
	"generals_spy":"諜報",
	"arm_properties":"戦備属性",
	"basic_properties":"基本属性",
	"ability_properties":"能力属性",
	"expedition_resources":"物資の準備",
	"appoint_prefecture":"太守の任命",
	"cutover":"切替",
	"spy":"諜報",
	"appoint":"委任",
	"remove_appoint":"解除委任",
	"transport":"物資の輸送",
	"transport_job":"輸送",
	"diplomacy":"外交",
	"diplomacy_redeem":"外交",
	"diplomacy_stop_battle":"外交",
	"access":"訪問",
	"hire":"登用",
	"explore":"探索",
	"explore_agriculture":"探索",
	"explore_business":"探索",
	"enlist":"徴兵",
	"arm_list":"軍隊一覧",
	"arm_enlist":"徴兵",
	"arm_name":"軍隊名称",
	"training":"練習",
	"strengthen":"強化",
	"research":"研究",
	"population":"人口",
	"out_of_office":"在野",
	
	"loyalty":"忠誠度",
	"feat":"功績",
	"levelUpCity":"城のレベルアップ",
	"levelUp":"レベルアップ",
	"market":"市場",
	"official":"政庁",
	"barrack":"兵舎",
	"farmland":"農地",
	"institute":"工房",
	"tavern":"酒館",
	"citygate":"城門",
	"redeem":"捕虜の返還交渉",
	"stop_battle":"停戦協議",
	"stop_battleing":"停戦中",
	"hostility":"敵対",
	"diplomacy_message":"お金はどのぐらい使いますか？",
	"select_seignior":"勢力選択",
	//"ransom":"贖金",
	"attack_range":"攻撃範囲",
	"attack_effect":"攻撃効果",
	"final_record":"最終戦績",
	"stamp_list":"アイテム図鑑",
	"event_list":"イベント一覧",
	"idle":"待命",
	"move":"移動",
	"end":"終了",
	
	"current":"現在",
	"city_title":"{0}年{1}月  {2}  ({3})",
	
	
	"null":"无",
	"confirm":"確認",
	"ask_single_combat_confirm":"一騎討ちを受け取りますか？\n敵方 {0} 武力:{1} HP:{2}\n味方 {3} 武力:{4} HP:{5}",
	"single_combat_ask":"敵将{0}、勝負せよ！",
	"single_combat_answer_ok":"おおっ、心得だ！",
	"single_combat_answer_no":"今はその時間ではない!",
	
	"leader_change_talk":"やばい、主将が撤退したため、軍隊が混乱していて、能力が下降しています。それでは、私が主将をやります！",
	"bout_end_confirm":"回合を終了しますか？",
	"gameover":"ゲームオーバー",
	"skill_explanation":"【{0}】{1}(発動率:{2}％)",
	"building":"建筑物",
	"buy_food":"食糧購入",
	"sell_food":"食糧売却",
	"buy_food_message":"どのぐらい購入しますか？",
	"sell_food_message":"どのぐらい売却しますか？",
	"use_money":"使用金銭:{0}/{1}",
	"get_money":"獲得金銭:{0}",
	"forum":"交流/意見",
	"goto_execute_message":"戦略フェイズを終了します\nよろしいですか？",
	"expedition_attack_quantity_message":"攻城戦は最大武将数が{0}になります",
	"expedition_defense_quantity_message":"防衛戦は最大武将数が{0}になります",
	"riot_message":"{0}にいる群衆は不満が爆発して、暴動起きました!",
	"no_food_talk":"やばい！食糧がなくなったから、兵士の戦闘力が下降しました。",
	"child_growup":"<font size='22' color='#FFFFFF'><font color='#FF0000'> {0} </font>が大人になったから、<font color='#FF0000'> {1} </font>に従って、味方に参加しました！</font>"
};
Language.itemData = {
	"item_name_1":"草薬",
	"item_name_2":"麻沸散",
	"item_name_3":"金創薬",
	"item_name_4":"人蔘",
	"item_name_5":"霊芝草",
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
	"item_name_18":"青龍偃月刀",
	"item_name_19":"虎頭湛金槍",
	"item_name_20":"龍胆亮銀槍",
	"item_name_21":"万石弓",
	"item_name_22":"双股剣",
	"item_name_23":"七宝刀",
	"item_name_24":"青虹剣",
	"item_name_25":"倚天剣",
	"item_name_26":"落日弓",
	"item_name_27":"双鉄戟",
	"item_name_28":"古錠刀",
	"item_name_29":"青铜鞭",
	"item_name_30":"涯角枪",
	"item_name_31":"流星锤",
	"item_name_32":"钩镰枪",
	"item_name_33":"三尖両刃刀",
	"item_name_34":"铁蒺藜骨朵",
	"item_name_35":"眉尖刀",
	"item_name_36":"龍舌弓",
	"item_name_37":"鉄戟",
	"item_name_38":"大斧",
	"item_name_39":"飛錘",
	"item_name_40":"鉄鞭",
	"item_name_41":"鉄錘",
	"item_name_42":"鉄刀",
	"item_name_43":"鉄槍",
	"item_name_44":"兵法二十四篇",
	"item_name_45":"孫子兵法",
	"item_name_46":"孟徳新書",
	"item_name_47":"遁甲天書",
	"item_name_48":"太平要術",
	"item_name_49":"六韜",
	"item_name_50":"三略",
	"item_name_51":"春秋",
	"item_name_52":"左傳",
	"item_name_53":"戦国策",
	"item_name_54":"漢書",
	"item_name_55":"赤羽扇",
	"item_name_56":"青羽扇",
	"item_name_57":"七星剣",
	"item_name_58":"聖者宝剣",
	"item_name_59":"聖拂尘",
	"item_name_60":"暗拂尘",
	"item_name_61":"烏金鎧",
	"item_name_62":"黄金鎧",
	"item_name_63":"白銀鎧",
	"item_name_64":"龍鱗鎧",
	"item_name_65":"連環鎧",
	"item_name_66":"鎖子甲",
	"item_name_67":"柳葉甲",
	"item_name_68":"玲瓏鎧",
	"item_name_69":"青銅鎧",
	"item_name_70":"鉄鎧",
	"item_name_71":"赤兎",
	"item_name_72":"烏騅",
	"item_name_73":"的卢",
	"item_name_74":"汗血宝馬",
	"item_name_75":"絶影",
	"item_name_76":"爪黃飛電",
	"item_name_77":"照夜玉獅子",
	"item_name_78":"黃驃馬",
	"item_name_79":"大宛馬",
	"item_name_80":"白馬",
	"item_name_81":"鳳翅紫金冠",
	"item_name_82":"黄金盔",
	"item_name_83":"夜明盔",
	"item_name_84":"将軍盔",
	"item_name_85":"通天冠",
	"item_name_86":"五梁冠",
	"item_name_87":"銅盔",
	"item_name_88":"鐵盔",
	"item_name_89":"皮盔",
	"item_name_90":"头巾",
};
Language.characterData={"character_1":"曹操","character_2":"周瑜","character_3":"趙雲","character_4":"関羽","character_5":"張遼","character_6":"鄧艾","character_7":"姜維","character_8":"孫堅","character_9":"陸遜","character_10":"諸葛亮","character_11":"羊祜","character_12":"徐晃","character_13":"呂蒙","character_14":"夏侯敦","character_15":"徐盛","character_16":"司馬懿","character_17":"孫權","character_18":"呂布","character_19":"張飛","character_20":"徐庶","character_21":"劉備","character_22":"甘寧","character_23":"郝昭","character_24":"孫策","character_25":"陳泰","character_26":"陸抗","character_27":"高順","character_28":"張郃","character_29":"張嶷","character_30":"李典","character_31":"於禁","character_32":"張任","character_33":"許褚","character_34":"郭淮","character_35":"曹丕","character_36":"馬雲鷺","character_37":"孫尚香","character_38":"杜預","character_39":"袁紹","character_40":"吳懿","character_41":"夏侯淵","character_42":"龐德","character_43":"馬超","character_44":"丁奉","character_45":"賈詡","character_46":"滿寵","character_47":"司馬師","character_48":"傅僉","character_49":"李嚴","character_50":"孫桓","character_51":"王濬","character_52":"司馬昭","character_53":"朱桓","character_54":"諸葛瞻","character_55":"韓浩","character_56":"審配","character_57":"陳登","character_58":"魏延","character_59":"田豫","character_60":"法正","character_61":"馬忠","character_62":"王平","character_63":"太史慈","character_64":"鄧芝","character_65":"夏侯霸","character_66":"張角","character_67":"廖化","character_68":"賈逵","character_69":"王基","character_70":"司馬炎","character_71":"張寶","character_72":"程普","character_73":"張翼","character_74":"典韋","character_75":"公孫瓚","character_76":"陳宮","character_77":"周倉","character_78":"劉曄","character_79":"曹真","character_80":"韓當","character_81":"周泰","character_82":"魯肅","character_83":"文聘","character_84":"諸葛誕","character_85":"孫登","character_86":"鐘會","character_87":"皇甫嵩","character_88":"楊阜","character_89":"関平","character_90":"文鴦","character_91":"全琮","character_92":"朱拠","character_93":"程昱","character_94":"樂進","character_95":"韓遂","character_96":"霍峻","character_97":"費耀","character_98":"高覽","character_99":"李恢","character_100":"孫瑜","character_101":"張承","character_102":"麴義","character_103":"曹昂","character_104":"朱然","character_105":"夏侯尚","character_106":"霍弋","character_107":"孫韶","character_108":"向寵","character_109":"吾彥","character_110":"鮑信","character_111":"黃忠","character_112":"蒯良","character_113":"王渾","character_114":"陶璜","character_115":"黃崇","character_116":"荀攸","character_117":"步陟","character_118":"胡烈","character_119":"嚴顏","character_120":"沈瑩","character_121":"馬隆","character_122":"鄧忠","character_123":"黃蓋","character_124":"曹仁","character_125":"駱統","character_126":"胡遵","character_127":"諸葛尚","character_128":"張燕","character_129":"曹彰","character_130":"楊儀","character_131":"文欽","character_132":"毋丘儉","character_133":"董厥","character_134":"張悌","character_135":"閻柔","character_136":"賀齊","character_137":"公孫康","character_138":"陳到","character_139":"黃月英","character_140":"張特","character_141":"臧霸","character_142":"龐統","character_143":"王雙","character_144":"公孫度","character_145":"朱治","character_146":"顏良","character_147":"呂岱","character_148":"郭嘉","character_149":"陳武","character_150":"馬謖","character_151":"陸景","character_152":"蔣濟","character_153":"張苞","character_154":"関興","character_155":"州泰","character_156":"呂範","character_157":"劉劭","character_158":"羅憲","character_159":"楊肇","character_160":"馬騰","character_161":"朱异","character_162":"司馬望","character_163":"凌操","character_164":"雷銅","character_165":"曹休","character_166":"孫禮","character_167":"陸凱","character_168":"潘璋","character_169":"盧植","character_170":"黃權","character_171":"曹洪","character_172":"吳班","character_173":"孟達","character_174":"蘇飛","character_175":"関索","character_176":"王經","character_177":"孫異","character_178":"祖茂","character_179":"沮授","character_180":"田疇","character_181":"鄂煥","character_182":"徐質","character_183":"夏侯玄","character_184":"趙統","character_185":"華雄","character_186":"蔡瑁","character_187":"公孫範","character_188":"蔣欽","character_189":"凌統","character_190":"牽弘","character_191":"周旨","character_192":"辛毗","character_193":"高沛","character_194":"張穎","character_195":"諸葛恪","character_196":"張梁","character_197":"張繡","character_198":"石苞","character_199":"嚴興","character_200":"李通","character_201":"夏侯恩","character_202":"馬岱","character_203":"鄒靖","character_204":"眭固","character_205":"文丑","character_206":"王凌","character_207":"闞澤","character_208":"馮習","character_209":"楊濟","character_210":"高幹","character_211":"司馬孚","character_212":"雍凱","character_213":"泠苞","character_214":"賈範","character_215":"王頎","character_216":"董襲","character_217":"張既","character_218":"諸葛瑾","character_219":"王昶","character_220":"司馬攸","character_221":"紀靈","character_222":"張動","character_223":"蒯越","character_224":"程銀","character_225":"高柔","character_226":"劉封","character_227":"陳表","character_228":"曹叡","character_229":"公孫淵","character_230":"魯淑","character_231":"朱儁","character_232":"公孫續","character_233":"朵思大王","character_234":"虞汜","character_235":"留平","character_236":"唐彬","character_237":"張揚","character_238":"胡奮","character_239":"張遵","character_240":"孫休","character_241":"祝融","character_242":"費褘","character_243":"曹沖","character_244":"方悅","character_245":"周昕","character_246":"樂琳","character_247":"徐榮","character_248":"宋謙","character_249":"馬忠","character_250":"楊稷","character_251":"袁遺","character_252":"俞涉","character_253":"公​​孫越","character_254":"呂虔","character_255":"何楨","character_256":"楊懷","character_257":"卞喜","character_258":"馬休","character_259":"胡質","character_260":"程武","character_261​​":"孫峻","character_262":"步闡","character_263":"劉睿","character_264":"張尚","character_265":"董卓","character_266":"虞翻","character_267":"劉辟","character_268":"張松","character_269":"全紀","character_270":"孫震","character_271":"鍾繇","character_272":"韓德","character_273":"橋瑁","character_274":"田楷","character_275":"孫仲","character_276":"侯成","character_277":"張允","character_278":"丁封","character_279":"李豐","character_280":"趙廣","character_281":"李球","character_282":"王戎","character_283":"孫歆","character_284":"蔡貢","character_285":"郭圖","character_286":"嚴綱","character_287":"樂就","character_288":"吳蘭","character_289":"高翔","character_290":"文虎","character_291":"諸葛靚","character_292":"龔都","character_293":"曹純","character_294":"沮鵠","character_295":"申耽","character_296":"呂凱","character_297":"鐘離斐","character_298":"荀愷","character_299":"雷薄","character_300":"沙摩柯","character_301":"朱靈","character_302":"楊任","character_303":"留贊","character_304":"蔣琬","character_305":"張南","character_306":"秦朗","character_307":"梁緒","character_308":"李儒","character_309":"李肅","character_310":"管亥","character_311":"毛玠","character_312":"夏侯威","character_313":"於詮","character_314":"伍延","character_315":"王匡","character_316":"華歆","character_317":"袁熙","character_318":"馬良","character_319":"魏邈","character_320":"龐羲","character_321":"楊秋","character_322":"胡濟","character_323":"龐會","character_324":"陳俊","character_325":"周魴","character_326":"張球","character_327":"王伉","character_328":"張邈","character_329":"董和","character_330":"刑道荣","character_331":"戴陵","character_332":"関統","character_333":"嚴白虎","character_334":"許貢","character_335":"陳蘭","character_336":"孟獲","character_337":"楊欣","character_338":"鄒丹","character_339":"曹性","character_340":"張虎","character_341":"留略","character_342":"賈充","character_343":"胡淵","character_344":"丁原","character_345":"関靖","character_346":"陳震","character_347":"鄧茂","character_348":"董承","character_349":"劉璝","character_350":"陳矯","character_351":"馬鐵","character_352":"吾粲","character_353":"張休","character_354":"孟宗","character_355":"李歆","character_356":"孫靜","character_357":"蔣義渠","character_358":"糜竺","character_359":"陳應","character_360":"太史享","character_361":"荀勗","character_362":"成宜","character_363":"王甫","character_364":"木鹿大王","character_365":"鄧賢","character_366":"蔣班","character_367":"劉焉","character_368":"宋憲","character_369":"閻圃","character_370":"楊修","character_371":"袁尚","character_372":"牛金","character_373":"周浚","character_374":"黃祖","character_375":"袁術","character_376":"單經","character_377":"典滿","character_378":"傅彤","character_379":"李輔","character_380":"貂蟬","character_381":"張濟","character_382":"趙弘","character_383":"賈華","character_384":"鞏志","character_385":"鮑隆","character_386":"董允","character_387":"尹賞","character_388":"笮融","character_389":"兀突骨","character_390":"畢軌","character_391":"滕胤","character_392":"陶濬","character_393":"王修","character_394":"申儀","character_395":"桓範","character_396":"崔琰","character_397":"謝旌","character_398":"董荼那","character_399":"王威","character_400":"裴元紹","character_401":"張衛","character_402":"倫直","character_403":"丘建","character_404":"程遠志","character_405":"張英","character_406":"魏続","character_407":"樊建","character_408":"劉岱","character_409":"王門","character_410":"胡車兒","character_411":"王肅","character_412":"唐諮","character_413":"全端","character_414":"陳騫","character_415":"陳琳","character_416":"辛評","character_417":"潘睿","character_418":"閻宇","character_419":"華佗","character_420":"李堪","character_421":"魏攸","character_422":"樊稠","character_423":"梁興","character_424":"郭攸之","character_425":"夏侯惠","character_426":"盛曼","character_427":"孫冀","character_428":"高升","character_429":"馬玩","character_430":"焦彝","character_431":"劉繇","character_432":"夏侯德","character_433":"朱褒","character_434":"夏侯和","character_435":"田章","character_436":"孫秀","character_437":"陳橫","character_438":"田豐","character_439":"王累","character_440":"胡班","character_441":"王韜","character_442":"許儀","character_443":"句安","character_444":"田續","character_445":"丘本","character_446":"劉表","character_447":"胡軫","character_448":"楊醜","character_449":"趙累","character_450":"步協","character_451":"陶謙","character_452":"董昭","character_453":"張魯","character_454":"孫乾","character_455":"楊昂","character_456":"侯選","character_457":"譚雄","character_458":"王惇","character_459":"淳于瓊","character_460":"阿會喃","character_461":"伊籍","character_462":"孫詡","character_463":"曹植","character_464":"孫亮","character_465":"李傕","character_466":"張紘","character_467":"武安國","character_468":"蘇由","character_469":"許靖","character_470":"陳紀","character_471":"張緝","character_472":"毋丘秀","character_473":"蔣舒","character_474":"呂威璜","character_475":"徐邈","character_476":"忙牙長","character_477":"金環三結","character_478":"楊祚","character_479":"吳綱","character_480":"裴秀","character_481":"王朗","character_482":"糜芳","character_483":"全懌","character_484":"劉虞","character_485":"郭汜","character_486":"韓忠","character_487":"李異","character_488":"高定","character_489":"卑衍","character_490":"顧譚","character_491":"楊奉","character_492":"荀彧","character_493":"劉賢","character_494":"王買","character_495":"孔融","character_496":"戲志才","character_497":"潘鳳","character_498":"薛瑩","character_499":"劉琦","character_500":"張華","character_501":"金旋","character_502":"関彝","character_503":"陳珪","character_504":"袁譚","character_505":"帶來洞主","character_506":"穆順","character_507":"呂翔","character_508":"濮陽興","character_509":"張昭","character_510":"王祥","character_511":"樓玄","character_512":"韓暹","character_513":"呂曠","character_514":"荀諶","character_515":"張橫","character_516":"孟優","character_517":"曹豹","character_518":"陳式","character_519":"逢紀","character_520":"向朗","character_521":"閻象","character_522":"司馬朗","character_523":"公​​孫恭","character_524":"甄氏","character_525":"孫匡","character_526":"辛敞","character_527":"劉丞","character_528":"大喬","character_529":"嚴政","character_530":"薛綜","character_531":"何曾","character_532":"李豐","character_533":"蔣斌","character_534":"黨均","character_535":"王粲","character_536":"傅士仁","character_537":"孫朗","character_538":"車冑","character_539":"王含","character_540":"劉循","character_541":"諸葛緒","character_542":"張布","character_543":"王允","character_544":"劉巴","character_545":"袁燿","character_546":"韓嵩","character_547":"何儀","character_548":"小喬","character_549":"何宴","character_550":"簡雍","character_551":"秦宓","character_552":"尹默","character_553":"鄭衝","character_554":"鍾毓","character_555":"程秉","character_556":"顧雍","character_557":"韋昭","character_558":"吳巨","character_559":"張肅","character_560":"傅巽","character_561":"馬遵","character_562":"孔伷","character_563":"韓胤","character_564":"張溫","character_565":"邵悌","character_566":"董旻","character_567":"陸績","character_568":"諸葛均","character_569":"施朔","character_570":"胡衝","character_571":"陳群","character_572":"滕脩","character_573":"劉琮","character_574":"曹爽","character_575":"楊弘","character_576":"牛輔","character_577":"王業","character_578":"王忠","character_579":"王沈","character_580":"許攸","character_581":"丁謐","character_582":"蔣顯","character_583":"吳質","character_584":"曹宇","character_585":"譙周","character_586":"丁儀","character_587":"董朝","character_588":"馬均","character_589":"蔣幹","character_590":"李勝","character_591":"郤正","character_592":"孫述","character_593":"曹羲","character_594":"趙範","character_595":"袁胤","character_596":"鄧良","character_597":"孫皓","character_598":"張紹","character_599":"蔡中","character_600":"蔡和","character_601":"曹熊","character_602":"韓馥","character_603":"張節","character_604":"何進","character_605":"劉度","character_606":"曹芳","character_607":"楊柏","character_608":"尹大目","character_609":"夏侯楙","character_610":"何植","character_611":"曹奐","character_612":"全尚","character_613":"楊松","character_614":"曹訓","character_615":"韓玄","character_616":"劉璋","character_617":"馬邈","character_618":"黃皓","character_619":"岑昏","character_620":"劉禪","character_621":"烏丸大王","character_622":"烏丸騎兵","character_623":"烏丸騎兵","character_624":"烏丸弩兵","character_625":"烏丸弩兵","character_626":"烏丸步兵","character_627":"烏丸步兵","character_628":"烏丸弓騎","character_629":"烏丸醫生","character_630":"烏丸醫生","character_631":"山越大王","character_632":"山越騎兵","character_633":"山越騎兵","character_634":"山越弩兵","character_635":"山越弩兵","character_636":"山越步兵","character_637":"山越步兵","character_638":"山越弓騎","character_639":"山越醫生","character_640":"山越醫生","character_641":"匈奴大王","character_642":"匈奴騎兵","character_643":"匈奴騎兵","character_644":"匈奴弩兵","character_645":"匈奴弩兵","character_646":"匈奴步兵","character_647":"匈奴步兵","character_648":"匈奴弓騎","character_649":"匈奴醫生","character_650":"匈奴醫生","character_651":"氐大王","character_652":"氐騎兵","character_653":"氐騎兵","character_654":"氐弩兵","character_655":"氐弩兵","character_656":"氐步兵","character_657":"氐步兵","character_658":"氐弓騎","character_659":"氐醫生","character_660":"氐醫生","character_661":"羌大王","character_662":"羌騎兵","character_663":"羌騎兵","character_664":"羌弩兵","character_665":"羌弩兵","character_666":"羌步兵","character_667":"羌步兵","character_668":"羌弓騎","character_669":"羌醫生","character_670":"羌醫生","character_671":"箭塔","character_672":"箭塔","character_673":"箭塔","character_674":"箭塔","character_675":"箭塔","character_676":"箭塔","character_677":"砲台","character_678":"砲台","character_679":"砲台","character_680":"砲台","character_681":"砲台","character_682":"砲台"};
Language.cityData = {
	"city_1":"西涼",
	"city_2":"天水",
	"city_3":"武都",
	"city_4":"安定",
	"city_5":"梓潼",
	"city_6":"成都",
	"city_7":"江洲",
	"city_8":"建寧",
	"city_9":"雲南",
	"city_10":"交趾",
	"city_11":"漢中",
	"city_12":"長安",
	"city_13":"永安",
	"city_14":"宛",
	"city_15":"襄陽",
	"city_16":"江陵",
	"city_17":"武陵",
	"city_18":"長沙",
	"city_19":"零陵",
	"city_20":"桂陽",
	"city_21":"南海",
	"city_22":"洛陽",
	"city_23":"河内",
	"city_24":"許昌",
	"city_25":"新野",
	"city_26":"汝南",
	"city_27":"江夏",
	"city_28":"柴桑",
	"city_29":"廬江",
	"city_30":"建業",
	"city_31":"呉",
	"city_32":"会稽",
	"city_33":"譙",
	"city_34":"寿春",
	"city_35":"小沛",
	"city_36":"下邳",
	"city_37":"徐州",
	"city_38":"北海",
	"city_39":"陳留",
	"city_40":"濮陽",
	"city_41":"鄴",
	"city_42":"晋陽",
	"city_43":"平原",
	"city_44":"南皮",
	"city_45":"薊",
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
	"name_qbb":"歩兵",
	"name_gb":"弓兵",
	"name_qqb":"騎兵",
	"name_gqb":"弓騎兵",
	"name_qpc":"砲車",
	"name_whj":"武道家",
	"name_zb":"賊兵",
	"name_cs":"策士",
	"name_fsis":"風水士",
	"name_ds":"道士",
	"name_qcs":"騎馬策士",
	"name_wun":"女兵",
	"name_xlqb":"西涼騎兵",
	"name_hjz":"黄巾賊",
	"name_hd":"海賊",
	"name_xxs":"熊使い",
	"name_xhs":"虎使い",
	"name_dd":"提督",
	"name_zss":"呪術士",
	"name_qlq":"青龙骑兵",
	"name_bhq":"白虎步兵",
	"name_xwn":"玄武弩兵",
	"name_zqn":"朱雀弩骑",
	"explanation_jj":"全能力が平均して高く、敵に回すと厄介である。",
	"explanation_qbb":"攻撃力は平凡だが、防御とHP（耐久値）が高いユニット。8方向攻撃が可能である。",
	"explanation_gb":"間接攻撃が可能なユニット。攻撃範囲が広いが、隣接する敵には攻撃できないため接近戦には弱い。",
	"explanation_qqb":"移動範囲が広く攻撃が高いユニットだが、険しい道（山地や水路）には弱い、4方向しか攻撃できない。",
	"explanation_gqb":"騎兵系の移動範囲の広さと弓兵系の間接攻撃の特性を併せ持つユニットである、2マス離れた4方向しか攻撃できないため接近戦に非常に弱い。",
	"explanation_qpc":"全ユニットで最も広い射程距離を持つ間接攻撃が出来るユニットだが、命中率は低く移動範囲も狭い。",
	"explanation_whj":"瞬発が高いため連続攻撃が発生しやすく回避率も高いユニット。水上の地形適正が高いのも特徴といえる。また、毒煙系や気合の策略も使える。",
	"explanation_zb":"林や山地での地形適正が高く、地系の攻撃系策略を使えるユニット、士気が高いため会心の一撃が発生しやすいが、精神が低いため策略には弱い。",
	"explanation_cs":"火系、水系、地系などの攻撃系策略のエキスパートといえるユニット。他にも小補給など若干の回復系策略も使用できる。",
	"explanation_fsis":"HP・MPや状態異常の回復など回復系、味方のユニット性能を上げる向上系の策略を操る支援的なユニット。",
	"explanation_ds":"毒煙や誘惑など追加効果のついた攻撃や敵のユニット性能の低下や状態異常を起こさせる妨害系策略を操るユニット。",
	"explanation_qcs":"騎兵系の移動範囲の広さと策士系の多彩な攻撃系策略の特性を併せ持つユニット。",
	"explanation_wun":"能力的には武道家系と似ているが、HPは低い。",
	"explanation_xlqb":"防御と移動が高く8方向に攻撃が可能な攻撃性の高い戦車風のユニットだが、策略には非常に弱い。",
	"explanation_hjz":"黄巾賊討伐と黄巾賊残党討伐のみ登場。見た目は山賊と似ているが4方向にしか攻撃が出来ない。",
	"explanation_hd":"大河や浅瀬などの水上の地形適正が高いユニット。水系の攻撃系策略も使える。",
	"explanation_xxs":"熊に攻撃させるユニット。攻撃したユニットを動けなくする特性を持つ。虎使い同様、策略には非常に弱い。",
	"explanation_xhs":"虎に攻撃させるユニット。4方向にしか攻撃出来ないが、貫通攻撃が可能である。策略には非常に弱い。",
	"explanation_dd":"海賊同様、水上の地形適正が高いユニット。水系や火系の攻撃系や妨害系の策略を使用し、文官ユニットながら攻撃力は高め。",
	"explanation_zss":"策士系、道士系、風水士系の全ての策略が使える最強の文官ユニット。",
	"explanation_qlq":"青龙骑兵",
	"explanation_bhq":"白虎步兵",
	"explanation_xwn":"玄武弩兵",
	"explanation_zqn":"朱雀弩骑",
};
Language.singleCombatData = {
	"Debut0":"この{0}を相手に......誉めてやろう！",
	"Debut1":"どうした？{0}の怖気づきやがったか",
	"Debut2":"お前の相手はこの{0}だ！",
	"Debut3":"{0}である、勝負！",
	"Back0":"すごい、逃げるのが最善の策である！",
	"Back1":"兵法三十六計、走為上！",
	"Back2":"ちっ、あと少しだったのに、逃がしちまった",
	"Back3":"今日のところは退いてやろう！",
	"Pursuit0":"逃げないで！",
	"Pursuit1":"待って！",
	"Back_attack0":"お前が騙された！",
	"Back_attack1":"バガだ！",
	"Back_attack2":"勇気があるだけで知恵がない！"
};
Language.angryTalkData = {
	"angry_talk_0_0":"ああああああ……",
	"angry_talk_0_1":"おおおおおお……",
	"angry_talk_0_2":"うううううう……",
	"angry_talk_1_0":"我が一撃が見切れるか!",
	"angry_talk_1_1":"ぬううん！!",
	"angry_talk_1_2":"力の差を思い知れ!"
};
Language.dieTalkData = {
	"die_talk_0_0":"ふ、不覚……",
	"die_talk_0_1":"む……無念……",
	"die_talk_0_2":"ぐわっ！",
	"die_talk_1_0":"まずい……",
	"die_talk_1_1":"ま、まだだ……",
	"die_talk_1_2":"ぐくっ……"
};
Language.underArrestTalkData = {
	"under_arrest_talk_0_0":"このような屈辱、許しませんわよ！",
	"under_arrest_talk_0_1":"予測できなかった……！",
	"under_arrest_talk_0_2":"やばっ！"
};
Language.skillData = {
	"group_1":"父子同心!",
	"group_2":"桃園の誓い!",
	"group_3":"河北の名将<顔良文醜>の刃の餌食となれぃ。",
	"group_4":"虎痴悪来の突撃だ!",
	"group_5":"名門の虎子！",
	"group_6":"虎痴はいる？",
	"group_7":"前嫌冰解!",
	"group_8":"珠联璧合!",
	
	"s_1":"雷霆怒撃",
	"se_1":"連続で三回攻撃する。",
	"s_2":"真龍の気",
	"se_2":"傷害を0にする。",
	"s_3":"隔山打牛",
	"se_3":"傷害を隣の敵に広がります。",
	"s_4":"天下無双",
	"se_4":"敵に二回会心攻撃する、相手の隣の敵は防御力が下降させる。",
	"s_5":"愈戦愈勇",
	"se_5":"攻撃が終わったら、自分の攻撃力を上昇させる。",
	"s_6":"愈戦愈堅",
	"se_6":"攻撃が終わったら、自分の防御力を上昇させる。",
	"s_7":"鼓舞",
	"se_7":"回合がスタートする時、自分と隣の武将の士気を上昇させる。",
	"s_8":"蒼龍覚醒",
	"se_8":"攻撃する時、敵の能力の一つを下降させる、そして、自分と隣の味方武将が不良状態にならない。",
	"s_9":"幻影",
	"se_9":"攻撃の傷害を2倍になり、敵を混乱状態にする。",
	"s_10":"嗜血",
	"se_10":"物理攻撃する時、敵が減少した兵士を自分の兵士にする。",
	"s_11":"神算",
	"se_11":"魔法攻撃する時、必ず会心攻撃になり、味方の全軍の魔法傷害が半分にする。",
	"s_12":"火神",
	"se_12":"火系策略を使う時、損害が倍になり、敵が燃焼状態になる。",
	"s_13":"医神",
	"se_13":"回合スタートする時、自分と隣の味方部隊を治療する。",
	"s_14":"反間計",
	"se_14":"策略攻撃する時、敵が減少した兵士を自分の兵士にする。",
	"s_15":"看破",
	"se_15":"自分と隣の味方部隊の損害を半分にする。",
	"s_16":"連珠",
	"se_16":"策略攻撃が二回になる。",
	"s_17":"連環計",
	"se_17":"策略攻撃する時、損害を隣の敵に広がります。",
	"s_18":"鬼策",
	"se_18":"策略攻撃の損害を1.5倍にして、敵の能力を下降させる。",
	"s_19":"鬼謀",
	"se_19":"策略攻撃の損害を1.5倍にして、敵を不良状態にする。",
	"s_20":"逆嗜血",
	"se_20":"反撃する時、敵が減少した兵士を自分の兵士にする。",
	"s_21":"反弾",
	"se_21":"攻撃を受ける時、相手にもある程度の損害を与える。",
	"s_22":"血路",
	"se_22":"自分と隣の味方部隊の捕獲される確率を下がる。",
	"s_23":"十面埋伏の計",
	"se_23":"策略攻撃する時、敵の隣は味方部隊が存在したら、損害が大きくなる。味方部隊が多ければ多いほど良い。",
	"s_24":"決勝",
	"se_24":"策略攻撃する時、損害が倍になり、MPが減らない。",
	"s_25":"擺尾",
	"se_25":"策略攻撃する時、攻撃方向に２部隊いると共に攻撃。",
	"s_26":"毒箭",
	"se_26":"弓兵系の兵科を使って、攻撃する時、敵を毒状態にする。",
	"s_27":"毒計",
	"se_27":"策略攻撃する時、敵を毒状態にする。",
	"s_28":"素早さ",
	"se_28":"攻撃が終わったら、瞬発力を上昇させる。",
	"s_29":"猛攻",
	"se_29":"回合スタートする時、自分と隣の味方部隊の攻撃力を上昇させる。",
	"s_30":"坚固",
	"se_30":"回合スタートする時、自分と隣の味方部隊の防御力を上昇させる。",
	"s_31":"暗行",
	"se_31":"地形と敵の影響を無視して移動する。",
	"s_32":"劫営",
	"se_32":"物理攻撃する時、敵の正面ではなければ、損害が大きくなる、ただ斜角攻撃が含めない。",
	"s_33":"乱射",
	"se_33":"弓兵系の兵科を使って攻撃する時、損害を隣の敵に広がります。",
	"s_34":"破弩",
	"se_34":"弓兵系の相克を無視する。",
	"s_35":"破步",
	"se_35":"步兵系の相克を無視する。",
	"s_36":"破騎",
	"se_36":"騎兵系の相克を無視する。",
	"s_37":"破兵",
	"se_37":"物理攻撃系の相克を無視する。",
	"s_38":"仁者",
	"se_38":"回合スタートする時、味方部隊の一人に兵士を募集する。",
	"s_39":"陥陣営",
	"se_39":"隣の敵部隊が多ければ多いほど攻撃が強くなる。",
	"s_40":"強行",
	"se_40":"移動力上昇させる。",
	"s_41":"小覇王",
	"se_41":"武力の低い敵部隊への損害が1.5倍になり、敵の攻撃力を下降させる。",
	"s_42":"逆撃",
	"se_42":"反撃を二回になる。",
	"s_43":"大喝",
	"se_43":"損害が1.5倍になり、敵の反撃を受けない。",
	"s_44":"突撃",
	"se_44":"損害が1.5倍になり、攻撃方向に２部隊いると共に攻撃。",
	"s_45":"節糧",
	"se_45":"糧食の消耗を半分にする。",
	"s_46":"商業",
	"se_46":"内政の商業を実施する時、効果を上昇させる。",
	"s_47":"技術",
	"se_47":"内政の技術を実施する時、効果を上昇させる。",
	"s_48":"農業",
	"se_48":"内政の農業を実施する時、効果を上昇させる。",
	"s_49":"徵兵",
	"se_49":"内政の徵兵を実施する時、効果を上昇させる。",
	"s_50":"肉搏",
	"se_50":"反撃する時、攻撃方向に２部隊いると共に攻撃。",
	"s_51":"死戦",
	"se_51":"兵士が少なければ少ないほど攻撃が強くなる。",
	"s_52":"順勢",
	"se_52":"会心攻撃が発動する時、損害が倍になる。",
	"s_53":"忍耐",
	"se_53":"兵士が少なければ少ないほど防御力が高くなる。",
	"s_54":"傾国",
	"se_54":"女兵を使う時、受け取った損害を半分にする。傾国の容姿を見た人が動かなくなる。",
	"s_55":"傾城",
	"se_55":"女兵を使う時、受け取った損害を半分にする。",
	"s_56":"巾幗",
	"se_56":"女性も男性に引けを取らない、二回攻撃できる、ただ二回目の攻撃が弱くなる。",
	"s_57":"偷天換日",
	"se_57":"近接戦闘の兵科を使う時、受け取った損害をMP損害に変更する。MPが0の時、MPを自動的に増える場合もある。",
	"s_58":"羈絆",
	"se_58":"攻撃したユニットを動けなくする。",
	"s_59":"士気",
	"se_59":"士気強化。",
	"s_60":"防御",
	"se_60":"防御力強化。",
	"s_61":"瞬発",
	"se_61":"瞬発力強化。",
	"s_62":"攻撃",
	"se_62":"攻撃力強化。",
	"s_63":"精神",
	"se_63":"精神力強化。",
	"s_64":"厚皮",
	"se_64":"兵力上限を上昇させる。",
	"s_65":"星移斗转",
	"se_65":"反撃する時、相手の攻撃力を使って攻撃する。",
	"s_66":"熟路",
	"se_66":"地形を無視する。",
	"s_67":"反客为主",
	"se_67":"反撃する時、普通の攻撃する時と同じ損害に与える。",
	"s_68":"治安",
	"se_68":"内政の治安を実施する時、効果を上昇させる。",
	"s_69":"飛刀",
	"se_69":"近接戦闘の兵科を使う時、攻撃範囲が大きくなる。",
	"s_70":"輔佐",
	"se_70":"回合スタートする時、自分と隣の味方部隊が一つの能力を上昇させる。",
};
Language.groupSkillTalkData = [
	"よし、これは俺たちの力だぞー!",
	"攻撃スタート!",
	"オレの力をちゃんとみてくれ!",
	"ほほー，オレも一緒に!"
];