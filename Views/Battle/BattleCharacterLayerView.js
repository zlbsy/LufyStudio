function BattleCharacterLayerView(controller) {
	var self = this;
	LExtends(self, LView, [controller]);
	if(!LMvc.isRead){
		self.charasPositionsLayer = new LSprite();
		self.addChild(self.charasPositionsLayer);
		LTweenLite.to(self.charasPositionsLayer,1,{alpha:0.3,loop:true})
	    .to(self.charasPositionsLayer,1,{alpha:1});
	}
	self.charasPositions = {};
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
		child.changeAction(child.data.isPantTroops()?CharacterAction.PANT:CharacterAction.MOVE);
		child.toStatic(true);
		if(child.data.hasSkill(SkillSubType.WAKE)){
			var skill = child.data.skill();
			mapLayer.setWakeRoads(event.belong,skill.wakeRects(),child.locationX(),child.locationY());
		}
	}
	for(var i=0,l=self.childList.length;i<l;i++){
		self.childList[i].mode = CharacterMode.NONE;
	}
};
BattleCharacterLayerView.prototype.resetCharacterPositions=function(){
	var self = this;
	self.charasPositions = {};
	var childList = self.childList,child;
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		self.charasPositions[child.locationX()+","+child.locationY()] = child;
	}
};
BattleCharacterLayerView.prototype.hasCharacterInPosition=function(lx,ly){
	var self = this;
	return self.charasPositions[lx+","+ly] != null;
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
BattleCharacterLayerView.prototype.getDieCharacter = function(belong) {
	var self = this;
	if(!belong){
		return self.getDieCharacter(Belong.SELF) || self.getDieCharacter(Belong.FRIEND) || self.getDieCharacter(Belong.ENEMY);
	}
	var childList;
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
			return child;
		}
	}
	return null;
};
BattleCharacterLayerView.prototype.getCharactersFromBelong = function(belong,isAll,noDef) {
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
		var child = childList[i];
		if(child.data.troops() == 0 && !isAll){
			continue;
		}
		if(noDef && child.data.isDefCharacter()){
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
BattleCharacterLayerView.prototype.addOurCharacterOnClick=function(locationX,locationY){
	var self = this;
	var childList = self.charasPositionsLayer.childList,child,length;
	for(var i=0,length=0,l=self.model.ourList.length;i<l;i++){
		if(self.model.ourList[i].data.isDefCharacter()){
			continue;
		}
		length++;
	}
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		if(child.cx != locationX || child.cy != locationY){
			continue;
		}
		var id = self.controller.battleData.expeditionCharacterList[length].id();
		CharacterModel.getChara(id).calculation(true);
		self.addOurCharacter(id,CharacterAction.MOVE,child.direction,locationX,locationY);
		child.remove();
		break;
	}
	length++;
	if(length == self.controller.battleData.expeditionCharacterList.length){
		self.charasPositionsLayer.remove();
		self.charasPositionsLayer = null;
		console.log("leader="+self.controller.battleData.expeditionLeader);
		console.log("leader id="+self.controller.battleData.expeditionLeader.id());
		console.log("get leader="+self.getCharacter(Belong.SELF, self.controller.battleData.expeditionLeader.id()));
		self.getCharacter(Belong.SELF, self.controller.battleData.expeditionLeader.id()).isLeader = true;
		self.controller.boutNotify(Belong.SELF);
	}else{
		
	}
};
BattleCharacterLayerView.prototype.getCharacterFromLocation=function(locationX,locationY){
	var self = this;
	if(self.charasPositionsLayer){
		self.addOurCharacterOnClick(locationX,locationY);
		return null;
	}
	console.log("getCharacterFromLocation",locationX,locationY);
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
BattleCharacterLayerView.prototype.getCharacter=function(belong,id,isAll){
	var self = this;
	if(!belong){
		return self.getCharacter(Belong.SELF,id,isAll) || self.getCharacter(Belong.FRIEND,id,isAll) || self.getCharacter(Belong.ENEMY,id,isAll);
	}
	var childList = self.getCharactersFromBelong(belong,isAll);
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
BattleCharacterLayerView.prototype.addCharacterPosition=function(direction,x,y){
	var self = this;
	var positionLayer = new LSprite();
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["light"]));
	bitmap.x = (BattleCharacterSize.width - bitmap.getWidth()) * 0.5;
	bitmap.y = (BattleCharacterSize.height - bitmap.getHeight()) * 0.5;
	positionLayer.addChild(bitmap);
	self.charasPositionsLayer.addChild(positionLayer);
	//self.charasPositions.push(positionLayer);
	positionLayer.direction = direction;
	positionLayer.x = x * BattleCharacterSize.width;
	positionLayer.y = y * BattleCharacterSize.height;
	positionLayer.cx = x;
	positionLayer.cy = y;
};
BattleCharacterLayerView.prototype.addOurCharacter=function(id,action,direction,x,y,callback){
	var self = this;
	var chara = self.addCharaLayer(id,action,direction,x,y);
	chara.belong = Belong.SELF;
	chara.changeAction(CharacterAction.MOVE);
	self.model.ourList.push(chara);
	self.model.checkCreat(chara, chara.belong);
	if(typeof callback == "function")callback();
	return chara;
};
BattleCharacterLayerView.prototype.addEnemyCharacter=function(index,action,direction,x,y,isHide,ai,callback){
	var self = this;
	var chara = self.addCharaLayer(index,action,direction,x,y);
	chara.belong = Belong.ENEMY;
	chara.changeAction(CharacterAction.MOVE);
	self.model.enemyList.push(chara);
	self.model.checkCreat(chara, chara.belong);
	if(typeof callback == "function")callback();
	return chara;
};
BattleCharacterLayerView.prototype.addFriendCharacter=function(index,action,direction,x,y,isHide,ai,callback){
	var self = this;
	var chara = self.addCharaLayer(index,action,direction,x,y);
	chara.belong = Belong.FRIEND;
	chara.changeAction(CharacterAction.MOVE);
	self.model.friendList.push(chara);
	self.model.checkCreat(chara, chara.belong);
	if(typeof callback == "function")callback();
	return chara;
};
BattleCharacterLayerView.prototype.removeCharacter=function(belong,id){
	var self = this;
	var childList;
	if(belong == Belong.SELF){
		childList = self.model.ourList;
	}else if(belong == Belong.FRIEND){
		childList = self.model.friendList;
	}else if(belong == Belong.ENEMY){
		childList = self.model.enemyList;
	}
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		if(child.data.id() != id){
			continue;
		}
		childList.splice(i,1);
		child.remove();
		break;
	}
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
		if(!skill){
			continue;
		}
		var tweenObj = getStrokeLabel(skill.name(),22,"#FFFFFF","#000000",2);
		if(callback){
			tweenObj.callback = callback;
			LMvc.running = true;
			callback = null;
		}
		tweenObj.x = chara.x + (BattleCharacterSize.width - tweenObj.getWidth()) * 0.5;
		tweenObj.y = chara.y;
		chara.controller.view.baseLayer.addChild(tweenObj);
		LTweenLite.to(tweenObj,0.5,{y:tweenObj.y - 20,alpha:0,onComplete:function(obj){
			LMvc.running = false;
			obj.remove();
			if(obj.callback){
				obj.callback();
			}
		}});
		if(skill.isSubType(SkillSubType.SELF_AID)){
			self.boutSkillSelfAid(chara,skill,tweenObj);
		}else if(skill.isSubType(SkillSubType.ENLIST_SKILL)){
			self.boutSkillEnlist(chara,skill,tweenObj);
		}else if(skill.isSubType(SkillSubType.HEAL)){
			self.boutSkillHeal(chara,skill,tweenObj);
		}
	}
	if(callback){
		callback();
	}
};
BattleCharacterLayerView.prototype.boutSkillHeal=function(chara,skill,tweenObj){
	var self = this;
	var healId = skill.healId();
	var healRects = skill.healRects();
	var strategy = StrategyMasterModel.getMaster(healId);
	for(var i=0;i<healRects.length;i++){
		var range = healRects[i];
		if(range.x == 0 && range.y == 0){
			self.healSingle(chara, strategy, 20);
			continue;
		}
		var targetChara = self.getCharacterFromLocation(chara.locationX()+range.x, chara.locationY()+range.y);
		if(!targetChara || !isSameBelong(targetChara.belong,chara.belong)){
			continue;
		}
		self.healSingle(targetChara, strategy, 0);
	}
};
BattleCharacterLayerView.prototype.healSingle = function(chara,strategy,y){
	var self = this;
	var healTroops = battleHealTroops(strategy, chara);
	BattleCharacterStatusView.healCharactersPush(chara, healTroops);
	/*
	var wounded = chara.data.wounded();
	var troops = chara.data.troops();
	
	if(wounded == 0){
		return;
	}
	var troopsAdd = strategy.troops();
	var woundedAdd = strategy.wounded();
	if(woundedAdd < 1){
		woundedAdd = wounded*woundedAdd >>> 0;
	}else if(woundedAdd > wounded){
		woundedAdd = wounded;
	}
	if(woundedAdd == 0){
		return;
	}
	chara.data.wounded(wounded - woundedAdd);
	troopsAdd += woundedAdd;
	chara.toStatic(false);
	chara.changeAction(CharacterAction.WAKE);	
	
	var maxTroops = chara.data.maxTroops();
	var troopsValue = troops + troopsAdd > maxTroops ? maxTroops : troops + troopsAdd;
	chara.data.troops(troopsValue);
	
	var tweenObj = getStrokeLabel(String.format("{0}+{1}",Language.get("treat"),woundedAdd),12,"#FF0000","#000000",2);
	tweenObj.x = chara.x + (BattleCharacterSize.width - tweenObj.getWidth()) * 0.5;
	tweenObj.y = chara.y + y;
	chara.controller.view.baseLayer.addChild(tweenObj);
	LTweenLite.to(tweenObj,1.5,{y:tweenObj.y - 20,alpha:0,onComplete:function(e){
		e.target.remove();
		chara.changeAction(CharacterAction.MOVE);
		chara.toStatic(true);
	}});
	*/
};
BattleCharacterLayerView.prototype.boutSkillEnlist=function(chara,skill,tweenObj){
	var self = this;
	var enlistCount = skill.enlistCount();
	var enlistValue = skill.enlistValue();
	var charas = self.getCharactersFromBelong(chara.belong);
	charas = Array.getRandomArrays(charas,enlistCount);
	for(var i=0,l=charas.length;i<l;i++){
		var currentChara = charas[i];
		var addTroops = currentChara.data.maxTroops() * enlistValue >>> 0;
		var troops = currentChara.data.troops();
		currentChara.data.troops(troops + addTroops);
		var tweenVampire = getStrokeLabel(String.format("{0}+{1}",Language.get("troops"),addTroops),12,"#FF0000","#000000",2);
		tweenVampire.x = currentChara.x + (BattleCharacterSize.width - tweenVampire.getWidth()) * 0.5;
		tweenVampire.y = currentChara.y + (currentChara.data.id() == chara.data.id() ? 20 : 0);
		chara.controller.view.baseLayer.addChild(tweenVampire);
		LTweenLite.to(tweenVampire,1.5,{y:tweenVampire.y - 20,alpha:0,onComplete:function(e){
			e.target.remove();
		}});
	}
};
BattleCharacterLayerView.prototype.boutSkillSelfAid=function(chara,skill,tweenObj){
	var self = this;
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
};
BattleCharacterLayerView.prototype.terrainHeal = function(){
	var self = LMvc.BattleController.view.charaLayer;
	var belong = LMvc.BattleController.getValue("currentBelong");
	var charas = self.getCharactersFromBelong(belong);
	
	for(var index = 0,l = charas.length;index<l;index++){
		var chara = charas[index];
		var terrain = chara.getTerrain();
		var terrainMaster = TerrainMasterModel.getMaster(terrain.id);
		var heal = terrainMaster.heal();
		if(heal > 0){
			var troopsAdd = chara.data.maxTroops() * heal >>> 0;
			var woundedAdd = chara.data.wounded() * heal >>> 0;
			var healTroops = battleHealTroopsRun(troopsAdd, woundedAdd, chara);
			BattleCharacterStatusView.healCharactersPush(chara, healTroops);
		}
	}
	BattleCharacterStatusView.healCharactersBout();
};
