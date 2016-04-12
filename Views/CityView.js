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
	//console.log("showBuildView :"+name);
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
		case "expedition":
			build = new BuildExpeditionView(self.controller);
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
	var buttonMap = self.getIconButton(Language.get("big_map"), buttonWidth, buttonHeight, "icon-map");
	buttonMap.name = "bigMap";
	buttonMap.x = (LGlobal.width - buttonWidth * 4 - 30) * 0.5;
	self.footerLayer.addChild(buttonMap);
	buttonMap.addEventListener(LMouseEvent.MOUSE_UP, self.onClickMapButton);
	var buttonGenerals = self.getIconButton(Language.get("generals"), buttonWidth, buttonHeight, "icon-general", !self.controller.getValue("cityFree"));
	buttonGenerals.name = "generals";
	buttonGenerals.x = buttonMap.x + buttonWidth + 10;
	self.footerLayer.addChild(buttonGenerals);
	var buttonDiplomacy = self.getIconButton(Language.get("diplomacy"), buttonWidth, buttonHeight, "icon-diplomacy", true);
	buttonDiplomacy.name = "diplomacy";
	buttonDiplomacy.x = buttonGenerals.x + buttonWidth + 10;
	self.footerLayer.addChild(buttonDiplomacy);
	var buttonExpedition = self.getIconButton(Language.get("expedition"), buttonWidth, buttonHeight, "icon-expedition", true);
	buttonExpedition.name = "expedition";
	buttonExpedition.x = buttonDiplomacy.x + buttonWidth + 10;
	self.footerLayer.addChild(buttonExpedition);
	if(self.controller.getValue("cityFree")){
		buttonGenerals.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsButton);
	}else{
		buttonGenerals.staticMode = true;
	}
	if(self.controller.getValue("selfCity")){
		buttonDiplomacy.addEventListener(LMouseEvent.MOUSE_UP, self.onClickDiplomacyButton);
		buttonExpedition.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExpeditionButton);
	}else{
		buttonDiplomacy.staticMode = true;
		buttonExpedition.staticMode = true;
	}
};
CityView.prototype.onClickExpeditionButton=function(event){
	var self = event.currentTarget.getParentByConstructor(CityView);
	var build = new BuildExpeditionView(self.controller);
	self.contentLayer.addChild(build);
};
CityView.prototype.onClickDiplomacyButton=function(event){
	var self = event.currentTarget.getParentByConstructor(CityView);
	var build = new BuildDiplomacyView(self.controller);
	self.contentLayer.addChild(build);
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
CityView.prototype.getIconButton=function(text,width,height,icon, belong){
	var self = this;
	var bitmapWin;
	var display;
	if(!belong || self.controller.getValue("selfCity")){
		bitmapWin = getPanel("win05", width, height);
		display = new LBitmap(new LBitmapData(LMvc.datalist[icon]));
	}else{
		bitmapWin = getPanel("win07", width, height);
		display = GameCacher.getGrayDisplayObject(icon);
	}
	display.x = (width - display.getWidth()) * 0.5;
	display.y = height - display.getHeight() - 10;
	bitmapWin.addChild(display);
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
	self.autoTalkCheck();
};
CityView.prototype.updateView = function(){
	var self = this;
	self.statusLayer.getChildAt(0).updateView();
	self.iconAppoint.visible = self.controller.getValue("isAppoint");
};
CityView.prototype.autoTalkCheck = function(){
	var self = this;
	if(!self.controller.getValue("selfCity")){
		return;
	}
	var cityModel = self.controller.getValue("cityData");
	var generals = cityModel.generals();
	var idleGenerals = cityModel.generals(Job.IDLE);
	if(generals.length > idleGenerals.length){
		return;
	}
	var general = idleGenerals[idleGenerals.length * Math.random() >>> 0];
	
	//未登场武将
	var notDebut = cityModel.notDebut();
	if(notDebut.length > 0 && Math.random() < 0.2){
		Talk(self, general.id(), 0, Language.get("auto_talk_not_debut"), function() {
			LMvc.talkOver = true;
		});
		return;
	}
	//TODO::ver1.1 在野武将推荐
	/*var outOfOffice = cityModel.outOfOffice();
	if(outOfOffice.length > 0){
	
	}*/
	var itemModelList = [cityModel.itemsFarmlandModel(), cityModel.itemsMarketModel()];
	var items = [];
	for(var i=0,l=itemModelList.length;i<l;i++){
		var itemModels = itemModelList[i];
		for(var j=0,jl=itemModels.length;j<jl;j++){
			var item = itemModels[j];
			if(item.rarity() > 4){
				items.push(item);
			}
		}
	}
	if(items.length > 0 && Math.random() < 0.2){
		var item = items[items.length*Math.random() >>> 0];
		var msg = String.format(Language.get("auto_talk_equipment"), item.name());
		Talk(self, general.id(), 0, msg, function() {
			LMvc.talkOver = true;
		});
		return;
	}
	if(notDebut.length == 0 && cityModel.outOfOffice().length == 0 && Math.random() < 0.05){
		Talk(self, general.id(), 0, Language.get("auto_talk_no_generals"), function() {
			LMvc.talkOver = true;
		});
	}
};