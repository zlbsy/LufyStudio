function SeigniorModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "SeigniorModel";
	self.data = data;
	if(!self.data.exp){
		self.data.exp = 0;
	}
	if(self.data.items){
		var items = [];
		for(var i=0,l=self.data.items.length;i<l;i++){
			var item = new ItemModel(null,self.data.items[i]);
			items.push(item);
		}
		self.data.items = items;
	}
	self.data.spyAreas = self.data.spyAreas || [];
	self.data.stopBattleSeigniors = self.data.stopBattleSeigniors || [];
}

SeigniorModel.list = [];
SeigniorModel.setSeignior=function(list){
	var self = this;
	for(var i=0, l= SeigniorModel.list.length;i<l;i++){
		var flag = SeigniorModel.list[i]._flag;
		if(flag){
			flag.die();
		}
	}
	SeigniorModel.list = [];
	for(var i=0,l=list.length;i<l;i++){
		if(!list[i].chara_id){
			continue;
		}
		var areas = list[i].areas;
		if(areas.length == 0){
			list[i].chara_id = 0;
			continue;
		}
		var generalsCount = 0;
		for(var j=0, jl=areas.length;j<jl;j++){
			var generalLength = areas[j].generals.length;
			if(generalLength == 0){
				areas[j].prefecture = 0;
			}
			generalsCount += generalLength;
		}
		if(generalsCount == 0){
			list[i].chara_id = 0;
			continue;
		}
		var seignior = new SeigniorModel(null,list[i]);
		SeigniorModel.list.push(seignior);
	}
};
SeigniorModel.getSeignior=function(chara_id){
	var self = this;
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.chara_id() != chara_id){
			continue;
		}
		return seignior;
	}
	return null;
};
SeigniorModel.getSeigniors=function(seignior_id){
	var self = this;
	var characters = [];
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.chara_id() == seignior_id){
			continue;
		}
		characters.push(CharacterModel.getChara(seignior.chara_id()));
	}
	return characters;
};
SeigniorModel.removeSeignior = function(seigniorId){
	var self = this;
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.chara_id() != seigniorId){
			continue;
		}
		if(seignior.lastCityId){
			var city = AreaModel.getArea(seignior.lastCityId);
			if(city && city.seigniorCharaId() > 0){
				var items = seignior.items();
				for(var j=0;j<items.length;j++){
					var item = items[j];
					if(item.rarity() > 4){
						city.addItem(item);
					}
				}
			}
		}else{
			var areas = seignior.areas().concat();
			for(var j=0,jl = areas.length;j<jl;j++){
				areas[j].prefecture(0);
				areas[j].seigniorCharaId(0);
				LMvc.MapController.view.resetAreaIcon(areas[j].id());
			}
		}
		SeigniorModel.list.splice(i, 1);
		seignior.chara_id(0);
		if(!seignior.lastCityId){
			
		}
		break;
	}
};
SeigniorModel.getCharactersIsCaptives = function(seigniorId){
	var self = this;
	var list = [];
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var area = AreaModel.list[i];
		if(area.seigniorCharaId() == seigniorId){
			continue;
		}
		var captives = area.captives();
		for(var j=0,jl=captives.length;j<jl;j++){
			var captive = captives[j];
			if(captive.seigniorId() == seigniorId){
				list.push(captive);
			}
		}
	}
	return list;
};
SeigniorModel.getSaveData=function(){
	var saveData = [];
	var areaIds = [];
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		saveData.push({
			chara_id:seignior.chara_id(),//君主
			color:seignior.color(),//势力颜色
			areas:seignior.areasData(),//所有城池
			spyAreas:seignior.data.spyAreas,//谍报城池
			items:seignior.itemsData(),//
			stopBattleSeigniors:seignior.data.stopBattleSeigniors//停战城池
		});
		var areas = seignior.areas();
		for(var j=0,jl=areas.length;j<jl;j++){
			areaIds.push(areas[j].id());
		}
	}
	var noSeignior = {chara_id:0,areas:[]};
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var area = AreaModel.list[i];
		if(area.seigniorCharaId() > 0 || areaIds.indexOf(area.id()) >= 0){
			continue;
		}
		noSeignior.areas.push(area.datas());
	}
	saveData.push(noSeignior);
	return saveData;
};
SeigniorModel.prototype.chara_id = function(value){
	if(value){
		CharacterModel.getChara(value).city().prefecture(value);
		if(this._flag){
			this._flag.die();
		}
		this._flag = null;
	}
	return this._dataValue("chara_id", value);
};
SeigniorModel.prototype.character = function(){
	var self = this;
	if(!self.data._chara || self.data._chara.id() != self.data.chara_id){
		self.data._chara = CharacterModel.getChara(self.data.chara_id);
	}
	return self.data._chara;
};
SeigniorModel.prototype.name = function(){
	return this.character().name();
};
SeigniorModel.prototype.isTribe = function(){
	return this.character().isTribeCharacter();
};
SeigniorModel.prototype.exp = function(value){
	return this._dataValue("exp", value, 0);
};
SeigniorModel.prototype.level = function(){
	var self = this;
	if(self.chara_id() == LMvc.selectSeignorId){
		return LMvc.chapterData.level;
	}
	var plusLevel = 0;
	switch(LMvc.chapterData.trouble){
		case TroubleConfig.HARD:
			plusLevel = 4;
			break;
		case TroubleConfig.NORMAL:
			plusLevel = 2;
			break;
		default:
	}
	return LMvc.chapterData.level + plusLevel;
};
SeigniorModel.cloths = [];
SeigniorModel.getColorCloth = function(color){
	if(!SeigniorModel.cloths[color]){
		var colors = color.split(",");
		var bitmapData = new LBitmapData(LMvc.datalist["flag-cloth"],null,null,null,null, LBitmapData.DATA_CANVAS);
		var colorTransform = new LColorTransform(0, 0, 0, 1, parseInt(colors[0]), parseInt(colors[1]), parseInt(colors[2]), 0);
		bitmapData.colorTransform(new LRectangle(0, 0, bitmapData.width, bitmapData.height), colorTransform);
		SeigniorModel.cloths[color] = bitmapData;
	}
	return SeigniorModel.cloths[color];
};
SeigniorModel.getWhiteFlag = function(){
	if(!SeigniorModel._whiteFlag){
		var bitmapData = SeigniorModel.getColorCloth("255,255,255");
		var flagCloth = new LBitmap(bitmapData);
		var flagStick = new LBitmap(new LBitmapData(LMvc.datalist["flag-stick"]));
		var flag = new LSprite();
		flag.addChild(flagCloth);
		flag.addChild(flagStick);
		flag.cacheAsBitmap(true);
		SeigniorModel._whiteFlag = flag;
	}
	return SeigniorModel._whiteFlag._ll_cacheAsBitmap.bitmapData;
};
SeigniorModel.prototype.flag = function(){
	var self = this;
	if(!self._flag){
		var bitmapData = SeigniorModel.getColorCloth(self.color());
		var flagCloth = new LBitmap(bitmapData);
		var flagStick = new LBitmap(new LBitmapData(LMvc.datalist["flag-stick"]));
		self._flag = new LSprite();
		self._flag.addChild(flagCloth);
		self._flag.addChild(flagStick);
		var label = getStrokeLabel(self.character().name().substring(0,1), 16, "#FFFFFF", "#000000", 1);
		label.x = 30;
		label.y = 10;
		label.rotate = 30;
		self._flag.addChild(label);
		self._flag.cacheAsBitmap(true);
	}
	return self._flag._ll_cacheAsBitmap.bitmapData;
};
SeigniorModel.prototype.color = function(){
	return this.data.color;
};
/**
 * 城池
 **/
