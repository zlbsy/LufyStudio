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
	list.push({name:"character-s-default",path:LMvc.IMG_PATH+"character/s/default.png"});
	list.push({name:"domestic_clouds",path:LMvc.IMG_PATH+"common/domestic_clouds.png"});
	return list;
};