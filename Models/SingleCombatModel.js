function SingleCombatModel(){
	LExtends(this,MyModel,[]);
}
SingleCombatModel.prototype.construct=function(){
	var self = this;
};
SingleCombatModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"singleCombatBackground",path:LMvc.IMG_PATH+"background/singleCombatBackground.png"});
	return list;
};