function CharacterDetailedView(controller,param){
	var self = this;
	base(self,LView,[controller]);
	self.nowTab = CharacterDetailedView.TAB_STATUS;
	self.set(param);
}
CharacterDetailedView.prototype.layerInit=function(){
	var self = this;
	var backLayer = getTranslucentMask();
	self.addChild(backLayer);
	self.layer = new LSprite();
	self.addChild(self.layer);
	
	self.tabLayer = new LSprite();
	self.tabLayer.x = 15;
	self.tabLayer.y = 340;
	self.addChild(self.tabLayer);
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
CharacterDetailedView.prototype.clickLeftArrow=function(event){
	this.changeCharacter(-1);
};
CharacterDetailedView.prototype.clickRightArrow=function(event){
	this.changeCharacter(1);
};
CharacterDetailedView.prototype.changeCharacter=function(value){
	var self = this;
	var characterList= self.controller.view.dataList;
	var index = characterList.findIndex(function(child){
		var model = child.constructor.name == "CharacterModel"?child:child.data;
		return model.id() == self.characterModel.id();
	});
	index = index + value;
	if(index < 0){
		index = characterList.length - 1;
	}else if(index >= characterList.length){
		index = 0;
	}
	var characterModel = characterList[index];
	self.set(characterModel);
};
CharacterDetailedView.prototype.set=function(param){
	var self = this;
	self.die();
	self.removeAllChild();
	var characterModel;
	if(param.constructor.name == "CharacterModel"){
		characterModel = param;
	}else if(param.constructor.name == "BattleCharacterView"){
		self.character = param;
		characterModel = param.data;
	}
	console.log("CharacterDetailedView",characterModel);
	var faceW = 224, faceH = 336;
	self.faceW = faceW;
	self.faceH = faceH;
	self.characterModel = characterModel;
	self.layerInit();
	//alert("CharacterDetailedView.prototype.set");
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),faceW + 10,faceH + 10);
	win.x = (LGlobal.width - faceW - 10) * 0.5;
	win.y = 0;
	self.layer.addChild(win);
	var face = self.characterModel.face();
	face.x = win.x + 5;
	face.y = win.y + 5;
	self.face = face;
	self.layer.addChild(face);
	
	var name = getStrokeLabel(self.characterModel.name(), 20, "#FFFFFF", "#000000", 4);
	name.x = face.x + 10;
	name.y = face.y + 10;
	self.layer.addChild(name);
	if(self.character){
		var belongLabel = getStrokeLabel(Language.get(self.character.belong), 20, "#FFFFFF", "#000000", 4);
		belongLabel.x = name.x;
		belongLabel.y = name.y + name.getHeight()+ 10;
		self.layer.addChild(belongLabel);
	}
	
	self.TabShow(self.nowTab);
	self.ctrlLayerInit();
};
CharacterDetailedView.TAB_EQUIPMENT = "tab_equipment";
CharacterDetailedView.TAB_SKILL = "tab_skill";
CharacterDetailedView.TAB_ARMS = "tab_arms";
CharacterDetailedView.TAB_LINEUPS = "tab_lineups";
CharacterDetailedView.TAB_STATUS = "tab_status";
CharacterDetailedView.TAB_PROPERTIES = "tab_properties";
CharacterDetailedView.prototype.TabClick=function(event){
	var self = this;
	self.TabShow(event.currentTarget.tabName);
};
CharacterDetailedView.prototype.TabShow=function(tab){
	var self = this, tabIcon, layer;
	self.tabLayer.removeAllChild();
	self.nowTab = tab;
	var tabs = [CharacterDetailedView.TAB_STATUS,CharacterDetailedView.TAB_PROPERTIES,CharacterDetailedView.TAB_SKILL,CharacterDetailedView.TAB_ARMS,CharacterDetailedView.TAB_EQUIPMENT];
	for(var i=0,l=tabs.length;i<l;i++){
		tabIcon = new LSprite();
		if(tabs[i] == tab){
			layer = new LPanel(new LBitmapData(LMvc.datalist["win02"],0,0,51,34),90,50);
			tabIcon.y = -10;
		}else{
			layer = new LPanel(new LBitmapData(LMvc.datalist["win01"],0,0,51,34),90,40);
			tabIcon.tabName = tabs[i];
			tabIcon.addEventListener(LMouseEvent.MOUSE_UP,self.TabClick.bind(self));
		}
		var label = getStrokeLabel(Language.get(tabs[i]),22,"#FFFFFF","#000000",2);
		label.x = (90 - label.getWidth()) * 0.5;
		label.y = 10;
		layer.addChild(label);
		tabIcon.addChild(getBitmap(layer));
		tabIcon.x = 90 * i;
		self.tabLayer.addChild(tabIcon);
	}
	var back = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win02"]),450,LGlobal.height - self.tabLayer.y - 35,18,24,22,24));
	back.y = 35;
	self.tabLayer.addChild(back);
	switch(tab){
		case CharacterDetailedView.TAB_EQUIPMENT:
			self.showEquipment();
			break;
		case CharacterDetailedView.TAB_SKILL:
			self.showStrategy();
			break;
		case CharacterDetailedView.TAB_ARMS:
			self.showArms();
			break;
		case CharacterDetailedView.TAB_PROPERTIES:
			self.showProperties();
			break;
		case CharacterDetailedView.TAB_STATUS:
			self.showStatus();
			break;
	}
};
CharacterDetailedView.prototype.showEquipment=function(){
	var self = this;
	var icon,iconSize = 60;
	var equipmentCoordinates = [];
	equipmentCoordinates[PositionConfig.Head] = {x:(self.faceW - iconSize)*0.5,y:0};
	equipmentCoordinates[PositionConfig.Hand] = {x:0,y:(self.faceH - iconSize) * 0.5};
	equipmentCoordinates[PositionConfig.Body] = {x:(self.faceW - iconSize)*0.5,y:(self.faceH - iconSize) * 0.5};
	equipmentCoordinates[PositionConfig.Foot] = {x:(self.faceW - iconSize)*0.5,y:self.faceH - iconSize};
	equipmentCoordinates[PositionConfig.Accessories] = {x:self.faceW - iconSize,y:(self.faceH - iconSize) * 0.5};
	var equipments = self.characterModel.equipments();
	for(var i=0;i<PositionConfig.positions.length;i++){
		var position = PositionConfig.positions[i];
		var coordinate = equipmentCoordinates[position];
		var equipment = equipments.find(function(child){
			return child.position() == position;
		});
		if(equipment){
			icon = equipment.icon(new LPoint(iconSize,iconSize));
			icon.removeItemId = equipment.id();
			if(!LMvc.BattleController && self.characterModel.seigniorId() == LMvc.selectSeignorId){
				icon.addEventListener(LMouseEvent.MOUSE_UP,self.removeEquipment);
			}
		}else{
			icon = new LPanel(new LBitmapData(LMvc.datalist["win03"]),iconSize,iconSize);
		}
		icon.x = self.face.x + coordinate.x - self.tabLayer.x;
		icon.y = self.face.y + coordinate.y - self.tabLayer.y;
		self.tabLayer.addChild(icon);
	}
	if(LMvc.BattleController){
		return;
	}
	var equipmentsView = new EquipmentsView(self.controller, "equipment", new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 80));
	equipmentsView.x = 10;
	equipmentsView.y = 50;
	self.tabLayer.addChild(equipmentsView);
	equipmentsView.addEventListener(EquipmentEvent.Dress,self.dressEquipment.bind(self));
};
CharacterDetailedView.prototype.dressEquipment=function(event){
	var self = this;
	var selectItemModel = event.selectItemModel;
	self.characterModel.equip(selectItemModel);
	
	var cityData = LMvc.CityController.getValue("cityData");
	cityData.removeItem(selectItemModel);
	self.changeCharacter(0);
};
CharacterDetailedView.prototype.removeEquipment=function(event){
	var icon = event.currentTarget;
	var self = icon.parent.parent;
	self.removeItemId = icon.removeItemId;
	var equipment = self.characterModel.equipments().find(function(child){
		return child.id() == self.removeItemId;
	});
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_remove_equipment_confirm"),equipment.name()),height:200,
		okEvent:self.removeEquipmentRun,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
CharacterDetailedView.prototype.removeEquipmentRun=function(event){
	var self = event.currentTarget.parent.parent;
	self.characterModel.equipOff(self.removeItemId);
	self.changeCharacter(0);
};
CharacterDetailedView.prototype.showStrategy=function(){
	var self = this;
	var strategyView = new StrategyView(self.controller, self.characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 80),self);
	strategyView.x = 10;
	strategyView.y = 50;
	self.tabLayer.addChild(strategyView);
};
CharacterDetailedView.prototype.showArms=function(){
	var self = this;
	var soldiersView = new SoldiersView(self.controller, self.characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 60));
	soldiersView.x = 10;
	soldiersView.y = 45;
	self.tabLayer.addChild(soldiersView);
};

