function CharacterListModel(){
	base(this,MyModel,[]);
}
CharacterListModel.prototype.construct=function(){
};
CharacterListModel.prototype.getImages=function(){
	var list = [];
	list.push({name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"});
	list.push({name:"checkbox-on",path:LMvc.IMG_PATH+"component/checkbox-on.png"});
	list.push({name:"close",path:LMvc.IMG_PATH+"component/close.png"});
	list.push({name:"combobox_arraw",path:LMvc.IMG_PATH+"component/combobox_off.png"});
	list.push({name:"range",path:LMvc.IMG_PATH+"component/range.png"});
	list.push({name:"red_bar",path:LMvc.IMG_PATH+"icon/red_bar.png"});
	list.push({name:"blue_bar",path:LMvc.IMG_PATH+"icon/blue_bar.png"});
	list.push({name:"yellow_bar",path:LMvc.IMG_PATH+"icon/yellow_bar.png"});
	list.push({name:"icon_hert",path:LMvc.IMG_PATH+"icon/hert.png"});
	list.push({name:"yellow_ball",path:LMvc.IMG_PATH+"icon/yellow_ball.png"});
	list.push({name:"win05",path:LMvc.IMG_PATH+"win/win05.png"});
	list.push({name:"icon-line",path:LMvc.IMG_PATH+"icon/line.png"});
	return list;
};