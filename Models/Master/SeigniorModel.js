function SeigniorModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "StageMasterModel";
	self.data = data;
	self.data.spyAreas = self.data.spyAreas || [];
	self.data.stopBattleSeigniors = self.data.stopBattleSeigniors || [];
}

SeigniorModel.list = [];
SeigniorModel.setSeignior=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
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
		if(seignior.chara_id() == seigniorId){
			SeigniorModel.list.splice(i, 1);
			break;
		}
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
SeigniorModel.prototype.chara_id = function(){
	return this.data.chara_id;
};
SeigniorModel.prototype.character = function(){
	var self = this;
	if(!self.data._chara || self.data._chara.id() != self.data.chara_id){
		self.data._chara = CharacterModel.getChara(self.data.chara_id);
	}
	return self.data._chara;
};
SeigniorModel.prototype.color = function(){
	return this.data.color;
};
SeigniorModel.prototype.color2 = function(){
	switch(this.data.color){
		case "red":
			return "#ff0000";
		default:
			return "#fffff0";
	}
};
/**
 * 城池
 **/
SeigniorModel.prototype.areas = function(){
	return this.data.areas;
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
	console.log("self.data.spyAreas.length="+self.data.spyAreas.length);
	for(var i = self.data.spyAreas.length - 1;i>=0;i--){
		var city = self.data.spyAreas[i];
		city.month -= 1;
		if(city.month == 0){
			self.data.spyAreas.splice(i, 1);
		}
	}
	console.log("checkSpyCitys="+self.data.spyAreas.length);
};
SeigniorModel.prototype.isSpyCity = function(id){
	return this.data.spyAreas.findIndex(function(child){
		return child.id == id;
	}) >= 0;
};
SeigniorModel.prototype.stopBattle = function(id){
	var self = this;
	var max = 6;
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
SeigniorModel.prototype.addCity = function(area){
	this.data.areas.push(area);
};
SeigniorModel.prototype.removeCity = function(areaId){
	var index = this.data.areas.findIndex(function(child){
		return child.id() == areaId;
	});
	this.data.areas.splice(index, 1);
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
SeigniorModel.prototype.generalsCount = function(){
	var areas = this.data.areas;
	var count = 0;
	areas.forEach(function(city){
		count += city.generals().length;
	});
	return count;
};