CharacterDetailedView.prototype.showStatus=function(){
	var self = this;
	var statusLayer = new LSprite();
	var txtHeight = 25, startY = 5, startX = 5;
	var labels = ["belong","identity","city","loyalty","status"];
	
 	var seigniorId = self.characterModel.seigniorId();
	var datas = [
	self.characterModel.seigniorName(),
	self.characterModel.identity(),
	self.characterModel.city().name(),
	seigniorId > 0 ? self.characterModel.loyalty() : "--",
	self.character ? self.character.status.statusLabel() : self.characterModel.jobLabel()
	];
	var skill = self.characterModel.skill();
	if(skill){
		labels.push("stunt");
		datas.push(String.format("{0} ({1})",skill.name(),skill.explanation()));
	}
	for(var i=0;i<labels.length;i++){
		var height = txtHeight;
		var lblCost = getStrokeLabel(String.format("{0} : {1}",Language.get(labels[i]), datas[i]),20,"#FFFFFF","#000000",4);
		if(labels[i] == "stunt" || labels[i] == "status"){
			lblCost.width = LGlobal.width - 60;
			lblCost.setWordWrap(true, txtHeight);
			height = lblCost.getHeight();
		}
		lblCost.x = startX;
		lblCost.y = startY;
		statusLayer.addChild(lblCost);
		startY += height;
	}
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width - 50, startY]);
	var statusBitmap = getBitmap(statusLayer);
	var backLayer = new LSprite();
	backLayer.addChild(statusBitmap);
	if(self.characterModel.city().seigniorCharaId() == LMvc.selectSeignorId){
		if(!self.character && self.characterModel.seigniorId() > 0 && self.characterModel.seigniorId() != self.characterModel.city().seigniorCharaId()){
			var btnRecruit = getButton(Language.get("recruit"),200);//招降
			btnRecruit.x = LGlobal.width - 260;
			btnRecruit.y = 5;
			backLayer.addChild(btnRecruit);
			if(self.characterModel.job() == Job.END){
				btnRecruit.alpha = 0.4;
			}else{
				btnRecruit.addEventListener(LMouseEvent.MOUSE_UP,self.clickRecruit);
			}
			var btnRelease = getButton(Language.get("release"),200);//释放
			btnRelease.x = LGlobal.width - 260;
			btnRelease.y = 55;
			backLayer.addChild(btnRelease);
			btnRelease.addEventListener(LMouseEvent.MOUSE_UP,self.clickRelease);
			var btnBehead = getButton(Language.get("behead"),200);//斩首
			btnBehead.x = LGlobal.width - 260;
			btnBehead.y = 105;
			backLayer.addChild(btnBehead);
			btnBehead.addEventListener(LMouseEvent.MOUSE_UP,self.clickBehead);
		}else if(self.characterModel.loyalty() < 100 && !self.characterModel.isPrized()){
			var btnPrized = getButton(Language.get("褒奖"),200);//褒奖
			btnPrized.x = LGlobal.width - 260;
			btnPrized.y = 5;
			backLayer.addChild(btnPrized);
			btnPrized.addEventListener(LMouseEvent.MOUSE_UP,self.clickPrized);
		}
	}
	var sc = new LScrollbar(backLayer, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 70, 10);
	sc.x = 10;
	sc.y = 50;
	self.tabLayer.addChild(sc);
};
CharacterDetailedView.prototype.clickPrized=function(event){
	event.currentTarget.visible = false;
	var self = event.currentTarget.getParentByConstructor(CharacterDetailedView);
	var charaModel = self.characterModel;
	var cityData = self.controller.getValue("cityData");
	if(cityData.money() < JobPrice.PRIZE){
		var obj = {title:Language.get("confirm"),message:String.format(Language.get("金钱不够，褒奖一次需要{0}金钱!"), JobPrice.PRIZE),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return;
	}
	var loyaltyUpValue = toPrizedByMoney(charaModel);
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("武将{0}的忠诚度提升了{1}!"), charaModel.name(),loyaltyUpValue),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
};
CharacterDetailedView.prototype.clickRecruit=function(event){
	var btnRecruit = event.currentTarget;
	var self = btnRecruit.parent.parent.parent.parent.parent;
	var charaModel = self.characterModel;
	charaModel.job(Job.END);
	btnRecruit.alpha = 0.4;
	var script;
	if(calculateHitrateSurrender(LMvc.selectSeignorId, charaModel)){
		var cityData = self.controller.getValue("cityData");
		charaModel.seigniorId(LMvc.selectSeignorId);
		cityData.removeCaptives(charaModel.id());
		cityData.addGenerals(charaModel);
		var characterChildView = self.getCharacterChildView();
		characterChildView.set(charaModel);
		self.changeCharacter(0);
		script = "SGJTalk.show(" + charaModel.id() + ",0,愿效犬马之力!);";
		script += "SGJBattleResult.selfCaptiveWin();";
	}else{
		script = "SGJTalk.show(" + charaModel.id() + ",0,少废话!忠臣不事二主!);";
		script += "SGJBattleResult.selfCaptiveWin(1);";
	}
	LGlobal.script.addScript(script);
};
CharacterDetailedView.prototype.clickRelease=function(event){
	var self = event.currentTarget.parent.parent.parent.parent.parent;
	var charaModel = self.characterModel;
	var cityData = self.controller.getValue("cityData");
	cityData.removeCaptives(charaModel.id());
	var targetSeignior = charaModel.seignior();
	var areas = targetSeignior.areas();
	var city = areas[areas.length * Math.random() >>> 0];
	charaModel.moveTo(city.id());
	charaModel.moveTo();
	var listView = self.controller.view.listView;
	var items = listView.getItems();
	var item = items.find(function(child){
		return charaModel.id() == child.charaModel.id();
	});
	listView.deleteChildView(item);
	/*var characterChildView = self.getCharacterChildView();
	characterChildView.toDelete();*/
	self.closeCharacterDetailed();
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("武将{0}被释放了"), charaModel.name()),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
};
CharacterDetailedView.prototype.clickBehead=function(event){
	var self = event.currentTarget.parent.parent.parent.parent.parent;
	var charaModel = self.characterModel;
	var cityData = self.controller.getValue("cityData");
	cityData.removeCaptives(charaModel.id());
	var characterChildView = self.getCharacterChildView();
	characterChildView.toDelete();
	self.closeCharacterDetailed();
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("武将{0}被斩首了"), charaModel.name()),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
};
CharacterDetailedView.prototype.getCharacterChildView=function(){
	var self = this;
	var scrollbar = self.controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "LScrollbar";
	});
	var characterChildView = scrollbar._showObject.childList.find(function(child){
		return child.charaModel && child.charaModel.id() == self.characterModel.id();
	});
	return characterChildView;
};
CharacterDetailedView.prototype.showProperties=function(){
	var self = this;
	/*	"attack":"攻击","spirit":"策略","defense":"防御","breakout":"爆发","morale":"士气","movePower":"移动力",*/
	var statusLayer = new LSprite();
	var txtHeight = 25, startY = -txtHeight + 10, startRightY = startY,startX = 5;
	var labels = ["势力等级","武将等级","年龄","tab_arms",
	"force","command","intelligence","agility","luck"];
	var labelsRight = ["troops","MP",
	LMvc.BattleController ? "exp" : "feat", "熟练度",
	//"physicalFitness",
	"attack","spirit","defense","breakout","morale","movePower"];
	if(!LMvc.BattleController){
 		self.characterModel.calculation(true);
 	}
	var datas = [
	self.characterModel.seigniorLevel(),
	self.characterModel.level(),
	self.characterModel.age(),
	self.characterModel.currentSoldiers().name(),
	//self.characterModel.currentSoldiers().proficiency(),
	self.characterModel.force(),
	self.characterModel.command(),
	self.characterModel.intelligence(),
	self.characterModel.agility(),
	self.characterModel.luck(),
	self.characterModel.currentSoldiers().movePower()
	];
	var datasRight = [
	[String.format("{0}({1})",self.characterModel.troops() == 0 ? self.characterModel.maxTroops() : self.characterModel.troops(),self.characterModel.wounded()),self.characterModel.maxTroops(),self.characterModel.maxTroops(),"red_bar", "icon_hert"],
	[self.characterModel.MP(),self.characterModel.maxMP(),self.characterModel.maxMP(),"yellow_bar","yellow_ball"],
	LMvc.BattleController ? [self.characterModel.exp(),self.characterModel.maxExp(),self.characterModel.maxExp(),"orange_bar","orange_ball"] : [self.characterModel.feat(),self.characterModel.maxFeat(),self.characterModel.maxFeat(),"orange_bar","orange_ball"],
	//[self.characterModel.physicalFitness(),self.characterModel.maxPhysicalFitness(),100],
	[self.characterModel.currentSoldiers().proficiency(),self.characterModel.currentSoldiers().proficiency(),1000,"red_bar",null],
	[self.characterModel.attack(),self.characterModel.attack(),1000,"red_bar",null],
	[self.characterModel.spirit(),self.characterModel.spirit(),1000,"red_bar",null],
	[self.characterModel.defense(),self.characterModel.defense(),1000,"red_bar",null],
	[self.characterModel.breakout(),self.characterModel.breakout(),1000,"red_bar",null],
	[self.characterModel.morale(),self.characterModel.morale(),1000,"red_bar",null],
	[self.characterModel.currentSoldiers().movePower(),self.characterModel.currentSoldiers().movePower(),10,"red_bar",null],
	];
	for(var i=0;i<labels.length;i++){
		startY += txtHeight;
		var lblLeft = getStrokeLabel(String.format("{0} : {1}",Language.get(labels[i]), datas[i]),20,"#FFFFFF","#000000",4);
		lblLeft.x = startX;
		lblLeft.y = startY;
		statusLayer.addChild(lblLeft);
	}
	startX = 180;
	for(var i=0;i<labelsRight.length;i++){
		startRightY += txtHeight;
		var obj = datasRight[i];
		var bar = new StatusBarView(self.controller);
		bar.set({maxValue:obj[2],currentValue:obj[0],normalValue:obj[1],name:Language.get(labelsRight[i]),
		icon:obj[4],
		frontBar:obj[3],
		barSize:200});
		bar.x = startX;
		bar.y = startRightY;
		statusLayer.addChild(bar);
	}
	startY += txtHeight;
	startRightY += txtHeight;
	var height = startY > startRightY ? startY : startRightY;
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width - 50, height]);
	var statusBitmap = getBitmap(statusLayer);
	var backLayer = new LSprite();
	backLayer.addChild(statusBitmap);
	var sc = new LScrollbar(backLayer, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 70, 10);
	sc.x = 10;
	sc.y = 50;
	self.tabLayer.addChild(sc);
};
CharacterDetailedView.prototype.ctrlLayerInit=function(){
	var self = this;
	
	var leftBitmapData = new LBitmapData(LMvc.datalist["arrow"]);
	var left = new LBitmap(leftBitmapData);
	var leftButton = new LButton(left);
	leftButton.x = 10;
	leftButton.y = 100;
	self.ctrlLayer.addChild(leftButton);
	leftButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickLeftArrow.bind(self));
	var rightBitmapData = new LBitmapData(null,0,0,leftBitmapData.width,leftBitmapData.height,LBitmapData.DATA_CANVAS);
	var matrix = new LMatrix();
	matrix.scale(-1,1);
	matrix.translate(leftBitmapData.width,0);
	rightBitmapData.draw(left, matrix);
	var right = new LBitmap(rightBitmapData);
	var rightButton = new LButton(right);
	rightButton.x = LGlobal.width - leftButton.x - leftBitmapData.width;
	rightButton.y = leftButton.y;
	self.ctrlLayer.addChild(rightButton);
	rightButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickRightArrow.bind(self));
	
	var buttonClose = getButton(Language.get("return"),60);
	buttonClose.x = LGlobal.width - buttonClose.getWidth() - 5;
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.closeCharacterDetailed.bind(self));
};
CharacterDetailedView.prototype.closeCharacterDetailed=function(){
	this.controller.closeCharacterDetailed();
};