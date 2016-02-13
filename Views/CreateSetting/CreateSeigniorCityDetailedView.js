function CreateSeigniorCityDetailedView(seigniorData, cityData){
	var self = this;
	base(self,LView,[]);
	self.seigniorData = seigniorData;
	self.cityData = cityData;
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
	self.generalsLayer.y = 200;
	self.baseLayer.addChild(self.generalsLayer);
	
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
	
	label = getStrokeLabel(Language.get("seignior") + ": " + self.seigniorData.name, 22, "#FFFFFF", "#000000", 4);
	label.x = 150;
	label.y = 50;
	self.titleLayer.addChild(label);
	
	label = getStrokeLabel(Language.get("prefecture") + ":",22,"#FFFFFF","#000000",4);
	label.x = 150;
	label.y = 100;
	self.titleLayer.addChild(label);
	
	
	label = getStrokeLabel(Language.get("generals_list") + ":",22,"#FFFFFF","#000000",4);
	label.x = 20;
	label.y = 160;
	self.titleLayer.addChild(label);
	return;
	label = getStrokeLabel(Language.get("name"),18,"#CDD4AF","#000000",4);
	label.x = 200;
	label.y = 90;
	self.titleLayer.addChild(label);
	
	label = getStrokeLabel(Language.get("generals"),18,"#CDD4AF","#000000",4);
	label.x = 340;
	label.y = 90;
	self.titleLayer.addChild(label);
	
	self.titleLayer.cacheAsBitmap(true);
};
CreateSeigniorCityDetailedView.prototype.cityInit=function(){
	var self = this;
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),100,40);
	panel.cacheAsBitmap(true);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var com = new LComboBox(18,"#ffffff","Arial",panel,bitmapOff,bitmapOn);
	com.setListChildView(CreateCharacterComboBoxChild);
	com.listView.cellWidth = 100;
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 3;
	var list = [];
	list.push({label:"测试",value:1});
	for(var i=0,l=list.length;i<l;i++){
		com.setChild({label:list[i].label,value:list[i].value});
	}
	com.x = 20;
	com.y = 50;
	self.baseLayer.addChild(com);
};
CreateSeigniorCityDetailedView.prototype.prefectureInit=function(){
	var self = this;
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),100,40);
	panel.cacheAsBitmap(true);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var com = new LComboBox(18,"#ffffff","Arial",panel,bitmapOff,bitmapOn);
	com.setListChildView(CreateCharacterComboBoxChild);
	com.listView.cellWidth = 100;
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 3;
	/*var list = [];
	list.push({label:"测试",value:1});
	for(var i=0,l=list.length;i<l;i++){
		com.setChild({label:list[i].label,value:list[i].value});
	}*/
	com.x = 210;
	com.y = 90;
	self.baseLayer.addChild(com);
};
CreateSeigniorCityDetailedView.prototype.generalsInit=function(){
	var self = this;
	
	var addCityButton = getButton(Language.get("+"),50);
	addCityButton.x = 150;
	addCityButton.y = 145;
	self.baseLayer.addChild(addCityButton);
	addCityButton.addEventListener(LMouseEvent.MOUSE_UP, self.showSelectCharacter);
	
	self.listView = new LListView();
	self.listView.cellWidth = 440;
	self.listView.cellHeight = 50;
	self.generalsLayer.addChild(self.listView);
	var items = [], child;
	/*var generals = self.data ? self.data.citys : [];
	
	for(var i=0,l=citys.length;i<l;i++){
		var cityData = citys[i];
		child = new SelectSeigniorCityChildView(cityData);
		items.push(child);
	}*/
	for(var i=0,l=20;i<l;i++){
		var data = {id:1,name:"测试",faceImg:4,gender:1,
	statusPoint:10,force:72,intelligence:92,command:99,agility:82,luck:96,
	born:155,life:54,personalLoyalty:6,ambition:15,
	disposition:0,skill:2,compatibility:25,initTroops:100,initStrategy:20,
	proficiencyPoint:100,
	soldiers:[{id:1,proficiency:900},{id:2,proficiency:500},{id:3,proficiency:0},{id:4,proficiency:0},{id:5,proficiency:0},{id:6,proficiency:0},{id:7,proficiency:0},{id:8,proficiency:0},{id:9,proficiency:0},{id:10,proficiency:0},{id:11,proficiency:0},{id:12,proficiency:0},{id:13,proficiency:0},{id:14,proficiency:0},{id:15,proficiency:0},{id:16,proficiency:0},{id:17,proficiency:0},{id:18,proficiency:0},{id:19,proficiency:0}],
	groupSkill:0};
		child = new CreateCityCharacterListChildView(data);
		items.push(child);
	}
	self.listView.resize(440, LGlobal.height - self.generalsLayer.y - 20);
	self.listView.updateList(items);
	
};
CreateSeigniorCityDetailedView.prototype.showSelectCharacter=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorCityDetailedView);
	console.log(self);
};
CreateSeigniorCityDetailedView.prototype.getData=function(){
	var self = this;
};