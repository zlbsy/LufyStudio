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
	//console.log("showBuildView :"+name+",self.contentLayer="+self.contentLayer);
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
	self.buildLayer.addEventListener(LMouseEvent.MOUSE_UP, self.onBuildClick.bind(self));
	var alpha = self.controller.getValue("selfCity") ? 1 : 0.5;
	var official = new BuildView(self.controller,"main-official","official");
	official.x = (LGlobal.width - official.width)*0.5;
	official.y = (LGlobal.height - official.height) * 0.6;
	official.alpha = self.controller.getValue("cityFree") ? 1 : 0.5;
	self.buildLayer.addChild(official);
	if(self.controller.getValue("isAppoint")){
	
	}
	
	var tavern = new BuildView(self.controller,"main-tavern","tavern");
	tavern.y = LGlobal.height - tavern.height - 160;
	tavern.alpha = alpha;
	self.buildLayer.addChild(tavern);
	
	var market = new BuildView(self.controller,"main-shop","market");
	market.x = LGlobal.width - market.width;
	market.y = 150;
	market.alpha = alpha;
	self.buildLayer.addChild(market);
	
	var citygate = new BuildView(self.controller,"main-citygate","citygate");
	citygate.y = LGlobal.height - citygate.height;
	self.buildLayer.addChild(citygate);
	
	var barrack = new BuildView(self.controller,"main-trainingGround","barrack");
	barrack.x = (LGlobal.width - barrack.width) * 0.7;
	barrack.y = LGlobal.height - barrack.height - 5;
	barrack.alpha = alpha;
	self.buildLayer.addChild(barrack);
	
	var farmland = new BuildView(self.controller,"main-tavern","farmland");
	farmland.x = LGlobal.width - farmland.width;
	farmland.y = 300;
	farmland.alpha = alpha;
	self.buildLayer.addChild(farmland);
	
	var institute = new BuildView(self.controller,"main-tavern","institute");
	institute.x = 50;
	institute.y = 150;
	institute.alpha = alpha;
	self.buildLayer.addChild(institute);
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
	self.statusLayerInit();
};
CityView.prototype.updateView = function(){
	var self = this;
	self.statusLayer.getChildAt(0).updateView();
	
	//console.log("CityView.prototype.updateView run");
};