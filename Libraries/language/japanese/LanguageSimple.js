function Language(){
	var self = this;
}
Language.get = function(key){
	return Language.dataSimple[key] || key;
};
Language.dataSimple = {
	"game_title":"三国記",
	"game_start":"ゲームスタート",
	"game_read":"ロード",
	"game_setting":"環境設定",
	"game_single_combat":"一騎打ち挑戦",
	"create_character":"武将作成",
	"create_character_debut":"新しい武将登場",
	"create_character_setting":"新しい勢力設置",
	"return":"戻る",
	"city":"城",
	"generals":"武将",
	"confirm":"确认",
	"preparing":"準備中",
	"select_seignior_message":"<font size='22' color='#FFFFFF'>勢力 <font color='#FF0000'>{0}</font> を選択しますか？</font>",
	"chapter_1":"黄巾の乱",
	"chapter_2":"反董卓連合",
	"chapter_3":"呂布の兗州強奪",
	"chapter_4":"官渡の戦い",
	"chapter_5":"赤壁の戦い",
	"chapter_6":"馬超の復讐",
	"chapter_7":"関羽の不覚",
	"chapter_8":"諸葛亮の南征",
	"chapter_9":"諸葛亮の死",
	"chapter_10":"蜀の滅亡",
	"new_script":"新剧本({0})",
};