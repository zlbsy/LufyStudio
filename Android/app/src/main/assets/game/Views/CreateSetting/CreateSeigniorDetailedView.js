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
	
	var buttonOK = getButton("OK",200);
	buttonOK.x = (LGlobal.width - buttonOK.getWidth()) * 0.5;
	buttonOK.y = LGlobal.height - 60;
	self.baseLayer.addChild(buttonOK);
	buttonOK.addEventListener(LMouseEvent.MOUSE_UP, self.onClickOK);
};
CreateSeigniorDetailedView.prototype.onClickOK=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	var items = self.listView.getItems();
	if(items.length == 0){
		var obj = {title:Language.get("confirm"),message:Language.get("create_seignior_city_error"),width:300,height:220};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	var seigniorItem = items.find(function(child){
		return child.cityData.generals.indexOf(self.data.id) >= 0;
	});
	if(!seigniorItem){
		var obj = {title:Language.get("confirm"),message:Language.get("create_seignior_character_error"),width:300,height:220};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	var settingView = self.getParentByConstructor(CreateSettingView);
	settingView.closeSeigniorDetailed(true);
};
CreateSeigniorDetailedView.prototype.closeSelf=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	self.parent.baseLayer.visible = true;
	self.remove();
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
	self.addCitysButton.visible = true;
};
CreateSeigniorDetailedView.prototype.titleInit=function(){
	var self = this, label;
	label = getStrokeLabel(Language.get(self.data ? "update_seignior" : "create_seignior"),26,"#CDD4AF","#000000",4);
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
	var buttonBackground = new LPanel(new LBitmapData(LMvc.datalist["win07"]),50,50);
	var textLabel = getStrokeLabel(Language.get("+"),18,"#999999","#000000",3);
	textLabel.x = (buttonBackground.getWidth() - textLabel.getWidth()) * 0.5;
	textLabel.y = (buttonBackground.getHeight() - textLabel.getHeight()) * 0.5;
	buttonBackground.addChild(textLabel);
	buttonBackground.x = 300;
	buttonBackground.y = 35;
	buttonBackground.cacheAsBitmap(true);
	self.baseLayer.addChild(buttonBackground);
	
	var addCitysButton = getButton(Language.get("+"),50);
	addCitysButton.x = 300;
	addCitysButton.y = 35;
	self.baseLayer.addChild(addCitysButton);
	addCitysButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickShowCityDetailed);
	if(!self.data){
		addCitysButton.visible = false;
	}
	self.addCitysButton = addCitysButton;
	
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
	self.listView.resize(300, LGlobal.height - self.cityLayer.y - 70);
	self.listView.updateList(items);
};
CreateSeigniorDetailedView.prototype.clickShowCityDetailed=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	self.showCityDetailed(null);
};
CreateSeigniorDetailedView.prototype.showCityDetailed=function(cityData){
	var self = this;
	self.cityDetailedView = new CreateSeigniorCityDetailedView(self.faceLayer.data, cityData, self.getCitys());
	self.addChild(self.cityDetailedView);
	self.baseLayer.visible = false;
};
CreateSeigniorDetailedView.prototype.closeCityDetailed=function(isSave){
	var self = this;
	self.baseLayer.visible = true;
	if(isSave){
		var city = {};
		city.id = self.cityDetailedView.cityComboBox.value;
		city.prefecture = self.cityDetailedView.prefectureComboBox.value;
		var items = self.cityDetailedView.listView.getItems();
		city.generals = [];
		for(var i=0,l=items.length;i<l;i++){
			var data  = items[i].data;
			city.generals.push(data.id);
		}
		var cityItems = self.listView.getItems();
		var cityIndex = cityItems.findIndex(function(item){
			return item.cityData.id == city.id;
		});
		if(cityIndex >= 0){
			var cityItem = cityItems[cityIndex];
			cityItem.setData(city);
			cityItem.cacheAsBitmap(false);
			cityItem.updateView();
		}else{
			var cityItem = new SelectSeigniorCityChildView(city);
			self.listView.insertChildView(cityItem);
		}
	}
	self.cityDetailedView.remove();
	self.cityDetailedView = null;
};
CreateSeigniorDetailedView.prototype.getCitys=function(){
	var self = this, citys = [];
	var cityItems = self.listView.getItems();
	for(var i=0,l=cityItems.length;i<l;i++){
		var cityData  = cityItems[i].cityData;
		citys.push(cityData);
	}
	return citys;
};
CreateSeigniorDetailedView.prototype.getData=function(){
	var self = this;
	//{id:1000,color:"0,0,255",citys:[{id:39,generals:[1,2]}]}
	var citys = self.getCitys();
	var generalCount = 0;
	for(var i = 0,l=citys.length;i<l;i++){
		generalCount += citys[i].generals.length;
	}
	return {id:self.data.id,name:self.faceLayer.data.name,faceImg:self.faceLayer.data.faceImg,color:self.data.color,general_count:generalCount,citys:self.getCitys()};
};