function TestModel(){
	LExtends(this,MyModel,[]);
}
TestModel.prototype.construct=function(){
	var self = this;
};
TestModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	/*list.push({name:"talkbox",path:LMvc.IMG_PATH+"common/talkbox.png"});
	list.push({name:"sMenu",path:LMvc.IMG_PATH+"sousou/menu.png"});*/
	list.push({name:"face-5",path:LMvc.IMG_PATH+"face/5.png"});
	list.push({name:"battle-menu",path:LMvc.IMG_PATH+"battle/menu.png"});
	list.push({name:"rect",path:LMvc.IMG_PATH+"battle/rect.png"});
	list.push({name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"});
	list.push({name:"checkbox-on",path:LMvc.IMG_PATH+"component/checkbox-on.png"});
	list.push({name:"close",path:LMvc.IMG_PATH+"component/close.png"});
	list.push({name:"combobox_arraw",path:LMvc.IMG_PATH+"component/combobox_off.png"});
	list.push({name:"range",path:LMvc.IMG_PATH+"component/range.png"});
	list.push({name:"red_bar",path:LMvc.IMG_PATH+"icon/red_bar.png"});
	list.push({name:"blue_bar",path:LMvc.IMG_PATH+"icon/blue_bar.png"});
	list.push({name:"yellow_bar",path:LMvc.IMG_PATH+"icon/yellow_bar.png"});
	list.push({name:"orange_bar",path:LMvc.IMG_PATH+"icon/orange_bar.png"});
	list.push({name:"icon_hert",path:LMvc.IMG_PATH+"icon/hert.png"});
	list.push({name:"yellow_ball",path:LMvc.IMG_PATH+"icon/yellow_ball.png"});
	list.push({name:"orange_ball",path:LMvc.IMG_PATH+"icon/orange_ball.png"});
	list.push({name:"orange_ball",path:LMvc.IMG_PATH+"icon/orange_ball.png"});
	list.push({name:"icon-armor",path:LMvc.IMG_PATH+"icon/armor.png"});
	list.push({name:"icon-weapon",path:LMvc.IMG_PATH+"icon/weapon.png"});
	list.push({name:"menu_line",path:LMvc.IMG_PATH+"component/menu_line.png"});
	list.push({name:"win02",path:LMvc.IMG_PATH+"win/win02.png"});
	list.push({name:"win03",path:LMvc.IMG_PATH+"win/win03.png"});
	list.push({name:"win04",path:LMvc.IMG_PATH+"win/win04.png"});
	list.push({name:"win05",path:LMvc.IMG_PATH+"win/win05.png"});
	list.push({name:"win06",path:LMvc.IMG_PATH+"win/win06.png"});
	list.push({name:"single_talk_background",path:LMvc.IMG_PATH+"battle/talk_background.png"});
	list.push({name:"single_talk_arrow",path:LMvc.IMG_PATH+"battle/talk_arrow.png"});
	
	return list;
};