SeigniorModel.prototype.areas = function(){
	return this.data.areas;
};
SeigniorModel.prototype.areasData = function(){
	var self = this;
	var datas = [];
	for(var i = 0, l = self.data.areas.length;i<l;i++){
		datas.push(self.data.areas[i].datas());
	}
	return datas;
};
SeigniorModel.prototype.areaIds = function(){
	var self = this;
	var areaIds = [];
	for(var i = 0, l = self.data.areas.length;i<l;i++){
		areaIds.push(self.data.areas[i].id());
	}
	return areaIds;
};
SeigniorModel.prototype.addSpyCity = function(cityId){
	var self = this;
	var max = 5;
	var city = self.data.spyAreas.find(function(child){
		return child.id == cityId;
	});
	if(city){
		city.month = max;
	}else{
		self.data.spyAreas.push({id:cityId,month:max});
	}
};
SeigniorModel.prototype.checkSpyCitys = function(){
	var self = this;
	for(var i = self.data.spyAreas.length - 1;i>=0;i--){
		var city = self.data.spyAreas[i];
		city.month -= 1;
		if(city.month == 0){
			self.data.spyAreas.splice(i, 1);
		}
	}
};
SeigniorModel.prototype.isSpyCity = function(id){
	return this.data.spyAreas.findIndex(function(child){
		return child.id == id;
	}) >= 0;
};
SeigniorModel.prototype.stopBattle = function(id, max){
	var self = this;
	if(!max){
		max = 6;
	}
	var seignior = self.data.stopBattleSeigniors.find(function(child){
		return child.id == id;
	});
	if(seignior){
		seignior.month = max;
	}else{
		self.data.stopBattleSeigniors.push({id:id,month:max});
	}
};
SeigniorModel.prototype.checkStopBattleSeigniors = function(){
	var self = this;
	for(var i = self.data.stopBattleSeigniors.length - 1;i>=0;i--){
		var city = self.data.stopBattleSeigniors[i];
		city.month -= 1;
		if(city.month == 0){
			self.data.stopBattleSeigniors.splice(i, 1);
		}
	}
};
SeigniorModel.prototype.isStopBattle = function(id){
	return this.data.stopBattleSeigniors.findIndex(function(child){
		return child.id == id;
	}) >= 0;
};
SeigniorModel.prototype.getStopBattleSeignior = function(id){
	return this.data.stopBattleSeigniors.find(function(child){
		return child.id == id;
	});
};
SeigniorModel.prototype.addCity = function(area){
	var self = this;
	for(var i=0,l=self.data.areas.length;i<l;i++){
		var child = self.data.areas[i];
		if(child.id() == area.id()){
			return;
		}
	}
	self.data.areas.push(area);
	area.seigniorCharaId(self.chara_id());
};
SeigniorModel.prototype.removeCity = function(areaId){
	var self = this;
	if(self.data.areas.length == 0){
		return;
	}
	for(var i=0,l=self.data.areas.length;i<l;i++){
		var child = self.data.areas[i];
		if(child.id() == areaId){
			self.data.areas.splice(i, 1);
			break;
		}
	}
	if(self.data.areas.length == 0){
		self.lastCityId = areaId;
	}
};
SeigniorModel.prototype.getCaptivedList = function(){
	var self = this;
	var captives = [];
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.chara_id() == self.chara_id()){
			continue;
		}
		var citys = seignior.areas();
		for(var j = 0, ll = citys.length; j<ll;j++){
			var city = citys[j];
			var characters = city.captives(self.chara_id());
			captives = captives.concat(characters);
		}
	}
	return captives;
};
/**
 * 武将
 **/
