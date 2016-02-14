function CreateSeigniorCityDetailedView(seigniorData, cityData, seigniorCitys){
	var self = this;
	base(self,LView,[]);
	self.seigniorData = seigniorData;
	self.cityData = cityData;
	self.seigniorCitys = seigniorCitys;
	self.init();
}
CreateSeigniorCityDetailedView.prototype.init=function(){
	var self = this;
	console.log("CreateSeigniorCityDetailedView init");
	self.layerInit();
	self.titleInit();
	self.cityInit();
	self.prefectureInit();
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
	self.generalsLayer = new LSprite();
	self.generalsLayer.x = 20;
	self.generalsLayer.y = 230;
	self.baseLayer.addChild(self.generalsLayer);
	
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
CreateSeigniorCityDetailedView.prototype.onClickOK=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorCityDetailedView);
	var items = self.listView.getItems();
	if(items.length == 0){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_generals"),width:300,height:220};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	var seigniorItem = items.find(function(child){return child.data.id == self.seigniorData.id;});
	if(seigniorItem && self.seigniorData.id != self.prefectureComboBox.value){
		var obj = {title:Language.get("confirm"),message:Language.get("create_city_prefecture_error"),width:300,height:220};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	var seigniorDetailedView = self.getParentByConstructor(CreateSeigniorDetailedView);
	seigniorDetailedView.closeCityDetailed(true);
};
CreateSeigniorCityDetailedView.prototype.closeSelf=function(event){
	var seigniorDetailedView = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	seigniorDetailedView.closeCityDetailed(false);
};
CreateSeigniorCityDetailedView.prototype.titleInit=function(data){
	var self = this, label;
	label = getStrokeLabel(Language.get("city"),26,"#CDD4AF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);
	
	label = getStrokeLabel(Language.get("seignior") + ": " + self.seigniorData.name, 22, "#FFFFFF", "#000000", 4);
	label.x = 200;
	label.y = 55;
	self.titleLayer.addChild(label);
	
	label = getStrokeLabel(Language.get("prefecture") + ":",22,"#FFFFFF","#000000",4);
	label.x = 200;
	label.y = 90;
	self.titleLayer.addChild(label);
	
	
	label = getStrokeLabel(Language.get("generals_list") + ":",22,"#FFFFFF","#000000",4);
	label.x = 20;
	label.y = 160;
	self.titleLayer.addChild(label);
	
	var list = ["name", 0, "force", 100, "intelligence", 150, "command", 200, "agility", 250, "luck", 300];
	for(var i=0,l=list.length;i<l;i+=2){
		label = getStrokeLabel(Language.get(list[i]),18,"#CDD4AF","#000000",4);
		label.x = list[i + 1] + 30;
		label.y = 200;
		self.titleLayer.addChild(label);
	}
	
	self.titleLayer.cacheAsBitmap(true);
};
CreateSeigniorCityDetailedView.prototype.cityInit=function(){
	var self = this;
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),120,40);
	panel.cacheAsBitmap(true);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var com = new LComboBox(18,"#ffffff","Arial",panel,bitmapOff,bitmapOn);
	com.setListChildView(CreateCityComboBoxChild);
	com.listView.cellWidth = 120;
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 3;
	if(self.cityData){
		var city = AreaModel.getArea(self.cityData.id);
		com.setChild({label:city.name(),value:city.id()});
		com.setValue(self.cityData.id);
	}else{
		var seigniors = LMvc.areaData.seigniors;
		var citys = [];
		for(var i=0,l=seigniors.length;i<l;i++){
			var seignior = seigniors[i];
			if(seignior.chara_id == 0){
				citys = seignior.areas;
				break;
			}
		}
		var seigniorList = GameManager.getCreateSeigniorList(LMvc.chapterId).list;
		//{id:1000,color:"0,0,255",citys:[{id:39,prefecture:1,generals:[1,2]}]}
		for(var i=0,l=citys.length;i<l;i++){
			var cityId = citys[i].area_id;
			if(self.seigniorCitys.find(function(city){return city.id == cityId;})){
				continue;
			}
			var seignior = seigniorList.find(function(child){
				var citys = child.citys;
				return citys.findIndex(function(city){return city.id == cityId;}) >= 0;
			});
			if(seignior){
				continue;
			}
			var city = AreaModel.getArea(cityId);
			com.setChild({label:city.name(),value:city.id()});
		}
	}
	com.x = 20;
	com.y = 50;
	self.baseLayer.addChild(com);
	self.cityComboBox = com;
};
CreateSeigniorCityDetailedView.prototype.prefectureInit=function(){
	var self = this;
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),150,40);
	panel.cacheAsBitmap(true);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var com = new LComboBox(18,"#ffffff","Arial",panel,bitmapOff,bitmapOn);
	com.setListChildView(CreatePrefectureComboBoxChild);
	com.listView.cellWidth = 150;
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 3;
	com.x = 256;
	com.y = 85;
	self.baseLayer.addChild(com);
	self.prefectureComboBox = com;
};
CreateSeigniorCityDetailedView.prototype.generalsInit=function(){
	var self = this;
	var addCityButton = getButton(Language.get("+"),50);
	addCityButton.x = 120;
	addCityButton.y = 140;
	self.baseLayer.addChild(addCityButton);
	addCityButton.addEventListener(LMouseEvent.MOUSE_UP, self.showSelectCharacter);
	self.listView = new LListView();
	self.listView.cellWidth = 440;
	self.listView.cellHeight = 50;
	self.generalsLayer.addChild(self.listView);
	var items = [], child;
	var generals = self.cityData ? self.cityData.generals : [];
	//var characters = GameManager.getNoSetCharacters(LMvc.chapterId);
	var characters = LPlugin.characters().list;
	for(var i=0,l=generals.length;i<l;i++){
		var generalId = generals[i];
		var data = characters.find(function(child){
			return child.id == generalId;
		});
		child = new CreateCityCharacterListChildView(data);
		items.push(child);
		self.prefectureComboBox.setChild({label:data.name,value:data.id});
	}
	self.listView.resize(440, LGlobal.height - self.generalsLayer.y - 70);
	self.listView.updateList(items);
	if(self.cityData){
		self.prefectureComboBox.setValue(self.cityData.prefecture);
	}
};
CreateSeigniorCityDetailedView.prototype.showSelectCharacter=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorCityDetailedView);
	var list = GameManager.getNoSetCharacters(LMvc.chapterId, self.seigniorData.id);
	var characters = [];
	for(var i=0,l=self.seigniorCitys.length;i<l;i++){
		characters = characters.concat(self.seigniorCitys[i].generals);
	}
	console.log("list",list);
	console.log("characters",characters);
	self.characterListView = new CreateSettingCharacterListView(null, Language.get("can_select_generals"), false, list, characters);
	self.addChild(self.characterListView);
	self.baseLayer.visible = false;
};
CreateSeigniorCityDetailedView.prototype.closeCharacterList=function(characters){
	var self = this;
	self.baseLayer.visible = true;
	self.characterListView.remove();
	self.characterListView = null;
	if(characters.length == 0){
		return;
	}
	var itemsLength = self.listView.getItems().length;
	for(var i=0,l=characters.length;i<l;i++){
		var data  = characters[i].data;
		var child = new CreateCityCharacterListChildView(data);
		self.listView.insertChildView(child);
		self.prefectureComboBox.setChild({label:data.name,value:data.id});
	}
};
CreateSeigniorCityDetailedView.prototype.getData=function(){
	var self = this;
};