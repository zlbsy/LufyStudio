function CreateSeigniorDetailedView(controller, data){
	var self = this;
	base(self,LView,[controller]);
	self.data = data;
	self.init();
}
CreateSeigniorDetailedView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.titleInit();
	self.faceInit();
	self.citysInit();
};
CreateSeigniorDetailedView.prototype.layerInit=function(){
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
CreateSeigniorDetailedView.prototype.changeMonarchColor=function(){
	var self = this;
	var view = new SelectSeigniorColorView(self.controller);
	var obj = {title:Language.get("create_character"),subWindow:view,width:440,height:500,noButton:true};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
CreateSeigniorDetailedView.prototype.selectedMonarchColor=function(color){
	var self = this;
	self.removeChildAt(self.numChildren - 1);
	self.data.color = color;
	self.faceLayer.setData(self.faceLayer.data, color);
};
CreateSeigniorDetailedView.prototype.closeCharacterList=function(characters){
	var self = this;
	self.baseLayer.visible = true;
	self.selectSeigniorView.remove();
	self.selectSeigniorView = null;
	if(characters.length == 0){
		return;
	}
	var character = characters[0];
	if(!self.data){
		self.data = {id:character.data.id,color:"255,255,255",citys:[]};
	}else{
		/*{id:1000,color:"0,0,255",citys:[{id:39,prefecture:1,generals:[1,2]}]}*/
		var seigniorId = self.data.id;
		if(self.data.citys.length == 1){
			self.data.citys[0].prefecture = character.data.id;
			if(self.data.citys[0].generals.indexOf(character.data.id) < 0){
				self.data.citys[0].generals.push(character.data.id);
			}
		}else if(self.data.citys.length > 1){
			var indexOld = self.data.citys.findIndex(function(city){
				return city.generals.indexOf(self.data.id) >= 0;
			});
			var indexNew = self.data.citys.findIndex(function(city){
				return city.generals.indexOf(character.data.id) >= 0;
			});
			if(indexNew < 0){
				self.data.citys[indexOld].generals.push(character.data.id);
				self.data.citys[indexOld].prefecture = character.data.id;
			}else if(indexOld == indexNew){
				self.data.citys[indexOld].prefecture = character.data.id;
			}else{
				self.data.citys[indexNew].prefecture = character.data.id;
			}
		}
		self.data.id = character.data.id;
	}
	self.faceLayer.setData(character.data, self.data.color);
};
CreateSeigniorDetailedView.prototype.closeSelf=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	self.parent.baseLayer.visible = true;
	self.remove();
};
CreateSeigniorDetailedView.prototype.titleInit=function(data){
	var self = this, label;
	label = getStrokeLabel(Language.get(data ? "update_seignior" : "create_seignior"),26,"#CDD4AF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);
	
	label = getStrokeLabel(Language.get("city_list") + ":",22,"#FFFFFF","#000000",4);
	label.x = 200;
	label.y = 50;
	self.titleLayer.addChild(label);
	
	label = getStrokeLabel(Language.get("city"),18,"#CDD4AF","#000000",4);
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
CreateSeigniorDetailedView.prototype.faceInit=function(){
	var self = this;
	self.faceLayer = new CreateSeigniorFaceView(null, self.data);
	self.contentLayer.addChild(self.faceLayer);
};
CreateSeigniorDetailedView.prototype.toSelectSeignior=function(){
	var self = this;
	self.selectSeigniorView = new CreateSettingCharacterListView(null, "change_monarch");
	self.addChild(self.selectSeigniorView);
	self.baseLayer.visible = false;
};
CreateSeigniorDetailedView.prototype.citysInit=function(){
	var self = this;
	
	var addCityButton = getButton(Language.get("+"),50);
	addCityButton.x = 300;
	addCityButton.y = 35;
	self.baseLayer.addChild(addCityButton);
	addCityButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickShowCityDetailed);
	
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
CreateSeigniorDetailedView.prototype.clickShowCityDetailed=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	self.showCityDetailed(null);
};
CreateSeigniorDetailedView.prototype.showCityDetailed=function(cityData){
	var self = this;
	self.cityDetailedView = new CreateSeigniorCityDetailedView(self.data, cityData);
	self.addChild(self.cityDetailedView);
	self.baseLayer.visible = false;
};
CreateSeigniorDetailedView.prototype.getData=function(){
	var self = this;
};