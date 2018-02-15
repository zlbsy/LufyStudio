function SoldierDetailedView(controller,soldierModel,fromView){
	var self = this;
	base(self,LView,[controller]);
	self.soldierModel = soldierModel;
	self.name = "soldierDetailed";
	self.set();
}
SoldierDetailedView.prototype.set=function(){
	var self = this;
	
	var layer = new LSprite();
	
	var width = 48, height = 48;
	var icon = self.soldierModel.icon(new LPoint(width,height));
	layer.addChild(icon);
	var hertIcon = new LBitmap(new LBitmapData(LMvc.datalist["icon_hert"]));
	hertIcon.scaleX = hertIcon.scaleY = 16 / hertIcon.getHeight();
	hertIcon.x = icon.x + width + 15;
	hertIcon.y = icon.y;
	layer.addChild(hertIcon);
	var hpBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]),144,14);
	hpBack.x = icon.x + width + 35;
	hpBack.y = icon.y;
	layer.addChild(hpBack);
	var hpSize = 140 * 1;
	var hpIcon = new LPanel(new LBitmapData(LMvc.datalist["red_bar"]),hpSize,10);
	hpIcon.x = hpBack.x + 140 - hpSize + 2;
	hpIcon.y = icon.y + 2;
	layer.addChild(hpIcon);
	
	var characterModel = self.controller.getValue("selectedCharacter");
	var lblHp = getStrokeLabel(self.soldierModel.maxTroops(characterModel),16,"#FFFFFF","#000000",1);
	lblHp.x = icon.x + width + 30 + 140 - lblHp.getWidth();
	lblHp.y = hpBack.y + hpBack.getHeight() - lblHp.getHeight();
	layer.addChild(lblHp);
	var yellowBallIcon = new LBitmap(new LBitmapData(LMvc.datalist["yellow_ball"]));
	yellowBallIcon.scaleX = yellowBallIcon.scaleY = 16 / yellowBallIcon.getHeight();
	yellowBallIcon.x = icon.x + width + 15 + 1;
	yellowBallIcon.y = icon.y + 19;
	layer.addChild(yellowBallIcon);
	var mpBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]),144,14);
	mpBack.x = icon.x + width + 35;
	mpBack.y = icon.y + 20;
	layer.addChild(mpBack);
	var mpSize = 140 * 1;
	var mpIcon = new LPanel(new LBitmapData(LMvc.datalist["yellow_bar"]),mpSize,10);
	mpIcon.x = mpBack.x + 140 - mpSize + 2;
	mpIcon.y = mpBack.y + 2;
	layer.addChild(mpIcon);
	var lblMp = getStrokeLabel(self.soldierModel.maxMP(characterModel),16,"#FFFFFF","#000000",1);
	lblMp.x = icon.x + width + 30 + 140 - lblMp.getWidth();
	lblMp.y = mpBack.y + mpBack.getHeight() - lblMp.getHeight();
	layer.addChild(lblMp);
	
	var lblProficiency = getStrokeLabel(String.format("{0} : {1} ",Language.get("proficiency"),self.soldierModel.proficiency()),16,"#FFFFFF","#000000",2);
	lblProficiency.x = icon.x + width + 15;
	lblProficiency.y = icon.y + 40;
	layer.addChild(lblProficiency);
	var dataList = [
		["attack",CharacterModel.getSoldierType(self.soldierModel.property().attack,characterModel.force())],
		["spirit",CharacterModel.getSoldierType(self.soldierModel.property().spirit,characterModel.intelligence())],
		["defense",CharacterModel.getSoldierType(self.soldierModel.property().defense,characterModel.command())],
		["breakout",CharacterModel.getSoldierType(self.soldierModel.property().breakout,characterModel.agility())],
		["morale",CharacterModel.getSoldierType(self.soldierModel.property().morale,characterModel.luck())],
		["movePower",self.soldierModel.movePower()]
	];
	for(var i=0;i<dataList.length;i++){
		var label = getStrokeLabel(String.format("{0} : {1} ",Language.get(dataList[i][0]),dataList[i][1]),16,"#FFFFFF","#000000",2);
		label.y = icon.y + height + 20 + i * 26;
		layer.addChild(label);
	}
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 340;
	bitmapLine.y = icon.y + height + 20 + dataList.length * 26;
	layer.addChild(bitmapLine);
	
	var lblExplanation = getStrokeLabel(self.soldierModel.explanation(),14,"#FFFFFF","#000000",2);
	lblExplanation.width = 340;
	lblExplanation.setWordWrap(true, 25);
	lblExplanation.y = bitmapLine.y + 10;
	layer.addChild(lblExplanation);

	var rangeAttackLayer = self.getRangeAttack();
	rangeAttackLayer.x = 90;
	rangeAttackLayer.y = 70;
	layer.addChild(rangeAttackLayer);
	
	var rangeAttackLayer = self.getRangeAttackTarget();
	rangeAttackLayer.x = 220;
	rangeAttackLayer.y = 70;
	layer.addChild(rangeAttackLayer);
	
	var buttonRestraint = getButton(Language.get("restraint_attack"),120);
	buttonRestraint.x = icon.x;
	buttonRestraint.y = lblExplanation.y + lblExplanation.getHeight() + 10;
	layer.addChild(buttonRestraint);
	buttonRestraint.addEventListener(LMouseEvent.MOUSE_UP, self.onClickRestraintButton);
	var buttonRestraintPassive = getButton(Language.get("restraint_attack_passive"),120);
	buttonRestraintPassive.x = icon.x + 130;
	buttonRestraintPassive.y = lblExplanation.y + lblExplanation.getHeight() + 10;
	layer.addChild(buttonRestraintPassive);
	buttonRestraintPassive.addEventListener(LMouseEvent.MOUSE_UP, self.onClickRestraintPassiveButton);
	var buttonTerrain = getButton(Language.get("terrain"),80);
	buttonTerrain.x = icon.x + 260;
	buttonTerrain.y = lblExplanation.y + lblExplanation.getHeight() + 10;
	layer.addChild(buttonTerrain);
	buttonTerrain.addEventListener(LMouseEvent.MOUSE_UP, self.onClickTerrainButton);
	self.addChild(layer);
};
SoldierDetailedView.prototype.onClickTerrainButton=function(event){
	var self = event.currentTarget.getParentByConstructor(SoldierDetailedView);
	var startX = 10, startY = 50, w = 140, h = 29, index = 0, color;
	var layer = new LSprite();
	var msg = String.format(Language.get("soldier_terrain_message"), self.soldierModel.name());
	var label = getStrokeLabel(msg,18,"#FFFFFF","#000000",4);
	label.x = startX;
	layer.addChild(label);
	for(var i=0,l=TerrainMasterModel.master.length;i<l;i++){
		var terrainModel = TerrainMasterModel.master[i];
		var terrain = self.soldierModel.terrain(terrainModel.id());
		var terrainLabel = terrain.value + "%";
		color = "#FFFFFF";
		if(terrain.value == 0){
			continue;
		}else if(terrain.value > 100){
			color = "#87CEEB";
		}else if(terrain.value < 100){
			color = "#FF0000";
		}
		msg = String.format("{0} : {1}", terrainModel.name(), terrainLabel);
		label = getStrokeLabel(msg,18,color,"#000000",2);
		label.x = startX + w*(index%3);
		label.y = startY + h*(index/3 >>> 0);
		layer.addChild(label);
		index++;
	}
	var obj = {title:Language.get("terrain"), noButton:true,subWindow:layer,
	width:LMvc.screenWidth-20,height:LMvc.screenHeight-20};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
SoldierDetailedView.prototype.onClickRestraintButton=function(event){
	var self = event.currentTarget.getParentByConstructor(SoldierDetailedView);
	var startX = 10, startY = 50, w = 140, h = 25, color;
	var layer = new LSprite();
	var msg = String.format(Language.get("restraint_attack_message"), self.soldierModel.name());
	var label = getStrokeLabel(msg,18,"#FFFFFF","#000000",4);
	label.x = startX;
	layer.addChild(label);
	for(var i=0,l=SoldierMasterModel.master.length;i<l;i++){
		var soldier = SoldierMasterModel.master[i];
		var restrain = self.soldierModel.restrain(soldier.id());
		var restrainLabel = "-";
		color = "#FFFFFF";
		if(restrain.value > 100){
			color = "#87CEEB";
			restrainLabel = restrain.value + "%";
		}else if(restrain.value < 100){
			color = "#FF0000";
			restrainLabel = restrain.value + "%";
		}
		/*if(restrain.value != 100){
			restrainLabel = restrain.value + "%";
		}*/
		msg = String.format("{0} : {1}", soldier.name(), restrainLabel);
		label = getStrokeLabel(msg,18,color,"#000000",2);
		label.x = startX + w*(i%3);
		label.y = startY + h*(i/3 >>> 0);
		layer.addChild(label);
	}
	var obj = {title:Language.get("confirm"), noButton:true,subWindow:layer,
	width:LMvc.screenWidth-20,height:LMvc.screenHeight-20};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
SoldierDetailedView.prototype.onClickRestraintPassiveButton=function(event){
	var self = event.currentTarget.getParentByConstructor(SoldierDetailedView);
	var startX = 10, startY = 50, w = 140, h = 25, color;
	var layer = new LSprite();
	var msg = String.format(Language.get("restraint_attack_passive_message"), self.soldierModel.name());
	var label = getStrokeLabel(msg,18,"#FFFFFF","#000000",4);
	label.x = startX;
	layer.addChild(label);
	for(var i=0,l=SoldierMasterModel.master.length;i<l;i++){
		var soldier = SoldierMasterModel.master[i];
		var restrain = soldier.restrain(self.soldierModel.id());
		var restrainLabel = "-";
		color = "#FFFFFF";
		if(restrain.value < 100){
			color = "#87CEEB";
			restrainLabel = restrain.value + "%";
		}else if(restrain.value > 100){
			color = "#FF0000";
			restrainLabel = restrain.value + "%";
		}
		/*if(restrain.value != 100){
			restrainLabel = restrain.value + "%";
		}*/
		msg = String.format("{0} : {1}", soldier.name(), restrainLabel);
		label = getStrokeLabel(msg,18,color,"#000000",2);
		label.x = startX + w*(i%3);
		label.y = startY + h*(i/3 >>> 0);
		layer.addChild(label);
	}
	var obj = {title:Language.get("confirm"), noButton:true,subWindow:layer,
	width:LMvc.screenWidth-20,height:LMvc.screenHeight-20};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
SoldierDetailedView.prototype.getRangeAttack=function(){
	var self = this;
	var layer = new LSprite();
	var label = getStrokeLabel(Language.get("attack_range"),16,"#FFFFFF","#000000",2);
	layer.addChild(label);
	var labelHeight = 20,maxLength = 5,step = 11;
	var rangeAttack = self.soldierModel.rangeAttack();
	for(var i=0;i<rangeAttack.length;i++){
		var range = rangeAttack[i];
		maxLength = Math.max(maxLength, Math.abs(range.x), Math.abs(range.y));
	}
	layer.graphics.drawRect(2, "#000000", [0, labelHeight, (maxLength*2 + 1) * step, (maxLength*2 + 1) * step]);
	for(var i=0,l=maxLength*2 + 1;i<l;i++){
		layer.graphics.drawLine(1, "#000000", [0, step*i + labelHeight, step*l, step*i + labelHeight]);
		layer.graphics.drawLine(1, "#000000", [step*i, labelHeight, step*i, step*l + labelHeight]);
	}
	for(var i=0;i<rangeAttack.length;i++){
		var range = rangeAttack[i];
		layer.graphics.drawRect(0, "#000000", [(maxLength + range.x)*step, labelHeight + (maxLength + range.y)*step, step, step],true,"#FF0000");
	}
	layer.cacheAsBitmap(true);
	return layer;
};
SoldierDetailedView.prototype.getRangeAttackTarget=function(){
	var self = this;
	var layer = new LSprite();
	var label = getStrokeLabel(Language.get("attack_effect"),16,"#FFFFFF","#000000",2);
	layer.addChild(label);
	var labelHeight = 20,maxLength = 5,step = 11;
	var rangeAttack = self.soldierModel.rangeAttackTarget();
	for(var i=0;i<rangeAttack.length;i++){
		var range = rangeAttack[i];
		maxLength = Math.max(maxLength, Math.abs(range.x), Math.abs(range.y));
	}
	layer.graphics.drawRect(2, "#000000", [0, labelHeight, (maxLength*2 + 1) * step, (maxLength*2 + 1) * step]);
	for(var i=0,l=maxLength*2 + 1;i<l;i++){
		layer.graphics.drawLine(1, "#000000", [0, step*i + labelHeight, step*l, step*i + labelHeight]);
		layer.graphics.drawLine(1, "#000000", [step*i, labelHeight, step*i, step*l + labelHeight]);
	}
	for(var i=0;i<rangeAttack.length;i++){
		var range = rangeAttack[i];
		layer.graphics.drawRect(0, "#000000", [(maxLength + range.x)*step, labelHeight + (maxLength + range.y)*step, step, step],true,"#FF0000");
	}
	layer.cacheAsBitmap(true);
	return layer;
};
