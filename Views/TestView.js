function TestView(){
	LExtends(this,LView,[]);
}
TestView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
TestView.prototype.init=function(){
	var self = this;
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width,LGlobal.height);
	self.addChild(getBitmap(win));
	
	var layer = new LSprite();
	
	self.menuLayer = layer;
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
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showBattleMenu.bind(self));
	
	button01 = new LButtonSample1("单挑测试");
	button01.x = 200;
	button01.y = 90;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showSingleCombat.bind(self));
	button01 = new LButtonSample1("单挑talk测试");
	button01.x = 300;
	button01.y = 90;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.SingleCombatTalk.bind(self));
	
	button01 = new LButtonSample1("单挑模式测试");
	button01.x = 10;
	button01.y = 130;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showSingleCombatArena.bind(self));
	
	button01 = new LButtonSample1("我军回合测试");
	button01.x = 130;
	button01.y = 130;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showSelfBout.bind(self));
	button01 = new LButtonSample1("敌军回合测试");
	button01.x = 250;
	button01.y = 130;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showEnemyBout.bind(self));

	
	
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
};
TestView.prototype.showSelfBout=function(event){
	var self = this;
	var boutView = new BattleBoutView(self.controller,Belong.SELF);
	self.statusLayer.addChild(boutView);
};
TestView.prototype.showEnemyBout=function(event){
	var self = this;
	var boutView = new BattleBoutView(self.controller,Belong.ENEMY);
	self.statusLayer.addChild(boutView);
};
TestView.prototype.showSingleCombatArena=function(event){
	var self = this;
	self.controller.showSingleCombatArena();
};
TestView.prototype.SingleCombatTalk = function(event){
	var self = this;
	//alert("SingleCombatTalkView");
	self.menuLayer.visible = false;
	//alert(typeof SingleCombatTalkView);
	var talk = new SingleCombatTalkView(self.controller,"单挑talk测试单挑talk测试",true);
	talk.x = 50;
	talk.y = 150;
	self.statusLayer.addChild(talk);
	talk = new SingleCombatTalkView(self.controller,"单挑talk测试单挑talk测试",false);
	talk.x = 50;
	talk.y = 250;
	self.statusLayer.addChild(talk);
	
};
TestView.prototype.showSingleCombat=function(event){
	var self = this;
	self.menuLayer.visible = false;
	var chara = CharacterModel.getChara(1);
	chara.maxHP(100);
	chara.HP(100);
	chara = CharacterModel.getChara(2);
	chara.maxHP(100);
	chara.HP(100);
	var combat = new SingleCombatController(self.controller,1,2);
	self.statusLayer.addChild(combat.view);
};
TestView.prototype.showBattleMenu=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var buttonView = new BattleMainMenuView(null);
	//buttonView.x = 100;
	//buttonView.y = 150;
	self.statusLayer.addChild(buttonView);
	//button01.addEventListener(LMouseEvent.MOUSE_UP,self.showEnemyBout.bind(self));
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
	var v = new BattleCharacterStatusView(self.controller,{characterModel:chara,belong:Belong.SELF});
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
};
TestView.prototype.showFriendCharacterStatus=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	var v = new BattleCharacterStatusView(self.controller,{characterModel:chara,belong:Belong.FRIEND});
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
};
TestView.prototype.showEnemyCharacterStatus=function(event){
	var self = this;
	self.statusLayer.removeAllChild();
	var chara = CharacterModel.getChara(1);
	var v = new BattleCharacterStatusView(self.controller,{characterModel:chara,belong:Belong.ENEMY});
	v.x = 50;
	v.y = 100;
	self.statusLayer.addChild(v);
};


