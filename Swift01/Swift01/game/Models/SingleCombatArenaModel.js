function SingleCombatArenaModel(){
	LExtends(this,MyModel,[]);
}
SingleCombatArenaModel.prototype.construct=function(){
	var self = this;
};
SingleCombatArenaModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"close",path:LMvc.IMG_PATH+"component/close.png"});
	list.push({name:"win02",path:LMvc.IMG_PATH+"win/win02.png"});
	list.push({name:"win05",path:LMvc.IMG_PATH+"win/win05.png"});
	return list;
};