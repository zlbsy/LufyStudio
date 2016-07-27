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
	"game_tutorial":"新手教学",
	"create_character_debut_error":"此功能需要先开通「武将作成」功能！",
	"create_character_debut":"新武将登场",
	"create_character_setting":"新势力设置",
	"trouble_easy":"简单",
	"trouble_normail":"一般",
	"trouble_hard":"困难",
	"chinese":"中文",
	"japanese":"日本語",
	"return":"返回",
	"city":"城池",
	"generals":"武将",
	"confirm":"确认",
	"opinion":"交流/意见",
	"bug_report":"提交错误报告",
	"update_report":"修复存档",
	"dialog_error_description":"请简单描述出错的现象！",
	"dialog_error_email":"请填写正确的邮件地址！",
	"dialog_error_report":"请选择出现错误的存档，方便我验证修改！",
	"dialog_success_report":"错误报告已经提交完成，感谢您的支持！我会尽快解决问题！",
	"dialog_success_report_title":"报告完成",
	"dialog_fail_report":"报告失败",
	"dialog_fail_net":"通信失败了",
	"error_bug_description":"错误描述",
	"error_bug_email":"您的邮箱地址",
	"error_bug_report":"选择错误存档",
	"update_report_id":"请输入存档ID",
	"update_report_id_description":"(如果您提交了错误存档，存档修复后我会通过邮件将修复好的存档ID发给您)",
	"error_update_report":"获取存档失败了，请检查输入的存档ID是否正确！",
	"preparing":"准备中",
	"restore_buy":"恢复购买",
	"select_trouble_title":"请选择游戏难度：",
	"select_death_title":"武将是否自然死亡？",
	"select_behead_title":"是否允许AI斩杀武将？",
	"yes":"是",
	"no":"否",
	"restore_confirm_message":"<font size='21' color='#FFFFFF'>恢复<font color='#FF0000'>已购买</font>的功能吗？（此操作<font color='#FF0000'>免费</font>）</font>",
	"purchase_confirm_native_message":"<font size='21' color='#FFFFFF'>开通<font color='#FF0000'>{0}</font>功能需要花费<font color='#FF0000'>{1}</font>，要开通此功能吗?</font>",
	"purchase_confirm_web_message":"<font size='21' color='#FFFFFF'>当前版本无法使用<font color='#FF0000'>{0}</font>功能，请下载<font color='#FF0000'>手机安装版本</font>!</font>",
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