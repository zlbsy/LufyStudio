function BattleCharacterLayerView(controller) {
	var self = this;
	LExtends(self, LView, [controller]);
	/*for(var i = 0;i<15;i++){
		for(var j=0;j<12;j++){
		self.addCharaLayer(1,CharacterAction.MOVE,CharacterDirection.DOWN,i,j);
		}
	}
	*/
	//self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	self.controller.addEventListener(BattleBoutEvent.END, self.charactersBoutEnd);
};
BattleCharacterLayerView.prototype.charactersBoutEnd = function(event) {
	var controller = event.currentTarget;
	var self = controller.view.charaLayer;
	var mapLayer = controller.view.mapLayer;
	mapLayer.wakeRoadsClear(event.belong);
	var childList = self.getCharactersFromBelong(event.belong);
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		child.mode = CharacterMode.NONE;
		child.toStatic(false);
		child.changeAction(CharacterAction.MOVE);
		child.toStatic(true);
		if(child.data.hasSkill(SkillSubType.WAKE)){
			var skill = child.data.skill();
			mapLayer.setWakeRoads(event.belong,skill.wakeRects(),child.locationX(),child.locationY());
		}
	}
};
BattleCharacterLayerView.prototype.isHasActiveCharacter=function(belong){
	var self = this;
	var childList = self.getCharactersFromBelong(belong);
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		if(child.mode == CharacterMode.END_ACTION || child.status.hasStatus(StrategyType.Chaos)){
			continue;
		}
		return true;
	}
	return false;
};
BattleCharacterLayerView.prototype.getCharactersFromBelong = function(belong) {
	var self = this;
	var childList,characters = [];
	if(belong == Belong.SELF){
		childList = self.model.ourList;
	}else if(belong == Belong.FRIEND){
		childList = self.model.friendList;
	}else if(belong == Belong.ENEMY){
		childList = self.model.enemyList;
	}
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		if(child.data.troops() == 0){
			continue;
		}
		characters.push(child);
	}
	return characters;
};
BattleCharacterLayerView.prototype.onframe = function(event) {
	var self = event.currentTarget, child, x, y, stepWidth = self.model.stepWidth, stepHeight = self.model.stepHeight;
	for (var i = 0; i < self.numChildren; i++) {
		child = self.getChildAt(i);
		x = child.x + self.parent.x;
		y = child.y + self.parent.y;
		if (x + stepWidth < 0 || x > LGlobal.width || y + stepHeight < 0 || y > LGlobal.height) {
			child.visible = false;
		} else {
			child.visible = true;
		}
	}
};
BattleCharacterLayerView.prototype.getCharacterFromCoordinate=function(x,y){
	return this.getCharacterFromLocation(x/BattleCharacterSize.width >>> 0,y/BattleCharacterSize.height >>> 0);
};
BattleCharacterLayerView.prototype.getCharacterFromLocation=function(locationX,locationY){
	var self = this;
	var childList = self.childList,child;
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		if(!child.onLocation(locationX,locationY)){
			continue;
		}
		return child;
	}
	return null;
};
BattleCharacterLayerView.prototype.getCharacter=function(belong,id){
	var self = this;
	var childList = self.getCharactersFromBelong(belong);
	return self.getCharacterFromeList(childList,id);
};
BattleCharacterLayerView.prototype.getCharacterFromeList=function(childList,id){
	var self = this,child;
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		if(child.data.id() == id){
			return child;
		}	
	}
	return null;
};
BattleCharacterLayerView.prototype.addOurCharacter=function(id,action,direction,x,y,callback){
	var self = this;
	var chara = self.addCharaLayer(id,action,direction,x,y);
	chara.belong = Belong.SELF;
	chara.changeAction(CharacterAction.MOVE);
	self.model.ourList.push(chara);
	if(typeof callback == "function")callback();
};
BattleCharacterLayerView.prototype.addEnemyCharacter=function(index,action,direction,x,y,isHide,ai,callback){
	var self = this;
	var chara = self.addCharaLayer(index,action,direction,x,y);
	chara.belong = Belong.ENEMY;
	chara.changeAction(CharacterAction.MOVE);
	self.model.enemyList.push(chara);
	if(typeof callback == "function")callback();
};
BattleCharacterLayerView.prototype.addFriendCharacter=function(index,action,direction,x,y,isHide,ai,callback){
	var self = this;
	var chara = self.addCharaLayer(index,action,direction,x,y);
	chara.belong = Belong.FRIEND;
	chara.changeAction(CharacterAction.MOVE);
	self.model.friendList.push(chara);
	if(typeof callback == "function")callback();
};
/**
 * 添加人物
 * */
BattleCharacterLayerView.prototype.addCharaLayer=function(index,action,direction,x,y){
	var self = this;
	var map = self.model.map;
	var grids = map.data;
	var stepWidth = map.width/grids[0].length;
	var stepHeight = map.height/grids.length;
	var chara = new BattleCharacterView(self.controller,index,stepWidth,stepHeight);
	chara.setCoordinate(parseInt(x)*stepWidth,parseInt(y)*stepHeight);
	self.addChild(chara);
	chara.setActionDirection(action,direction);
	return chara;
};
BattleCharacterLayerView.prototype.boutSkillRun=function(belong,callback){
	var self = this;
	var charas = self.getCharactersFromBelong(belong);
	for(var index = 0,l = charas.length;index<l;index++){
		var chara = charas[index];
		var skill = chara.data.skill(SkillType.BOUT_START);
		if(!skill || !skill.isSubType(SkillSubType.SELF_AID)){
			continue;
		}
		var tweenObj = getStrokeLabel(skill.name(),22,"#FFFFFF","#000000",2);
		if(callback){
			tweenObj.callback = callback;
			callback = null;
		}
		tweenObj.x = chara.x + (BattleCharacterSize.width - tweenObj.getWidth()) * 0.5;
		tweenObj.y = chara.y;
		chara.controller.view.baseLayer.addChild(tweenObj);
		LTweenLite.to(tweenObj,0.5,{y:tweenObj.y - 20,alpha:0,onComplete:function(obj){
			obj.remove();
			if(obj.callback){
				obj.callback();
			}
		}});
		var aids = Array.getRandomArrays(skill.aids(),skill.aidCount());
		var aidRects = skill.aidRects();
		for(var i=0;i<aidRects.length;i++){
			var range = aidRects[i];
			var targetChara = self.getCharacterFromLocation(chara.locationX()+range.x, chara.locationY()+range.y);
			if(!targetChara || !isSameBelong(targetChara.belong,chara.belong)){
				continue;
			}
			for(var j = 0;j<aids.length;j++){
				var strategy = StrategyMasterModel.getMaster(aids[j]);
				targetChara.status.addStatus(strategy.strategyType(), strategy.hert());
			}
		}
	}
	if(callback){
		callback();
	}
};