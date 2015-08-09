function BattleCharacterStatusView(controller, params){
	var self = this;
	LExtends(self,LView,[controller]);
	self.character = params.character;
	self.belong = params.belong;
	self.changeType = params.changeType;
	self.changeValue = params.changeValue;
	self.set();
	self.setPosition(params.character);
};
BattleCharacterStatusView.HP = "HP";
BattleCharacterStatusView.MP = "MP";
BattleCharacterStatusView.SP = "SP";
BattleCharacterStatusView.EXP = "Exp";
BattleCharacterStatusView.BAR_SIZE = 150;
BattleCharacterStatusView.prototype.set=function(){
	var self = this;
	self.showCharacterStatus();
};
BattleCharacterStatusView.prototype.showCharacterStatus=function(){
	var self = this;
	self.statusLayer = new LSprite();
	
	var characterModel = self.character.data, belong = self.belong;
	var face = characterModel.face();
	self.addChild(face);
	
	var layer = new LSprite();
	
	var setH = 30;
	
	var hpStatus = new LSprite();
	hpStatus.x = 10;
	hpStatus.y = setH;
	self.getCharacterStatusChild(BattleCharacterStatusView.HP, self.changeType == BattleCharacterStatusView.HP, hpStatus);
	layer.addChild(hpStatus);
	setH += 20;
	var mpStatus = new LSprite();
	mpStatus.x = 10;
	mpStatus.y = setH;
	self.getCharacterStatusChild(BattleCharacterStatusView.MP, self.changeType == BattleCharacterStatusView.MP, mpStatus);
	layer.addChild(mpStatus);
	setH += 20;
	var spStatus = new LSprite();
	spStatus.x = 10;
	spStatus.y = setH;
	self.getCharacterStatusChild(BattleCharacterStatusView.SP, self.changeType == BattleCharacterStatusView.SP, spStatus);
	layer.addChild(spStatus);
	
	if(self.changeType == BattleCharacterStatusView.EXP){
		setH += 20;
		var expStatus = new LSprite();
		expStatus.x = 10;
		expStatus.y = setH;
		self.getCharacterStatusChild(BattleCharacterStatusView.EXP, true, expStatus);
		layer.addChild(expStatus);
	}
	var background = getTranslucentBitmap(195,(self.changeType ? 50 : 47) + 20 * layer.numChildren);
	layer.addChildAt(background,0);
	var name = getStrokeLabel(characterModel.name(),14,"#FFFFFF","#FF8C00",1);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	
	var soldier = getStrokeLabel(characterModel.currentSoldiers().name() + " Lv22",14,"#FFFFFF","#000000",1);
	soldier.x = background.getWidth() - soldier.getWidth() - 20;
	soldier.y = 5;
	layer.addChild(soldier);
	
	setH += 18;
	if(self.changeType){
		var bitmapWeapon = new LBitmap(new LBitmapData(LMvc.datalist["icon-weapon"]));
		bitmapWeapon.scaleX = bitmapWeapon.scaleY = 20/bitmapWeapon.getHeight();
		bitmapWeapon.x = 10;
		bitmapWeapon.y = setH;
		layer.addChild(bitmapWeapon);
		var soldier = getStrokeLabel("76",14,"#FFFFFF","#000000",1);
		soldier.x = 40;
		soldier.y = setH;
		layer.addChild(soldier);
		
		var bitmapArmor = new LBitmap(new LBitmapData(LMvc.datalist["icon-armor"]));
		bitmapArmor.scaleX = bitmapArmor.scaleY = 20/bitmapArmor.getHeight();
		bitmapArmor.x = 130;
		bitmapArmor.y = setH;
		layer.addChild(bitmapArmor);
		var soldier = getStrokeLabel("99",14,"#FFFFFF","#000000",1);
		soldier.x = 160;
		soldier.y = setH;
		layer.addChild(soldier);
	}else{
		var lblBelong;
		if(belong == CharacterConfig.BELONG_SELF){
			lblBelong = getStrokeLabel("我军",14,"#FF0000","#000000",1);
		}else if(belong == CharacterConfig.BELONG_ENEMY){
			lblBelong = getStrokeLabel("敌军",14,"#0000FF","#000000",1);
		}else if(belong == CharacterConfig.BELONG_FRIEND){
			lblBelong = getStrokeLabel("友军",14,"#FF8C00","#000000",1);
		}
		lblBelong.x = 10;
		lblBelong.y = setH;
		layer.addChild(lblBelong);
		
		var lblTerrain = getStrokeLabel("树林 90%",14,"#FFFFFF","#000000",1);
		lblTerrain.x = background.getWidth() - lblTerrain.getWidth() - 20;
		lblTerrain.y = setH;
		layer.addChild(lblTerrain);
	}
	
	layer = getBitmap(layer);
	
	layer.y = 315 - layer.getHeight();
	self.addChild(layer);
	
	self.statusLayer.x += layer.x;
	self.statusLayer.y += layer.y;
	self.addChild(self.statusLayer);
};
BattleCharacterStatusView.prototype.getCharacterStatusChild=function(mode,isDynamic,layer){
	var self = this;
	var icon, frontBar, label, value, maxValue, currentValue;
	switch(mode){
		case BattleCharacterStatusView.HP:
			icon = "icon_hert";
			frontBar = "red_bar";
			label = "兵力";
			maxValue = self.character.data.maxTroops();
			currentValue = self.character.data.troops();
			break;
		case BattleCharacterStatusView.MP:
			icon = "yellow_ball";
			frontBar = "yellow_bar";
			label = "策略";
			maxValue = self.character.data.maxTroops();
			currentValue = self.character.data.troops();
			break;
		case BattleCharacterStatusView.SP:
			icon = "orange_ball";
			frontBar = "orange_bar";
			label = "体力";
			maxValue = self.character.data.maxPhysicalFitness();
			currentValue = self.character.data.physicalFitness();
			break;
		case BattleCharacterStatusView.EXP:
			icon = "orange_ball";
			frontBar = "orange_bar";
			label = "经验";
			maxValue = self.character.data.maxTroops();
			currentValue = self.character.data.troops();
			break;
	}
	var iconBitmapData = new LBitmapData(LMvc.datalist[icon]);
	var hertIcon = new LBitmap(iconBitmapData);
	hertIcon.scaleX = hertIcon.scaleY = 16 / hertIcon.getHeight();
	layer.addChild(hertIcon);
	var barBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]),BattleCharacterStatusView.BAR_SIZE + 4,14);
	barBack.x = hertIcon.x + 20;
	barBack.y = hertIcon.y;
	layer.addChild(barBack);
	if(isDynamic){
		statusLayer = self.statusLayer;
		statusLayer.x = layer.x;
		statusLayer.y = layer.y;
	}else{
		statusLayer = layer;
	}
	value = currentValue / maxValue;
	value = value < 0.001 ? 0.001 : value;
	var barSize = BattleCharacterStatusView.BAR_SIZE * value;
	var showSize = barSize < iconBitmapData.width ? iconBitmapData.width : barSize;
	var barIcon = new LPanel(new LBitmapData(LMvc.datalist[frontBar]),showSize,10);
	if(barSize < iconBitmapData.width){
		barIcon.scaleX = barSize / showSize;
	}
	var barEndPosition = barBack.x + BattleCharacterStatusView.BAR_SIZE + 2;
	barIcon.x = barEndPosition - barSize;
	barIcon.y = hertIcon.y + 2;
	statusLayer.addChild(barIcon);
	var lblBar = getStrokeLabel(String.format("{0} {1}/{2} ",label,currentValue,maxValue),14,"#FFFFFF","#000000",1);
	var textEndPosition = hertIcon.x + 15 + BattleCharacterStatusView.BAR_SIZE;
	lblBar.x = textEndPosition - lblBar.getWidth();
	lblBar.y = barBack.y + barBack.getHeight() - lblBar.getHeight() - 5;
	statusLayer.addChild(lblBar);
	if(isDynamic){
		self.currentValue = currentValue;
		self.maxValue = maxValue;
		self.textEndPosition = textEndPosition;
		self.barEndPosition = barEndPosition;
		self.barIcon = barIcon;
		self.formatLabel = label;
		self.label = lblBar;
		LTweenLite.to(self,BattleCharacterStatusConfig.SHOW_TIME,{currentValue:self.currentValue + parseInt(self.changeValue),onUpdate:self.onUpdate,onComplete:self.onComplete});
	}
};
BattleCharacterStatusView.prototype.onUpdate=function(event){
	event.target.setStatus();
};
BattleCharacterStatusView.prototype.onComplete=function(event){
	var self = event.target;
	self.setStatus();
	LTweenLite.to(self,BattleCharacterStatusConfig.FADE_TIME,{alpha:0,onComplete:self.deleteSelf});
};
BattleCharacterStatusView.prototype.deleteSelf=function(event){
	var self = event.target;
	self.dispatchEvent(BattleCharacterStatusEvent.CHANGE_COMPLETE);
	//var character = self.character;
	self.remove();
	//character.dispatchEvent(BattleCharacterActionEvent.COUNTER_ATTACK);
};
BattleCharacterStatusView.prototype.setStatus=function(){
	var self = this;
	if(self.currentValue > self.maxValue){
		self.currentValue = self.maxValue;
	}
	var value = self.currentValue / self.maxValue;
	value = value < 0.001 ? 0.001 : value;
	var barSize = BattleCharacterStatusView.BAR_SIZE * value;
	self.barIcon.scaleX = 1;
	self.barIcon.scaleX = barSize / self.barIcon.getWidth();
	self.barIcon.x = self.barEndPosition - barSize;
	self.label.text = String.format("{0} {1}/{2} ",self.formatLabel,self.currentValue>>0,self.maxValue);
	self.label.x = self.textEndPosition - self.label.getWidth();
};
BattleCharacterStatusView.prototype.setPosition=function(character){
	var self = this, w = self.getWidth(), h = self.getHeight();
	self.x = character.x - w * 0.5;
	self.y = character.y - h * 0.5;
	var root = self.getRootCoordinate();
	if(root.x < 0){
		self.x -= root.x;
	}else if(root.x + w > LGlobal.width){
		self.x -= (root.x + w - LGlobal.width);
	}
	if(root.y < 0){
		self.y -= root.y;
	}else if(root.y + h > LGlobal.height){
		self.y -= (root.y + h - LGlobal.height);
	}
};

