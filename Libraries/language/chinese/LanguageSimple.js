function Language(){
	var self = this;
}
Language.get = function(key){
	return Language.dataSimple[key] || key;
};
Language.dataSimple = {
	"game_title":"三国记",
	"game_start":"开始游戏",
	"game_read":"读取进度",
	"game_setting":"环境设定",
	"game_single_combat":"单挑挑战",
	"create_character":"武将作成",
	"create_character_debut":"新武将登场",
	"create_character_setting":"新势力设置",
	"chinese":"中文",
	"japanese":"日本語",
	"return":"返回",
	"city":"城池",
	"generals":"武将",
	"confirm":"确认",
	"preparing":"准备中",
	"select_seignior_message":"<font size='22' color='#FFFFFF'>要选择势力 <font color='#FF0000'>{0}</font> 吗？</font>",
	"chapter_1":"覆苍天黄巾当立",
	"chapter_2":"伐董卓诸侯并起",
	"chapter_3":"吕温侯豪取兖州",
	"chapter_4":"曹袁氏对持官渡",
	"chapter_5":"抗雄兵决战赤壁",
	"chapter_6":"马孟起兴兵雪恨",
	"chapter_7":"关云长恨失荆州",
	"chapter_8":"征南寇丞相兴师",
	"chapter_9":"未捷师孔明殒命",
	"chapter_10":"灭蜀汉二士争功",
	"new_script":"新剧本({0})",
};