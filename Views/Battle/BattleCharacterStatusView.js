function BattleCharacterStatusView(controller, character){
	var self = this;
	LExtends(self,LView,[controller]);
	self.character = character;
	self.belong = character.belong;
	self.datas = [];
};
BattleCharacterStatusView.BAR_SIZE = 150;
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
	self.showCharacterStatus();
	self.setPosition(self.character);
};
BattleCharacterStatusView.prototype.showCharacterStatus=function(){
	var self = this;
	self.statusLayer = new LSprite();
	//self.statusTextLayer = new LSprite();
	
	var characterModel = self.character.data, belong = self.belong;
	/*var face = characterModel.face();
	self.addChild(face);
	*/
	var layer = new LSprite();
	
	var setH = 30;
	
	var hpStatus = new LSprite();
	hpStatus.x = 10;
	hpStatus.y = setH;
	self.getCharacterStatusChild(BattleCharacterStatusConfig.HP, hpStatus);
	layer.addChild(hpStatus);
	setH += 20;
	var mpStatus = new LSprite();
	mpStatus.x = 10;
	mpStatus.y = setH;
	self.getCharacterStatusChild(BattleCharacterStatusConfig.MP, mpStatus);
	layer.addChild(mpStatus);
	/*
	TODO::版本升级后再加入体力设定
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
	var background = getTranslucentBitmap(195,30 + 20 * layer.numChildren);
	layer.addChildAt(background,0);
	var name = getStrokeLabel(characterModel.name(),14,"#FFFFFF","#FF8C00",1);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	
	var soldier = getStrokeLabel(characterModel.currentSoldiers().name() + " Lv."+characterModel.level(),14,"#FFFFFF","#000000",1);
	soldier.x = background.getWidth() - soldier.getWidth() - 20;
	soldier.y = 5;
	layer.addChild(soldier);
	
	//setH += 18;
	/*
	var weaponStatus = new LSprite();
	weaponStatus.x = 10;
	weaponStatus.y = setH;
	self.getCharacterTextStatusChild(BattleCharacterStatusConfig.EXP_WEAPON, weaponStatus);
	layer.addChild(weaponStatus);
	
	var armorStatus = new LSprite();
	armorStatus.x = 130;
	armorStatus.y = setH;
	self.getCharacterTextStatusChild(BattleCharacterStatusConfig.EXP_ARMOR, armorStatus);
	layer.addChild(armorStatus);
	*/
	layer = getBitmap(layer);
	
	//layer.y = 315 - layer.getHeight();
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
	/*if(self.statusTextLayer.numChildren > 0){
		self.statusTextLayer.x += layer.x;
		self.statusTextLayer.y += layer.y;
		self.addChild(self.statusTextLayer);
	}*/
};
/*
BattleCharacterStatusView.prototype.getCharacterTextStatusChild=function(mode,layer){
	var self = this,item,equipment,statusLayer;
	var statusObject = self.get(mode);
	var equipments = self.character.data.equipments();
	switch(mode){
		case BattleCharacterStatusConfig.EXP_WEAPON:
		item = new LBitmap(new LBitmapData(LMvc.datalist["icon-weapon"]));
		equipment = equipments.find(function(child){
			return child.position() == PositionConfig.Hand;
		});
		break;
		case BattleCharacterStatusConfig.EXP_ARMOR:
		item = new LBitmap(new LBitmapData(LMvc.datalist["icon-armor"]));
		equipment = equipments.find(function(child){
			return child.position() == PositionConfig.Body;
		});
		break;
	}
	item.scaleX = item.scaleY = 20/item.getHeight();
	if(statusObject){
		statusLayer = self.statusTextLayer;
		statusLayer.x = layer.x;
		statusLayer.y = layer.y;
	}else{
		statusLayer = layer;
	}
	statusLayer.addChild(item);
	var lblExp = getStrokeLabel(equipment?equipment.exp():"x",14,"#FFFFFF","#000000",1);
	lblExp.x = 30;
	if(statusObject){
		statusLayer.addChild(lblExp);
	}else{
		statusLayer.addChild(lblExp);
		return;
	}
	var changeObject = {};
	if(equipment){
		changeObject.text = equipment.exp() + parseInt(statusObject.value);
		changeObject.onUpdate=function(e){
			e.target.text = (lblExp.text >>> 0);
		};
	}
	if(!self.treen){
		changeObject.onComplete=function(){
			self.onComplete();
		};
	}
	LTweenLite.to(lblExp,BattleCharacterStatusConfig.SHOW_TIME,changeObject);
};*/
BattleCharacterStatusView.prototype.getCharacterStatusChild=function(mode,layer){
	var self = this;
	var icon, frontBar, label, value, maxValue, currentValue,statusLayer;
	var statusObject = self.get(mode);
	switch(mode){
		case BattleCharacterStatusConfig.HP:
			icon = "icon_hert";
			frontBar = "red_bar";
			label = "兵力";
			maxValue = self.character.data.maxTroops();
			currentValue = self.character.data.troops();
			if(statusObject){
				self.character.data.troops(currentValue + statusObject.value, statusObject.value >= 0 ? 0 : calculateWounded(0.5, 0.2));
			}
			break;
		case BattleCharacterStatusConfig.MP:
			icon = "yellow_ball";
			frontBar = "yellow_bar";
			label = "策略";
			maxValue = self.character.data.maxMP();
			currentValue = self.character.data.MP();
			if(statusObject){
				self.character.data.MP(currentValue + statusObject.value);
			}
			break;
		case BattleCharacterStatusConfig.SP:
			icon = "orange_ball";
			frontBar = "orange_bar";
			label = "体力";
			maxValue = self.character.data.maxPhysicalFitness();
			currentValue = self.character.data.physicalFitness();
			if(statusObject){
				self.character.data.physicalFitness(currentValue + statusObject.value);
			}
			break;
		case BattleCharacterStatusConfig.EXP:
			icon = "orange_ball";
			frontBar = "orange_bar";
			label = "经验";
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
	//self.y = character.y - h * 0.5;
	self.y = character.y + BattleCharacterSize.height;
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

