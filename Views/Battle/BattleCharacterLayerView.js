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
	var self = this;
	var childList = self.childList,child;
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		if(!child.hitTestPoint(x,y)){
			continue;
		}
		return child;
	}
	return null;
};
BattleCharacterLayerView.prototype.getCharacter=function(belong,id){
	var self = this;
	switch(belong){
		case Belong.SELF:
			childList = self.model.ourList;
			break;
		case Belong.FRIEND:
			childList = self.model.friendList;
			break;
		case Belong.ENEMY:
			childList = self.model.enemyList;
			break;
	}
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