function EffectStrategyView(controller, chara){
	var self = this;
	LExtends(self,LView,[controller]);
	self.currentCharacter = chara;
	var loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE, self.loadData);
	loader.load(chara.currentSelectStrategy.image(), "bitmapData");
	LMvc.keepLoading(true);
}
EffectStrategyView.prototype.loadData = function(event){
	var self = event.currentTarget.parent;
	LMvc.keepLoading(false);
	var data = event.target;
	var list = LGlobal.divideCoordinate(data.width,data.height, data.height/data.width, 1);
	var arr = [];
	for(var i=0,l=list.length;i<l;i++){
		arr.push(list[i][0]);
	}
	var startPosition = (BattleCharacterSize.width - data.width) * 0.5;
	var anime = new LAnimationTimeline(new LBitmapData(data), [arr]);
	anime.setLabel("effect", 0, arr.length * 0.3 >> 0, 1, false);
	anime.addFrameScript("effect",self.becomeEffective,[]);
	anime.addEventListener(LEvent.COMPLETE, self.removeSelf);
	anime.x = anime.y = startPosition;
	anime.speed = 1;
	self.addChild(anime);
};
EffectStrategyView.prototype.becomeEffective = function(anime){
	var self = anime.parent;
	anime.removeFrameScript("effect");
	var target = self.currentCharacter.AI.attackTarget;
	target.toStatic(false);
	var strategyType = self.currentCharacter.currentSelectStrategy.strategyType();
	target.changeAction(CharacterAction.HERT);
	
	var num = new Num(Num.MIDDLE,1,20);
	//TODO::
	num.setValue(123);
	num.x = target.x;
	num.y = target.y;
	target.controller.view.baseLayer.addChild(num);
	LTweenLite.to(num,0.5,{y:num.y - 20,alpha:0,onComplete:function(obj){
		obj.remove();
	}});
};
EffectStrategyView.prototype.removeSelf = function(event){
	var anime = event.currentTarget;
	var self = anime.parent;
	anime.stop();
	var chara = self.currentCharacter;
	var target = chara.AI.attackTarget;
	target.changeAction(CharacterAction.MOVE);
	
	chara.changeAction(CharacterAction.STAND);
	var statusView = new BattleCharacterStatusView(LMvc.BattleController,{character:target,belong:target.belong,changeType:"HP",changeValue:-100});
	statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,function(){
		chara.AI.endAction();
	});
	chara.controller.view.baseLayer.addChild(statusView);
	
	self.remove();
};