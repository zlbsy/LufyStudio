function BattleCharacterLayerView(controller) {
	var self = this;
	LExtends(self, LView, [controller]);
	self.addCharaLayer(1,CharacterAction.MOVE,CharacterDirection.DOWN,2,2);
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
BattleCharacterLayerView.prototype.addOurCharacter=function(index,action,direction,x,y,callback){
	var self = this;
	var member = LSouSouObject.memberList.find(function(element, index, array){return element.index() == LSouSouObject.perWarList[index];});
	var chara = self.addCharaLayer(member.index(),action,direction,x,y);
	chara.member = member;
	chara.belong = LSouSouObject.BELONG_SELF;
	chara.changeAction(CharacterAction.MOVE);
	self.model.ourList.push(chara);
	if(typeof callback == "function")callback();
};
BattleCharacterLayerView.prototype.addEnemyCharacter=function(index,action,direction,x,y,isHide,ai,callback){
	var self = this;
	var chara = self.addCharaLayer(index,action,direction,x,y);
	chara.belong = LSouSouObject.BELONG_ENEMY;
	chara.changeAction(CharacterAction.MOVE);
	self.model.enemyList.push(chara);
	if(typeof callback == "function")callback();
};
BattleCharacterLayerView.prototype.addFriendCharacter=function(index,action,direction,x,y,isHide,ai,callback){
	var self = this;
	var chara = self.addCharaLayer(index,action,direction,x,y);
	chara.belong = LSouSouObject.BELONG_FRIEND;
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
	var chara = new BattleCharacter(index,stepWidth,stepHeight);
	chara.setCoordinate(parseInt(x)*stepWidth,parseInt(y)*stepHeight);
	self.addChild(chara);
	return chara;
};