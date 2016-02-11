function Language(){
	var self = this;
}
Language.get = function(key){
	return Language.data[key] || key;
};
Language.data = {
	"game_title":"三国记",
	"game_start":"开始游戏",
	"game_read":"读取进度",
	"game_setting":"环境设定",
	"game_single_combat":"单挑挑战",
	"create_character":"武将作成",
	"create_character_setting":"新武将设置",
	"return":"返回",
};