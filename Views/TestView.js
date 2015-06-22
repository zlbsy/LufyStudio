function TestView(){
	LExtends(this,LView,[]);
}
TestView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
TestView.prototype.init=function(){
	var self = this;
	var layer = new LSprite();
	self.addChild(layer);
	var button01 = new LButtonSample1("我方武将属性确认");
	button01.x = 50;
	button01.y = 10;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showSelfCharacterStatus.bind(self));

	button01 = new LButtonSample1("敌方武将属性确认");
	button01.x = 50;
	button01.y = 50;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showEnemyCharacterStatus.bind(self));

	button01 = new LButtonSample1("友方武将属性确认");
	button01.x = 50;
	button01.y = 90;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showFriendCharacterStatus.bind(self));
	
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
};
TestView.prototype.showSelfCharacterStatus=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	chara.data.troops = 400;
	var v = new BattleCharacterStatusView(self.controller,chara,CharacterConfig.BELONG_SELF);
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
};
TestView.prototype.showFriendCharacterStatus=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	var v = new BattleCharacterStatusView(self.controller,chara,CharacterConfig.BELONG_FRIEND);
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
};
TestView.prototype.showEnemyCharacterStatus=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	var v = new BattleCharacterStatusView(self.controller,chara,CharacterConfig.BELONG_ENEMY);
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
};


