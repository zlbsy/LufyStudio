function BattleCharacterStatusView(controller, characterModel, belong){
	var self = this;
	LExtends(self,LView,[controller]);
	self.set(characterModel, belong);
};
BattleCharacterStatusView.prototype.set=function(characterModel, belong){
	var self = this;
	self.showCharacterStatus(characterModel, belong);
};
BattleCharacterStatusView.prototype.showCharacterStatus=function(characterModel, belong){
	var self = this;
	console.log("showCharacterStatus");
	var face = characterModel.face();
	self.addChild(face);
	
	var layer = new LSprite();
	self.addChild(layer);
	
	var background = getTranslucentBitmap(195,107);
	layer.addChild(background);
	
	var name = getStrokeLabel(characterModel.name(),14,"#FFFFFF","#FF8C00",1);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	
	var soldier = getStrokeLabel(characterModel.currentSoldiers().name() + " Lv22",14,"#FFFFFF","#000000",1);
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
	//belong
	var lblBelong;
	if(belong == CharacterConfig.BELONG_SELF){
		lblBelong = getStrokeLabel("我军",14,"#FF0000","#000000",1);
	}else if(belong == CharacterConfig.BELONG_ENEMY){
		lblBelong = getStrokeLabel("敌军",14,"#0000FF","#000000",1);
	}else if(belong == CharacterConfig.BELONG_FRIEND){
		lblBelong = getStrokeLabel("友军",14,"#FF8C00","#000000",1);
	}
	lblBelong.x = 10;
	lblBelong.y = 88;
	layer.addChild(lblBelong);
	
	var lblTerrain = getStrokeLabel("树林 90%",14,"#FFFFFF","#000000",1);
	lblTerrain.x = background.getWidth() - lblTerrain.getWidth() - 20;
	lblTerrain.y = 88;
	layer.addChild(lblTerrain);
	
	layer.y = 315 - layer.getHeight();
};
BattleCharacterStatusView.prototype.getCharacterStatusChild=function(mode){
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