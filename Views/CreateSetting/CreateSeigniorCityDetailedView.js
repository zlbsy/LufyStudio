function CreateSeigniorCityDetailedView(seigniorData, cityData){
	var self = this;
	base(self,LView,[controller]);
	self.data = data;
	self.init();
}
CreateSeigniorCityDetailedView.prototype.init=function(){
	var self = this;
	console.log("CreateSeigniorCityDetailedView init");
	self.layerInit();
	self.titleInit();
	self.generalsInit();
};
CreateSeigniorCityDetailedView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height));
	self.baseLayer.addChild(panel);
	self.titleLayer = new LSprite();
	self.baseLayer.addChild(self.titleLayer);
	self.contentLayer = new LSprite();
	self.contentLayer.y = 50;
	self.baseLayer.addChild(self.contentLayer);
	self.cityLayer = new LSprite();
	self.cityLayer.x = 195;
	self.cityLayer.y = 120;
	self.baseLayer.addChild(self.cityLayer);
	
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = LGlobal.width - closeButton.getWidth();
	self.baseLayer.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, self.closeSelf);
};
CreateSeigniorCityDetailedView.prototype.titleInit=function(data){
	var self = this, label;
	label = getStrokeLabel(Language.get("city"),26,"#CDD4AF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);
	
	label = getStrokeLabel(Language.get("seignior"),22,"#FFFFFF","#000000",4);
	label.x = 200;
	label.y = 50;
	self.titleLayer.addChild(label);
	
	return;
	label = getStrokeLabel(Language.get("generals_list"),22,"#FFFFFF","#000000",4);
	label.x = 200;
	label.y = 50;
	self.titleLayer.addChild(label);
	
	label = getStrokeLabel(Language.get("name"),18,"#CDD4AF","#000000",4);
	label.x = 200;
	label.y = 90;
	self.titleLayer.addChild(label);
	label = getStrokeLabel(Language.get("prefecture"),18,"#CDD4AF","#000000",4);
	label.x = 250;
	label.y = 90;
	self.titleLayer.addChild(label);
	label = getStrokeLabel(Language.get("generals"),18,"#CDD4AF","#000000",4);
	label.x = 340;
	label.y = 90;
	self.titleLayer.addChild(label);
	
	self.titleLayer.cacheAsBitmap(true);
};
CreateSeigniorCityDetailedView.prototype.toSelectSeignior=function(){
	var self = this;
	self.selectSeigniorView = new CreateSettingCharacterListView(null, "change_monarch");
	self.addChild(self.selectSeigniorView);
	self.baseLayer.visible = false;
};
CreateSeigniorCityDetailedView.prototype.generalsInit=function(){
	var self = this;
	
	var addCityButton = getButton(Language.get("+"),50);
	addCityButton.x = 300;
	addCityButton.y = 35;
	self.baseLayer.addChild(addCityButton);
	addCityButton.addEventListener(LMouseEvent.MOUSE_UP, self.showCityDetailed);
	
	self.listView = new LListView();
	self.listView.cellWidth = 250;
	self.listView.cellHeight = 50;
	self.cityLayer.addChild(self.listView);
	var citys = self.data ? self.data.citys : [];
	var items = [], child;
	for(var i=0,l=citys.length;i<l;i++){
		var cityData = citys[i];
		child = new SelectSeigniorCityChildView(cityData);
		items.push(child);
	}
	child = new SelectSeigniorCityChildView({id:39,prefecture:1000,generals:[1000,1002]});
	items.push(child);
	child = new SelectSeigniorCityChildView({id:40,prefecture:1003,generals:[1003]});
	items.push(child);
	for(var i=0,l=20;i<l;i++){
		var cityData = {id:39,prefecture:1000,generals:[1000,1002]};
		child = new SelectSeigniorCityChildView(cityData);
		items.push(child);
	}
	self.listView.resize(300, LGlobal.height - self.cityLayer.y - 20);
	self.listView.updateList(items);
	
};
CreateSeigniorCityDetailedView.prototype.showCityDetailed=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorCityDetailedView);
	console.log(self);
};
CreateSeigniorCityDetailedView.prototype.getData=function(){
	var self = this;
};