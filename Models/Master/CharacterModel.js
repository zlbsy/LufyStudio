function CharacterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.data = data;
}
CharacterModel.list = [];
CharacterModel.setChara=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var chara = new CharacterModel(null,list[i]);
		CharacterModel.list.push(chara);
	}
};
CharacterModel.getChara=function(chara_id){
	var self = this;
	for(var i=0,l=CharacterModel.list.length;i<l;i++){
		var chara = CharacterModel.list[i];
		if(chara.id() != chara_id){
			continue;
		}
		return chara;
	}
	return null;
};
CharacterModel.prototype.id = function() {
	return this.data.id;
};
CharacterModel.prototype.name = function() {
	return Language.getCharacter("character_"+this.data.id);
};
CharacterModel.prototype.seignior = function(chara_id) {
	var self = this;
	if(typeof chara_id != UNDEFINED){
		self.data.seignior_id = chara_id;
		return;
	}
	if(!self.data.seignior_id){
		return null;
	}
	return CharacterModel.getChara(self.data.seignior_id);
};
CharacterModel.prototype.identity = function(value) {
	var self = this;
	if(typeof value != UNDEFINED){
		self.data.identity = Language.get(value);
		return;
	}
	return self.data.identity;
};
CharacterModel.prototype.loyalty = function(value) {
	var self = this;
	if(typeof value != UNDEFINED){
		self.data.loyalty = value;
		return;
	}
	return self.data.loyalty;
};
CharacterModel.prototype.jobLabel = function() {
	var self = this;
	if(!self.data.job){
		self.data.job = Job.IDLE;
	}
	return Language.get(self.data.job);
};
CharacterModel.prototype.enlist = function(enlistArmId, enlistCount) {
	var self = this;
	if(typeof enlistArmId == UNDEFINED){
		enlistRun(self,self.data.targetEnlist);
		self.data.targetEnlist = null;
		/*
		var area = self.city();
		var troop = area.troops(self.data.targetEnlist.id);
		troop.quantity += self.data.targetEnlist.quantity;
		area.troops(self.data.targetEnlist.id, troop);
		self.data.targetEnlist = null;
		self.job(Job.IDLE);
		*/
	}else{
		self.data.targetEnlist = {id:enlistArmId,quantity:enlistCount};
		self.job(Job.ENLIST);
	}
};
CharacterModel.prototype.job = function(value) {
	var self = this;
	if(typeof value != UNDEFINED){
		self.data.job = value;
		return;
	}
	if(!self.data.job){
		return Job.IDLE;
	}
	return self.data.job;
};
CharacterModel.prototype.moveTo = function(cityId) {
	var self = this;
	if(typeof cityId == UNDEFINED){
		var area = self.city();
		area.removeGenerals(self);
		area = AreaModel.getArea(self.data.targetCity);
		area.addGenerals(self);
		self.data.cityId = self.data.targetCity;
		self.data.targetCity = null;
		self.job(Job.IDLE);
	}else{
		self.data.targetCity = cityId;
		self.job(Job.MOVE);
	}
};
CharacterModel.prototype.targetCity = function() {
	return this.data.targetCity;
};
CharacterModel.prototype.cityId = function(cityId) {
	if(typeof cityId == UNDEFINED){
		return this.data.cityId;
	}else{
		this.data.cityId = cityId;
	}
};
CharacterModel.prototype.city = function() {
	return AreaModel.getArea(this.data.cityId);
};
CharacterModel.prototype.content = function(value) {
	var self = this;
	if(typeof value != UNDEFINED){
		self.data.content = value;
		return;
	}
	return self.data.content;
};
CharacterModel.prototype.faceImg = function() {
	return this.data.faceImg;
};
CharacterModel.prototype.face = function() {
	return new Face(LMvc.IMG_PATH + "face/" + this.data.faceImg + ".png");
};
CharacterModel.prototype.minFace = function(size) {
	var self = this;
	if(!self._minFace){
		self._minFace = JSON.parse(this.data.minFace);
	}
	var face = new Face(self.id() < 50 ? LMvc.datalist["face-1"] : LMvc.IMG_PATH + "face/" + this.data.faceImg + ".png", self._minFace);
	if ( typeof size == UNDEFINED) {
		size = 100;
	}
	face.scaleX = size / self._minFace[2];
	face.scaleY = size / self._minFace[3];
	return face;
};
CharacterModel.prototype.minFaceRect = function() {
	return this.data.minFace;
};
CharacterModel.prototype.command = function() {
	return this.data.command;
};
CharacterModel.prototype.force = function() {
	return this.data.force;
};
CharacterModel.prototype.intelligence = function() {
	return this.data.intelligence;
};
CharacterModel.prototype.agility = function() {
	return this.data.agility;
};
CharacterModel.prototype.luck = function() {
	return this.data.luck;
};
CharacterModel.prototype.soldiers = function() {
	var self = this;
	if(!self._soldiers){
		self._soldiers = [];
		for(var i=0;i<this.data.soldiers.length;i++){
			var soldier = new SoldierModel(null, this.data.soldiers[i]);
			self._soldiers.push(soldier);
		}
	}
	return self._soldiers;
};
CharacterModel.prototype.equipments = function() {
	if(!this.data.equipments){
		this.data.equipments = [];
	}
	
	return this.data.equipments;
};
CharacterModel.prototype.equip = function(itemModel) {
	var self = this;
	var equipments = self.equipments();
	
	if(Array.isArray(itemModel)){
		var datas = itemModel;
		for(var i=0;i<datas.length;i++){
			itemModel = new ItemModel(null, datas[i]);
			equipments.push(itemModel);
		}
	}else if(itemModel.constructor.name == "ItemModel"){
		for(var i=0;i<equipments.length;i++){
			var item = equipments[i];
			if(item.position() == itemModel.position()){
			console.log("CharacterModel.prototype.equip=",itemModel.objectIndex);
				equipments.splice(i,1);
				self.city().addItem(item);
				console.log("CharacterModel addItem=",item.objectIndex);
				break;
			}
		}
		equipments.push(itemModel);
	}
};
CharacterModel.prototype.equipOff = function(itemId) {
	var self = this;
	var equipments = self.equipments();
	for(var i=0;i<equipments.length;i++){
		var item = equipments[i];
		if(item.id() == itemId){
			equipments.splice(i,1);
			self.city().addItem(item);
			break;
		}
	}
};
