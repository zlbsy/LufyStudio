function AreaModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "AreaModel";
	self.data = self.copyProperty(data);
	if(typeof self.data.money == UNDEFINED){
		self.data.money = 0;
	}
}

AreaModel.list = [];
AreaModel.setArea=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var area = new AreaModel(null,list[i]);
		AreaModel.list.push(area);
	}
};
AreaModel.getArea=function(area_id){
	var self = this;
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var area = AreaModel.list[i];
		if(area.id() != area_id){
			continue;
		}
		return area;
	}
	return null;
};
AreaModel.prototype.copyProperty = function(data){
	var self = this;
	if(self.isBasicType(data)){
		return data;
	}
	var clone;
	if(Array.isArray(data)){
		clone = [];
		for(var i=0;i<data.length;i++){
			clone.push(self.copyProperty(data[i]));
		}
		return clone;
	}
	clone = {};
	for(var key in data){
		clone[key] = self.copyProperty(data[key]);
	}
	return clone;
};
AreaModel.prototype.isBasicType = function(data){
	var type = typeof data;
	return type == "number" || type == "string" || type == "boolean";
};
AreaModel.prototype.name = function(){
	return Language.getCity("city_"+this.data.id);
};
AreaModel.prototype.id = function(){
	return this.data.id;
};
AreaModel.prototype.removeGenerals = function(param){
	var self = this, charaId;
	if(typeof param == "number"){
		charaId = param;
	}else{
		charaId = param.id();
	}
	for(var i=0;i<self.data.generals.length;i++){
		var chara = self.data.generals[i];
		if(chara.id() == charaId){
			self.data.generals.splice(i, 1);
			break;
		}
	}
};
AreaModel.prototype.addGenerals = function(param){
	var self = this, chara;
	if(typeof param == "number"){
		chara = CharacterModel.getChara(param);
	}else{
		chara = param;
	}
	self.data.generals.push(chara);
};
AreaModel.prototype.setSeignor = function(seignior,areaData){
	this.data.seignior_chara_id = seignior.chara_id;
	for(var key in areaData){
		if(typeof areaData[key] == "function"){
			continue;
		}
		if(key == "items"){
			var items = [];
			for(var i=0,l=areaData[key].length;i<l;i++){
				var item = new ItemModel(null,areaData[key][i]);
				items.push(item);
			}
			this.data[key] = items;
			continue;
		}else if(key == "generals"){
			var generals = [];
			for(var i=0,l=areaData[key].length;i<l;i++){
				var charaData = areaData[key][i];
				var chara = CharacterModel.getChara(charaData.chara_id);
				chara.seigniorId(seignior.chara_id);
				chara.loyalty(charaData.loyalty);
				chara.cityId(areaData.area_id);
				if(charaData.equipments){
					chara.equip(charaData.equipments);
				}
				generals.push(chara);
			}
			this.data[key] = generals;
			continue;
		}else if(key == "out_of_offices"){
			var out_of_offices = [];
			for(var i=0,l=areaData[key].length;i<l;i++){
				var charaData = areaData[key][i];
				var chara = CharacterModel.getChara(charaData.chara_id);
				chara.cityId(areaData.area_id);
				if(charaData.equipments){
					chara.equip(charaData.equipments);
				}
				out_of_offices.push(chara);
			}
			this.data[key] = out_of_offices;
			continue;
		}else if(key == "captives"){
			//{chara_id:?,seignior_id:?,loyalty:?}
			var captives = [];
			for(var i=0,l=areaData[key].length;i<l;i++){
				var charaData = areaData[key][i];
				var chara = CharacterModel.getChara(charaData.chara_id);
				chara.seigniorId(charaData.seignior_id);
				chara.loyalty(charaData.loyalty);
				chara.cityId(areaData.area_id);
				captives.push(chara);
			}
			this.data[key] = captives;
			continue;
		}else if(key == "items_farmland"){
			var items_farmland = this.data[key] || [];
			for(var i=0,l=areaData[key].length;i<l;i++){
				items_farmland.push(areaData[key][i]);
			}
			this.data[key] = items_farmland;
			continue;
		}else if(key == "items_market"){
			var items_market = this.data[key] || [];
			for(var i=0,l=areaData[key].length;i<l;i++){
				items_market.push(areaData[key][i]);
			}
			this.data[key] = items_market;
			continue;
		}
		this.data[key] = areaData[key];
	}
};
AreaModel.prototype.seigniorCharaId=function(seigniorCharaId){
	return this._dataValue("seignior_chara_id", seigniorCharaId, 0);
};
AreaModel.prototype.seignior_chara_id=function(){
	return this.seigniorCharaId();
};
AreaModel.prototype.itemsFarmland=function(value){
	return this._dataValue("items_farmland", value, []);
};
AreaModel.prototype.itemsMarket=function(value){
	return this._dataValue("items_market", value, []);
};
AreaModel.prototype.prefecture=function(value){
	return this._dataValue("prefecture", value, 0);
};
AreaModel.prototype.color = function(){
	var self = this;
	if(!self.seigniorCharaId()){
		return "white";
	}
	return SeigniorModel.getSeignior(self.seigniorCharaId()).color();
};
AreaModel.prototype.neighbor = function(){
	return this.data.neighbor;
};
AreaModel.prototype.flag = function(){
	var self = this;
	var color = self.color();
	if(color == "white"){
		return null;
	}
	var bitmapData = new LBitmapData(LMvc.datalist["flag-"+color]);
	return new LBitmap(bitmapData);
};
AreaModel.prototype.icon=function(){
	var self = this;
	var iconLayer = new LSprite();
	var bitmapData = new LBitmapData(LMvc.datalist["area-"+self.level()]);
	//self.iconWidth(bitmapData.width);
	//bitmapData.setProperties(0, 0, self.iconWidth(), bitmapData.height);
	var bitmap = new LBitmap(bitmapData);
	iconLayer.addChild(bitmap);
	
	var flag = self.flag();
	if(flag != null){
		flag.x = bitmap.getWidth() * 0.4;
		flag.y = -flag.getHeight() * 0.4;
		iconLayer.addChild(flag);
	}
	var name = getStrokeLabel(self.name(), 25, "#FFFFFF", "#000000", 3);
	var name = getBitmap(name);
	name.x = (bitmap.getWidth() - name.getWidth()) * 0.5;
	name.y = bitmap.getHeight() - name.getHeight();
	iconLayer.addChild(name);
	return iconLayer;
};
AreaModel.prototype.iconWidth=function(w){
	if(w){
		this._width = w;
	}else{
		return this._width;
	}
};
AreaModel.prototype.size=function(){
	return ["微","小","中","大","巨"][this.data.level - 1];
};
AreaModel.prototype.level=function(value){
	return this._plusData("level",value);
};
AreaModel.prototype.maxLevel=function(){
	return this.data.maxLevel;
};
AreaModel.prototype.plus=function(key, value, min, max){
	if(typeof min == UNDEFINED){
		min = 0;
	}
	if(typeof max == UNDEFINED){
		max = Number.MAX_VALUE;
	}
	this.data[key] += value;
	if(this.data[key] < min){
		this.data[key] = min;
	}else if(this.data[key] > max){
		this.data[key] = max;
	}
};
AreaModel.prototype._plusData=function(name, value, min, max){
	if(typeof value != UNDEFINED){
		this.plus(name,value, min, max);
		return;
	}
	return this.data[name] >>> 0;
};
AreaModel.prototype.moneyLabel=function(value){
	return LString.numberFormat(this.data.money,3);
};
AreaModel.prototype.money=function(value){
	return this._plusData("money",value);
};
AreaModel.prototype.foodLabel=function(){
	return LString.numberFormat(this.data.food,3);
};
AreaModel.prototype.food=function(value){
	return this._plusData("food",value);
};
AreaModel.prototype.technologyLabel=function(){
	return LString.numberFormat(this.data.technology,3);
};
AreaModel.prototype.technology=function(value){
	return this._plusData("technology",value);
};
AreaModel.prototype.populationLabel=function(){
	return LString.numberFormat(this.data.population,3);
};
AreaModel.prototype.population=function(value){
	return this._plusData("population",value);
};
AreaModel.prototype.police=function(value){
	return this._plusData("police",value);
};
AreaModel.prototype.cityDefenseLabel=function(){
	return LString.numberFormat(this.data.city_defense,3);
};
AreaModel.prototype.cityDefense=function(value){
	return this._plusData("city_defense",value);
};
AreaModel.prototype.outOfOfficeSum=function(){
	return this.data.out_of_offices.length;
};
AreaModel.prototype.generalsSum=function(){
	return this.data.generals.length;
};
AreaModel.prototype.captiveSum=function(){
	return this.data.captives.length;
};
AreaModel.prototype.addCaptives = function(param){
	var self = this, chara;
	if(typeof param == "number"){
		chara = CharacterModel.getChara(param);
	}else{
		chara = param;
	}
	self.data.captives.push(chara);
};
AreaModel.prototype.removeCaptives = function(charaId){
	var self = this;
	for(var i=0,l=self.data.captives.length;i<l;i++){
		var characterModel = self.data.captives[i];
		if(characterModel.id() == charaId){
			self.data.captives.splice(i, 1);
			break;
		}
	}
};
AreaModel.prototype.captives=function(seigniorId){
	var self = this;
	if(typeof seigniorId == UNDEFINED){
		return self.data.captives;
	}
	var list = [];
	for(var i=0,l=self.data.captives.length;i<l;i++){
		var characterModel = self.data.captives[i];
		if(characterModel.seigniorId() == seigniorId){
			list.push(characterModel);
		}
	}
	return list;
};
AreaModel.prototype.troopsSum=function(){
	return LString.numberFormat(this.troops(),3);
};
AreaModel.prototype.troops=function(value){
	return this._dataValue("troops", value, 0);
};
AreaModel.prototype.agriculture=function(value){
	return this._plusData("agriculture",value);
};
AreaModel.prototype.business=function(value){
	return this._plusData("business",value);
};
AreaModel.prototype.position=function(){
	return this.data.position;
};
AreaModel.prototype.soldiers=function(){
	var self = this;
	var list = [];
	for(var i=0,l=SoldierMasterModel.master.length;i<l;i++){
		var soldier = SoldierMasterModel.master[i];
		if(soldier.technology() > self.technology()){
			continue;
		}
		list.push(soldier);
	}
	return list;
};
AreaModel.prototype.generals=function(job){
	var self = this;
	if(job){
		var list = [];
		for(var i=0,l=self.data.generals.length;i<l;i++){
			var chara = self.data.generals[i];
			if(chara.job() == job){
				list.push(chara);
			}
		}
		return list;
	}
	return self.data.generals;
};
AreaModel.prototype.outOfOffice=function(){
	return this.data.out_of_offices;
};
AreaModel.prototype.notDebut=function(){
	var notDebut = this.data.not_debut;
	var charas = [];
	if(!notDebut || notDebut.length == 0){
		return charas;
	}
	var month = LMvc.chapterController.getValue("month");
	var year = LMvc.chapterController.getValue("year");
	for(var i = 0, l = notDebut.length;i<l;i++){
		var child = notDebut[i];
		//console.log(child.year +"<="+ year +"&&"+ child.month +"<="+ month);
		if(child.year <= year && child.month <= month){
			charas.push(child.chara_id);
		}
	}
	return charas;
};
AreaModel.prototype.items = function(){
	if(!this.data.items){
		this.data.items = [];
	}
	return this.data.items;
};
AreaModel.prototype.addItem = function(item){
	var self = this;
	var items = self.items();
	items.push(item);
};
AreaModel.prototype.removeItem = function(item){
	var self = this;
	var items = self.items();
	for(var i=0;i<items.length;i++){
		if(items[i].objectIndex == item.objectIndex){
			items.splice(i,1);
			break;
		}
	}
};
AreaModel.prototype.equipments = function() {
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