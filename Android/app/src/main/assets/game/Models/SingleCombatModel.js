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
	list.push({name:"common-light",path:LMvc.IMG_PATH+"common/light.png"});
	list.push({name:"battle-vs",path:LMvc.IMG_PATH+"battle/vs.png"});
	list.push({name:"big_attack_1",path:LMvc.IMG_PATH+"battle/big_attack_1.gif"});
	list.push({name:"single_talk_background",path:LMvc.IMG_PATH+"battle/talk_background.png"});
	list.push({name:"single_talk_arrow",path:LMvc.IMG_PATH+"battle/talk_arrow.png"});
	list.push({name:"close",path:LMvc.IMG_PATH+"component/close.png"});
	list.push({name:"attack_up_effect",path:LMvc.IMG_PATH+"strategy/effect/attack_up_effect.png"});
		
	return list;
};