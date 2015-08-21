function CharacterDetailedView(controller,param){
	var self = this;
	base(self,LView,[controller]);
	var characterModel;
	if(param.constructor.name == "CharacterModel"){
		characterModel = param;
	}else if(param.constructor.name == "BattleCharacterView"){
		self.character = param;
		characterModel = param.data;
	}
	console.log("CharacterDetailedView",characterModel);
	self.nowTab = CharacterDetailedView.TAB_STATUS;
	self.set(characterModel);
}
CharacterDetailedView.prototype.layerInit=function(){
	var self = this;
	var backLayer = new LSprite();
	backLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#FFFFFF");
	self.addChild(getBitmap(backLayer));
	self.layer = new LSprite();
	self.addChild(self.layer);
	
	self.tabLayer = new LSprite();
	self.tabLayer.x = 15;
	self.tabLayer.y = 375;
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
		return child.id() == self.characterModel.id();
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
CharacterDetailedView.prototype.set=function(characterModel){
	var self = this;
	self.die();
	self.removeAllChild();
	var faceW = 224, faceH = 336;
	self.faceW = faceW;
	self.faceH = faceH;
	self.characterModel = characterModel;
	self.layerInit();
	//alert("CharacterDetailedView.prototype.set");
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),faceW + 10,faceH + 10);
	win.x = (LGlobal.width - faceW - 10) * 0.5;
	win.y = 10;
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
			layer = new LPanel(new LBitmapData(LMvc.datalist["win01"],0,0,51,34),90,50);
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
	var back = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win02"]),450,LGlobal.height - self.tabLayer.y - 45,18,24,22,24));
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
			icon.addEventListener(LMouseEvent.MOUSE_UP,self.removeEquipment);
		}else{
			icon = new LPanel(new LBitmapData(LMvc.datalist["win03"]),iconSize,iconSize);
		}
		icon.x = self.face.x + coordinate.x - self.tabLayer.x;
		icon.y = self.face.y + coordinate.y - self.tabLayer.y;
		self.tabLayer.addChild(icon);
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
	var strategyView = new StrategyView(self.controller, self.characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 80));
	strategyView.x = 10;
	strategyView.y = 50;
	self.tabLayer.addChild(strategyView);
};
CharacterDetailedView.prototype.showArms=function(){
	var self = this;
	var soldiersView = new SoldiersView(self.controller, self.characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 80));
	soldiersView.x = 10;
	soldiersView.y = 50;
	self.tabLayer.addChild(soldiersView);
};

