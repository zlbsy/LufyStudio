function BattleCharacterStatusView(controller, characterModel, belong){
	var self = this;
	LExtends(self,LView,[controller]);
	self.characterModel = characterModel;
	self.belong = belong;
	self.set();
};
BattleCharacterStatusView.HP = "HP";
BattleCharacterStatusView.MP = "MP";
BattleCharacterStatusView.SP = "SP";
BattleCharacterStatusView.prototype.set=function(){
	var self = this;
	self.showCharacterStatus();
};
BattleCharacterStatusView.prototype.showCharacterStatus=function(){
	var self = this;
	//alert("showCharacterStatus");
	var statusLayer = new LSprite();
	
	var characterModel = self.characterModel, belong = self.belong;
	var face = characterModel.face();
	self.addChild(face);
	
	var layer = new LSprite();
	
	
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
	
	var hpStatus = new LSprite();
	hpStatus.x = 10;
	hpStatus.y = 30;
	self.getCharacterStatusChild(BattleCharacterStatusView.HP, true, hpStatus);
	
	layer.addChild(hpStatus);
	
	var mpStatus = new LSprite();
	mpStatus.x = 10;
	mpStatus.y = 50;
	self.getCharacterStatusChild(BattleCharacterStatusView.MP, true, mpStatus);
	
	layer.addChild(mpStatus);
	
	var spStatus = new LSprite();
	spStatus.x = 10;
	spStatus.y = 70;
	self.getCharacterStatusChild(BattleCharacterStatusView.SP, true, spStatus);
	
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
	
	layer = getBitmap(layer);
	
	layer.y = 315 - layer.getHeight();
	self.addChild(layer);
};
BattleCharacterStatusView.prototype.getCharacterStatusChild=function(mode,isStatic,layer){
	var self = this;
//	var layer = new LSprite();
	var bar_size = 150;
	var icon, frontBar, label, value, maxValue, currentValue;
	//alert(self.characterModel.troops);
	switch(mode){
		case BattleCharacterStatusView.HP:
			icon = "icon_hert";
			frontBar = "red_bar";
			label = "兵力";
			maxValue = self.characterModel.maxTroops();
			currentValue = self.characterModel.troops();
			break;
		case BattleCharacterStatusView.MP:
			icon = "yellow_ball";
			frontBar = "yellow_bar";
			label = "策略";
			maxValue = self.characterModel.maxTroops();
			currentValue = self.characterModel.troops();
			break;
		case BattleCharacterStatusView.SP:
			icon = "orange_ball";
			frontBar = "orange_bar";
			label = "体力";
			maxValue = self.characterModel.maxTroops();
			currentValue = self.characterModel.troops();
			break;
	}
	var iconBitmapData = new LBitmapData(LMvc.datalist[icon]);
	var hertIcon = new LBitmap(iconBitmapData);
	hertIcon.scaleX = hertIcon.scaleY = 16 / hertIcon.getHeight();
	layer.addChild(hertIcon);
	var hpBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]),bar_size + 4,14);
	hpBack.x = hertIcon.x + 20;
	hpBack.y = hertIcon.y;
	layer.addChild(hpBack);
	value = currentValue / maxValue;
	value = value < 0.001 ? 0.001 : value;
	var hpSize = bar_size * value;
	var showSize = hpSize < iconBitmapData.width ? iconBitmapData.width : hpSize;
	var hpIcon = new LPanel(new LBitmapData(LMvc.datalist[frontBar]),showSize,10);
	if(hpSize < iconBitmapData.width){
		hpIcon.scaleX = hpSize / showSize;
	}
	hpIcon.x = hpBack.x + bar_size - hpSize + 2;
	hpIcon.y = hertIcon.y + 2;
	layer.addChild(hpIcon);
	var lblHp = getStrokeLabel(String.format("{0} {1}/{2} ",label,self.characterModel.troops(),self.characterModel.maxTroops()),14,"#FFFFFF","#000000",1);
	lblHp.x = hertIcon.x + 15 + bar_size - lblHp.getWidth();
	lblHp.y = hpBack.y + hpBack.getHeight() - lblHp.getHeight() - 5;
	layer.addChild(lblHp);
//	return layer;
};