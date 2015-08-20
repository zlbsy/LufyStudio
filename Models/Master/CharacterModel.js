function CharacterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.data = data;
	if(!self.data.maxPhysicalFitness){
		self.data.physicalFitness = self.data.maxPhysicalFitness = 100;
	}
}
CharacterModel.list = [];
CharacterModel.commonAngryTalks = ["angry_talk_0_0","angry_talk_0_1","angry_talk_0_2"];
CharacterModel.upValue = function(type, value) {
	if (type == "S") {
		if (value < 50) {
			return 1;
		} else if (value < 70) {
			return 2;
		} else if (value < 90) {
			return 3;
		}else{
			return 4;
		}
	} else if (type == "A") {
		if (value < 50) {
			return 1;
		} else if (value < 70) {
			return 2;
		} else {
			return 3;
		}
	} else if (type == "B") {
		if (value < 50) {
			return 1;
		} else {
			return value >= 90 ? 3 : 2;
		}
	} else if (type == "C") {
		return value >= 70 ? 2 : 1;
	}
	return 0;
};
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
CharacterModel.prototype.calculation = function() {
	var self = this;
	var property = self.currentSoldiers().property();
	self.data.attack = self.force() * 0.5 + CharacterModel.upValue(property.attack, self.force()) * self.lv();
	self.data.spirit = self.intelligence() * 0.5 + CharacterModel.upValue(property.spirit, self.intelligence()) * self.lv();
	self.data.defense = self.command() * 0.5 + CharacterModel.upValue(property.defense, self.command()) * self.lv();
	self.data.breakout = self.agility() * 0.5 + CharacterModel.upValue(property.breakout, self.agility()) * self.lv();
	self.data.morale = self.luck() * 0.5 + CharacterModel.upValue(property.morale, self.luck()) * self.lv();
	self.data.maxTroops = self.initTroops() + property.troops * self.lv();
	self.data.maxStrategy = self.initStrategy() + property.strategy * self.lv();
	var skill = self.skill(SkillType.CREATE);
	self.data.moveQiang = (skill && skill.isSubType(SkillSubType.MOVE_QIANG));
	self.data.moveElu = (skill && skill.isSubType(SkillSubType.MOVE_ELU));
};
CharacterModel.prototype.moveElu = function() {
	return this.data.moveElu;
};
CharacterModel.prototype.moveQiang = function() {
	return this.data.moveQiang;
};
CharacterModel.prototype.initStrategy = function() {
	return this.data.initStrategy;
};
CharacterModel.prototype.initTroops = function() {
	return this.data.initTroops;
};
CharacterModel.prototype.id = function() {
	return this.data.id;
};
CharacterModel.prototype.physicalFitness = function(){//体力
	return this.data.physicalFitness;
};
CharacterModel.prototype.maxPhysicalFitness = function(){
	return this.data.maxPhysicalFitness;
};
CharacterModel.prototype.disposition = function(){
	return this.data.disposition;
};
CharacterModel.prototype.attack = function(){
	return this.data.attack;
};
CharacterModel.prototype.spirit = function(){
	return this.data.spirit;
};
CharacterModel.prototype.defense = function(){
	return this.data.defense;
};
CharacterModel.prototype.breakout = function(){
	return this.data.breakout;
};
CharacterModel.prototype.morale = function(){
	return this.data.morale;
};
CharacterModel.prototype.dispositionLabel = function(){
	return Language.get("disposition_"+this.data.disposition);
};
CharacterModel.prototype.name = function() {
	return Language.getCharacter("character_"+this.data.id);
};
CharacterModel.prototype.compatibility = function() {
	return this.data.compatibility;
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
CharacterModel.prototype.troops = function(value) {
	if(typeof value != UNDEFINED){
		this.data.troops = value;
	}
	return typeof this.data.troops == UNDEFINED ? 0 : this.data.troops;
};
CharacterModel.prototype.maxTroops = function(value) {
	//TODO::
	return 1000;
};
CharacterModel.prototype.maxHP = function(value) {
	if(typeof value != UNDEFINED){
		this.data.maxHp = value;
	}
	return this.data.maxHp;
};
CharacterModel.prototype.HP = function(value) {
	if(typeof value != UNDEFINED){
		this.data.hp = value;
	}
	return this.data.hp;
};
CharacterModel.prototype.MP = function() {return 20;
	return this.data.mp;
};
CharacterModel.prototype.lv = function() {
	return this.level();
};
CharacterModel.prototype.level = function() {
	return 10;
};
CharacterModel.prototype.strategies = function() {
	var self = this;
	var strategies = self.currentSoldiers().strategy();
	var datas = [];
	for(var i=0,l=strategies.length;i<l;i++){
		var child = strategies[i];
		if(child.level() < self.level()){
			datas.push(child);
		}
	}
	return datas;
};
CharacterModel.prototype.identity = function(value) {
	var self = this;
	var seignior = self.seignior();
	if(!seignior){
		return Language.get("out_of_office");
	}
	var identity = "general";
	if(self.id() == self.seignior().id()){
		identity = "monarch";
	}else if(self.id() == self.city().prefecture()){
		identity = "prefecture";
	}
	return Language.get(identity);
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
	}else{
		self.data.targetEnlist = {id:enlistArmId,quantity:enlistCount};
		self.job(Job.ENLIST);
	}
};
CharacterModel.prototype.hire = function(id) {
	var self = this;
	if(typeof id == UNDEFINED){
		hireRun(self,self.data.targetHireId);
		self.data.targetHireId = null;
	}else{
		self.data.targetHireId = id;
		self.job(Job.HIRE);
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
	var face = new Face(LMvc.IMG_PATH + "face/" + self.data.faceImg + ".png", self.data.minFace);
	if ( typeof size == UNDEFINED) {
		size = 100;
	}
	face.scaleX = size / self.data.minFace[2];
	face.scaleY = size / self.data.minFace[3];
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
CharacterModel.prototype.currentSoldiers = function() {
	var soldiers = this.soldiers();
	return soldiers[0];
};
CharacterModel.prototype.angryTalk = function() {
	var self = this, index, list;
	list = (self.data.angryTalks && self.data.angryTalks.length) ? self.data.angryTalks : CharacterModel.commonAngryTalks;
	index = Math.random()*list.length >>> 0;
	return Language.getAngryTalk(list[index]);
};
CharacterModel.prototype.soldiers = function() {
	var self = this;
	if(!self._soldiers){
		self._soldiers = [];
		for(var i=0;i<self.data.soldiers.length;i++){
			var soldier = new SoldierModel(null, self.data.soldiers[i]);
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
CharacterModel.prototype.groupSkill = function() {
	var self = this;
	if(!self.data.groupSkill){
		return null;
	}
	var groupSkill = GroupSkillModel.getMaster(self.data.groupSkill);
	console.log("groupSkill.probability()/100 = " + (groupSkill.probability()/100));
	if(Math.random() > groupSkill.probability()/100){
		return null;
	}
	return groupSkill;
};
CharacterModel.prototype.skill = function(type) {
	var self = this;
	if(!self.data.skill){
		return null;
	}
	var skill = SkillMasterModel.getMaster(self.data.skill);
	if(type && skill.mainType() != type){
		return null;
	}
	if(type && Math.random() > skill.probability()/100){
		return null;
	}
	return skill;
};
CharacterModel.prototype.hasSkill = function(subType) {
	var self = this;
	if(!self.data.skill){
		return false;
	}
	var skill = SkillMasterModel.getMaster(self.data.skill);
	if(subType && skill.isSubType(subType)){
		return true;
	}
	return false;
};