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
	list.push({name:"ok",path:LMvc.IMG_PATH+"component/ok.png"});
	return list;
};