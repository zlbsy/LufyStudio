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
	"game_tutorial":"チュートリアル",
	"create_character_debut":"新武将作成",
	"create_character_setting":"新勢力設置",
	"chinese":"中文",
	"japanese":"日本語",
	"return":"戻る",
	"city":"城",
	"generals":"武将",
	"confirm":"确认",
	"opinion":"交流/意見",
	"preparing":"準備中",
	"restore_buy":"リストア",
	"restore_confirm_message":"<font size='21' color='#FFFFFF'>既に<font color='#FF0000'>購入した</font>機能を復元しますか？（この操作は<font color='#FF0000'>無料</font>です）</font>",
	"purchase_confirm_native_message":"<font size='21' color='#FFFFFF'><font color='#FF0000'>{0}</font>を解放する、必要なお金は<font color='#FF0000'>{1}</font>です、よろしいですか?</font>",
	"purchase_confirm_web_message":"<font size='21' color='#FFFFFF'>今のバージョンは<font color='#FF0000'>{0}</font>という機能が使えません、ネーティブ版<font color='#FF0000'>をダウンロードしてください。</font>!</font>",
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
	"new_script":"シナリオ({0})",
};