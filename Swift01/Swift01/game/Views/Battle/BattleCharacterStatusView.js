function BattleCharacterStatusView(controller, character){
	var self = this;
	LExtends(self,LView,[controller]);
	self.character = character;
	self.belong = character.belong;
	self.width = 195;
	self.datas = [];
};
BattleCharacterStatusView.callback = null;
BattleCharacterStatusView.healCharacters = [];
BattleCharacterStatusView.BAR_SIZE = 150;
BattleCharacterStatusView.healCharactersPush = function(healCharacter, troops){
	BattleCharacterStatusView.healCharacters.push({healCharacter : healCharacter, troops : troops});
};
BattleCharacterStatusView.healCharactersBout = function(){
	BattleCharacterStatusView.callback = BattleIntelligentAI.execute;
	BattleCharacterStatusView.healCharactersCheck();
};
BattleCharacterStatusView.healCharactersStrategy = function(){
	BattleCharacterStatusView.callback = LMvc.currentAttackCharacter.AI.plusExp;
	BattleCharacterStatusView.healCharactersCheck();
};
BattleCharacterStatusView.healCharactersCheck = function(){
	if(BattleCharacterStatusView.healCharacters.length == 0){
		var callback = BattleCharacterStatusView.callback;
		if(callback){
			BattleCharacterStatusView.callback = null;
			callback();
		}
		return;
	}
	var obj = BattleCharacterStatusView.healCharacters.shift();
	var controller = obj.healCharacter.controller;
	var statusView = new BattleCharacterStatusView(controller,obj.healCharacter);
	statusView.push(BattleCharacterStatusConfig.TROOPS, obj.troops);
	controller.view.baseLayer.addChild(statusView);
	statusView.startTween();
	statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,BattleCharacterStatusView.healCharactersCheck);
};
BattleCharacterStatusView.prototype.push=function(mode,value){
	var self = this;
	self.datas.push({mode:mode,value:value});
};
BattleCharacterStatusView.prototype.get=function(mode){
	return this.datas.find(function(child){
		return child.mode == mode;
	});
};
BattleCharacterStatusView.prototype.startTween=function(){
	var self = this;
	self.showCharacterStatus(false);
	self.setPosition(self.character);
};
BattleCharacterStatusView.prototype.startShow=function(){
	var self = this;
	self.showCharacterStatus(true);
	self.setPosition(self.character);
};
BattleCharacterStatusView.prototype.showCharacterStatus=function(confirmStatus){
	var self = this;
	self.statusLayer = new LSprite();
	var characterModel = self.character.data, belong = self.belong;
	var layer = new LSprite();
	
	var setH = 35;
	
	var troopsStatus = new LSprite();
	troopsStatus.x = 10;
	troopsStatus.y = setH;
	self.getCharacterStatusChild(BattleCharacterStatusConfig.TROOPS, troopsStatus);
	layer.addChild(troopsStatus);
	setH += 20;
	var mpStatus = new LSprite();
	mpStatus.x = 10;
	mpStatus.y = setH;
	self.getCharacterStatusChild(BattleCharacterStatusConfig.MP, mpStatus);
	layer.addChild(mpStatus);
	/*
	TODO::ver1.1版本升级后再加入体力设定
	setH += 20;
	var spStatus = new LSprite();
	spStatus.x = 10;
	spStatus.y = setH;
	self.getCharacterStatusChild(BattleCharacterStatusConfig.SP, spStatus);
	layer.addChild(spStatus);
	*/
	if(self.get(BattleCharacterStatusConfig.EXP)){
		setH += 20;
		var expStatus = new LSprite();
		expStatus.x = 10;
		expStatus.y = setH;
		self.getCharacterStatusChild(BattleCharacterStatusConfig.EXP, expStatus);
		layer.addChild(expStatus);
	}
	
	var soldier = getStrokeLabel(characterModel.currentSoldiers().name() + " Lv."+characterModel.level(),14,"#FFFFFF","#000000",1);
	soldier.x = self.width - soldier.getWidth() - 20;
	soldier.y = 5;
	layer.addChild(soldier);
	
	var confirmLabel;
	if(confirmStatus){
		setH += 20;
		if(self.character.belong == Belong.SELF){
			var exp = getStrokeLabel("Exp " + characterModel.exp(), 14, "#FFFFFF", "#000000", 1);
			exp.x = 10;
			exp.y = setH;
			layer.addChild(exp);
			confirmLabel = exp;
		}else if(self.character.belong == Belong.ENEMY){
			var belong = getStrokeLabel(Language.get(Belong.ENEMY), 14, "#FFFFFF", "#000000", 1);
			belong.x = 10;
			belong.y = setH;
			layer.addChild(belong);
			confirmLabel = belong;
		}
	}
	
	var background = getTranslucentBitmap(self.width, 15 + 20 * layer.numChildren);
	layer.addChildAt(background, 0);
	var name = getStrokeLabel(characterModel.name(), 14, "#FFFFFF", "#FF8C00", 1);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	var buffY = name.y + name.getHeight();
	var aids = ["AttackAid","DefenseAid","BreakoutAid","MoraleAid","ApiritAid"];
	var charaStatus = self.character.status;
	var index = 0;
	for(var i=0;i<aids.length;i++){
		var aidKey = aids[i];
		var aid = charaStatus.getStatus(StrategyType[aidKey]);
		if(!aid){
			continue;
		}
		var aidBitmap = new LBitmap(new LBitmapData(LMvc.datalist["buff"],12 * i, 0, 12, 12));
		aidBitmap.x = name.x + index * 12;
		if(aid.value < 0){
			aidBitmap.scaleY = -1;
			aidBitmap.y = buffY + 12;
		}else{
			aidBitmap.y = buffY;
		}
		layer.addChild(aidBitmap);
		index++;
	}
	
	if(confirmStatus){
		var terrain = self.character.getTerrain();
		var terrainMaster = TerrainMasterModel.getMaster(terrain.id);
		var exert = getStrokeLabel(terrain.value + "%", 14, "#FFFFFF", "#000000", 1);
		exert.x = self.width - exert.getWidth() - 20;
		exert.y = confirmLabel.y;
		layer.addChild(exert);
		var color = "#FFFFFF";
		if(terrain.value > 100){
			color = "#32CD32";
		}else if(terrain.value < 100){
			color = "#FF0000";
		}
		var terrainLabel = getStrokeLabel(terrainMaster.name(), 14, color, "#000000", 1);
		terrainLabel.x = exert.x - terrainLabel.getWidth() - 10;
		terrainLabel.y = confirmLabel.y;
		layer.addChild(terrainLabel);
	}
	//layer = getBitmap(layer);
	layer.cacheAsBitmap(true);
	self.addChild(layer);
	if(self.statusLayer.numChildren > 0){
		self.statusLayer.x += layer.x;
		self.statusLayer.y += layer.y;
		self.addChild(self.statusLayer);
	}
	if(self.treen){
		return;
	}
	self.treen = LTweenLite.to(self, 
		(LMvc.characterStatusView && self.objectIndex == LMvc.characterStatusView.objectIndex) ? BattleCharacterStatusConfig.CONFIRM_STATUS_TIME : BattleCharacterStatusConfig.SHOW_TIME,
		{onComplete:self.onComplete});
};
BattleCharacterStatusView.prototype.getCharacterStatusChild=function(mode,layer){
	var self = this;
	var icon, frontBar, label, value, maxValue, currentValue,statusLayer;
	var statusObject = self.get(mode);
	switch(mode){
		case BattleCharacterStatusConfig.TROOPS:
			icon = "icon_hert";
			frontBar = "red_bar";
			label = Language.get("troops");
			maxValue = self.character.data.maxTroops();
			currentValue = self.character.data.troops();
			if(statusObject){
				self.character.data.troops(currentValue + statusObject.value, statusObject.value >= 0 ? 0 : calculateWounded(0.5, 0.2));
			}else{
				currentValue += "("+self.character.data.wounded()+")";
			}
			break;
		case BattleCharacterStatusConfig.MP:
			icon = "yellow_ball";
			frontBar = "yellow_bar";
			label = Language.get("spirit");
			maxValue = self.character.data.maxMP();
			currentValue = self.character.data.MP();
			if(statusObject){
				self.character.data.MP(currentValue + statusObject.value);
			}
			break;
		case BattleCharacterStatusConfig.SP:
			icon = "orange_ball";
			frontBar = "orange_bar";
			label = Language.get("physicalFitness");
			maxValue = self.character.data.maxPhysicalFitness();
			currentValue = self.character.data.physicalFitness();
			if(statusObject){
				self.character.data.physicalFitness(currentValue + statusObject.value);
			}
			break;
		case BattleCharacterStatusConfig.EXP:
			icon = "orange_ball";
			frontBar = "orange_bar";
			label = Language.get("exp");
			maxValue = self.character.data.maxExp();
			currentValue = self.character.data.exp();
			if(statusObject){
				self.character.data.exp(currentValue + statusObject.value);
			}
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
	if(statusObject){
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
	if(statusObject){
		self.currentValue = currentValue;
		self.maxValue = maxValue;
		self.textEndPosition = textEndPosition;
		self.barEndPosition = barEndPosition;
		self.barIcon = barIcon;
		self.formatLabel = label;
		self.label = lblBar;
		self.treen = LTweenLite.to(self,BattleCharacterStatusConfig.SHOW_TIME,{currentValue:self.currentValue + parseInt(statusObject.value),onUpdate:self.onUpdate,onComplete:self.onComplete});
	}
};
BattleCharacterStatusView.prototype.onUpdate=function(event){
	event.target.setStatus();
};
BattleCharacterStatusView.prototype.onComplete=function(event){
	var self = event ? event.target : this;
	self.treen = null;
	self.setStatus();
	LTweenLite.to(self,BattleCharacterStatusConfig.FADE_TIME,{alpha:0,onComplete:self.deleteSelf});
};
BattleCharacterStatusView.prototype.toDelete=function(){
	var self = this;
	if(self.treen){
		LTweenLite.remove(self.treen);
		self.treen = null;
	}
	self.deleteSelf();
};
BattleCharacterStatusView.prototype.deleteSelf=function(event){
	var self = event ? event.target : this;
	self.dispatchEvent(BattleCharacterStatusEvent.CHANGE_COMPLETE);
	self.remove();
};
BattleCharacterStatusView.prototype.setStatus=function(){
	var self = this;
	if(!self.barIcon){
		return;
	}
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
	var self = this, w = 200, h = self.getHeight();
	self.x = character.x + (BattleCharacterSize.width - w) * 0.5;
	self.y = character.y + BattleCharacterSize.height;
	var root = self.getRootCoordinate();
	if(root.x < 0){
		self.x -= root.x;
	}else if(root.x + w > LMvc.screenWidth){
		self.x -= (root.x + w - LMvc.screenWidth);
	}
	var map = LMvc.BattleController.model.map;
	var maxHeight = map.height > LMvc.screenHeight ? LMvc.screenHeight : map.height;
	if(root.y < 0){
		self.y -= root.y;
	}else if(root.y + h > maxHeight){
		self.y -= (root.y + h - maxHeight);
	}
};

