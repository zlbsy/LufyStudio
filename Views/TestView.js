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
	button01.x = 10;
	button01.y = 10;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showSelfCharacterStatus.bind(self));

	button01 = new LButtonSample1("敌方武将属性确认");
	button01.x = 160;
	button01.y = 10;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showEnemyCharacterStatus.bind(self));

	button01 = new LButtonSample1("友方武将属性确认");
	button01.x = 310;
	button01.y = 10;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showFriendCharacterStatus.bind(self));
	
	button01 = new LButtonSample1("武将属性变化确认");
	button01.x = 10;
	button01.y = 50;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showCharacterStatusChange.bind(self));
	
	var com = new LComboBox();
	com.x = 160;
	com.y = 50;
	com.setChild({label:"HP",value:"HP"});
	com.setChild({label:"MP",value:"MP"});
	com.setChild({label:"SP",value:"SP"});
	com.setChild({label:"Exp",value:"Exp"});
	layer.addChild(com);
	self.changeComboBox = com;
	
	var theTextField = new LTextField();
	theTextField.setType(LTextFieldType.INPUT);
	theTextField.x = 370;
	theTextField.y = 60;
	theTextField.text = 100;
	layer.addChild(theTextField);
	self.changeValue = theTextField;

	
	button01 = new LButtonSample1("策略测试");
	button01.x = 10;
	button01.y = 90;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showStrategy.bind(self));
	
	button01 = new LButtonSample1("战场主菜单");
	button01.x = 100;
	button01.y = 90;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showBattleMap.bind(self));
	
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
};
TestView.prototype.showBattleMap=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var buttonView = new BattleMainMenuView(null);
	buttonView.x = 100;
	buttonView.y = 150;
	self.statusLayer.addChild(buttonView);
};
TestView.prototype.showStrategy=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	var view = new StrategyView(self.controller, chara);
	self.statusLayer.addChild(view);
};
TestView.prototype.showCharacterStatusChange=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	chara.data.troops = 400;
	var v = new BattleCharacterStatusView(self.controller,{characterModel:chara,belong:CharacterConfig.BELONG_SELF,changeType:self.changeComboBox.value,changeValue:self.changeValue.text});
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
	
};
TestView.prototype.showSelfCharacterStatus=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	chara.data.troops = 400;
	var v = new BattleCharacterStatusView(self.controller,{characterModel:chara,belong:CharacterConfig.BELONG_SELF});
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
};
TestView.prototype.showFriendCharacterStatus=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	var v = new BattleCharacterStatusView(self.controller,{characterModel:chara,belong:CharacterConfig.BELONG_FRIEND});
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
};
TestView.prototype.showEnemyCharacterStatus=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	var v = new BattleCharacterStatusView(self.controller,{characterModel:chara,belong:CharacterConfig.BELONG_ENEMY});
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
};


