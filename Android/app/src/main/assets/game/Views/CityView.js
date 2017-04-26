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
	self.contentMask.addChild(getTranslucentBitmap());
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
	var self = event.target.getParentByConstructor(CityView), build;
	/*if(event.target.alpha != 1){
		return;
	}*/
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
	var selfCity = self.controller.getValue("selfCity");
	var cityData = self.controller.getValue("cityData");
	if(!self.buildLayerCacher){
		self.buildLayerCacher = {};
	}
	for(var i=0;i<self.buildLayer.numChildren;i++){
		self.buildLayer.getChildAt(i).visible = false;
	}
	var cacheKey = "layer_"+(selfCity ? 0 : 1);
	var layer;
	if(self.buildLayerCacher[cacheKey]){
		layer = self.buildLayerCacher[cacheKey];
		layer.visible = true;
		self.iconAppoint.visible = self.controller.getValue("isAppoint");
		self.appointContent.visible = self.iconAppoint.visible;
		self.appointContent.text = Language.get(cityData.appointType());
		return;
	}
	layer = new LSprite();
	if(selfCity){
		layer.addEventListener(LMouseEvent.MOUSE_UP, self.onBuildClick);
	}
	self.buildLayerCacher[cacheKey] = layer;
	self.buildLayer.addChild(layer);

	var official = new BuildView(self.controller,"main-official","official");
	official.x = (LMvc.screenWidth - official.width)*0.5;
	official.y = (LMvc.screenHeight - official.height) * 0.4;
	layer.addChild(official);
	if(!self.iconAppoint){
		var iconAppoint = new LBitmap(new LBitmapData(LMvc.datalist["icon-appoint"]));
		iconAppoint.name = "official";
		iconAppoint.x = (official.getWidth() - iconAppoint.getWidth()) * 0.5;
		iconAppoint.y = (official.getHeight() - iconAppoint.getHeight()) * 0.5;
		official.addChild(iconAppoint);
		self.iconAppoint = iconAppoint;
		
		var appointContent = getStrokeLabel(Language.get(cityData.appointType()),20,"#FFFFFF","#000000",4);
		appointContent.x = iconAppoint.x + (iconAppoint.getWidth() - appointContent.getWidth())*0.5;
		appointContent.y = iconAppoint.y;
		official.addChild(appointContent);
		self.appointContent = appointContent;
	}
	self.iconAppoint.visible = self.controller.getValue("isAppoint");
	self.appointContent.visible = self.iconAppoint.visible;
	
	var institute = new BuildView(self.controller,"main-institute","institute");
	institute.x = 0;
	institute.y = 160;
	layer.addChild(institute);
	
	var citygate = new BuildView(self.controller,"main-citygate","citygate");
	citygate.y = LMvc.screenHeight - citygate.height - 100;
	layer.addChild(citygate);
	
	var tavern = new BuildView(self.controller,"main-tavern","tavern");
	tavern.y = institute.y + institute.height + (citygate.y - institute.y - institute.height - tavern.height) * 0.5;
	layer.addChild(tavern);
	
	var market = new BuildView(self.controller,"main-shop","market");
	market.x = LMvc.screenWidth - market.width;
	market.y = 160;
	layer.addChild(market);
	
	var barrack = new BuildView(self.controller,"main-trainingGround","barrack");
	barrack.x = LMvc.screenWidth - barrack.width;
	barrack.y = LMvc.screenHeight - barrack.height - 100;
	layer.addChild(barrack);
	
	var farmland = new BuildView(self.controller,"main-farmland","farmland");
	farmland.x = LMvc.screenWidth - farmland.width;
	farmland.y = market.y + market.height + (barrack.y - market.y - market.height - farmland.height) * 0.5;
	layer.addChild(farmland);
};
CityView.prototype.footerLayerInit=function(){
	var self = this;
	var buttonWidth = 100, buttonHeight = 60;
	self.footerLayer.y = LMvc.screenHeight - buttonHeight;
	var selfCity = self.controller.getValue("selfCity");
	
	for(var i=0,l=self.footerLayer.childList.length;i<l;i++){
		self.footerLayer.childList[i].visible = false;
	}
	var buttonMap = self.footerLayer.getChildByName("bigMap");
	if(!buttonMap){
		buttonMap = self.getIconButton(Language.get("big_map"), buttonWidth, buttonHeight, "icon-map");
		buttonMap.name = "bigMap";
		buttonMap.x = (LMvc.screenWidth - buttonWidth * 4 - 30) * 0.5;
		self.footerLayer.addChild(buttonMap);
		buttonMap.addEventListener(LMouseEvent.MOUSE_UP, self.onClickMapButton);
	}
	buttonMap.visible = true;
	var buttonGeneralsName = "generals" + (self.controller.getValue("cityFree") ? "":"_grey");
	var buttonGenerals = self.footerLayer.getChildByName(buttonGeneralsName);
	if(!buttonGenerals){
		buttonGenerals = self.getIconButton(Language.get("generals"), buttonWidth, buttonHeight, "icon-general", !self.controller.getValue("cityFree"));
		if(self.controller.getValue("cityFree")){
			buttonGenerals.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsButton);
		}else{
			buttonGenerals.staticMode = true;
		}
		buttonGenerals.name = buttonGeneralsName;
		buttonGenerals.x = buttonMap.x + buttonWidth + 10;
		self.footerLayer.addChild(buttonGenerals);
	}
	buttonGenerals.visible = true;
	var buttonDiplomacyName = "diplomacy" + (selfCity ? "":"_grey");
	var buttonDiplomacy = self.footerLayer.getChildByName(buttonDiplomacyName);
	if(!buttonDiplomacy){
		buttonDiplomacy = self.getIconButton(Language.get("diplomacy"), buttonWidth, buttonHeight, "icon-diplomacy", true);
		buttonDiplomacy.name = buttonDiplomacyName;
		buttonDiplomacy.x = buttonGenerals.x + buttonWidth + 10;
		self.footerLayer.addChild(buttonDiplomacy);
		if(selfCity){
			buttonDiplomacy.addEventListener(LMouseEvent.MOUSE_UP, self.onClickDiplomacyButton);
		}else{
			buttonDiplomacy.staticMode = true;
		}
	}
	buttonDiplomacy.visible = true;
	var buttonExpeditionName = "expedition" + (selfCity ? "":"_grey");
	var buttonExpedition = self.footerLayer.getChildByName(buttonExpeditionName);
	if(!buttonExpedition){
		var buttonExpedition = self.getIconButton(Language.get("expedition"), buttonWidth, buttonHeight, "icon-expedition", true);
		buttonExpedition.name = buttonExpeditionName;
		buttonExpedition.x = buttonDiplomacy.x + buttonWidth + 10;
		self.footerLayer.addChild(buttonExpedition);
		if(selfCity){
			buttonExpedition.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExpeditionButton);
		}else{
			buttonExpedition.staticMode = true;
		}
	}
	buttonExpedition.visible = true;
};
CityView.prototype.onClickExpeditionButton=function(event){
	var self = event ? event.currentTarget.getParentByConstructor(CityView):this;
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
	var self = event ? event.currentTarget.getParentByConstructor(CityView) : this;
	self.controller.gotoMap();
};
CityView.prototype.getIconButton=function(text,width,height,icon, belong){
	var self = this;
	var bitmapWin;
	var display;
	if(!belong || self.controller.getValue("selfCity")){
		bitmapWin = getPanel("win01", width, height);
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
CityView.prototype.die=function(){
	console.error("CityView.prototype.die");
};
CityView.prototype.init=function(){
	var self = this;
	if(!self.baseLayer){
		self.layerInit();
		self.backLayerInit();
		self.statusLayerInit();
	}
	self.buildLayerInit();
	self.footerLayerInit();
	self.autoTalkCheck();
};
CityView.prototype.updateView = function(){
	var self = this;
	self.statusLayer.getChildAt(0).updateView();
	var cityModel = self.controller.getValue("cityData");
	self.iconAppoint.visible = self.controller.getValue("isAppoint");
	self.appointContent.visible = self.iconAppoint.visible;
	self.appointContent.text = Language.get(cityModel.appointType());
};
CityView.prototype.getNewYearPresent = function(){
	if(!isInNewYearTrem()){
		return false;
	}
	var time = formatDate(new Date(), "YYYYMMDD");
	var present = LMvc.chapterData["NewYearPresent_"+time];
	if(present){
		return false;
	}
	var count = LMvc.chapterData["NewYearPresent_2017_count"];
	if(!count){
		count = 0;
	}
	var items = [94, 93, 94, 95, 96];
	if(count >= items.length){
		return false;
	}
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var item = new ItemModel(null,{item_id:items[count],count:1});
	seignior.addItem(item);
	var msg = String.format(Language.get("auto_talk_NewYearPresent"), item.name());
	Talk(self, seignior.character().id(), 0, msg, function() {
		LMvc.talkOver = true;
	});
	
	LMvc.chapterData["NewYearPresent_"+time] = 1;
	LMvc.chapterData["NewYearPresent_2017_count"] = count + 1;
	return true;
};
CityView.prototype.autoTalkCheck = function(){
	var self = this;
	if(!self.controller.getValue("selfCity") || SeigniorExecute.running || LMvc.TutorialController){
		return;
	}
	if(self.getNewYearPresent()){
		return;
	}
	var cityModel = self.controller.getValue("cityData");
	var generals = cityModel.generals();
	if(generals.length == 0){
		return;
	}
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
	if(Math.random() < 0.2){
		var referralCharas = [];
		for(var i=0;i<notDebut.length;i++){
			var chara = CharacterModel.getChara(notDebut[i]);
			var canReferralChara = generals.find(function(child){
				if(child.id() == child.seigniorId()){
					return false;
				}
				return Math.abs(child.compatibility() - chara.compatibility()) < 2;
			});
			if(canReferralChara){
				referralCharas.push({general:canReferralChara, target:chara});
			}
		}
		//在野武将
		var outOfOffice = cityModel.outOfOffice();
		for(var i=0;i<outOfOffice.length;i++){
			var chara = outOfOffice[i];
			var canReferralChara = generals.find(function(child){
				if(child.id() == child.seigniorId()){
					return false;
				}
				return Math.abs(child.compatibility() - chara.compatibility()) < 2;
			});
			if(canReferralChara){
				referralCharas.push({general:canReferralChara, target:chara});
			}
		}
		if(referralCharas.length > 0){
			var child = referralCharas[referralCharas.length*Math.random() >>> 0];
			self.referralCharacterExecute(child.general, child.target);
			return;
		}
	}
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
CityView.prototype.referralCharacterExecute = function(chara, targetChara){
	var self = this;
	targetChara.seigniorId(chara.seigniorId());
	AreaModel.removeNotDebut(targetChara.id());
	chara.city().addGenerals(targetChara);
	targetChara.loyalty(chara.loyalty());
	targetChara.cityId(chara.cityId());
	targetChara.job(Job.END);
	setCharacterInitFeat(targetChara);
	var script = "SGJTalk.show(" + chara.id() + ",0,"+String.format(Language.get("referralCharacterTalk"),targetChara.name())+");";
	script += "SGJTalk.show(" + targetChara.id() + ",0,"+String.format(Language.get("referralCharacterTargetTalk"),targetChara.name())+");";
	LGlobal.script.addScript(script);
};