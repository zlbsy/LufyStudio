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
	"return":"返回",
	"city":"城池",
	"generals":"武将",
	"confirm":"确认",
	"select_seignior_message":"<font size='22' color='#FFFFFF'>要选择势力 <font color='#FF0000'>{0}</font> 吗？</font>",
	"chapter_1":"黄巾之乱",
	"chapter_2":"权臣董卓",
	"chapter_3":"豺狼吕布",
	"chapter_4":"赤壁之战",
	"chapter_5":"赤壁之战1",
	"chapter_6":"赤壁之战2",
	"chapter_7":"赤壁之战3",
	"chapter_8":"赤壁之战4",
	"chapter_9":"赤壁之战5",
	"chapter_10":"赤壁之战6",
};