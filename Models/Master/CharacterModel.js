function CharacterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.data = data;
	if(!self.data.maxPhysicalFitness){
		self.data.physicalFitness = self.data.maxPhysicalFitness = 100;
	}
}
CharacterModel.PANT_PROBABILITY = 0.2;
CharacterModel.list = [];
CharacterModel.commonAngryTalks = ["angry_talk_0_0","angry_talk_0_1","angry_talk_0_2"];
CharacterModel.commonDieTalks = ["die_talk_0_0","die_talk_0_1","die_talk_0_2"];
CharacterModel.commonUnderArrestTalks = ["under_arrest_talk_0_0", "under_arrest_talk_0_1", "under_arrest_talk_0_2"];
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
CharacterModel.prototype.calculation = function(init) {
	var self = this;
	var property = self.currentSoldiers().property();
	self.data.attack = self.force() * 0.5 + CharacterModel.upValue(property.attack, self.force()) * self.lv();
	self.data.spirit = self.intelligence() * 0.5 + CharacterModel.upValue(property.spirit, self.intelligence()) * self.lv();
	self.data.defense = self.command() * 0.5 + CharacterModel.upValue(property.defense, self.command()) * self.lv();
	self.data.breakout = self.agility() * 0.5 + CharacterModel.upValue(property.breakout, self.agility()) * self.lv();
	self.data.morale = self.luck() * 0.5 + CharacterModel.upValue(property.morale, self.luck()) * self.lv();
	self.data.maxTroops = self.initTroops() + property.troops * self.lv();
	self.data.maxStrategy = self.initStrategy() + property.strategy * self.lv();
	if(init){
		self.maxTroops(init);
		self.maxHP(init);
		self.maxMP(init);
		//self.data.troops = self.maxTroops();
		self.data.hp = self.maxHP();
		self.data.mp = self.maxMP();
	}
	var skill = self.skill(SkillType.CREATE);
	self.data.moveAssault = (skill && skill.isSubType(SkillSubType.MOVE_ASSAULT));
	self.data.moveKnow = (skill && skill.isSubType(SkillSubType.MOVE_KNOW));
};
CharacterModel.prototype.moveKnow = function() {
	return this.data.moveKnow;
};
CharacterModel.prototype.moveAssault = function() {
	return this.data.moveAssault;
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
CharacterModel.prototype.personalLoyalty = function() {
	return this.data.personalLoyalty;
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
CharacterModel.prototype.seigniorId = function(value){
	return this._dataValue("seignior_id", value, 0);
};
CharacterModel.prototype.seignior = function(chara_id) {
	var self = this;
	alert("seignior changed:"+chara_id);
	console.error("seignior changed:"+chara_id);
	/*if(typeof chara_id != UNDEFINED){
		self.data.seignior_id = chara_id;
		return;
	}*/
	if(!self.data.seignior_id){
		return null;
	}
	return SeigniorModel.getSeignior(self.data.seignior_id);
};
CharacterModel.prototype.exp = function(value){
	return this._dataValue("exp", value, 0);
};
CharacterModel.prototype.maxExp = function(value){
	return this._dataValue("maxExp", value, 100);
};
CharacterModel.prototype.wounded = function(value){//伤兵
	return this._dataValue("wounded", value, 0);
};
CharacterModel.prototype.troops = function(value) {
	return this._dataValue("troops", value,0);
};
CharacterModel.prototype.HP = function(value) {
	return this._dataValue("hp", value);
};
CharacterModel.prototype.MP = function(value) {
	return this._dataValue("mp", value);
};
CharacterModel.prototype.isPantTroops = function() {
	return this.troops() < this.maxTroops() * CharacterModel.PANT_PROBABILITY;
};
CharacterModel.prototype.maxTroops = function(init) {
	var self = this;
	if(init || !self.data._maxTroops){
		self.data._maxTroops = self.data.initTroops + self.currentSoldiers().property().troops * self.level();
	}
	return self.data._maxTroops;
};
CharacterModel.prototype.maxHP = function(init) {
	return 100;
};
CharacterModel.prototype.maxMP = function(init) {
	var self = this;
	if(init){
		self.data._maxStrategy = self.data.initStrategy + self.currentSoldiers().property().strategy * self.level();
	}
	return self.data._maxStrategy;
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
	var seigniorId = self.seigniorId();
	if(seigniorId <= 0){
		return Language.get("out_of_office");
	}
	var identity = "general";
	if(self.id() == seigniorId){
		identity = "monarch";
	}else if(self.id() == self.city().prefecture()){
		identity = "prefecture";
	}
	return Language.get(identity);
};
CharacterModel.prototype.loyalty = function(value) {
	return this._dataValue("loyalty", value);
};
CharacterModel.prototype.jobLabel = function() {
	var self = this;
	if(!self.data.job){
		self.data.job = Job.IDLE;
	}
	return Language.get(self.data.job);
};
CharacterModel.prototype.enlist = function(enlistCount) {
	var self = this;
	if(typeof enlistCount == UNDEFINED){
		enlistRun(self,self.data.targetEnlist);
		self.data.targetEnlist = null;
	}else{
		self.data.targetEnlist = {quantity:enlistCount};
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
	return this._dataValue("job", value, Job.IDLE);
};
//运输物资
CharacterModel.prototype.transport = function(data) {
	var self = this;
	if(typeof data == UNDEFINED){
		transportRun(self,self.data.transportData);
		self.data.transportData = null;
		self.job(Job.IDLE);
	}else{
		self.data.transportData = data;
		self.job(Job.TRANSPORT);
	}
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
CharacterModel.prototype.spy = function(id) {
	var self = this;
	if(typeof id == UNDEFINED){
		spyRun(self,self.data.targetSpyId);
		self.data.targetSpyId = null;
	}else{
		self.data.targetSpyId = id;
		self.job(Job.SPY);
	}
};
CharacterModel.prototype.targetCity = function() {
	return this.data.targetCity;
};
CharacterModel.prototype.cityId = function(value) {
	return this._dataValue("cityId", value);
};
CharacterModel.prototype.city = function() {
	return AreaModel.getArea(this.data.cityId);
};
CharacterModel.prototype.content = function(value) {
	return this._dataValue("content", value);
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
CharacterModel.prototype.maxProficiencySoldier = function() {
	var soldiers = this.soldiers();
	var proficiency = 0, soldier;
	for(var i=0,l=soldiers.length;i<l;i++){
		var child = soldiers[i];
		if(proficiency < child.proficiency()){
			proficiency = child.proficiency();
			soldier = child;
		}
	}
	return soldier;
};
CharacterModel.prototype.currentSoldiers = function(id) {
	var soldiers = this.soldiers();
	if(typeof id != UNDEFINED){
		var soldier;
		var soldierIndex = soldiers.find(function(child){
			return child.id() == id;
		});
		if(soldierIndex >= 0){
			soldier = soldiers.splice(soldierIndex,1);
		}else{
			soldier = SoldierModel.createModel(id);
		}
		soldiers.unshift(soldier);
		return;
	}
	return soldiers[0];
};
CharacterModel.prototype.underArrestTalk = function() {
	var self = this, index, list;
	list = (self.data.underArrestTalks && self.data.underArrestTalks.length) ? self.data.underArrestTalks : CharacterModel.commonUnderArrestTalks;
	index = Math.random()*list.length >>> 0;
	return Language.getUnderArrestTalk(list[index]);
};
CharacterModel.prototype.dieTalk = function() {
	var self = this, index, list;
	list = (self.data.dieTalks && self.data.dieTalks.length) ? self.data.dieTalks : CharacterModel.commonDieTalks;
	index = Math.random()*list.length >>> 0;
	return Language.getDieTalk(list[index]);
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
	console.log("self.data.skill="+self.data.skill);
	if(!self.data.skill){
		return false;
	}
	console.log("SkillMasterModel="+(typeof SkillMasterModel));
	var skill = SkillMasterModel.getMaster(self.data.skill);
	if(subType && skill.isSubType(subType)){
		return true;
	}
	return false;
};