function Language(){
	var self = this;
}
Language.get = function(key){
	return Language.data[key] || key;
};
Language.data = {
	"game_start":"开始游戏",
	"game_read":"读取进度",
	"game_setting":"环境设定",
};