SeigniorModel.prototype.generals = function(){
	var areas = this.data.areas;
	var arr = [];
	areas.forEach(function(city){
		arr = arr.concat(city.generals());
	});
	return arr;
};
SeigniorModel.prototype.generalsCount = function(){
	var areas = this.data.areas;
	var count = 0;
	areas.forEach(function(city){
		count += city.generals().length;
	});
	return count;
};
SeigniorModel.prototype.troops = function(){
	var areas = this.data.areas;
	var count = 0;
	areas.forEach(function(city){
		count += city.troops();
	});
	return count;
};
SeigniorModel.prototype.items = function(){
	if(!this.data.items){
		this.data.items = [];
	}
	return this.data.items;
};
SeigniorModel.prototype.itemsData = function(){
	var self = this;
	var items = self.items();
	var datas = [];
	for(var i=0;i<items.length;i++){
		var item = items[i];
		datas.push({item_id:item.id(),count:item.count()});
	}
	return datas;
};
SeigniorModel.prototype.addItem = function(item){
	var self = this;
	var items = self.items();
	for(var i=0;i<items.length;i++){
		var child = items[i];
		if(child.id() == item.id()){
			child.count(child.count() + 1);
			return;
		}
	}
	items.push(item);
};
SeigniorModel.prototype.removeItem = function(item){
	var self = this;
	var items = self.items();
	for(var i=0;i<items.length;i++){
		var child = items[i];
		if(child.id() == item.id()){
			child.count(child.count() - 1);
			if(child.count() <= 0){
				items.splice(i,1);
			}
			break;
		}
	}
};
SeigniorModel.prototype.equipments = function() {
	var self = this;
	var items = self.items();
	var equipmentList = [];
	for(var i=0;i<items.length;i++){
		var item = items[i];
		if(item.itemType() != ItemType.EQUIPMENT){
			continue;
		}
		equipmentList.push(item);
	}
	return equipmentList;
};