function BattleBoutView(controller, belong){
	var self = this;
	LExtends(self,LView,[controller]);
	self.set(belong);
	self.name = "BattleBoutView";
};
BattleBoutView.prototype.set=function(belong){
	var self = this;
	LMvc.running = true;
	LMvc.BattleController.view.roadLayer.clear();
	var belongLayer = new LSprite();
	belongLayer.x = -LMvc.screenWidth * 0.5;
	belongLayer.y = LMvc.screenHeight * 0.5;
	var belongLabel = getLabelWindow(Language.get(String.format("{0}_action",belong)), 50, 340, 100);
	belongLabel.x = -belongLabel.getWidth() * 0.5;
	belongLabel.y = -belongLabel.getHeight() * 0.5;
	belongLayer.addChild(belongLabel);
	self.addChild(belongLayer);
	self.belong = belong;
	if(belong == Belong.SELF){
		belongLayer.y = LMvc.screenHeight * 0.5 - 40;
		self.setBout();
	}
	LTweenLite.to(belongLayer,1,{x:LMvc.screenWidth * 0.5,ease:Elastic.easeOut}) 
	.to(belongLayer,1,{delay:0.5,x:LMvc.screenWidth * 1.5,ease:Quint.easeOut,onComplete:self.removeSelf}); 
};
BattleBoutView.prototype.setBout=function(){
	var self = this;
	var boutLayer = new LSprite();
	boutLayer.x = LMvc.screenWidth * 1.5;
	boutLayer.y = LMvc.screenHeight * 0.5 + 40;
	var bout = self.controller.getValue("bout");
	bout++;
	self.controller.setValue("bout",bout);
	var boutLabel = getLabelWindow(String.format(Language.get("bout_label"),bout), 30, 200, 60);
	boutLabel.x = -boutLabel.getWidth() * 0.5;
	boutLabel.y = -boutLabel.getHeight() * 0.5;
	boutLayer.addChild(boutLabel);
	self.addChild(boutLayer);
	LTweenLite.to(boutLayer,1,{x:LMvc.screenWidth * 0.5,ease:Elastic.easeOut}) 
	.to(boutLayer,1,{delay:0.5,x:-LMvc.screenWidth * 0.5,ease:Quint.easeOut});  
};
BattleBoutView.prototype.removeSelf=function(event){
	var self = event.target.parent;
	var view = self.parent;
	var belong = self.belong;
	LMvc.running = false;
	if(LMvc.BattleController.militaryModel){
		var cityBelong = (belong == Belong.SELF && battleData.fromCity.seigniorCharaId() != LMvc.selectSeignorId) || 
		(belong == Belong.ENEMY && battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId);
		if(cityBelong){
			LMvc.BattleController.militaryValidLimit--;
			if(LMvc.BattleController.militaryValidLimit <= 0){
				LMvc.BattleController.militaryModel = null;
			}
		}
	}
	self.remove();
	battleCharacterStatusUpdate(belong);
	self.controller.view.weatherLayer.change();
	var currentCharacters = view.charaLayer.getCharactersFromBelong(belong);
	charactersHealMP(currentCharacters);
	if(battleFoodCheck(belong)){
		var abnormalState = view.charaLayer.abnormalState;
		view.charaLayer.boutSkillRun(belong, abnormalState);
	}
};
