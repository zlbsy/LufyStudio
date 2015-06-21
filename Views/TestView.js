function TestView(){
	LExtends(this,LView,[]);
}
TestView.HP = "HP";
TestView.MP = "MP";
TestView.SP = "SP";
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
	button01.y = 100;
	layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showFriendCharacterStatus.bind(self));
	return;
	var v = new BattleCharacterStatusView(self.controller,null);
	self.addChild(v);
	return;
	//self.selfCharacterStatus();
	self.friendCharacterStatus();
};
TestView.prototype.showSelfCharacterStatus=function(event){
	var self = this;
	var chara = CharacterModel.getChara(1);
	var v = new BattleCharacterStatusView(self.controller,chara,CharacterConfig.BELONG_SELF);
	v.x = 50;
	v.y = 100;
	self.addChild(v);
};
TestView.prototype.showFriendCharacterStatus=function(event){
	var self = this;
	var chara = CharacterModel.getChara(1);
	var v = new BattleCharacterStatusView(self.controller,chara,CharacterConfig.BELONG_FRIEND);
	self.addChild(v);
};
TestView.prototype.showEnemyCharacterStatus=function(event){
	var self = this;
	var chara = CharacterModel.getChara(1);
	var v = new BattleCharacterStatusView(self.controller,chara,CharacterConfig.BELONG_ENEMY);
	self.addChild(v);
};
TestView.prototype.getCharacterStatusChild=function(mode){
	var layer = new LSprite();
	var bar_size = 150;
	var icon, frontBar, label;
	switch(mode){
		case TestView.HP:
			icon = "icon_hert";
			frontBar = "red_bar";
			label = "兵力";
			break;
		case TestView.MP:
			icon = "yellow_ball";
			frontBar = "yellow_bar";
			label = "策略";
			break;
		case TestView.SP:
			icon = "orange_ball";
			frontBar = "orange_bar";
			label = "体力";
			break;
	}
	var hertIcon = new LBitmap(new LBitmapData(LMvc.datalist[icon]));
	hertIcon.scaleX = hertIcon.scaleY = 16 / hertIcon.getHeight();
	layer.addChild(hertIcon);
	var hpBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]),bar_size + 4,14);
	hpBack.x = hertIcon.x + 20;
	hpBack.y = hertIcon.y;
	layer.addChild(hpBack);
	var hpSize = bar_size * 0.6;
	var hpIcon = new LPanel(new LBitmapData(LMvc.datalist[frontBar]),hpSize,10);
	hpIcon.x = hpBack.x + bar_size - hpSize + 2;
	hpIcon.y = hertIcon.y + 2;
	layer.addChild(hpIcon);
	var lblHp = getStrokeLabel(String.format("{0} {1}/{2} ",label,600,1000),14,"#FFFFFF","#000000",1);
	lblHp.x = hertIcon.x + 15 + bar_size - lblHp.getWidth();
	lblHp.y = hpBack.y + hpBack.getHeight() - lblHp.getHeight() - 5;
	layer.addChild(lblHp);
	return layer;
};
TestView.prototype.selfCharacterStatus=function(){
	var self = this;
	console.log("characterStatus");
	self.x = 100;
	self.y = 200;
	var face = new LBitmap(new LBitmapData(LMvc.datalist["face-5"]));
	self.addChild(face);
	
	var layer = new LSprite();
	self.addChild(layer);
	
	//var bitmapData = new LBitmapData(LMvc.datalist["translucent"]);
	var background = getTranslucentBitmap(195,130);
	layer.addChild(background);
	
	var name = getStrokeLabel("诸葛亮",14,"#FFFFFF","#FF8C00",1);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	
	var soldier = getStrokeLabel("重骑兵 Lv22",14,"#FFFFFF","#000000",1);
	soldier.x = background.getWidth() - soldier.getWidth() - 15;
	soldier.y = 5;
	layer.addChild(soldier);
	
	var hpStatus = self.getCharacterStatusChild(TestView.HP);
	hpStatus.x = 10;
	hpStatus.y = 30;
	layer.addChild(hpStatus);
	
	var mpStatus = self.getCharacterStatusChild(TestView.MP);
	mpStatus.x = 10;
	mpStatus.y = 50;
	layer.addChild(mpStatus);
	
	var spStatus = self.getCharacterStatusChild(TestView.SP);
	spStatus.x = 10;
	spStatus.y = 70;
	layer.addChild(spStatus);
	
	var expStatus = self.getCharacterStatusChild(TestView.SP);
	expStatus.x = 10;
	expStatus.y = 90;
	layer.addChild(expStatus);
	
	var bitmapWeapon = new LBitmap(new LBitmapData(LMvc.datalist["icon-weapon"]));
	bitmapWeapon.scaleX = bitmapWeapon.scaleY = 20/bitmapWeapon.getHeight();
	bitmapWeapon.x = 10;
	bitmapWeapon.y = 108;
	layer.addChild(bitmapWeapon);
	var soldier = getStrokeLabel("76",14,"#FFFFFF","#000000",1);
	soldier.x = 40;
	soldier.y = 108;
	layer.addChild(soldier);
	
	var bitmapArmor = new LBitmap(new LBitmapData(LMvc.datalist["icon-armor"]));
	bitmapArmor.scaleX = bitmapArmor.scaleY = 20/bitmapArmor.getHeight();
	bitmapArmor.x = 130;
	bitmapArmor.y = 108;
	layer.addChild(bitmapArmor);
	var soldier = getStrokeLabel("99",14,"#FFFFFF","#000000",1);
	soldier.x = 160;
	soldier.y = 108;
	layer.addChild(soldier);
	
	layer.y = face.getHeight() - layer.getHeight();
};

TestView.prototype.friendCharacterStatus=function(){
	var self = this;
	console.log("characterStatus");
	self.x = 100;
	self.y = 200;
	var face = new LBitmap(new LBitmapData(LMvc.datalist["face-5"]));
	self.addChild(face);
	
	var layer = new LSprite();
	self.addChild(layer);
	
	//var bitmapData = new LBitmapData(LMvc.datalist["translucent"]);
	var background = getTranslucentBitmap(195,107);
	layer.addChild(background);
	
	var name = getStrokeLabel("诸葛亮",14,"#FFFFFF","#FF8C00",1);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	
	var soldier = getStrokeLabel("重骑兵 Lv22",14,"#FFFFFF","#000000",1);
	soldier.x = background.getWidth() - soldier.getWidth() - 20;
	soldier.y = 5;
	layer.addChild(soldier);
	
	var hpStatus = self.getCharacterStatusChild(TestView.HP);
	hpStatus.x = 10;
	hpStatus.y = 30;
	layer.addChild(hpStatus);
	
	var mpStatus = self.getCharacterStatusChild(TestView.MP);
	mpStatus.x = 10;
	mpStatus.y = 50;
	layer.addChild(mpStatus);
	
	var spStatus = self.getCharacterStatusChild(TestView.SP);
	spStatus.x = 10;
	spStatus.y = 70;
	layer.addChild(spStatus);
	
	var soldier = getStrokeLabel("友军",14,"#FF8C00","#000000",1);
	soldier.x = 10;
	soldier.y = 88;
	layer.addChild(soldier);
	
	var soldier = getStrokeLabel("树林 90%",14,"#FFFFFF","#000000",1);
	soldier.x = background.getWidth() - soldier.getWidth() - 20;
	soldier.y = 88;
	layer.addChild(soldier);
	
	layer.y = face.getHeight() - layer.getHeight();
};