CharacterDetailedView.prototype.showStatus=function(){
	var self = this;
	var statusLayer = new LSprite();
	var txtHeight = 25, startY = -txtHeight + 5, startX = 5;
	var labels = ["belong","identity","city","loyalty","status"];
	
 	var seignior = self.characterModel.seignior();
	var datas = [
	seignior ? seignior.name() : Language.get("nothing"),
	self.characterModel.identity(),
	self.characterModel.city().name(),
	seignior ? self.characterModel.loyalty() : "--",
	self.character ? self.character.status.statusLabel() : self.characterModel.jobLabel()
	];
	for(var i=0;i<labels.length;i++){
		startY += txtHeight;
		var lblCost = getStrokeLabel(String.format("{0} : {1}",Language.get(labels[i]), datas[i]),20,"#FFFFFF","#000000",4);
		lblCost.x = startX;
		lblCost.y = startY;
		statusLayer.addChild(lblCost);
	}
	/*
	startY += txtHeight;
	var lblCost = getStrokeLabel(String.format("{0} : {1}",Language.get("cost"), self.characterModel.cost()),20,"#FFFFFF","#000000",4);
	lblCost.x = startX;
	lblCost.y = startY;
	statusLayer.addChild(lblCost);
	startY += txtHeight;
	var lblHp = getStrokeLabel(String.format("{0} : {1}","HP", self.characterModel.maxHp()),20,"#FFFFFF","#000000",4);
	lblHp.x = startX;
	lblHp.y = startY;
	statusLayer.addChild(lblHp);
	
	startY += txtHeight;
	var lblAttack = getStrokeLabel(String.format("{0} : {1}",Language.get("attack"), self.characterModel.attack()),20,"#FFFFFF","#000000",4);
	lblAttack.x = startX;
	lblAttack.y = startY;
	statusLayer.addChild(lblAttack);
	
	startY += txtHeight;
	var lblMagicAttack = getStrokeLabel(String.format("{0} : {1}",Language.get("magicAttack"), self.characterModel.magicAttack()),20,"#FFFFFF","#000000",4);
	lblMagicAttack.x = startX;
	lblMagicAttack.y = startY;
	statusLayer.addChild(lblMagicAttack);
	
	startY += txtHeight;
	var lblDefense = getStrokeLabel(String.format("{0} : {1}",Language.get("defense"), self.characterModel.defense()),20,"#FFFFFF","#000000",4);
	lblDefense.x = startX;
	lblDefense.y = startY;
	statusLayer.addChild(lblDefense);
	
	startY += txtHeight;
	var lblMagicDefense = getStrokeLabel(String.format("{0} : {1}",Language.get("magicDefense"), self.characterModel.magicDefense()),20,"#FFFFFF","#000000",4);
	lblMagicDefense.x = startX;
	lblMagicDefense.y = startY;
	statusLayer.addChild(lblMagicDefense);
	
	startY += txtHeight;
	var lblBreakout = getStrokeLabel(String.format("{0} : {1}",Language.get("breakout"), self.characterModel.breakout()),20,"#FFFFFF","#000000",4);
	lblBreakout.x = startX;
	lblBreakout.y = startY;
	statusLayer.addChild(lblBreakout);
	
	startY += txtHeight;
	var lblDodge = getStrokeLabel(String.format("{0} : {1}",Language.get("dodge"), self.characterModel.dodge()),20,"#FFFFFF","#000000",4);
	lblDodge.x = startX;
	lblDodge.y = startY;
	statusLayer.addChild(lblDodge);
	
	startY += txtHeight;
	var lblSpeed = getStrokeLabel(String.format("{0} : {1}",Language.get("speed"), self.characterModel.speed()),20,"#FFFFFF","#000000",4);
	lblSpeed.x = startX;
	lblSpeed.y = startY;
	statusLayer.addChild(lblSpeed);
	
	startY += txtHeight;
	var lblForce = getStrokeLabel(String.format("{0} : {1}",Language.get("force"), self.characterModel.growing().force()),20,"#FFFFFF","#000000",4);
	lblForce.x = startX;
	lblForce.y = startY;
	statusLayer.addChild(lblForce);
	
	startY += txtHeight;
	var lblStrategy = getStrokeLabel(String.format("{0} : {1}",Language.get("strategy"), self.characterModel.growing().strategy()),20,"#FFFFFF","#000000",4);
	lblStrategy.x = startX;
	lblStrategy.y = startY;
	statusLayer.addChild(lblStrategy);
	
	startY += txtHeight;
	var lblCommand = getStrokeLabel(String.format("{0} : {1}",Language.get("command"), self.characterModel.growing().command()),20,"#FFFFFF","#000000",4);
	lblCommand.x = startX;
	lblCommand.y = startY;
	statusLayer.addChild(lblCommand);
	
	startY += txtHeight;
	var lblIntelligence = getStrokeLabel(String.format("{0} : {1}",Language.get("intelligence"), self.characterModel.growing().intelligence()),20,"#FFFFFF","#000000",4);
	lblIntelligence.x = startX;
	lblIntelligence.y = startY;
	statusLayer.addChild(lblIntelligence);
	
	startY += txtHeight;
	var lblAgility = getStrokeLabel(String.format("{0} : {1}",Language.get("agility"), self.characterModel.growing().agility()),20,"#FFFFFF","#000000",4);
	lblAgility.x = startX;
	lblAgility.y = startY;
	statusLayer.addChild(lblAgility);
	*/
	startY += txtHeight;
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width - 50, startY]);
	/*
	var center = new LPoint(280, 145);
	var angle = 360 / labels.length;
	var middleR = 110;
	var bigR = 130;
	var smallList = [];
	var middleList = [];
	var bigList = [];
	var maxStatus = 100;
	for(var i=0;i<labels.length;i++){
		var rotate = (180-angle * i) * Math.PI / 180;
		var x = Math.floor(center.x - bigR*Math.cos(rotate+Math.PI*0.5));
		var y = Math.floor(center.y + bigR*Math.sin(rotate+Math.PI*0.5));
		var text = getStrokeLabel(Language.get(labels[i]),18,"#FFFFFF","#000000",2);
		text.x = x - text.getWidth() * 0.5;
		text.y = y - text.getHeight() * 0.5;
		statusLayer.addChild(text);
		
		var x = Math.floor(center.x - middleR*Math.cos(rotate+Math.PI*0.5));
		var y = Math.floor(center.y + middleR*Math.sin(rotate+Math.PI*0.5));
		middleList.push([x, y]);
		statusLayer.graphics.drawLine(2, "#000000", [center.x, center.y, x, y]);
		
		var smallR = middleR * datas[i] / maxStatus;
		var x = Math.floor(center.x - smallR*Math.cos(rotate+Math.PI*0.5));
		var y = Math.floor(center.y + smallR*Math.sin(rotate+Math.PI*0.5));
		smallList.push([x, y]);
	}
	statusLayer.graphics.drawVertices(2, "#ff0000", smallList);
	statusLayer.graphics.drawVertices(1, "#000000", middleList);
	statusLayer.graphics.drawRect(1, "#000000", [middleList[0][0], middleList[0][1], 5, 5]);
	*/
	var statusBitmap = getBitmap(statusLayer);
	var backLayer = new LSprite();
	backLayer.addChild(statusBitmap);
	var sc = new LScrollbar(backLayer, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 70, 10);
	sc.x = 10;
	sc.y = 50;
	self.tabLayer.addChild(sc);
};
CharacterDetailedView.prototype.showProperties=function(){
	var self = this;
	/*	"attack":"攻击",
	"spirit":"策略",
	"defense":"防御",
	"breakout":"爆发",
	"morale":"士气",
	"movePower":"移动力",*/
	var statusLayer = new LSprite();
	var txtHeight = 25, startY = -txtHeight + 5, startRightY = startY,startX = 5;
	var labels = ["force","command","intelligence","agility","luck","体力"];
	var labelsRight = ["troops","MP","attack","spirit","defense","breakout","morale","movePower"];
 	var seignior = self.characterModel.seignior();
	var datas = [
	self.characterModel.force(),
	self.characterModel.command(),
	self.characterModel.intelligence(),
	self.characterModel.agility(),
	self.characterModel.luck()
	];
	for(var i=0;i<labels.length;i++){
		startY += txtHeight;
		var lblLeft = getStrokeLabel(String.format("{0} : {1}",Language.get(labels[i]), datas[i]),20,"#FFFFFF","#000000",4);
		lblLeft.x = startX;
		lblLeft.y = startY;
		statusLayer.addChild(lblLeft);
	}
	startX = 140;
	for(var i=0;i<labelsRight.length;i++){
		startRightY += txtHeight;
		var lblRight = getStrokeLabel(Language.get(labelsRight[i]),20,"#FFFFFF","#000000",4);
		lblRight.x = startX;
		lblRight.y = startRightY;
		statusLayer.addChild(lblRight);
		var bar = new StatusBarView(self.controller);
		/*self.maxValue = obj.maxValue;
	self.currentValue = obj.currentValue;
	//label
	self.name = obj.name;
	self.icon = obj.icon;
	self.frontBar = obj.frontBar;
	self.barSize = obj.barSize;*/
		bar.set({maxValue:100,currentValue:60,name:Language.get(labelsRight[i]),
		icon:"icon_hert",
		frontBar:"red_bar",
		barSize:200});
		bar.x = startX + 50;
		bar.y = startRightY;
		statusLayer.addChild(bar);
	}
	startY += txtHeight;
	startRightY += txtHeight;
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width - 50, startY > startRightY ? startY : startRightY]);
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