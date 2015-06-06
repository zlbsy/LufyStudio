function AreaModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "AreaModel";
	self.data = self.copyProperty(data);
	if(typeof self.data.color == UNDEFINED){
		self.data.color = "white";
	}
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
	this.data.color = seignior.color;
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
		}else if(key == "troops"){
			var troops = areaData[key];
			for(var i=0,l=this.data[key].length;i<l;i++){
				var troop = this.data[key][i];
				for(var j=0;j<troops.length;j++){
					if(troop.id == troops[j].id){
						troop.quantity = troops[j].quantity;
						troop.learned = troops[j].learned;
						break;
					}
				}
			}
			continue;
		}else if(key == "generals"){
			var generals = [];
			for(var i=0,l=areaData[key].length;i<l;i++){
				var charaData = areaData[key][i];
				var chara = CharacterModel.getChara(charaData.chara_id);
				chara.seignior(seignior.chara_id);
				var identity = "general";
				if(charaData.chara_id == seignior.chara_id){
					identity = "monarch";
				}else if(charaData.chara_id == areaData.prefecture){
					identity = "prefecture";
				}
				chara.identity(identity);
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
				chara.identity("out_of_office");
				if(charaData.equipments){
					chara.equip(charaData.equipments);
				}
				out_of_offices.push(chara);
			}
			this.data[key] = out_of_offices;
			continue;
		}else if(key == "not_debut"){
			var not_debut = [];
			for(var i=0,l=areaData[key].length;i<l;i++){
				var charaData = areaData[key][i];
				var chara = CharacterModel.getChara(charaData.chara_id);
				if(charaData.equipments){
					chara.equip(charaData.equipments);
				}
				//TODO::加入登场信息
				not_debut.push(chara);
			}
			this.data[key] = not_debut;
			continue;
		}
		this.data[key] = areaData[key];
	}
};
AreaModel.prototype.seignior_chara_id=function(){
	return this.data.seignior_chara_id;
};
AreaModel.prototype.prefecture=function(){
	return this.data.prefecture;
};
AreaModel.prototype.color = function(){
	return this.data.color;
};
AreaModel.prototype.neighbor = function(){
	return this.data.neighbor;
};
AreaModel.prototype.flag = function(){
	var self = this;
	if(self.data.color == "white"){
		return null;
	}
	var bitmapData = new LBitmapData(LMvc.datalist["flag-"+self.color()]);
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
	return ["小","中","大","巨"][this.data.level - 1];
};
AreaModel.prototype.level=function(){
	return this.data.level;
};
AreaModel.prototype.money=function(value){
	if(typeof value != UNDEFINED){
		this.data.money = value;
		return;
	}
	return LString.numberFormat(this.data.money,3);
};
AreaModel.prototype.moneyAsNumber=function(value){
	if(typeof value != UNDEFINED){
		this.data.money = value;
		return;
	}
	return this.data.money;
};
AreaModel.prototype.food=function(){
	return LString.numberFormat(this.data.food,3);
};
AreaModel.prototype.technology=function(){
	return LString.numberFormat(this.data.technology,3);
};
AreaModel.prototype.population=function(){
	return LString.numberFormat(this.data.population,3);
};
AreaModel.prototype.police=function(){
	return LString.numberFormat(this.data.police,3);
};
AreaModel.prototype.city_defense=function(){
	return LString.numberFormat(this.data.city_defense,3);
};
AreaModel.prototype.outOfOfficeSum=function(){
	return this.data.out_of_offices.length;
};
AreaModel.prototype.generalsSum=function(){
	return this.data.generals.length;
};
AreaModel.prototype.troopsSum=function(){
	var troopsSum = 0;
	for(var i=0;i<this.data.troops.length;i++){
		troopsSum += this.data.troops[i].quantity;
	}
	return LString.numberFormat(troopsSum,3);
};
AreaModel.prototype.troops=function(){
	var self = this;
	var troops = [];
	for(var i=0;i<self.data.troops.length;i++){
		var troop = self.data.troops[i];
		if(troop.learned){
			troops.push(troop);
		}
	}
	return troops;
	/*
	if(!self._troops){
		self._troops = [];
		for(var i=0;i<self.data.troops.length;i++){
			var troop = self.data.troops[i];
			var soldier = new SoldierModel(null,troop);
			self._troops.push(soldier);
		}
	}
	var troops = [];
	console.log("self._troops = " + self._troops.length);
	for(var i=0;i<self._troops.length;i++){
		var soldier = self._troops[i];
	console.log("soldier = " + soldier.learned());
		if(soldier.learned()){
			troops.push(soldier);
		}
	}
	console.log("troops = " + troops.length);
	return troops;*/
};
AreaModel.prototype.position=function(){
	return this.data.position;
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