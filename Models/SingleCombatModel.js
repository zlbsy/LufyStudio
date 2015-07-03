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
	list.push({name:"singleCombatForeground",path:LMvc.IMG_PATH+"background/singleCombatForeground.png"});
	list.push({name:"character-s-default",path:LMvc.IMG_PATH+"character/s/default.png"});
	list.push({name:"domestic_clouds",path:LMvc.IMG_PATH+"common/domestic_clouds.png"});
	list.push({name:"battle-vs",path:LMvc.IMG_PATH+"battle/vs.png"});
	list.push({name:"big_attack_1",path:LMvc.IMG_PATH+"battle/big_attack_1.gif"});
	list.push({name:"big_attack_2",path:LMvc.IMG_PATH+"battle/big_attack_2.png"});
	return list;
};