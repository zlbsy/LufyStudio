function CityView(){
	base(this,LView,[]);
}
CityView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
CityView.prototype.addCharacterListView=function(characterListView){
	this.contentLayer.addChild(characterListView);
};
CityView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.backLayer = new LSprite();
	self.baseLayer.addChild(self.backLayer);
	self.buildLayer = new LSprite();
	self.baseLayer.addChild(self.buildLayer);
	self.footerLayer = new LSprite();
	self.baseLayer.addChild(self.footerLayer);
	self.statusLayer = new LSprite();
	self.baseLayer.addChild(self.statusLayer);
	
	self.contentMask = new LSprite();
	self.contentMask.addChild(getBitmap(new LPanel(new LBitmapData(LMvc.datalist["translucent"]),LGlobal.width, LGlobal.height)));
	self.contentMask.addEventListener(LMouseEvent.MOUSE_UP, self.clearContentLayer.bind(self));
	self.contentMask.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	self.contentMask.visible = false;
	self.baseLayer.addChild(self.contentMask);
	
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
};
CityView.prototype.clearContentLayer=function(event){
	var self = this;
	self.contentLayer.die();
	self.contentLayer.removeAllChild();
	self.contentMask.visible = false;
	self.controller.dispatchEvent(LController.NOTIFY_ALL);
};
CityView.prototype.backLayerInit=function(){
	var self = this;
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["main-background"]));
	self.backLayer.addChild(bitmap);
};
CityView.prototype.onBuildClick=function(event){
	if(event.target.constructor.name != "BuildView"){
		return;
	}
	var self = this, build;
	if(event.target.alpha != 1){
		return;
	}
	self.showBuildView(event.target.name);
};
CityView.prototype.showBuildView=function(name){
	var self = this, build;
	console.log("showBuildView :"+name);
	switch(name){
		case "official":
			build = new BuildOfficialView(self.controller);
			break;
		case "tavern":
			build = new BuildTavernView(self.controller);
			break;
		case "market":
			build = new BuildMarketView(self.controller);
			break;
		case "barrack":
			build = new BuildBarrackView(self.controller);
			break;
		case "farmland":
			build = new BuildFarmlandView(self.controller);
			break;
		case "institute":
			build = new BuildInstituteView(self.controller);
			break;
		case "citygate":
			build = new BuildCitygateView(self.controller);
			break;
	}
	self.contentLayer.addChild(build);
	return build;
};
CityView.prototype.buildLayerInit=function(){
	var self = this;
	if(self.controller.getValue("selfCity")){
		self.buildLayer.addEventListener(LMouseEvent.MOUSE_UP, self.onBuildClick.bind(self));
	}
	//var alpha = self.controller.getValue("selfCity") ? 1 : 0.5;
	//official.alpha = self.controller.getValue("cityFree") ? 1 : 0.5;
	var official = new BuildView(self.controller,"main-official","official");
	official.x = (LGlobal.width - official.width)*0.5;
	official.y = (LGlobal.height - official.height) * 0.4;
	self.buildLayer.addChild(official);
	var iconAppoint = new LBitmap(new LBitmapData(LMvc.datalist["icon-appoint"]));
	iconAppoint.name = "official";
	iconAppoint.x = official.x + (official.getWidth() - iconAppoint.getWidth()) * 0.5;
	iconAppoint.y = official.y + (official.getHeight() - iconAppoint.getHeight()) * 0.5;
	self.buildLayer.addChild(iconAppoint);
	self.iconAppoint = iconAppoint;
	self.iconAppoint.visible = self.controller.getValue("isAppoint");
	
	var institute = new BuildView(self.controller,"main-institute","institute");
	institute.x = 0;
	institute.y = 160;
	self.buildLayer.addChild(institute);
	
	var citygate = new BuildView(self.controller,"main-citygate","citygate");
	citygate.y = LGlobal.height - citygate.height - 100;
	self.buildLayer.addChild(citygate);
	
	var tavern = new BuildView(self.controller,"main-tavern","tavern");
	tavern.y = institute.y + institute.height + (citygate.y - institute.y - institute.height - tavern.height) * 0.5;
	self.buildLayer.addChild(tavern);
	
	var market = new BuildView(self.controller,"main-shop","market");
	market.x = LGlobal.width - market.width;
	market.y = 160;
	self.buildLayer.addChild(market);
	
	var barrack = new BuildView(self.controller,"main-trainingGround","barrack");
	barrack.x = LGlobal.width - barrack.width;
	barrack.y = LGlobal.height - barrack.height - 100;
	self.buildLayer.addChild(barrack);
	
	var farmland = new BuildView(self.controller,"main-farmland","farmland");
	farmland.x = LGlobal.width - farmland.width;
	farmland.y = market.y + market.height + (barrack.y - market.y - market.height - farmland.height) * 0.5;
	self.buildLayer.addChild(farmland);
};
CityView.prototype.footerLayerInit=function(){
	var self = this;
	var buttonWidth = 100, buttonHeight = 60;
	self.footerLayer.y = LGlobal.height - buttonHeight;
	var buttonMap = self.getIconButton(Language.get("大地图"), buttonWidth, buttonHeight, "icon-map");
	buttonMap.name = "bigMap";
	buttonMap.x = (LGlobal.width - buttonWidth * 4 - 30) * 0.5;
	self.footerLayer.addChild(buttonMap);
	buttonMap.addEventListener(LMouseEvent.MOUSE_UP, self.onClickMapButton);
	var buttonGenerals = self.getIconButton(Language.get("generals"), buttonWidth, buttonHeight, "icon-general");
	buttonGenerals.name = "generals";
	buttonGenerals.x = buttonMap.x + buttonWidth + 10;
	self.footerLayer.addChild(buttonGenerals);
	buttonGenerals.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsButton);
	var buttonDiplomacy = self.getIconButton(Language.get("diplomacy"), buttonWidth, buttonHeight, "icon-diplomacy");
	buttonDiplomacy.name = "diplomacy";
	buttonDiplomacy.x = buttonGenerals.x + buttonWidth + 10;
	self.footerLayer.addChild(buttonDiplomacy);
	var buttonExpedition = self.getIconButton(Language.get("expedition"), buttonWidth, buttonHeight, "icon-expedition");
	buttonExpedition.name = "expedition";
	buttonExpedition.x = buttonDiplomacy.x + buttonWidth + 10;
	self.footerLayer.addChild(buttonExpedition);
};
CityView.prototype.onClickGeneralsButton=function(event){
	var self = event.currentTarget.getParentByConstructor(CityView);
	var build = new BuildGeneralsView(self.controller);
	self.contentLayer.addChild(build);
};
CityView.prototype.onClickMapButton=function(event){
	var self = event.currentTarget.getParentByConstructor(CityView);
	self.controller.gotoMap();
};
CityView.prototype.getIconButton=function(text,width,height,icon){
	var bitmapWin = getPanel("win05", width, height);
	var iconBitmap = new LBitmap(new LBitmapData(LMvc.datalist[icon]));
	iconBitmap.x = (width - iconBitmap.getWidth()) * 0.5;
	iconBitmap.y = height - iconBitmap.getHeight() - 10;
	bitmapWin.addChild(iconBitmap);
	var textLabel = getStrokeLabel(text,18,"#FFFFFF","#000000",3);
	textLabel.x = (width - textLabel.getWidth()) * 0.5;
	textLabel.y = height - textLabel.getHeight() - 10;
	bitmapWin.addChild(textLabel);
	bitmapWin.cacheAsBitmap(true);
	var btn = new LButton(bitmapWin);
	btn.text = text;
	return btn;
};
CityView.prototype.statusLayerInit=function(){
	var self = this;
	var status = new HeaderStatusView(self.controller,true);
	self.statusLayer.addChild(status);
};
CityView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.buildLayerInit();
	self.footerLayerInit();
	self.statusLayerInit();
};
CityView.prototype.updateView = function(){
	var self = this;
	self.statusLayer.getChildAt(0).updateView();
	self.iconAppoint.visible = self.controller.getValue("isAppoint");
};