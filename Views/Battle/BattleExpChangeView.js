function BattleExpChangeView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.setData();
}
BattleExpChangeView.prototype.setData = function(){
	var self = this;
	var model = LMvc.BattleController.model;
	var index = 0;
	for(var i=0,l=model.ourList.length;i<l;i++){
		var character = model.ourList[i];
		var label = getStrokeLabel(String.format("{0} : {1}",character.data.name(), character.data.exp()),20,"#FFFFFF","#000000",4);
		label.y = (index++) * 30;
		self.addChild(label);

	}
	
	for(var i=0,l=model.selfCaptive.length;i<l;i++){
		var characterId = model.selfCaptive[i];
		var character = CharacterModel.getChara(characterId);
		var label = getStrokeLabel(String.format("{0} : {1}",character.data.name(), character.data.exp()),20,"#FFFFFF","#000000",4);
		label.y = (index++) * 30;
		self.addChild(label);
	}
};