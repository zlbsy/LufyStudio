function Language(){
	var self = this;
}
Language.get = function(key){
	return Language.data[key] || key;
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
	
	"treat":"治疗",
	
	"StrategyEffectType.1":"攻击",
	"StrategyEffectType.2":"状态变化",
	"StrategyEffectType.3":"能力变化",
	"StrategyEffectType.4":"觉醒",
	"StrategyEffectType.5":"治疗",
	
	"bout_label":"第{0}回合",
	"battle_title":"{0}之战",
	
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
	"stunt":"特技",
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
	"dialog_transport_select_confirm":"要向{0}输送物资吗？",
	"dialog_transport_select_error":"无法向此城池输送物资！",
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
	"dialog_training_confirm":"训练哪个兵种？",
	"dialog_city_level_error":"该城池已经无法升级。",
	"dialog_proficiency_max_error":"已经达到训练的极限了。",
	"name":"姓名",
	"distribute":"分配",
	"proficiency":"熟练度",
	"magicAttack":"法攻",
	"magicDefense":"法防",
	"speed":"速度",
	"dodge":"躲闪",
	"strategy":"谋略",
	
	"release":"释放",
	"recruit":"招降",
	"behead":"斩首",
	
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
	"all_seignior":"全势力一览",
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
	"diplomacy_message":"带多少金钱？",
	"select_seignior":"选择势力",
	//"ransom":"赎金",
	"stamp_list":"宝物图鉴",
	"event_list":"事件一览",
	"idle":"空闲",
	"move":"移动",
	"end":"结束",
	
	"city_title":"{0}年{1}月  {2}  ({3})",
	
	
	"null":"无",
	"single_combat_ask":"敌将{0}敢与我大战三百回合吗？",
	"single_combat_answer_ok":"那就让你做我的刀下鬼吧！",
	"single_combat_answer_no":"你还不配和我交手!",
	
	"leader_change_talk":"糟糕!因为主将撤退，军队一盘散沙，能力都下降了。那就由我暂代主将来指挥战斗吧！",
	"gameover":"游戏结束"
};
Language.itemData = {
	"item_name_1":"木剑",
	"item_name_2":"布帽",
	"item_name_3":"布衣",
	"item_explanation_18":"测试测试测试测试测试，测试测试测试测试测试测试测试，测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
};
Language.characterData = {"character_1":"曹操","character_2":"周瑜","character_3":"赵云","character_4":"关羽","character_5":"张辽","character_6":"邓艾","character_7":"姜维","character_8":"孙坚","character_9":"陆逊","character_10":"诸葛亮","character_11":"羊祜","character_12":"徐晃","character_13":"吕蒙","character_14":"夏侯敦","character_15":"司马懿","character_16":"徐盛","character_17":"孙权","character_18":"张飞","character_19":"吕布","character_20":"徐庶","character_21":"刘备","character_22":"郝昭","character_23":"甘宁","character_24":"孙策","character_25":"陈泰","character_26":"陆抗","character_27":"张郃","character_28":"张嶷","character_29":"高顺","character_30":"李典","character_31":"于禁","character_32":"许褚","character_33":"张任","character_34":"郭淮","character_35":"曹丕","character_36":"马云鹭","character_37":"孙尚香","character_38":"杜预","character_39":"袁绍","character_40":"吴懿","character_41":"夏侯渊","character_42":"庞德","character_43":"丁奉","character_44":"马超","character_45":"贾诩","character_46":"满宠","character_47":"司马师","character_48":"傅佥","character_49":"李严","character_50":"孙桓","character_51":"王濬","character_52":"司马昭","character_53":"朱桓","character_54":"诸葛瞻","character_55":"韩浩","character_56":"魏延","character_57":"王平","character_58":"审配","character_59":"法正","character_60":"陈登","character_61":"田豫","character_62":"马忠","character_63":"太史慈","character_64":"夏侯霸","character_65":"廖化","character_66":"张角","character_67":"贾逵","character_68":"王基","character_69":"司马炎","character_70":"张宝","character_71":"程普","character_72":"张翼","character_73":"典韦","character_74":"刘晔","character_75":"周仓","character_76":"陈宫","character_77":"曹真","character_78":"韩当","character_79":"文聘","character_80":"鲁肃","character_81":"周泰","character_82":"诸葛诞","character_83":"钟会","character_84":"关平","character_85":"皇甫嵩","character_86":"文鸳","character_87":"全琮","character_88":"朱拠","character_89":"乐进","character_90":"韩遂","character_91":"程昱","character_92":"高览","character_93":"张承","character_94":"李恢","character_95":"孙瑜","character_96":"曹昂","character_97":"霍弋","character_98":"孙韶","character_99":"鲍信","character_100":"黄忠","character_101":"王浑","character_102":"荀攸","character_103":"步陟","character_104":"胡烈","character_105":"严颜","character_106":"马隆","character_107":"曹仁","character_108":"黄盖","character_109":"骆统","character_110":"曹彰","character_111":"董厥","character_112":"贺齐","character_113":"陈到","character_114":"臧霸","character_115":"庞统","character_116":"颜良","character_117":"陈武","character_118":"马谡","character_119":"郭嘉","character_120":"吕岱","character_121":"陆景","character_122":"张苞","character_123":"关兴","character_124":"罗憲","character_125":"刘劭","character_126":"马腾","character_127":"司马望","character_128":"雷铜","character_129":"陆凯","character_130":"潘璋","character_131":"关索","character_132":"孟达","character_133":"曹洪","character_134":"卢植","character_135":"黄权","character_136":"沮授","character_137":"田畴","character_138":"凌统","character_139":"华雄","character_140":"蒋钦","character_141":"蔡瑁","character_142":"辛毗","character_143":"张绣","character_144":"夏侯恩","character_145":"马岱","character_146":"文丑","character_147":"王凌","character_148":"高干","character_149":"董袭","character_150":"诸葛瑾","character_151":"王昶","character_152":"纪灵","character_153":"刘封","character_154":"曹叡","character_155":"费袆","character_156":"祝融","character_157":"曹安民","character_158":"徐荣","character_159":"刘辟","character_160":"董卓","character_161":"侯成","character_162":"吴兰","character_163":"郭图","character_164":"沮鵠","character_165":"龚都","character_166":"沙摩柯","character_167":"蒋琬","character_168":"李儒","character_169":"李肃","character_170":"袁熙","character_171":"马良","character_172":"孟获","character_173":"曹性","character_174":"夏侯杰","character_175":"糜竺","character_176":"王甫","character_177":"宋憲","character_178":"袁尚","character_179":"阎圃","character_180":"袁术","character_181":"傅彤","character_182":"貂蝉","character_183":"张济","character_184":"张卫","character_185":"魏続","character_186":"胡车儿","character_187":"辛评","character_188":"樊稠","character_189":"田丰","character_190":"夏侯尚","character_191":"吾彦","character_192":"杨肇","character_193":"陶璜","character_194":"费耀","character_195":"陶谦","character_196":"孙乾","character_197":"张鲁","character_198":"司马攸","character_199":"淳于琼","character_200":"吕范","character_201":"杨阜","character_202":"伊籍","character_203":"孙礼","character_204":"黄崇","character_205":"司马孚","character_206":"张悌","character_207":"李傕","character_208":"张紘","character_209":"张梁","character_210":"何桢","character_211":"孙登","character_212":"蒋舒","character_213":"公孙瓒","character_214":"朱然","character_215":"州泰","character_216":"霍峻","character_217":"邓芝","character_218":"糜芳","character_219":"蒋济","character_220":"杨济","character_221":"张特","character_222":"夏侯玄","character_223":"郭汜","character_224":"阎柔","character_225":"荀彧","character_226":"邓忠","character_227":"朱异","character_228":"牵弘","character_229":"鲁淑","character_230":"蒯良","character_231":"张既","character_232":"公孙康","character_233":"朱治","character_234":"杨仪","character_235":"刘琦","character_236":"王颀","character_237":"留平","character_238":"张颖","character_239":"胡遵","character_240":"公孙度","character_241":"王经","character_242":"向宠","character_243":"张燕","character_244":"高柔","character_245":"张扬","character_246":"孙异","character_247":"朱儁","character_248":"荀愷","character_249":"留赞","character_250":"袁谭","character_251":"刘睿","character_252":"毋丘俭","character_253":"杨稷","character_254":"公孙范","character_255":"步闡","character_256":"陈表","character_257":"诸葛恪","character_258":"张昭","character_259":"张肃","character_260":"周昕","character_261":"邹靖","character_262":"高沛","character_263":"朱灵","character_264":"诸葛尚","character_265":"黄月英","character_266":"孟优","character_267":"曹髦","character_268":"毋丘甸","character_269":"董和","character_270":"虞汜","character_271":"刘虞","character_272":"逢纪","character_273":"杨怀","character_274":"桥瑁","character_275":"吾粲","character_276":"甄氏","character_277":"祖茂","character_278":"钟離斐","character_279":"胡渊","character_280":"苏飞","character_281":"张允","character_282":"赵统","character_283":"毛炅","character_284":"贾范","character_285":"大乔","character_286":"阚泽","character_287":"李通","character_288":"全纪","character_289":"公孙续","character_290":"田楷","character_291":"泠苞","character_292":"单经","character_293":"王修","character_294":"诸葛靓","character_295":"孙休","character_296":"雍凯","character_297":"夏侯威","character_298":"杨欣","character_299":"陈俊","character_300":"梁绪","character_301":"步协","character_302":"李丰","character_303":"胡奋","character_304":"陈骞","character_305":"张乔","character_306":"夏侯和","character_307":"夏侯惠","character_308":"糜夫人","character_309":"留略","character_310":"虞翻","character_311":"袁遗","character_312":"马忠","character_313":"公孙越","character_314":"马铁","character_315":"胡济","character_316":"曹冲","character_317":"王异","character_318":"盛曼","character_319":"孟宗","character_320":"王戎","character_321":"吕虔","character_322":"李球","character_323":"张遵","character_324":"曹纯","character_325":"关统","character_326":"胡质","character_327":"文钦","character_328":"唐彬","character_329":"毛玠","character_330":"钟繇","character_331":"杨任","character_332":"吴班","character_333":"杨秋","character_334":"王匡","character_335":"孙静","character_336":"沈莹","character_337":"蒋班","character_338":"程武","character_339":"陈矫","character_340":"小乔","character_341":"方悦","character_342":"伍延","character_343":"董承","character_344":"庞羲","character_345":"刘焉","character_346":"吕凯","character_347":"许贡","character_348":"贾充","character_349":"乌丸大王","character_350":"石苞","character_351":"陶濬","character_352":"蒯越","character_353":"山越大王","character_354":"牛金","character_355":"南蛮大王","character_356":"赵广","character_357":"周浚","character_358":"张休","character_359":"简雍","character_360":"羌大王","character_361":"王威","character_362":"阎宇","character_363":"张邈","character_364":"戴陵","character_365":"张虎","character_366":"刘璝","character_367":"成宜","character_368":"严纲","character_369":"王伉","character_370":"蒋义渠","character_371":"陈震","character_372":"庞会","character_373":"关靖","character_374":"崔琰","character_375":"朵思大王","character_376":"陈元","character_377":"丁原","character_378":"麴义","character_379":"魏邈","character_380":"凌操","character_381":"张南","character_382":"唐咨","character_383":"孙冀","character_384":"太史享","character_385":"卞喜","character_386":"王朗","character_387":"徐邈","character_388":"孙震","character_389":"曹休","character_390":"高翔","character_391":"李辅","character_392":"胡班","character_393":"尹赏","character_394":"周鲂","character_395":"潘睿","character_396":"张动","character_397":"申仪","character_398":"王韬","character_399":"华歆","character_400":"毕轨","character_401":"孙歆","character_402":"句安","character_403":"申耽","character_404":"王买","character_405":"王惇","character_406":"皇甫凯","character_407":"王肃","character_408":"公孙渊","character_409":"程银","character_410":"巩志","character_411":"乐琳","character_412":"丁封","character_413":"滕胤","character_414":"董允","character_415":"樊建","character_416":"宋谦","character_417":"邓贤","character_418":"蔡贡","character_419":"伦直","character_420":"脩则","character_421":"魏攸","character_422":"李歆","character_423":"冯习","character_424":"马休","character_425":"刘岱","character_426":"孙霸","character_427":"陈纪","character_428":"孙秀","character_429":"刘繇","character_430":"刘表","character_431":"严兴","character_432":"董荼那","character_433":"吴纲","character_434":"邹丹","character_435":"孙峻","character_436":"顾谭","character_437":"丘本","character_438":"张华","character_439":"夏侯德","character_440":"于诠","character_441":"田章","character_442":"鄂焕","character_443":"张英","character_444":"王累","character_445":"董昭","character_446":"侯选","character_447":"乐就","character_448":"全端","character_449":"夏侯咸","character_450":"许攸","character_451":"周旨","character_452":"张球","character_453":"孙和","character_454":"顾雍","character_455":"焦彝","character_456":"张缉","character_457":"陈兰","character_458":"全懌","character_459":"丘建","character_460":"赵累","character_461":"濮阳兴","character_462":"曹植","character_463":"阿会喃","character_464":"陈应","character_465":"何曾","character_466":"文虎","character_467":"韩暹","character_468":"刘贤","character_469":"王祥","character_470":"王門","character_471":"俞涉","character_472":"张尚","character_473":"张象","character_474":"薛莹","character_475":"程远志","character_476":"杨昂","character_477":"苏由","character_478":"关彝","character_479":"高升","character_480":"黄祖","character_481":"辛敞","character_482":"王双","character_483":"谢旌","character_484":"李堪","character_485":"薛综","character_486":"孙匡","character_487":"戏志才","character_488":"郭马","character_489":"吕威璜","character_490":"蒋斌","character_491":"邓茂","character_492":"孙诩","character_493":"鲍隆","character_494":"毋丘秀","character_495":"带来洞主","character_496":"李丰","character_497":"楼玄","character_498":"党均","character_499":"曹豹","character_500":"李异","character_501":"孙仲","character_502":"贾华","character_503":"车胄","character_504":"陈群","character_505":"金环三结","character_506":"陈式","character_507":"陈横","character_508":"袁燿","character_509":"王含","character_510":"阎象","character_511":"荀谌","character_512":"赵弘","character_513":"雷薄","character_514":"秦朗","character_515":"刘丞","character_516":"韩嵩","character_517":"韩德","character_518":"张横","character_519":"何宴","character_520":"司马朗","character_521":"张布","character_522":"向朗","character_523":"王允","character_524":"刘巴","character_525":"典满","character_526":"严政","character_527":"刑道荣","character_528":"马玩","character_529":"高定","character_530":"眭固","character_531":"刘循","character_532":"陈珪","character_533":"卑衍","character_534":"严白虎","character_535":"杨丑","character_536":"桓范","character_537":"荀勗","character_538":"笮融","character_539":"诸葛绪","character_540":"杨祚","character_541":"公孙恭","character_542":"孔伷","character_543":"钟毓","character_544":"杨修","character_545":"张松","character_546":"梁兴","character_547":"郑冲","character_548":"孙亮","character_549":"徐质","character_550":"朱褒","character_551":"田续","character_552":"许靖","character_553":"谭雄","character_554":"马遵","character_555":"张温","character_556":"杨奉","character_557":"韦昭","character_558":"管亥","character_559":"裴元绍","character_560":"吴巨","character_561":"韩忠","character_562":"韩胤","character_563":"胡轸","character_564":"施朔","character_565":"王粲","character_566":"尹默","character_567":"邵悌","character_568":"许仪","character_569":"刘琮","character_570":"何仪","character_571":"吕旷","character_572":"诸葛均","character_573":"傅巽","character_574":"秦宓","character_575":"金旋","character_576":"程秉","character_577":"陈琳","character_578":"裴秀","character_579":"郭攸之","character_580":"穆顺","character_581":"曹爽","character_582":"滕脩","character_583":"木鹿大王","character_584":"傅士仁","character_585":"胡冲","character_586":"丁谧","character_587":"杨弘","character_588":"孔融","character_589":"陆绩","character_590":"吕翔","character_591":"王业","character_592":"兀突骨","character_593":"孙朗","character_594":"王沈","character_595":"吴质","character_596":"丁仪","character_597":"曹宇","character_598":"董朝","character_599":"忙牙长","character_600":"武安国","character_601":"王忠","character_602":"潘凤","character_603":"董旻","character_604":"蒋显","character_605":"谯周","character_606":"郤正","character_607":"马均","character_608":"孙述","character_609":"蒋干","character_610":"牛辅","character_611":"李胜","character_612":"赵范","character_613":"蔡和","character_614":"曹羲","character_615":"袁胤","character_616":"张节","character_617":"孙懋","character_618":"蔡中","character_619":"曹熊","character_620":"夏侯楙","character_621":"邓良","character_622":"杨柏","character_623":"韩馥","character_624":"何进","character_625":"刘度","character_626":"张绍","character_627":"全尚","character_628":"尹大目","character_629":"杨松","character_630":"曹芳","character_631":"何植","character_632":"孙皓","character_633":"曹奂","character_634":"韩玄","character_635":"曹训","character_636":"刘璋","character_637":"马邈","character_638":"黄皓","character_639":"岑昏","character_640":"刘禅"};
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
	"city_52":"匈奴",
	"city_53":"西城"
};
Language.soldierData = {
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
	"group_1":"桃园情谊!",
	
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